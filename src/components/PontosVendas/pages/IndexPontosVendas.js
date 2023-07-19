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
                idReg: 0,
                idTpPdv: 0,
                usuCriacao: "gustavo",
                pdvCas: [],
                pdvCidades: [],
            },
            showModal: false,
            tiposPdv: [],
            comboPdv: [],
            cas: [],
            comboCa: [],
            reg: [],
            comboReg: [],
            municipios: [],
            pdvs: [],
            comboSementes: []
        };

        this.novoPontoVenda = this.novoPontoVenda.bind(this);
        this.excluirPontoVenda = this.excluirPontoVenda.bind(this);
        this.editarPontoVenda = this.editarPontoVenda.bind(this);
        this.toggleTabela = this.toggleTabela.bind(this);
        this.toggleModalPontoVenda = React.createRef();
        this.carregarTodosPdvAtivos = this.carregarTodosPdvAtivos.bind(this);
        this.checkAllPontoVenda = this.checkAllPontoVenda.bind(this);
        this.carregarTipoPdv = this.carregarTipoPdv.bind(this);
        this.carregarCa = this.carregarCa.bind(this);
        this.carregarRegional = this.carregarRegional.bind(this);
        this.carregarMunicipios = this.carregarMunicipios.bind(this);
        this.tratarTextoCidades = this.tratarTextoCidades.bind(this);
        this.tratarTextoCasaAgricultura = this.tratarTextoCasaAgricultura.bind(this);
        this.getTipoPdv = this.getTipoPdv.bind(this);
        this.carregarDados = this.carregarDados.bind(this);
        this.onChangeBuscaPontoVenda = this.onChangeBuscaPontoVenda.bind(this);
    }

    componentDidMount() {
        keycloak.init({ onLoad: 'login-required' }).then(authenticated => {
            console.log('Keycloak')
            console.log(keycloak)
            this.setState({
                keycloak: keycloak,
                authenticated: authenticated,
                keycloakToken: keycloak.token
            });
        });
        this.carregarDados();
    }

    async carregarDados() {
        await this.carregarMunicipios();
        await this.carregarTipoPdv();
        await this.carregarCa();
        await this.carregarRegional();
        await this.carregarTodosPdvAtivos();
    }

    async carregarTipoPdv() {
        console.log("Carregar tipo Pdv")

        this.setState({ processando: true });
        var resultado = await PontoVendaService.getAllTipoPdv();
        var pdv = [];
        var comboPdv = [];
        console.log(resultado)

        if (resultado.sucesso) {
            pdv = resultado.pdv;
            comboPdv = resultado.comboPdv;
        }

        this.setState({
            processando: false,
            tiposPdv: pdv,
            comboPdv: comboPdv
        });
    }

    async carregarCa() {
        this.setState({ processando: true });
        const cas = await CasaAgriculturaService.getAllCa(0, 100);
        console.log("carregar ca")
        console.log(cas)
        this.setState({
            processando: false,
            cas: cas.ca,
            //comboCa: cas.comboCa
        });
    }

    async carregarRegional() {
        this.setState({ processando: true });
        const regionais = await RegionalService.getAllRegional(0, 100);
        console.log("carregar regional")
        console.log(regionais)
        this.setState({
            processando: false,
            reg: regionais.regional,
            //comboRegional: regionais.comboRegional
        });
    }

    async carregarMunicipios() {
        this.setState({ processando: true });
        const municipios = await ExternalService.buscarMunicipios();
        console.log("Municipios")
        console.log(municipios)
        this.setState({
            processando: false,
            municipios: municipios.dados
        });
    }

    novoPontoVenda() {
        this.setState({
            pdvEditar: {
                idPdv: 0,
                desUnidade: "",
                idReg: 0,
                idTpPdv: 0,
                usuCriacao: "gustavo",
                pdvCas: [],
                pdvCidades: [],
            }
        }, () => {
            this.toggleModalPontoVenda.current.toggleModalPontoVenda();
        });
    }

    tratarListaMunicipiosPdvs(pdvs) {
        var pdvTratado = [];
        const municipios = this.state.municipios;

        pdvs.forEach(function (pdv) {
            var prev = pdv;
            var cidades = [];
            prev.pdvCidades.forEach(function (cidade) {
                try {
                    var cid = {
                        idPcid: cidade.idPcid,
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
            prev.pdvCidades = cidades;
            pdvTratado.push(prev);
        });

        return pdvTratado;
    }

    async carregarTodosPdvAtivos() {
        console.log("Carregar Todos PDvs")
        this.setState({ processando: true });
        const pdvs = await PontoVendaService.getAllPdv();
        const municipios = this.state.municipios;
        console.log(municipios)

        if (pdvs.sucesso && municipios.length > 0) {
            var pdvsAtivos = pdvs.pdv.filter(f => f.flgAtivo !== false);
            var pdvTratado = this.tratarListaMunicipiosPdvs(pdvsAtivos);
            var comboSementes = pdvTratado.filter(f => f.idTpPdv === 2).map(pdv => (
                {
                    label: pdv.desUnidade,
                    value: pdv.idpdv
                }
            ));
            var comboRegionais = pdvTratado.filter(f => f.idTpPdv === 1).map(pdv => (
                {
                    label: pdv.desUnidade,
                    value: pdv.idpdv
                }
            ));
            var comboCas = pdvTratado.filter(f => f.idTpPdv === 4).map(pdv => (
                {
                    label: pdv.desUnidade,
                    value: pdv.idpdv
                }
            ));

            console.log("PDV Tratado")
            console.log(pdvTratado)
            console.log("Combo Sementes")
            console.log(comboSementes)
            console.log("Combo Regionais")
            console.log(comboRegionais)
            console.log("Combo Cas")
            console.log(comboCas)

            this.setState({
                pdvs: pdvTratado,
                comboSementes: comboSementes ?? [],
                comboCa: comboCas ?? [],
                comboRegional: comboRegionais ?? [],
                processando: false
            });
            console.log("Todos Pdvs")
            console.log(pdvs)
        }
    }

    async excluirPontoVenda() {
        console.log("Excluir pontos de venda")
        var selecionados = Array.from(document.getElementsByClassName("radio-btn-pdv")).filter(f => f.checked);

        if (selecionados.length === 0) {
            console.log("Selecione um ponto de venda para excluir");
            return;
        }

        var sucessoExclusao = false;
        var contadorErros = 0;
        for (var i = 0; i < selecionados.length; i++) {
            var selecionado = selecionados[i];
            var idpdv = selecionado.getAttribute("idPdv");
            var resultExclusao = await PontoVendaService.excluirPdv(idpdv);
            console.log(resultExclusao)
            if (!resultExclusao) {
                sucessoExclusao = false;
                contadorErros++;
            }
        }

        if (sucessoExclusao) {
            console.log("Ponto vendas Excluidos com sucesso")
        }
        else {
            console.log("Houve erro ao excluir " + contadorErros.toString() + " produtos");
        }

        this.carregarTodosPdvAtivos();
    }

    editarPontoVenda() {
        console.log("Editar Ponto Venda")
        var checkbox = Array.from(document.getElementsByClassName("radio-btn-pdv"));
        var chkSelecionados = checkbox.filter(f => f.checked);
        console.log(checkbox)
        console.log(chkSelecionados)
        if (chkSelecionados.length === 0) {
            Notificacao.alerta("Ops...", "Selecione pelo menos 1 ponto de venda");
            return;
        }
        if (chkSelecionados.length > 1) {
            Notificacao.alerta("Ops...", "Selecione apenas 1 ponto de venda");
            return;
        }

        var idPdv = chkSelecionados[0].getAttribute("idPdv");
        var pdv = this.state.pdvs.filter(f => f.idpdv === parseInt(idPdv))[0];
        console.log("PDV Selecionado")
        console.log(pdv)
        console.log(idPdv)
        console.log(this.state.pdvs)
        this.setState({ pdvEditar: pdv }, () => {
            this.toggleModalPontoVenda.current.toggleModalPontoVenda();
        });
    }

    toggleTabela(classificacao) {
        console.log("toggle Tabela")
        console.log(classificacao)
        const tabela = document.getElementById("tabela-" + classificacao);
        if (tabela.classList.contains("hidden")) {
            tabela.classList.remove("hidden");
        }
        else {
            tabela.classList.add("hidden");
        }
    }

    checkAllPontoVenda(tipo) {
        var checks = document.getElementsByClassName("radio-btn-pdv");
        for (var i = 0; i < checks.length; i++) {
            if (parseInt(checks[i].getAttribute('idtppdv')) === tipo) {
                checks[i].checked = !checks[i].checked;
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
        console.log("OnchangeBusca piontovenda")
        const valorDigitado = event.target.value;
        if (valorDigitado.length > 2) {
            const resultado = await PontoVendaService.getPdv(valorDigitado);
            console.log(resultado)
            if (resultado.sucesso) {
                const pdvTratado = this.tratarListaMunicipiosPdvs(resultado.pdv);
                this.setState({ pdvs: pdvTratado })
            }
        }
        else if (valorDigitado.length === 0) {
            const resultado = await PontoVendaService.getAllPdv();
            console.log(resultado)
            if (resultado.sucesso) {
                const pdvTratado = this.tratarListaMunicipiosPdvs(resultado.pdv);
                this.setState({ pdvs: pdvTratado })
            }
        }
    }

    render() {
        if (this.state.keycloak) {
            if (this.state.authenticated) {
                if (!this.state.keycloak.hasRealmRole("Comum")) {
                    return (
                        <div className={"container-produto"}>
                            <NavMenuLogado keycloak={this.state.keycloak} />
                            <MenuLateralAdministracao menuAtivo="PONTOSVENDAS" />
                            <div className="container-produto-conteudo">
                                <div className="row container-busca">
                                    <div className="col-2 container-titulo">
                                        <img src={logoProdutos}></img>
                                        <font>PONTOS DE VENDA</font>
                                    </div>
                                    <div className="col-10 container-input">
                                        <input type="text" placeholder="Buscar pontos de venda" onChange={this.onChangeBuscaPontoVenda} />
                                        <button className="btn-editar" disabled={this.state.processando || this.state.keycloak.hasRealmRole("Visualizador")} onClick={this.novoPontoVenda}><font>Criar Ponto de Venda</font></button>
                                        <ModalPontoVenda
                                            ref={this.toggleModalPontoVenda}
                                            tipoPdv={this.state.comboPdv}
                                            pdv={this.state.pdvEditar}
                                            comboCa={this.state.comboCa}
                                            comboRegional={this.state.comboRegional}
                                            comboSementes={this.state.comboSementes}
                                            municipios={this.state.municipios}
                                            nomeUsuario={this.state.nomeUsuario}
                                            carregarTodosPdvAtivos={this.carregarTodosPdvAtivos}
                                        />
                                    </div>
                                </div>
                                <div className="row container-acoes">
                                    <button className="btn-editar" disabled={this.state.processando || this.state.keycloak.hasRealmRole("Visualizador")} onClick={this.editarPontoVenda}>Editar</button>
                                    <button className="btn-excluir" disabled={this.state.processando || this.state.keycloak.hasRealmRole("Visualizador")} onClick={this.excluirPontoVenda}>Excluir</button>
                                </div>
                                {this.state.processando ?
                                    <Carregando />
                                    :
                                    <div>
                                        <div className="row container-tabela-produtos">

                                            <div key={this.getTipoPdv(1).idTpPdv} className="row row-tabela-produtos">
                                                <label className="label-tabela-produtos" onClick={() => this.toggleTabela(this.getTipoPdv(1).idTpPdv)}><img src={setaBaixo}></img>{this.getTipoPdv(1).desTpPdv}</label>
                                                <table id={"tabela-" + this.getTipoPdv(1).idTpPdv} className="hidden">
                                                    <thead>
                                                        <tr>
                                                            <th>Selecionar todos <br /> <input type="checkbox" onClick={() => this.checkAllPontoVenda(this.getTipoPdv(1).idTpPdv)} /></th>
                                                            <th>ID</th>
                                                            <th>Nome Unidade</th>
                                                            <th>Cidade</th>
                                                            <th>Lista Municípios</th>
                                                            <th>Status</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {this.state.pdvs.filter(f => f.idTpPdv === 1).length > 0 ? this.state.pdvs.filter(f => f.idTpPdv === 1).map((pdv) => (
                                                            <tr>
                                                                <td><input type="checkbox" className="radio-btn-graos radio-btn-pdv" idTpPdv={pdv.idTpPdv} idpdv={pdv.idpdv} /></td>
                                                                <td>{pdv.idpdv}</td>
                                                                <td>{pdv.desUnidade}</td>
                                                                <td></td>
                                                                <td>{this.tratarTextoCidades(pdv.pdvCidades)}</td>
                                                                <td></td>
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
                                                            <th>Selecionar todos <br /> <input type="checkbox" onClick={() => this.checkAllPontoVenda(this.getTipoPdv(3).idTpPdv)} /></th>
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
                                                                <td></td>
                                                                <td></td>
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
                                                            <th>Selecionar todos <br /> <input type="checkbox" onClick={() => this.checkAllPontoVenda(this.getTipoPdv(2).idTpPdv)} /></th>
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
                                                                <td></td>
                                                                <td></td>
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
                                            <div key={this.getTipoPdv(4).idTpPdv} className="row row-tabela-produtos">
                                                <label className="label-tabela-produtos" onClick={() => this.toggleTabela(this.getTipoPdv(4).idTpPdv)}>
                                                    <img src={setaBaixo}></img>{this.getTipoPdv(4).desTpPdv}
                                                </label>
                                                <table id={"tabela-" + this.getTipoPdv(4).idTpPdv} className="hidden">
                                                    <thead>
                                                        <tr>
                                                            <th>Selecionar todos <br /> <input type="checkbox" onClick={() => this.checkAllPontoVenda(this.getTipoPdv(4).idTpPdv)} /></th>
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
                                                                <td></td>
                                                                <td></td>
                                                                <td></td>
                                                                <td>{pdv.desRegional}</td>
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