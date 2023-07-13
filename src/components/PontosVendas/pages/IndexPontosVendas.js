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
            municipios: []
        };

        this.novoPontoVenda = this.novoPontoVenda.bind(this);
        this.excluirProdutos = this.excluirProdutos.bind(this);
        this.editarProdutos = this.editarProdutos.bind(this);
        this.toggleTabela = this.toggleTabela.bind(this);
        this.toggleModalPontoVenda = React.createRef();
        this.carregarTodosProdutosAtivos = this.carregarTodosProdutosAtivos.bind(this);
        this.checkAllProduto = this.checkAllProduto.bind(this);
        this.carregarTipoPdv = this.carregarTipoPdv.bind(this);
        this.carregarCa = this.carregarCa.bind(this);
        this.carregarRegional = this.carregarRegional.bind(this);
        this.carregarMunicipios = this.carregarMunicipios.bind(this);
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

            this.carregarTipoPdv();
            this.carregarCa();
            this.carregarRegional();
            this.carregarMunicipios();
        });

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

    async carregarTodosProdutosAtivos() {
        const produtos = await ApiService.ProdutoGetAll();
        this.setState({ produtos: produtos.filter(f => f.flgAtivo !== false) });
        console.log("TodosProdutos")
        console.log(produtos)
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
                                        <input type="text" placeholder="Buscar produtos" disabled={true} />
                                        <button className="btn-editar" disabled={this.state.processando || this.state.keycloak.hasRealmRole("Visualizador")} onClick={this.novoPontoVenda}><font>Criar Ponto de Venda</font></button>
                                        <ModalPontoVenda
                                            ref={this.toggleModalPontoVenda}
                                            tipoPdv={this.state.comboPdv}                                            
                                            produtoEditar={this.state.produtoEditar}
                                            comboCa={this.state.comboCa}
                                            comboRegional={this.state.comboRegional}
                                            municipios={this.state.municipios}
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
                                    <div className="row container-tabela-produtos">
                                        {this.state.produtos.filter(f => f.classificacao === "Grãos").length > 0 ? this.state.classificacoes.filter(f => f.desClass === "Grãos").map((classificacao) => (
                                            <div key={classificacao.idclass} className="row row-tabela-produtos">
                                                <label className="label-tabela-produtos" onClick={() => this.toggleTabela(classificacao.idclass)}><img src={setaBaixo}></img>{classificacao.desClass}</label>
                                                <table id={"tabela-" + classificacao.idclass} className="hidden">
                                                    <thead>
                                                        <tr>
                                                            <th>Selecionar todos <br /> <input type="checkbox" onClick={() => this.checkAllProduto(classificacao.desClass)} /></th>
                                                            <th>ID</th>
                                                            <th>Descrição</th>
                                                            <th>Classificação</th>
                                                            <th>Espécie</th>
                                                            <th>Sistema de Produção</th>
                                                            <th>Tratamento</th>
                                                            <th>Tipo</th>
                                                            <th>Peso Embalagem (kg)</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {this.state.produtos.filter(f => f.classificacao === "Grãos").map((produto) => (
                                                            <tr>
                                                                <td><input type="checkbox" className="radio-btn-graos radio-btn-produto" produtoid={produto.idprod} /></td>
                                                                <td>{produto.idprod}</td>
                                                                <td>{produto.desProd}</td>
                                                                <td>{produto.classificacao}</td>
                                                                <td>{produto.especie}</td>
                                                                <td>{produto.sistemaProducao}</td>
                                                                <td>{produto.tratamento}</td>
                                                                <td>{produto.tipo}</td>
                                                                <td>{produto.pesoEmbalagem}</td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table>
                                            </div>
                                        )) : ""}
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