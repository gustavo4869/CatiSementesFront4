import React, { Component } from 'react';
import keycloak from '../../keycloak';
import axios from 'axios';

import ApiService from '../../../services/ApiService';
import PontoVendaService from '../../../services/pontoVenda/PontoVendaService';
import CasaAgriculturaService from '../../../services/pontoVenda/CasaAgriculturaService';
import RegionalService from '../../../services/pontoVenda/RegionalService';
import ExternalService from '../../../services/ExternalService';

import KeycloakStart from '../../shared/KeycloakStart';
import KeycloakNoAuth from '../../shared/KeycloakNoAuth';
import NavMenuLogado from '../../shared/NavMenuLogado';
import Carregando from '../../shared/Carregando';
import MenuLateralAdministracao from '../../Administracao/MenuLateralAdministracao';
import ModalPontoVenda from '../modal/ModalPontoVenda';

import Notificacao from '../../Util/Notificacao';
import logoProdutos from '../../images/adicionar-produto 1.png';
import setaBaixo from '../../images/Polygon 2.png';

import '../css/IndexPontosVendas.css';

class IndexPontosVendas extends Component {
    constructor(props) {
        super(props);

        this.state = {
            processando: false,
            keycloak: null,
            authenticated: false,
            usuarios: [],
            keycloakToken: null,
            pdvEditar: {
                idPdv: 0,
                desUnidade: "",
                codIbge: 0,
                idStatus: 0,
                idTpPdv: 0,
                idReg: 0,
                idNs: 0,
                usuCriacao: "gustavo",
                pdvCas: [],
                pdvCidades: [],
            },
            showModal: false,
            tiposPdv: [],
            cas: [],
            reg: [],
            municipios: [],
            pdvs: [],
            comboSementes: [],
            comboCa: [],
            comboPdv: [],
            comboReg: [],
            comboStatus: [],
            comboCentro: [],
            usuario: ""
        };

        this.novoPontoVenda = this.novoPontoVenda.bind(this);
        this.excluirPontoVenda = this.excluirPontoVenda.bind(this);
        this.editarPontoVenda = this.editarPontoVenda.bind(this);
        this.toggleTabela = this.toggleTabela.bind(this);
        this.toggleModalPontoVenda = React.createRef();
        this.checkAllPontoVenda = this.checkAllPontoVenda.bind(this);
        this.tratarTextoCidades = this.tratarTextoCidades.bind(this);
        this.tratarTextoCasaAgricultura = this.tratarTextoCasaAgricultura.bind(this);
        this.getTipoPdv = this.getTipoPdv.bind(this);
        this.carregarDados = this.carregarDados.bind(this);
        this.onChangeBuscaPontoVenda = this.onChangeBuscaPontoVenda.bind(this);
    }

    componentDidMount() {
        keycloak.init({ onLoad: 'login-required' }).then(authenticated => {
            console.log("Mount")
            console.log(keycloak)
            let usuario = "";
            keycloak.loadUserInfo().then(result => {
                console.log("resultMopunt")
                console.log(result)
                this.setState({
                    keycloak: keycloak,
                    authenticated: authenticated,
                    keycloakToken: keycloak.token,
                    usuario: result.preferred_username
                });
            });
            
        });
        this.carregarDados();
    }

    async carregarDados() {
        this.setState({ processando: true });

        const municipios = await ExternalService.buscarMunicipios();
        const tipoPdv = await PontoVendaService.getAllTipoPdv();
        const status = await PontoVendaService.getAllStatus();
        const dadosRegional = await PontoVendaService.getListaByTipoPDV(1);
        const dadosSementes = await PontoVendaService.getListaByTipoPDV(2);
        const dadosCa = await PontoVendaService.getListaByTipoPDV(4);
        const dadosCentro = await PontoVendaService.getListaByTipoPDV(5);
        
        const pdvs = await PontoVendaService.getAllPdv(0, 100);
        const pdvsAtivos = pdvs.pdv.filter(f => f.flgAtivo !== false);
        const pdvTratado = this.tratarListaPdvs(pdvsAtivos, municipios.dados, dadosCa.comboPdv);

        console.log("comboRegional")
        console.log(dadosRegional)

        this.setState({
            processando: false,
            municipios: municipios.dados,
            tiposPdv: tipoPdv.sucesso ? tipoPdv.pdv : [],
            comboPdv: tipoPdv.sucesso ? tipoPdv.comboPdv : [],
            comboStatus: status.sucesso ? status.comboStatus : [],
            pdvs: pdvs.sucesso ? pdvTratado : [],
            comboSementes: dadosSementes.sucesso ? dadosSementes.comboPdv : [],
            comboCa: dadosCa.sucesso ? dadosCa.comboPdv : [],
            comboReg: dadosRegional.sucesso ? dadosRegional.comboPdv : [],
            comboCentro: dadosCentro.sucesso ? dadosCentro : []
        }, () => { console.log("Carregardados State");  console.log(this.state) });
    }

    tratarListaPdvs(pdvs, municipios, cas) {
        var pdvTratado = [];
        pdvs.forEach(function (pdv) {
            var prev = pdv;
            const cidadePdv = municipios.filter(f => f.value === prev.codIbge)[0] ? municipios.filter(f => f.value === prev.codIbge)[0].label : "Não encontrado";
            prev.desMunicipio = cidadePdv;

            var cidades = [];            
            prev.pdvCidades.forEach(function (cidade) {
                try {
                    var cid = {
                        idPdvMun: cidade.idPdvMun,
                        idPdv: cidade.idPdv,
                        codIbge: cidade.codIbge,
                        desCidade: municipios.filter(f => f.value === cidade.codIbge)[0].label
                    }
                    cidades.push(cid);
                }
                catch {
                    console.log("Erro Cidade")
                    console.log(cidade)
                    console.log(municipios.filter(f => f.value === cidade.codIbge))
                }
            });

            var caTratado = [];
            prev.pdvCas.forEach(function (ca) {
                try {
                    var casa = {
                        idPdvCa: ca.idPdvCa,
                        idPdv: ca.idPdv,
                        idCa: ca.idCa,
                        desCa: cas.filter(f => f.value === ca.idCa)[0].label
                    }
                    caTratado.push(casa);
                }
                catch {
                    console.log("Erro CA")
                    console.log(ca)
                    console.log(cas.filter(f => f.value === ca.idCa))
                }
            });
            prev.pdvCidades = cidades;
            prev.pdvCas = caTratado;

            pdvTratado.push(prev);
        });

        console.log("pdv tratado")
        console.log(pdvTratado)
        return pdvTratado;
    }

    novoPontoVenda() {
        this.setState({
            pdvEditar: {
                idPdv: 0,
                desUnidade: "",
                codIbge: 0,
                idStatus: 0,
                idTpPdv: 0,
                idReg: 0,
                idNs: 0,
                usuCriacao: "",
                pdvCas: [],
                pdvCidades: [],
            }
        }, () => {
            this.toggleModalPontoVenda.current.toggleModalPontoVenda();
        });
    }

    async excluirPontoVenda() {
        var selecionados = Array.from(document.getElementsByClassName("radio-btn-pdv")).filter(f => f.checked);

        if (selecionados.length === 0) {
            Notificacao.alerta("Ops..", "Selecione um ponto venda para excluir");
            return;
        }

        var sucessoExclusao = true;
        var contadorErros = 0;
        for (var i = 0; i < selecionados.length; i++) {
            var selecionado = selecionados[i];
            const idpdv = selecionado.getAttribute("idPdv");
            const idTpPdv = selecionado.getAttribute("idTpPdv");
            var resultExclusao = await PontoVendaService.excluirPdv(idpdv, idTpPdv);
            console.log("Exclusao " + i);
            console.log(resultExclusao)
            if (!resultExclusao.sucesso) {
                sucessoExclusao = false;
                contadorErros++;
            }
        }

        if (sucessoExclusao) {
            Notificacao.sucesso("Concluído", "Ponto vendas Excluidos com sucesso")
        }
        else {
            Notificacao.erro("Erro", "Houve erro ao excluir " + contadorErros.toString() + " produtos");
        }

        this.carregarDados();
    }

    editarPontoVenda() {
        var checkbox = Array.from(document.getElementsByClassName("radio-btn-pdv"));
        var chkSelecionados = checkbox.filter(f => f.checked);
        if (chkSelecionados.length === 0) {
            Notificacao.alerta("Ops...", "Selecione pelo menos 1 ponto venda");
            return;
        }
        if (chkSelecionados.length > 1) {
            Notificacao.alerta("Ops...", "Selecione apenas 1 ponto venda");
            return;
        }

        var idPdv = chkSelecionados[0].getAttribute("idPdv");
        var idTpPdv = chkSelecionados[0].getAttribute("idTpPdv");
        var pdv = this.state.pdvs.filter(f => f.idpdv === parseInt(idPdv) && f.idTpPdv === parseInt(idTpPdv))[0];
        console.log("Pdv Editar")
        console.log(pdv)
        this.setState({ pdvEditar: pdv }, () => {
            this.toggleModalPontoVenda.current.toggleModalPontoVenda();
        });
    }

    toggleTabela(classificacao) {
        const tabela = document.getElementById("tabela-" + classificacao);
        if (tabela.classList.contains("hidden")) {
            tabela.classList.remove("hidden");
        }
        else {
            tabela.classList.add("hidden");
        }
    }

    checkAllPontoVenda(event, tipo) {
        var checks = document.getElementsByClassName("radio-btn-pdv");
        console.log("Check All")
        console.log(event)
        if (event.target.checked) {
            for (var i = 0; i < checks.length; i++) {
                if (parseInt(checks[i].getAttribute('idtppdv')) === tipo) {
                    if (!checks[i].checked) {
                        checks[i].checked = !checks[i].checked;
                    }
                }
            }
        }
        else {
            for (var i = 0; i < checks.length; i++) {
                if (parseInt(checks[i].getAttribute('idtppdv')) === tipo) {
                    if (checks[i].checked) {
                        checks[i].checked = !checks[i].checked;
                    }
                }
            }
        }
        
    }

    tratarTextoCidades(cidades) {
        var textoCidade = "";
        cidades.forEach(function (cidade, index) {
            if (cidades.length === 1) {
                textoCidade = cidade.desCidade;
                return;
            }

            if (index === cidades.length - 1) {
                textoCidade += cidade.desCidade;
            }
            else {
                textoCidade += cidade.desCidade + ", ";
            }
        });

        return textoCidade;
    }

    tratarTextoCasaAgricultura(cas) {
        var textoCa = "";
        cas.forEach(function (ca, index) {
            if (cas.length === 1) {
                textoCa = ca.desCa;
                return;
            }

            if (index === cas.length - 1) {
                textoCa += ca.desCa;
            }
            else {
                textoCa += ca.desCa + ", ";
            }
        });

        return textoCa;
    }

    getTipoPdv(idTpPdv) {
        return this.state.tiposPdv.filter(f => f.idTpPdv === idTpPdv)[0];
    }

    async loadUsername() {
        var statePdv = this.state.pdvEditar;
        var usuario = "Usuário";

        if (!this.state.keycloak) {
            return usuario;
        }

        if (!this.state.keycloak.userInfo) {
            await this.state.keycloak.loadUserInfo()
                .then(function (userInfo) {
                    usuario = userInfo.preferred_username;
                });

            statePdv.usuCriacao = usuario;
        }
        else {
            statePdv.usuCriacao = this.state.keycloak.userInfo.preferred_username;
        }

        this.setState({ pdvEditar: statePdv });
    }

    async onChangeBuscaPontoVenda(event) {
        const valorDigitado = event.target.value;
        if (valorDigitado.length > 2) {
            const resultado = await PontoVendaService.getPdv(valorDigitado);
            if (resultado.sucesso) {
                const pdvTratado = this.tratarListaPdvs(resultado.pdv, this.state.municipios, this.state.comboCa);
                this.setState({ pdvs: pdvTratado })
            }
        }
        else if (valorDigitado.length === 0) {
            const resultado = await PontoVendaService.getAllPdv();
            if (resultado.sucesso) {
                const pdvTratado = this.tratarListaPdvs(resultado.pdv, this.state.municipios, this.state.comboCa);
                this.setState({ pdvs: pdvTratado })
            }
        }
    }

    render() {
        if (this.state.keycloak) {
            if (this.state.authenticated) {
                if (!this.state.keycloak.hasRealmRole("Comum")) {
                    return (
                        <div className={"container-ponto-venda"}>
                            <NavMenuLogado keycloak={this.state.keycloak} />
                            <MenuLateralAdministracao menuAtivo="PONTOSVENDAS" />
                            <div className="container-ponto-venda-conteudo">
                                <div className="row container-busca">
                                    <div className="col-2 container-titulo">
                                        <img src={logoProdutos}></img>
                                        <font>PONTOS DE VENDA</font>
                                    </div>
                                    <div className="col-10 container-input">
                                        <input type="text" placeholder="Buscar pontos de venda" onChange={this.onChangeBuscaPontoVenda} />
                                        <button className="btn-editar" disabled={this.state.processando || this.state.keycloak.hasRealmRole("Visualizacao")} onClick={this.novoPontoVenda}><font>Criar Ponto Venda</font></button>
                                        <ModalPontoVenda
                                            ref={this.toggleModalPontoVenda}
                                            tipoPdv={this.state.comboPdv}
                                            pdv={this.state.pdvEditar}
                                            comboCa={this.state.comboCa}
                                            comboRegional={this.state.comboReg}
                                            comboSementes={this.state.comboSementes}
                                            comboStatus={this.state.comboStatus}
                                            municipios={this.state.municipios}
                                            nomeUsuario={this.state.nomeUsuario}
                                            carregarDados={this.carregarDados}
                                            usuario={this.state.usuario}
                                        />
                                    </div>
                                </div>
                                <div className="row container-acoes">
                                    <button className="btn-editar" disabled={this.state.processando || this.state.keycloak.hasRealmRole("Visualizacao")} onClick={this.editarPontoVenda}>Editar</button>
                                    <button className="btn-excluir" disabled={this.state.processando || this.state.keycloak.hasRealmRole("Visualizacao")} onClick={this.excluirPontoVenda}>Excluir</button>
                                </div>
                                {this.state.processando ?
                                    <Carregando />
                                    :
                                    <div>
                                        <div className="row container-tabela-produtos">

                                            <div key={this.getTipoPdv(1).idTpPdv} className="row row-tabela-produtos">
                                                <label className="label-tabela-produtos" onClick={() => this.toggleTabela(this.getTipoPdv(1).idTpPdv)}><img src={setaBaixo} alt=""></img>{this.getTipoPdv(1).desTpPdv}</label>
                                                <table id={"tabela-" + this.getTipoPdv(1).idTpPdv} className="hidden">
                                                    <thead>
                                                        <tr>
                                                            <th>Selecionar todos <br /> <input type="checkbox" onClick={(event) => this.checkAllPontoVenda(event, this.getTipoPdv(1).idTpPdv)} /></th>
                                                            <th>ID</th>
                                                            <th>Nome Unidade</th>
                                                            <th>Status</th>
                                                            <th>Cidade</th>
                                                            <th>Lista Municípios</th>                                                            
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {this.state.pdvs.filter(f => f.idTpPdv === 1).length > 0 ? this.state.pdvs.filter(f => f.idTpPdv === 1).map((pdv) => (
                                                            <tr>
                                                                <td><input type="checkbox" className="radio-btn-graos radio-btn-pdv" idTpPdv={pdv.idTpPdv} idpdv={pdv.idpdv} /></td>
                                                                <td>{pdv.idpdv}</td>
                                                                <td>{pdv.desUnidade}</td>
                                                                <td>{pdv.desStatus}</td>
                                                                <td>{pdv.desMunicipio}</td>
                                                                <td>{this.tratarTextoCidades(pdv.pdvCidades)}</td>                                                                
                                                            </tr>
                                                        )) : ""}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                        <div className="row container-tabela-produtos">
                                            <div key={this.getTipoPdv(2).idTpPdv} className="row row-tabela-produtos">
                                                <label className="label-tabela-produtos" onClick={() => this.toggleTabela(this.getTipoPdv(2).idTpPdv)}>
                                                    <img src={setaBaixo}></img>{this.getTipoPdv(2).desTpPdv}
                                                </label>
                                                <table id={"tabela-" + this.getTipoPdv(2).idTpPdv} className="hidden">
                                                    <thead>
                                                        <tr>
                                                            <th>Selecionar todos <br /> <input type="checkbox" onClick={(event) => this.checkAllPontoVenda(event, this.getTipoPdv(2).idTpPdv)} /></th>
                                                            <th>ID</th>
                                                            <th>Nome Unidade</th>
                                                            <th>Status</th>
                                                            <th>Cidade</th>
                                                            <th>Lista Municípios</th>
                                                            <th>Qt Casas</th>
                                                            <th>Casas de Agricultura</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {this.state.pdvs.filter(f => f.idTpPdv === 2).length > 0 ? this.state.pdvs.filter(f => f.idTpPdv === 2).map((pdv) => (
                                                            <tr>
                                                                <td><input type="checkbox" className="radio-btn-graos radio-btn-pdv" idTpPdv={pdv.idTpPdv} idpdv={pdv.idpdv} /></td>
                                                                <td>{pdv.idpdv}</td>
                                                                <td>{pdv.desUnidade}</td>
                                                                <td>{pdv.desStatus}</td>
                                                                <td>{pdv.desMunicipio}</td>
                                                                <td>{this.tratarTextoCidades(pdv.pdvCidades)}</td>
                                                                <td>{pdv.pdvCas.length ?? 0}</td>
                                                                <td>{this.tratarTextoCasaAgricultura(pdv.pdvCas)}</td>
                                                            </tr>
                                                        )) : ""}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                        <div className="row container-tabela-produtos">
                                            <div key={this.getTipoPdv(3).idTpPdv} className="row row-tabela-produtos">
                                                <label className="label-tabela-produtos" onClick={() => this.toggleTabela(this.getTipoPdv(3).idTpPdv)}>
                                                    <img src={setaBaixo}></img> {this.getTipoPdv(3).desTpPdv}
                                                </label>
                                                <table id={"tabela-" + this.getTipoPdv(3).idTpPdv} className="hidden">
                                                    <thead>
                                                        <tr>
                                                            <th>Selecionar todos <br /> <input type="checkbox" onClick={(event) => this.checkAllPontoVenda(event, this.getTipoPdv(3).idTpPdv)} /></th>
                                                            <th>ID</th>
                                                            <th>Nome Unidade</th>
                                                            <th>Status</th>
                                                            <th>Cidade</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {this.state.pdvs.filter(f => f.idTpPdv === 3).length > 0 ? this.state.pdvs.filter(f => f.idTpPdv === 3).map((pdv) => (
                                                            <tr>
                                                                <td><input type="checkbox" className="radio-btn-graos radio-btn-pdv" idTpPdv={pdv.idTpPdv} idpdv={pdv.idpdv} /></td>
                                                                <td>{pdv.idpdv}</td>
                                                                <td>{pdv.desUnidade}</td>
                                                                <td>{pdv.desStatus}</td>
                                                                <td>{pdv.desMunicipio}</td>
                                                            </tr>
                                                        )) : ""}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>                                        
                                        <div className="row container-tabela-produtos">
                                            <div key={this.getTipoPdv(4).idTpPdv} className="row row-tabela-produtos">
                                                <label className="label-tabela-produtos" onClick={() => this.toggleTabela(this.getTipoPdv(4).idTpPdv)}>
                                                    <img src={setaBaixo}></img>{this.getTipoPdv(4).desTpPdv}
                                                </label>
                                                <table id={"tabela-" + this.getTipoPdv(4).idTpPdv} className="hidden">
                                                    <thead>
                                                        <tr>
                                                            <th>Selecionar todos <br /> <input type="checkbox" onClick={(event) => this.checkAllPontoVenda(event, this.getTipoPdv(4).idTpPdv)} /></th>
                                                            <th>ID</th>
                                                            <th>Nome Unidade</th>
                                                            <th>Status</th>
                                                            <th>Cidade</th>
                                                            <th>Núcleo de Sementes</th>
                                                            <th>CATI Regional</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {this.state.pdvs.filter(f => f.idTpPdv === 4).length > 0 ? this.state.pdvs.filter(f => f.idTpPdv === 4).map((pdv) => (
                                                            <tr>
                                                                <td><input type="checkbox" className="radio-btn-graos radio-btn-pdv" idTpPdv={pdv.idTpPdv} idpdv={pdv.idpdv} /></td>
                                                                <td>{pdv.idpdv}</td>
                                                                <td>{pdv.desUnidade}</td>
                                                                <td>{pdv.desStatus}</td>
                                                                <td>{pdv.desMunicipio}</td>
                                                                <td>{pdv.desNucleoSemente}</td>
                                                                <td>{pdv.desRegional}</td>
                                                            </tr>
                                                        )) : ""}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                        <div className="row container-tabela-produtos">
                                            <div key={this.getTipoPdv(5).idTpPdv} className="row row-tabela-produtos">
                                                <label className="label-tabela-produtos" onClick={() => this.toggleTabela(this.getTipoPdv(5).idTpPdv)}>
                                                    <img src={setaBaixo}></img>{this.getTipoPdv(5).desTpPdv}
                                                </label>
                                                <table id={"tabela-" + this.getTipoPdv(5).idTpPdv} className="hidden">
                                                    <thead>
                                                        <tr>
                                                            <th>Selecionar todos <br /> <input type="checkbox" onClick={(event) => this.checkAllPontoVenda(event, this.getTipoPdv(5).idTpPdv)} /></th>
                                                            <th>ID</th>
                                                            <th>Nome Unidade</th>
                                                            <th>Status</th>
                                                            <th>Cidade</th>
                                                            <th>Lista de municípios</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {this.state.pdvs.filter(f => f.idTpPdv === 5).length > 0 ? this.state.pdvs.filter(f => f.idTpPdv === 5).map((pdv) => (
                                                            <tr>
                                                                <td><input type="checkbox" className="radio-btn-graos radio-btn-pdv" idTpPdv={pdv.idTpPdv} idpdv={pdv.idpdv} /></td>
                                                                <td>{pdv.idpdv}</td>
                                                                <td>{pdv.desUnidade}</td>
                                                                <td>{pdv.desStatus}</td>
                                                                <td>{pdv.desMunicipio}</td>
                                                                <td>{this.tratarTextoCidades(pdv.pdvCidades)}</td>
                                                            </tr>
                                                        )) : ""}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                }
                            </div>
                        </div>
                    );
                }
                else {
                    return (<h1>Você não tem acesso!</h1>);
                }
            }
            else {
                return (<KeycloakNoAuth />)
            }
        }
        return (
            <KeycloakStart />
        );
    }
}

export default IndexPontosVendas;