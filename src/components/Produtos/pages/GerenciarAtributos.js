import React, { Component } from 'react';
import keycloak from '../../keycloak';
import axios from 'axios';

import Carregando from '../../shared/Carregando';
import KeycloakStart from '../../shared/KeycloakStart';
import KeycloakNoAuth from '../../shared/KeycloakNoAuth';
import NavMenuLogado from '../../shared/NavMenuLogado';
import MenuLateralAdministracao from '../../Administracao/MenuLateralAdministracao';
import ApiService from '../../../services/ApiService';

import ModalEspecie from '../modal/ModalEspecie';
import ModalClassificacao from '../modal/ModalClassificacao';
import ModalCategoria from '../modal/ModalCategoria';
import ModalCultivar from '../modal/ModalCultivar';
import ModalNomeCientifico from '../modal/ModalNomeCientifico';
import ModalSistemaProducao from '../modal/ModalSistemaProducao';
import ModalEmbalagem from '../modal/ModalEmbalagem';
import ModalPesoEmbalagem from '../modal/ModalPesoEmbalagem';
import ModalTratamento from '../modal/ModalTratamento';
import ModalPeneira from '../modal/ModalPeneira';
import ModalCampoProducao from '../modal/ModalCampoProducao';
import ModalTipo from '../modal/ModalTipo';
import ModalGrupo from '../modal/ModalGrupo';
import ModalIdade from '../modal/ModalIdade';
import ModalUnidade from '../modal/ModalUnidade';
import ModalViveiro from '../modal/ModalViveiro';
import ModalSafra from '../modal/ModalSafra';
import ModalLote from '../modal/ModalLote';
import ModalMaterialPropagacaoVegetativa from '../modal/ModalMaterialPropagacaoVegetativa';
import ModalSubProdutoMudas from '../modal/ModalSubProdutoMudas';

import logoAtributos from '../../images/categorizacao 1.png';
import imgBtnAdicionar from '../../images/Adicionar.png';

import '../css/GerenciarAtributos.css';

class GerenciarAtributos extends Component {
    constructor(props) {
        super(props);

        this.state = {
            processando: false,
            keycloak: null,
            authenticated: false,
            usuarios: [],
            keycloakToken: null,
            nomeUsuario: null,
            dadosAtributos: {
                classificacoes: [],
                especies: [],
                categorias: [],
                cultivos: [],
                sistemasProducao: [],
                tratamentos: [],
                peneiras: [],
                lotes: [],
                safras: [],
                tipos: [],
                idades: [],
                viveiros: [],
                unidades: [],
                materiais: [],
                grupos: [],
                subProdutos: [],
                embalagens: [],
                pesoEmbalagens: [],
                nomesCientificos: [],
                camposProducao: []
            }
        };

        this.buscarDadosAtributos = this.buscarDadosAtributos.bind(this);

        this.toggleModalClassificacao = React.createRef();
        this.toggleModalEspecie = React.createRef();
        this.toggleModalCategoria = React.createRef();
        this.toggleModalCultivar = React.createRef();
        this.toggleModalNomeCientifico = React.createRef();
        this.toggleModalSistemaProducao = React.createRef();
        this.toggleModalEmbalagem = React.createRef();
        this.toggleModalPesoEmbalagem = React.createRef();
        this.toggleModalTratamento = React.createRef();
        this.toggleModalPeneira = React.createRef();
        this.toggleModalCampoProducao = React.createRef();
        this.toggleModalTipo = React.createRef();
        this.toggleModalGrupo = React.createRef();
        this.toggleModalIdade = React.createRef();
        this.toggleModalUnidade = React.createRef();
        this.toggleModalViveiro = React.createRef();
        this.toggleModalSafra = React.createRef();
        this.toggleModalLote = React.createRef();
        this.toggleModalMaterialPropagacaoVegetativa = React.createRef();
        this.toggleModalSubProdutoMudas = React.createRef();
        this.toggleModalNomeCientifico = React.createRef();
    }

    componentDidMount() {
        keycloak.init({ onLoad: 'login-required' }).then(authenticated => {

            const getUsuario = async () => {
                let usuario = "";
                const response = await keycloak.loadUserInfo()
                    .then(function (userInfo) {
                        usuario = userInfo.preferred_username;                        
                    });
                console.log("MOUNT")
                console.log(usuario)
                this.setState({
                    keycloak: keycloak,
                    authenticated: authenticated,
                    keycloakToken: keycloak.token,
                    nomeUsuario: usuario
                });
            };            

            getUsuario();            
        });
               

        this.buscarDadosAtributos();
    }

    async buscarDadosAtributos() {
        this.setState({ processando: true });
        const classificacoes = await ApiService.ClassificacaoGetAll();
        const cultivos = await ApiService.CultivarGetAll();
        const especies = await ApiService.EspecieGetAll();
        const categorias = await ApiService.CategoriaGetAll();
        const sistemasProducao = await ApiService.SistemaProducaoGetAll();
        const tratamentos = await ApiService.TratamentoGetAll();
        const peneiras = await ApiService.PeneiraGetAll();
        const lotes = await ApiService.LoteGetAll();
        const safras = await ApiService.SafraGetAll();
        const tipos = await ApiService.TipoGetAll();
        const idades = await ApiService.IdadeGetAll();
        const viveiros = await ApiService.ViveiroGetAll();
        const unidades = await ApiService.UnidadeGetAll();
        const materiais = await ApiService.MaterialGetAll();
        const grupos = await ApiService.GrupoGetAll();
        const subProdutos = await ApiService.SubProdutoGetAll();
        const embalagens = await ApiService.EmbalagemGetAll();
        const pesoEmbalagens = await ApiService.PesoEmbalagemGetAll();
        const nomesCientificos = await ApiService.NomeCientificoGetAll();
        const camposProducao = await ApiService.CampoProducaoGetAll();

        this.setState({
            processando: false,
            dadosAtributos: {
                classificacoes: classificacoes.data.filter(f => f.desClass != "Não se aplica"),
                cultivos: cultivos.data.filter(f => f.desClv != "Não se aplica"),
                especies: especies.data.filter(f => f.desEsp != "Não se aplica"),
                categorias: categorias.data.filter(f => f.desCat != "Não se aplica"),
                sistemasProducao: sistemasProducao.data.filter(f => f.desSp != "Não se aplica"),
                tratamentos: tratamentos.data.filter(f => f.desTrat != "Não se aplica"),
                peneiras: peneiras.data.filter(f => f.desPen != "Não se aplica"),
                lotes: lotes.data.filter(f => f.desLote != "Não se aplica"),
                safras: safras.data.filter(f => f.desSafra != "Não se aplica"),
                tipos: tipos.data.filter(f => f.desTipo != "Não se aplica"),
                idades: idades.data.filter(f => f.desIdade != "Não se aplica"),
                viveiros: viveiros.data.filter(f => f.desViv != "Não se aplica"),
                unidades: unidades.data.filter(f => f.desUnd != "Não se aplica"),
                materiais: materiais.data.filter(f => f.desMat != "Não se aplica"),
                grupos: grupos.data.filter(f => f.desGrupo != "Não se aplica"),
                subProdutos: subProdutos.data.filter(f => f.desSprod != "Não se aplica"),
                embalagens: embalagens.data.filter(f => f.desEmb != "Não se aplica"),
                pesoEmbalagens: pesoEmbalagens.data.filter(f => f.desPeso != "Não se aplica"),
                nomesCientificos: nomesCientificos.data.filter(f => f.desNm != "Não se aplica"),
                camposProducao: camposProducao.data.filter(f => f.desCamp != "Não se aplica")
            }
        });
    }

    abrirModal(modal) {
        switch (modal) {
            case 'especie':
                this.toggleModalEspecie.current.toggleModalEspecie();
                break;

            case 'classificacao':
                this.toggleModalClassificacao.current.toggleModalClassificacao();
                break;

            case 'categoria':
                this.toggleModalCategoria.current.toggleModalCategoria();
                break;

            case 'cultivar':
                this.toggleModalCultivar.current.toggleModalCultivar();
                break;

            case 'nomeCientifico':
                this.toggleModalNomeCientifico.current.toggleModalNomeCientifico();
                break;

            case 'sistemaProducao':
                this.toggleModalSistemaProducao.current.toggleModalSistemaProducao();
                break;

            case 'embalagem':
                this.toggleModalEmbalagem.current.toggleModalEmbalagem();
                break;

            case 'pesoEmbalagem':
                this.toggleModalPesoEmbalagem.current.toggleModalPesoEmbalagem();
                break;

            case 'tratamento':
                this.toggleModalTratamento.current.toggleModalTratamento();
                break;

            case 'peneira':
                this.toggleModalPeneira.current.toggleModalPeneira();
                break;

            case 'campoProducao':
                this.toggleModalCampoProducao.current.toggleModalCampoProducao();
                break;

            case 'tipo':
                this.toggleModalTipo.current.toggleModalTipo();
                break;

            case 'grupo':
                this.toggleModalGrupo.current.toggleModalGrupo();
                break;

            case 'idade':
                this.toggleModalIdade.current.toggleModalIdade();
                break;

            case 'unidade':
                this.toggleModalUnidade.current.toggleModalUnidade();
                break;

            case 'viveiro':
                this.toggleModalViveiro.current.toggleModalViveiro();
                break;

            case 'safra':
                this.toggleModalSafra.current.toggleModalSafra();
                break;

            case 'lote':
                this.toggleModalLote.current.toggleModalLote();
                break;

            case 'materialPropagacaoVegetativa':
                this.toggleModalMaterialPropagacaoVegetativa.current.toggleModalMaterialPropagacaoVegetativa();
                break;

            case 'subProdutoMudas':
                this.toggleModalSubProdutoMudas.current.toggleModalSubProdutoMudas();
                break;

            default:
                break;
        }
    }

    render() {
        if (this.state.keycloak) {
            if (this.state.authenticated) {
                if (!this.state.keycloak.hasRealmRole("Comum")) {
                    return (
                        <div className="container-produto">
                            <NavMenuLogado keycloak={this.state.keycloak} />
                            <MenuLateralAdministracao menuAtivo="PRODUTOS" texto="PRODUTOS" />
                            <div className="container-produto-conteudo">
                                <div className="row container-busca-atributo">
                                    <div className="col-2 container-titulo">
                                        <img src={logoAtributos}></img>
                                        <font>GERENCIAR ATRIBUTOS DE PRODUTOS</font>
                                    </div>
                                    <div className="col-10 container-input">
                                        <input type="text" placeholder="Buscar atributos" disabled={true} />
                                    </div>
                                </div>
                                {
                                    this.state.processando ?
                                        <Carregando />
                                        :
                                        <div className="row container-atributos row-atributos mb-2">
                                            <div className="card-atributo col-3 mt-4">
                                                <ModalClassificacao
                                                    buscarDadosAtributos={this.buscarDadosAtributos}
                                                    ref={this.toggleModalClassificacao}
                                                    usuario={this.state.nomeUsuario}
                                                />
                                                <div className="card-atributo-header">
                                                    <label>Classificação</label>
                                                    <button onClick={() => this.abrirModal('classificacao')} disabled={this.state.keycloak.hasRealmRole("Visualizacao")}><img src={imgBtnAdicionar}></img></button>
                                                </div>
                                                <div className="card-atributo-body">
                                                    {this.state.dadosAtributos.classificacoes.map((classif) =>
                                                        <div
                                                            className="item-atributo"
                                                        >
                                                            <div
                                                                className="item-atributo"
                                                                key={"classificacao-" + classif.idclass}
                                                                id={"card-classificacao-" + classif.idclass}
                                                            >
                                                                <span>{classif.desClass}</span>
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                            <div className="card-atributo col-3 mt-4">
                                                <ModalCultivar
                                                    buscarDadosAtributos={this.buscarDadosAtributos}
                                                    ref={this.toggleModalCultivar}
                                                    classificacoes={this.state.dadosAtributos.classificacoes}
                                                    usuario={this.state.nomeUsuario}
                                                />
                                                <div className="card-atributo-header">
                                                    <label>Cultivar</label>
                                                    <button onClick={() => this.abrirModal('cultivar')} disabled={this.state.keycloak.hasRealmRole("Visualizacao")}><img src={imgBtnAdicionar}></img></button>
                                                </div>
                                                <div className="card-atributo-body">
                                                    {this.state.dadosAtributos.cultivos.map((cultivo) =>
                                                        <div
                                                            className="item-atributo"
                                                        >
                                                            <div
                                                                className="item-atributo"
                                                                key={"cultivo-" + cultivo.idclv}
                                                                id={"card-cultivo-" + cultivo.idclv}
                                                            >
                                                                <span>{cultivo.desClv}</span>
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                            <div className="card-atributo col-3 mt-4">
                                                <ModalEspecie
                                                    buscarDadosAtributos={this.buscarDadosAtributos}
                                                    ref={this.toggleModalEspecie}
                                                    classificacoes={this.state.dadosAtributos.classificacoes}
                                                    usuario={this.state.nomeUsuario}
                                                />
                                                <div className="card-atributo-header">
                                                    <label>Espécie</label>
                                                    <button onClick={() => this.abrirModal('especie')} disabled={this.state.keycloak.hasRealmRole("Visualizacao")}><img src={imgBtnAdicionar}></img></button>
                                                </div>
                                                <div className="card-atributo-body">
                                                    {this.state.dadosAtributos.especies.map((especie) =>
                                                        <div
                                                            className="item-atributo"
                                                        >
                                                            <div
                                                                className="item-atributo"
                                                                key={"especie-" + especie.idesp}
                                                                id={"card-especie-" + especie.idesp}
                                                            >
                                                                <span>{especie.desEsp}</span>
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                            <div className="card-atributo col-3 mt-4">
                                                <ModalCategoria
                                                    buscarDadosAtributos={this.buscarDadosAtributos}
                                                    ref={this.toggleModalCategoria}
                                                    classificacoes={this.state.dadosAtributos.classificacoes}
                                                    usuario={this.state.nomeUsuario}
                                                />
                                                <div className="card-atributo-header">
                                                    <label>Categoria</label>
                                                    <button onClick={() => this.abrirModal('categoria')} disabled={this.state.keycloak.hasRealmRole("Visualizacao")}><img src={imgBtnAdicionar}></img></button>
                                                </div>
                                                <div className="card-atributo-body">
                                                    {this.state.dadosAtributos.categorias.map((categoria) =>
                                                        <div
                                                            className="item-atributo"
                                                        >
                                                            <div
                                                                className="item-atributo"
                                                                key={"categoria-" + categoria.idcat}
                                                                id={"card-categoria-" + categoria.idcat}
                                                            >
                                                                <span>{categoria.desCat}</span>
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                            <div className="card-atributo col-3 mt-4">
                                                <ModalSistemaProducao
                                                    buscarDadosAtributos={this.buscarDadosAtributos}
                                                    ref={this.toggleModalSistemaProducao}
                                                    classificacoes={this.state.dadosAtributos.classificacoes}
                                                    usuario={this.state.nomeUsuario}
                                                />
                                                <div className="card-atributo-header">
                                                    <label>Sistema de Produção</label>
                                                    <button onClick={() => this.abrirModal('sistemaProducao')} disabled={this.state.keycloak.hasRealmRole("Visualizacao")}><img src={imgBtnAdicionar}></img></button>
                                                </div>
                                                <div className="card-atributo-body">
                                                    {this.state.dadosAtributos.sistemasProducao.map((sistemaProducao) =>
                                                        <div
                                                            className="item-atributo"
                                                        >
                                                            <div
                                                                className="item-atributo"
                                                                key={"sistemaProducao-" + sistemaProducao.idsp}
                                                                id={"card-categoria-" + sistemaProducao.idsp}
                                                            >
                                                                <span>{sistemaProducao.desSp}</span>
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                            <div className="card-atributo col-3 mt-4">
                                                <ModalTratamento
                                                    buscarDadosAtributos={this.buscarDadosAtributos}
                                                    ref={this.toggleModalTratamento}
                                                    classificacoes={this.state.dadosAtributos.classificacoes}
                                                    usuario={this.state.nomeUsuario}
                                                />
                                                <div className="card-atributo-header">
                                                    <label>Tratamento</label>
                                                    <button onClick={() => this.abrirModal('tratamento')} disabled={this.state.keycloak.hasRealmRole("Visualizacao")}><img src={imgBtnAdicionar}></img></button>
                                                </div>
                                                <div className="card-atributo-body">
                                                    {this.state.dadosAtributos.tratamentos.map((tratamento) =>
                                                        <div
                                                            className="item-atributo"
                                                        >
                                                            <div
                                                                className="item-atributo"
                                                                key={"tratamento-" + tratamento.idtrat}
                                                                id={"card-tratamento-" + tratamento.idtrat}
                                                            >
                                                                <span>{tratamento.desTrat}</span>
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                            <div className="card-atributo col-3 mt-4">
                                                <ModalPeneira
                                                    buscarDadosAtributos={this.buscarDadosAtributos}
                                                    ref={this.toggleModalPeneira}
                                                    classificacoes={this.state.dadosAtributos.classificacoes}
                                                    usuario={this.state.nomeUsuario}
                                                />
                                                <div className="card-atributo-header">
                                                    <label>Peneira</label>
                                                    <button onClick={() => this.abrirModal('peneira')} disabled={this.state.keycloak.hasRealmRole("Visualizacao")}><img src={imgBtnAdicionar}></img></button>
                                                </div>
                                                <div className="card-atributo-body">
                                                    {this.state.dadosAtributos.peneiras.map((peneira) =>
                                                        <div
                                                            className="item-atributo"
                                                        >
                                                            <div
                                                                className="item-atributo"
                                                                key={"peneira-" + peneira.idpen}
                                                                id={"card-peneira-" + peneira.idpen}
                                                            >
                                                                <span>{peneira.desPen}</span>
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                            <div className="card-atributo col-3 mt-4">
                                                <ModalLote
                                                    buscarDadosAtributos={this.buscarDadosAtributos}
                                                    ref={this.toggleModalLote}
                                                    classificacoes={this.state.dadosAtributos.classificacoes}
                                                    usuario={this.state.nomeUsuario}
                                                />
                                                <div className="card-atributo-header">
                                                    <label>Lote</label>
                                                    <button onClick={() => this.abrirModal('lote')} disabled={this.state.keycloak.hasRealmRole("Visualizacao")}><img src={imgBtnAdicionar}></img></button>
                                                </div>
                                                <div className="card-atributo-body">
                                                    {this.state.dadosAtributos.lotes.map((lote) =>
                                                        <div
                                                            className="item-atributo"
                                                        >
                                                            <div
                                                                className="item-atributo"
                                                                key={"lote-" + lote.idlote}
                                                                id={"card-lote-" + lote.idlote}
                                                            >
                                                                <span>{lote.desLote}</span>
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                            <div className="card-atributo col-3 mt-4">
                                                <ModalSafra
                                                    buscarDadosAtributos={this.buscarDadosAtributos}
                                                    ref={this.toggleModalSafra}
                                                    classificacoes={this.state.dadosAtributos.classificacoes}
                                                    usuario={this.state.nomeUsuario}
                                                />
                                                <div className="card-atributo-header">
                                                    <label>Safra</label>
                                                    <button onClick={() => this.abrirModal('safra')} disabled={this.state.keycloak.hasRealmRole("Visualizacao")}><img src={imgBtnAdicionar}></img></button>
                                                </div>
                                                <div className="card-atributo-body">
                                                    {this.state.dadosAtributos.safras.map((safra) =>
                                                        <div
                                                            className="item-atributo"
                                                        >
                                                            <div
                                                                className="item-atributo"
                                                                key={"safra-" + safra.idsafra}
                                                                id={"card-safra-" + safra.idsafra}
                                                            >
                                                                <span>{safra.desSafra}</span>
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                            <div className="card-atributo col-3 mt-4">
                                                <ModalTipo
                                                    buscarDadosAtributos={this.buscarDadosAtributos}
                                                    ref={this.toggleModalTipo}
                                                    classificacoes={this.state.dadosAtributos.classificacoes}
                                                    usuario={this.state.nomeUsuario}
                                                />
                                                <div className="card-atributo-header">
                                                    <label>Tipo</label>
                                                    <button onClick={() => this.abrirModal('tipo')} disabled={this.state.keycloak.hasRealmRole("Visualizacao")}><img src={imgBtnAdicionar}></img></button>
                                                </div>
                                                <div className="card-atributo-body">
                                                    {this.state.dadosAtributos.tipos.map((tipo) =>
                                                        <div
                                                            className="item-atributo"
                                                        >
                                                            <div
                                                                className="item-atributo"
                                                                key={"tipo-" + tipo.idtipo}
                                                                id={"card-tipo-" + tipo.idtipo}
                                                            >
                                                                <span>{tipo.desTipo}</span>
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                            <div className="card-atributo col-3 mt-4">
                                                <ModalIdade
                                                    buscarDadosAtributos={this.buscarDadosAtributos}
                                                    ref={this.toggleModalIdade}
                                                    classificacoes={this.state.dadosAtributos.classificacoes}
                                                    usuario={this.state.nomeUsuario}
                                                />
                                                <div className="card-atributo-header">
                                                    <label>Idade</label>
                                                    <button onClick={() => this.abrirModal('idade')} disabled={this.state.keycloak.hasRealmRole("Visualizacao")}><img src={imgBtnAdicionar}></img></button>
                                                </div>
                                                <div className="card-atributo-body">
                                                    {this.state.dadosAtributos.idades.map((idade) =>
                                                        <div
                                                            className="item-atributo"
                                                        >
                                                            <div
                                                                className="item-atributo"
                                                                key={"idade-" + idade.ididade}
                                                                id={"card-idade-" + idade.ididade}
                                                            >
                                                                <span>{idade.desIdade}</span>
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                            <div className="card-atributo col-3 mt-4">
                                                <ModalViveiro
                                                    buscarDadosAtributos={this.buscarDadosAtributos}
                                                    ref={this.toggleModalViveiro}
                                                    classificacoes={this.state.dadosAtributos.classificacoes}
                                                    usuario={this.state.nomeUsuario}
                                                />
                                                <div className="card-atributo-header">
                                                    <label>Viveiro</label>
                                                    <button onClick={() => this.abrirModal('viveiro')} disabled={this.state.keycloak.hasRealmRole("Visualizacao")}><img src={imgBtnAdicionar}></img></button>
                                                </div>
                                                <div className="card-atributo-body">
                                                    {this.state.dadosAtributos.viveiros.map((viveiro) =>
                                                        <div
                                                            className="item-atributo"
                                                        >
                                                            <div
                                                                className="item-atributo"
                                                                key={"viveiro-" + viveiro.idviv}
                                                                id={"card-viveiro-" + viveiro.idviv}
                                                            >
                                                                <span>{viveiro.desViv}</span>
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                            <div className="card-atributo col-3 mt-4">
                                                <ModalUnidade
                                                    buscarDadosAtributos={this.buscarDadosAtributos}
                                                    ref={this.toggleModalUnidade}
                                                    classificacoes={this.state.dadosAtributos.classificacoes}
                                                    usuario={this.state.nomeUsuario}
                                                />
                                                <div className="card-atributo-header">
                                                    <label>Unidade</label>
                                                    <button onClick={() => this.abrirModal('unidade')} disabled={this.state.keycloak.hasRealmRole("Visualizacao")}><img src={imgBtnAdicionar}></img></button>
                                                </div>
                                                <div className="card-atributo-body">
                                                    {this.state.dadosAtributos.unidades.map((unidade) =>
                                                        <div
                                                            className="item-atributo"
                                                        >
                                                            <div
                                                                className="item-atributo"
                                                                key={"unidade-" + unidade.idund}
                                                                id={"card-unidade-" + unidade.idund}
                                                            >
                                                                <span>{unidade.desUnd}</span>
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                            <div className="card-atributo col-3 mt-4">
                                                <ModalMaterialPropagacaoVegetativa
                                                    buscarDadosAtributos={this.buscarDadosAtributos}
                                                    ref={this.toggleModalMaterialPropagacaoVegetativa}
                                                    classificacoes={this.state.dadosAtributos.classificacoes}
                                                    usuario={this.state.nomeUsuario}
                                                />
                                                <div className="card-atributo-header">
                                                    <label>Material Propagação Vegetativa</label>
                                                    <button onClick={() => this.abrirModal('materialPropagacaoVegetativa')} disabled={this.state.keycloak.hasRealmRole("Visualizacao")}><img src={imgBtnAdicionar}></img></button>
                                                </div>
                                                <div className="card-atributo-body">
                                                    {this.state.dadosAtributos.materiais.map((material) =>
                                                        <div
                                                            className="item-atributo"
                                                        >
                                                            <div
                                                                className="item-atributo"
                                                                key={"material-" + material.idmat}
                                                                id={"card-material-" + material.idmat}
                                                            >
                                                                <span>{material.desMat}</span>
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                            <div className="card-atributo col-3 mt-4">
                                                <ModalGrupo
                                                    buscarDadosAtributos={this.buscarDadosAtributos}
                                                    ref={this.toggleModalGrupo}
                                                    classificacoes={this.state.dadosAtributos.classificacoes}
                                                    usuario={this.state.nomeUsuario}
                                                />
                                                <div className="card-atributo-header">
                                                    <label>Grupo</label>
                                                    <button onClick={() => this.abrirModal('grupo')} disabled={this.state.keycloak.hasRealmRole("Visualizacao")}><img src={imgBtnAdicionar}></img></button>
                                                </div>
                                                <div className="card-atributo-body">
                                                    {this.state.dadosAtributos.grupos.map((grupo) =>
                                                        <div
                                                            className="item-atributo"
                                                        >
                                                            <div
                                                                className="item-atributo"
                                                                key={"grupo-" + grupo.idgrupo}
                                                                id={"card-grupo-" + grupo.idgrupo}
                                                            >
                                                                <span>{grupo.desGrupo}</span>
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                            <div className="card-atributo col-3 mt-4">
                                                <ModalSubProdutoMudas
                                                    buscarDadosAtributos={this.buscarDadosAtributos}
                                                    ref={this.toggleModalSubProdutoMudas}
                                                    classificacoes={this.state.dadosAtributos.classificacoes.filter(f => f.desClass === "Sub-produto mudas")}
                                                    usuario={this.state.nomeUsuario}
                                                />
                                                <div className="card-atributo-header">
                                                    <label>Sub-produto Mudas</label>
                                                    <button onClick={() => this.abrirModal('subProdutoMudas')} disabled={this.state.keycloak.hasRealmRole("Visualizacao")}><img src={imgBtnAdicionar}></img></button>
                                                </div>
                                                <div className="card-atributo-body">
                                                    {this.state.dadosAtributos.subProdutos.map((subProduto) =>
                                                        <div
                                                            className="item-atributo"
                                                        >
                                                            <div
                                                                className="item-atributo"
                                                                key={"subProduto-" + subProduto.idsprod}
                                                                id={"card-subProduto-" + subProduto.idsprod}
                                                            >
                                                                <span>{subProduto.desSprod}</span>
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                            <div className="card-atributo col-3 mt-4">
                                                <ModalEmbalagem
                                                    buscarDadosAtributos={this.buscarDadosAtributos}
                                                    ref={this.toggleModalEmbalagem}
                                                    classificacoes={this.state.dadosAtributos.classificacoes}
                                                    usuario={this.state.nomeUsuario}
                                                />
                                                <div className="card-atributo-header">
                                                    <label>Embalagem</label>
                                                    <button onClick={() => this.abrirModal('embalagem')} disabled={this.state.keycloak.hasRealmRole("Visualizacao")}><img src={imgBtnAdicionar}></img></button>
                                                </div>
                                                <div className="card-atributo-body">
                                                    {this.state.dadosAtributos.embalagens.map((embalagem) =>
                                                        <div
                                                            className="item-atributo"
                                                        >
                                                            <div
                                                                className="item-atributo"
                                                                key={"emabalagem-" + embalagem.idemb}
                                                                id={"card-embalagem-" + embalagem.idemb}
                                                            >
                                                                <span>{embalagem.desEmb}</span>
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                            <div className="card-atributo col-3 mt-4">
                                                <ModalPesoEmbalagem
                                                    buscarDadosAtributos={this.buscarDadosAtributos}
                                                    ref={this.toggleModalPesoEmbalagem}
                                                    classificacoes={this.state.dadosAtributos.classificacoes}
                                                    usuario={this.state.nomeUsuario}
                                                />
                                                <div className="card-atributo-header">
                                                    <label>Peso Embalagem</label>
                                                    <button onClick={() => this.abrirModal('pesoEmbalagem')} disabled={this.state.keycloak.hasRealmRole("Visualizacao")}><img src={imgBtnAdicionar}></img></button>
                                                </div>
                                                <div className="card-atributo-body">
                                                    {this.state.dadosAtributos.pesoEmbalagens.map((peso) =>
                                                        <div
                                                            className="item-atributo"
                                                        >
                                                            <div
                                                                className="item-atributo"
                                                                key={"pesoEmbalagem-" + peso.idpeso}
                                                                id={"card-pesoEmbalagem-" + peso.idpeso}
                                                            >
                                                                <span>{peso.desPeso}</span>
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                            <div className="card-atributo col-3 mt-4">
                                                <ModalNomeCientifico
                                                    buscarDadosAtributos={this.buscarDadosAtributos}
                                                    ref={this.toggleModalNomeCientifico}
                                                    classificacoes={this.state.dadosAtributos.classificacoes}
                                                    usuario={this.state.nomeUsuario}
                                                />
                                                <div className="card-atributo-header">
                                                    <label>Nome Científico</label>
                                                    <button onClick={() => this.abrirModal('nomeCientifico')} disabled={this.state.keycloak.hasRealmRole("Visualizacao")}><img src={imgBtnAdicionar}></img></button>
                                                </div>
                                                <div className="card-atributo-body">
                                                    {this.state.dadosAtributos.nomesCientificos.map((nome) =>
                                                        <div
                                                            className="item-atributo"
                                                        >
                                                            <div
                                                                className="item-atributo"
                                                                key={"nomeCientifico-" + nome.idnm}
                                                                id={"card-nomeCientifico-" + nome.idnm}
                                                            >
                                                                <span>{nome.desNm}</span>
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                            <div className="card-atributo col-3 mt-4">
                                                <ModalCampoProducao
                                                    buscarDadosAtributos={this.buscarDadosAtributos}
                                                    ref={this.toggleModalCampoProducao}
                                                    classificacoes={this.state.dadosAtributos.classificacoes}
                                                    usuario={this.state.nomeUsuario}
                                                />
                                                <div className="card-atributo-header">
                                                    <label>Campo de Produção</label>
                                                    <button onClick={() => this.abrirModal('campoProducao')} disabled={this.state.keycloak.hasRealmRole("Visualizacao")}><img src={imgBtnAdicionar}></img></button>
                                                </div>
                                                <div className="card-atributo-body">
                                                    {this.state.dadosAtributos.camposProducao.map((campo) =>
                                                        <div
                                                            className="item-atributo"
                                                        >
                                                            <div
                                                                className="item-atributo"
                                                                key={"campoProducao-" + campo.idcamp}
                                                                id={"card-campoProducao-" + campo.idcamp}
                                                            >
                                                                <span>{campo.desCamp}</span>
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                }
                            </div>
                        </div>
                    );
                }
                else {
                    return (<h1>Você não tem acesso!</h1>)
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

export default GerenciarAtributos;