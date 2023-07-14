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
            produtoEditar: null,
            showModal: false,
            tiposPdv: [],
            comboPdv: [],
            produtos: [],
            comboCa: [],
            comboReg: [],
            municipios: [],
            pdvs: [],
            nomeUsuario: ""
        };

        this.novoPontoVenda = this.novoPontoVenda.bind(this);
        this.excluirProdutos = this.excluirProdutos.bind(this);
        this.editarProdutos = this.editarProdutos.bind(this);
        this.toggleTabela = this.toggleTabela.bind(this);
        this.toggleModalPontoVenda = React.createRef();
        this.carregarTodosPdvAtivos = this.carregarTodosPdvAtivos.bind(this);
        this.checkAllProduto = this.checkAllProduto.bind(this);
        this.carregarTipoPdv = this.carregarTipoPdv.bind(this);
        this.carregarCa = this.carregarCa.bind(this);
        this.carregarRegional = this.carregarRegional.bind(this);
        this.carregarMunicipios = this.carregarMunicipios.bind(this);
        this.tratarTextoCidades = this.tratarTextoCidades.bind(this);
        this.tratarTextoCasaAgricultura = this.tratarTextoCasaAgricultura.bind(this);
        this.getTipoPdv = this.getTipoPdv.bind(this);
        this.carregarDados = this.carregarDados.bind(this);
    }

    componentDidMount() {
        keycloak.init({ onLoad: 'login-required' }).then(authenticated => {
            console.log('Keycloak')
            console.log(keycloak)
            this.setState({
                keycloak: keycloak,
                authenticated: authenticated,
                keycloakToken: keycloak.token
            })

            this.carregarDados();
        });

    }

    async carregarDados() {
        await this.carregarTipoPdv();
        await this.carregarCa();
        await this.carregarRegional();
        await this.carregarMunicipios();
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
            comboCa: cas.comboCa
        });
    }

    async carregarRegional() {
        this.setState({ processando: true });
        const regionais = await RegionalService.getAllRegional(0, 100);
        console.log("carregar regional")
        console.log(regionais)
        this.setState({
            processando: false,
            comboRegional: regionais.comboRegional
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
        this.setState({ produtoEditar: null }, () => {
            this.toggleModalPontoVenda.current.toggleModalPontoVenda();
        });
    }

    async carregarTodosPdvAtivos() {
        this.setState({ processando: true });
        const pdvs = await PontoVendaService.getAllPdv();
        const municipios = this.state.municipios;
        if (pdvs.sucesso) {
            var pdvsAtivos = pdvs.pdv.filter(f => f.flgAtivo !== false);
            var pdvTratado = [];
            pdvsAtivos.forEach(function (pdv) {
                var prev = pdv;
                var cidades = [];
                prev.pdvCidades.forEach(function (cidade) {
                    var cid = {
                        idPcid: cidade.idPcid,
                        idPdv: cidade.idPdv,
                        codIbge: cidade.codIbge,
                        desCidade: municipios.filter(f => f.value === cidade.codIbge)[0].label
                    }
                    cidades.push(cid);
                });
                prev.pdvCidades = cidades;
                pdvTratado.push(prev);
            });

            console.log("PDV Tratado")
            console.log(pdvTratado)

            this.setState({
                pdvs: pdvTratado,
                processando: false
            });
            console.log("Todos Pdvs")
            console.log(pdvs)
        }
    }

    async excluirProdutos() {
        console.log("Excluir produtos")
        var selecionados = Array.from(document.getElementsByClassName("radio-btn-produto")).filter(f => f.checked);

        if (selecionados.length === 0) {
            console.log("Selecione um produto para excluir");
            return;
        }

        var sucessoExclusao = false;
        var contadorErros = 0;
        for (var i = 0; i < selecionados.length; i++) {
            var selecionado = selecionados[i];
            var produtoId = selecionado.getAttribute("produtoid");
            var produtoExcluir = this.state.produtos.filter(f => f.idprod === produtoId)[0];
            produtoExcluir.flgAtivo = false;
            console.log("Produto Id")
            console.log(produtoExcluir)
            var resultExclusao = await ApiService.AtualizarProduto(produtoExcluir);
            console.log(resultExclusao)
            if (!resultExclusao) {
                sucessoExclusao = false;
                contadorErros++;
            }
        }

        if (sucessoExclusao) {
            console.log("Produtos Excluidos com sucesso")
        }
        else {
            console.log("Houve erro ao excluir " + contadorErros.toString() + " produtos");
        }

        this.carregarTodosProdutosAtivos();
    }

    editarProdutos() {
        console.log("Editar produto")
        var checkbox = Array.from(document.getElementsByClassName("radio-btn-produto"));
        var chkSelecionados = checkbox.filter(f => f.checked);

        if (chkSelecionados.length > 1 || chkSelecionados.length === 0) {
            console.log("Selecione apenas 1 produto");
            return;
        }

        var idProduto = chkSelecionados[0].getAttribute("produtoid");
        var produto = this.state.produtos.filter(f => f.idprod === idProduto)[0];

        console.log("Produto selecionado")
        console.log(produto)

        this.setState({ produtoEditar: produto }, () => {
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

    checkAllProduto(classificacao) {
        console.log("Check All Produto: " + classificacao)
        var checks = document.getElementsByClassName("radio-btn-" + classificacao);
        for (var i = 0; i < checks.length; i++) {
            checks[i].checked = !checks[i].checked;
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
        var usuario = "Usuário";

        if (!this.state.keycloak) {
            return usuario;
        }

        if (!this.state.keycloak.userInfo) {
            await this.state.keycloak.loadUserInfo()
                .then(function (userInfo) {
                    usuario = userInfo.preferred_username;
                });

            this.setState({ nomeUsuario: usuario });
        }
        else {
            this.setState({ nomeUsuario: this.state.keycloak.userInfo.preferred_username });
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
                                        <input type="text" placeholder="Buscar pontos de venda" disabled={true} />
                                        <button className="btn-editar" disabled={this.state.processando || this.state.keycloak.hasRealmRole("Visualizador")} onClick={this.novoPontoVenda}><font>Criar Ponto de Venda</font></button>
                                        <ModalPontoVenda
                                            ref={this.toggleModalPontoVenda}
                                            tipoPdv={this.state.comboPdv}
                                            produtoEditar={this.state.produtoEditar}
                                            comboCa={this.state.comboCa}
                                            comboRegional={this.state.comboRegional}
                                            municipios={this.state.municipios}
                                            nomeUsuario={this.state.nomeUsuario}
                                        />
                                    </div>
                                </div>
                                <div className="row container-acoes">
                                    <button className="btn-editar" disabled={this.state.processando || this.state.keycloak.hasRealmRole("Visualizador")} onClick={this.editarProdutos}>Editar</button>
                                    <button className="btn-excluir" disabled={this.state.processando || this.state.keycloak.hasRealmRole("Visualizador")} onClick={this.excluirProdutos}>Excluir</button>
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
                                                            <th>Selecionar todos <br /> <input type="checkbox" onClick={() => this.checkAllProduto(this.getTipoPdv(1).idTpPdv)} /></th>
                                                            <th>ID</th>
                                                            <th>Nome Unidade</th>
                                                            <th>Regional</th>
                                                            <th>Tipo Ponto Venda</th>
                                                            <th>Casa Agricultura</th>
                                                            <th>Cidades</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {this.state.pdvs.filter(f => f.idTpPdv === 1).length > 0 ? this.state.pdvs.filter(f => f.idTpPdv === 1).map((pdv) => (
                                                            <tr>
                                                                <td><input type="checkbox" className="radio-btn-graos radio-btn-produto" id={pdv.idpdv} /></td>
                                                                <td>{pdv.idpdv}</td>
                                                                <td>{pdv.desUnidade}</td>
                                                                <td>{pdv.desRegional}</td>
                                                                <td>{pdv.desTipoPdv}</td>
                                                                <td>{this.tratarTextoCasaAgricultura(pdv.pdvCas)}</td>
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
                                                    <img src={setaBaixo}></img> {this.getTipoPdv(2).desTpPdv}
                                                </label>
                                                <table id={"tabela-" + this.getTipoPdv(2).idTpPdv} className="hidden">
                                                    <thead>
                                                        <tr>
                                                            <th>Selecionar todos <br /> <input type="checkbox" onClick={() => this.checkAllProduto(this.getTipoPdv(2).idTpPdv)} /></th>
                                                            <th>ID</th>
                                                            <th>Nome Unidade</th>
                                                            <th>Regional</th>
                                                            <th>Tipo Ponto Venda</th>
                                                            <th>Casa Agricultura</th>
                                                            <th>Cidades</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {this.state.pdvs.filter(f => f.idTpPdv === 2).length > 0 ? this.state.pdvs.filter(f => f.idTpPdv === 2).map((pdv) => (
                                                            <tr>
                                                                <td><input type="checkbox" className="radio-btn-graos radio-btn-produto" id={pdv.idpdv} /></td>
                                                                <td>{pdv.idpdv}</td>
                                                                <td>{pdv.desUnidade}</td>
                                                                <td>{pdv.desRegional}</td>
                                                                <td>{pdv.desTipoPdv}</td>
                                                                <td>{this.tratarTextoCasaAgricultura(pdv.pdvCas)}</td>
                                                                <td>{this.tratarTextoCidades(pdv.pdvCidades)}</td>
                                                            </tr>
                                                        )) : ""}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                        <div className="row container-tabela-produtos">
                                            <div key={this.getTipoPdv(3).idTpPdv} className="row row-tabela-produtos">
                                                <label className="label-tabela-produtos" onClick={() => this.toggleTabela(this.getTipoPdv(3).idTpPdv)}>
                                                    <img src={setaBaixo}></img>{this.getTipoPdv(3).desTpPdv}
                                                </label>
                                                <table id={"tabela-" + this.getTipoPdv(3).idTpPdv} className="hidden">
                                                    <thead>
                                                        <tr>
                                                            <th>Selecionar todos <br /> <input type="checkbox" onClick={() => this.checkAllProduto(this.getTipoPdv(3).idTpPdv)} /></th>
                                                            <th>ID</th>
                                                            <th>Nome Unidade</th>
                                                            <th>Regional</th>
                                                            <th>Tipo Ponto Venda</th>
                                                            <th>Casa Agricultura</th>
                                                            <th>Cidades</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {this.state.pdvs.filter(f => f.idTpPdv === 3).length > 0 ? this.state.pdvs.filter(f => f.idTpPdv === 3).map((pdv) => (
                                                            <tr>
                                                                <td><input type="checkbox" className="radio-btn-graos radio-btn-produto" id={pdv.idpdv} /></td>
                                                                <td>{pdv.idpdv}</td>
                                                                <td>{pdv.desUnidade}</td>
                                                                <td>{pdv.desRegional}</td>
                                                                <td>{pdv.desTipoPdv}</td>
                                                                <td>{this.tratarTextoCasaAgricultura(pdv.pdvCas)}</td>
                                                                <td>{this.tratarTextoCidades(pdv.pdvCidades)}</td>
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
                                                            <th>Selecionar todos <br /> <input type="checkbox" onClick={() => this.checkAllProduto(this.getTipoPdv(4).idTpPdv)} /></th>
                                                            <th>ID</th>
                                                            <th>Nome Unidade</th>
                                                            <th>Regional</th>
                                                            <th>Tipo Ponto Venda</th>
                                                            <th>Casa Agricultura</th>
                                                            <th>Cidades</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {this.state.pdvs.filter(f => f.idTpPdv === 4).length > 0 ? this.state.pdvs.filter(f => f.idTpPdv === 4).map((pdv) => (
                                                            <tr>
                                                                <td><input type="checkbox" className="radio-btn-graos radio-btn-produto" id={pdv.idpdv} /></td>
                                                                <td>{pdv.idpdv}</td>
                                                                <td>{pdv.desUnidade}</td>
                                                                <td>{pdv.desRegional}</td>
                                                                <td>{pdv.desTipoPdv}</td>
                                                                <td>{this.tratarTextoCasaAgricultura(pdv.pdvCas)}</td>
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