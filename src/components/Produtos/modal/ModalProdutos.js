import React, { Component } from 'react';
import axios from 'axios';
import ReactModal from 'react-modal';
import moment from 'moment';
import DatePicker from 'react-datepicker';
import ptBR from 'date-fns/locale/pt-BR';

import "react-datepicker/dist/react-datepicker.css";

import ApiService from '../../../services/ApiService';
import Util from '../../Util/Util'
import Notificacao from '../../Util/Notificacao';
import './css/ModalProdutos.css';
import 'react-responsive-modal/styles.css';

class ModalProdutos extends Component {
    constructor(props) {
        super(props);

        // DadosCombo: O Que será que é melhor, carregar todos de uma vez e fazer um array filter ou carregar pela necessidade
        this.state = {
            processando: false,
            showModal: false,
            isEdit: false,
            produtoEditar: this.props.produtoEditar,
            dadosCombosCarregados: false,
            classificacoes: [],
            especies: [],
            cultivos: [],
            categorias: [],
            sistemasProducao: [],
            tratamentos: [],
            peneiras: [],
            lotes: [],
            safras: [],
            tipos: [],
            viveiros: [],
            grupos: [],
            idades: [],
            materiais: [],
            subProdutos: [],
            unidades: [],
            pesoEmbalagens: [],
            embalagens: [],
            validadeAnaliseProduto: new Date(),
            validadeAnalise1Produto: new Date(),
            validadeAnalise2Produto: new Date(),
            validadeAnalise3Produto: new Date(),
            nomeCientificoSelecionado: {
                idnm: 0,
                desNm: ""
            },
            camposAtivos: {
                classificacao1: false,
                servico: false,
                subProdutoMudas: false,
                materialPropagacaoVegetativa: false,
                especie: false,
                sistemaProducao: false,
                tratamento: false,
                tipo: false,
                pesoEmbalagem: false,
                nomeCientifico: false,
                cultivar: false,
                categoria: false,
                grupo: false,
                embalagem: false,
                idade: false,
                unidade: false,
                safra: false,
                lote: false,
                viveiro: false,
                tratamento: false,
                peneira: false,
                numeroCampoProducao: false,
                numeroLote: false,
                validadeAnalise: false,
                porcentagemGerminacao: false,
                validadeAnalise1: false,
                porcentagemGerminacao1: false,
                validadeAnalise2: false,
                porcentagemGerminacao2: false,
                validadeAnalise3: false,
                porcentagemGerminacao3: false,
                
            }            
        };

        this.toggleModal = this.toggleModal.bind(this);
        this.limparFormularioProduto = this.limparFormularioProduto.bind(this);

        this.onChangeClassificacao = this.onChangeClassificacao.bind(this);
        this.onChangeEspecie = this.onChangeEspecie.bind(this);
        this.salvarProduto = this.salvarProduto.bind(this);
        this.carregarDadosCombos = this.carregarDadosCombos.bind(this);
        this.validarFormularioProduto = this.validarFormularioProduto.bind(this);
        this.onChangeValidadeAnaliseProduto = this.onChangeValidadeAnaliseProduto.bind(this);
        this.onChangeValidadeAnaliseProduto1 = this.onChangeValidadeAnaliseProduto1.bind(this);
        this.onChangeValidadeAnaliseProduto2 = this.onChangeValidadeAnaliseProduto2.bind(this);
        this.onChangeValidadeAnaliseProduto3 = this.onChangeValidadeAnaliseProduto3.bind(this);
    }

    toggleModal() {
        this.setState(state => ({
            showModal: !state.showModal,
            classificacoes: this.props.classificacoes,
            produtoEditar: this.props.produtoEditar
        }), () => {
            if (this.state.showModal) {
                if (this.props.produtoEditar) {
                    this.onChangeClassificacao(true);
                }
            }
            else {
                this.limparFormularioProduto();                
            }
        });
    }

    async carregarDadosCombos(idClassificacao) {
        const especies = await ApiService.BuscarEspecie(null, idClassificacao, null, true);
        const categorias = await ApiService.BuscarCategoria(null, idClassificacao, null, true);
        const sistemasProducao = await ApiService.BuscarSistemaProducao(null, idClassificacao, null, true);
        const tratamentos = await ApiService.BuscarTratamento(null, idClassificacao, null, true);
        const peneiras = await ApiService.BuscarPeneira(null, idClassificacao, null, true);
        const lotes = await ApiService.BuscarLote(null, idClassificacao, null, true);
        const safras = await ApiService.BuscarSafra(null, idClassificacao, null, true);
        const tipos = await ApiService.BuscarTipo(null, idClassificacao, null, true);
        const viveiros = await ApiService.BuscarViveiro(null, idClassificacao, null, true);
        const grupos = await ApiService.BuscarGrupo(null, idClassificacao, null, true);
        const idades = await ApiService.BuscarIdade(null, idClassificacao, null, true);
        const materiais = await ApiService.BuscarMaterial(null, idClassificacao, null, true);
        const subProdutos = await ApiService.BuscarSubProduto(null, idClassificacao, null, true);
        const unidades = await ApiService.BuscarUnidade(null, idClassificacao, null, true);
        const cultivos = await ApiService.CultivarGetAll();
        const pesoEmbalagens = await ApiService.BuscarPesoEmbalagem(null, idClassificacao, null, true);
        const embalagens = await ApiService.BuscarEmbalagem(null, idClassificacao, null, true);

        this.setState({
            dadosCombosCarregados: true,
            especies: especies.data,
            categorias: categorias.data,
            sistemasProducao: sistemasProducao.data,
            tratamentos: tratamentos.data,
            peneiras: peneiras.data,
            lotes: lotes.data,
            safras: safras.data,
            tipos: tipos.data,
            viveiros: viveiros.data,
            grupos: grupos.data,
            idades: idades.data,
            materiais: materiais.data,
            subProdutos: subProdutos.data,
            unidades: unidades.data,
            cultivos: cultivos.data,
            pesoEmbalagens: pesoEmbalagens.data,
            embalagens: embalagens.data
        });
    }

    onChangeValidadeAnaliseProduto(date) {
        this.setState({ validadeAnaliseProduto: date });
    }

    onChangeValidadeAnaliseProduto1(date) {
        this.setState({ validadeAnalise1Produto: date });
    }

    onChangeValidadeAnaliseProduto2(date) {
        this.setState({ validadeAnalise2Produto: date });
    }

    onChangeValidadeAnaliseProduto3(date) {
        this.setState({ validadeAnalise3Produto: date });
    }

    async onChangeClassificacao(isEdit) {
        var selectedValue = "";
        var selectedText = "";
        var options = null;
        var arrayOptions = null;

        if (isEdit) {
            selectedValue = this.props.produtoEditar.idclass;
            selectedText = this.props.produtoEditar.classificacao;
        }
        else {
            this.limparFormularioProduto(true);
            selectedValue = document.getElementById("classificacaoProduto").value;
            options = document.querySelectorAll("#classificacaoProduto option");
            arrayOptions = Array.from(options);
            selectedText = arrayOptions.filter(opt => opt.value == selectedValue)[0].text;
        }

        await this.carregarDadosCombos(selectedValue);

        switch (selectedText) {
            case "Grãos": //grãos
                this.setState({
                    camposAtivos: {
                        classificacao1: false,
                        servico: false,
                        subProdutoMudas: false,
                        materialPropagacaoVegetativa: false,
                        especie: true,
                        sistemaProducao: true,
                        tipo: true,
                        pesoEmbalagem: true,
                        nomeCientifico: false,
                        cultivar: false,
                        categoria: false,
                        grupo: false,
                        embalagem: false,
                        idade: false,
                        unidade: false,
                        safra: false,
                        viveiro: false,
                        tratamento: true,
                        peneira: false,
                        numeroCampoProducao: false,
                        numeroLote: false,
                        validadeAnalise: false,
                        porcentagemGerminacao: false,
                        validadeAnalise1: false,
                        porcentagemGerminacao1: false,
                        validadeAnalise2: false,
                        porcentagemGerminacao2: false,
                        validadeAnalise3: false,
                        porcentagemGerminacao3: false,

                    }
                });
                break;
            case "Sementes": //sementes
                this.setState({
                    camposAtivos: {
                        classificacao1: false,
                        servico: false,
                        subProdutoMudas: false,
                        materialPropagacaoVegetativa: false,
                        especie: true,
                        sistemaProducao: true,
                        tratamento: true,
                        tipo: false,
                        pesoEmbalagem: true,
                        nomeCientifico: true,
                        cultivar: true,
                        categoria: true,
                        grupo: false,
                        embalagem: false,
                        idade: false,
                        unidade: false,
                        safra: true,
                        viveiro: false,
                        peneira: true,
                        numeroCampoProducao: true,
                        numeroLote: true,
                        validadeAnalise: true,
                        porcentagemGerminacao: true,
                        validadeAnalise1: true,
                        porcentagemGerminacao1: true,
                        validadeAnalise2: true,
                        porcentagemGerminacao2: true,
                        validadeAnalise3: true,
                        porcentagemGerminacao3: true,

                    }
                });
                break;
            case "Mudas": //Mudas
                this.setState({
                    camposAtivos: {
                        classificacao1: false,
                        servico: false,
                        subProdutoMudas: false,
                        materialPropagacaoVegetativa: false,
                        especie: true,
                        sistemaProducao: true,
                        tratamento: false,
                        tipo: true,
                        pesoEmbalagem: false,
                        nomeCientifico: true,
                        cultivar: true,
                        categoria: true,
                        grupo: true,
                        embalagem: true,
                        idade: true,
                        unidade: true,
                        safra: true,
                        viveiro: true,
                        tratamento: false,
                        peneira: false,
                        numeroCampoProducao: false,
                        numeroLote: true,
                        validadeAnalise: false,
                        porcentagemGerminacao: false,
                        validadeAnalise1: false,
                        porcentagemGerminacao1: false,
                        validadeAnalise2: false,
                        porcentagemGerminacao2: false,
                        validadeAnalise3: false,
                        porcentagemGerminacao3: false,

                    }
                });
                break;
            case "Material de propagação vegetativa": //Material de propagação vegetativa
                this.setState({
                    camposAtivos: {
                        classificacao1: false,
                        servico: false,
                        subProdutoMudas: false,
                        materialPropagacaoVegetativa: true,
                        especie: false,
                        sistemaProducao: false,
                        tratamento: false,
                        tipo: false,
                        pesoEmbalagem: false,
                        nomeCientifico: false,
                        cultivar: false,
                        categoria: false,
                        grupo: false,
                        embalagem: false,
                        idade: false,
                        unidade: false,
                        safra: false,
                        lote: false,
                        viveiro: false,
                        tratamento: false,
                        peneira: false,
                        numeroCampoProducao: false,
                        numeroLote: false,
                        validadeAnalise: false,
                        porcentagemGerminacao: false,
                        validadeAnalise1: false,
                        porcentagemGerminacao1: false,
                        validadeAnalise2: false,
                        porcentagemGerminacao2: false,
                        validadeAnalise3: false,
                        porcentagemGerminacao3: false,

                    }
                });
                break;
            case "Sub-produto Mudas": //sub produto mudas
                this.setState({
                    camposAtivos: {
                        classificacao1: false,
                        servico: false,
                        subProdutoMudas: true,
                        materialPropagacaoVegetativa: false,
                        especie: false,
                        sistemaProducao: false,
                        tratamento: false,
                        tipo: false,
                        pesoEmbalagem: false,
                        nomeCientifico: false,
                        cultivar: false,
                        categoria: false,
                        grupo: false,
                        embalagem: false,
                        idade: false,
                        unidade: false,
                        safra: false,
                        lote: false,
                        viveiro: false,
                        tratamento: false,
                        peneira: false,
                        numeroCampoProducao: false,
                        numeroLote: false,
                        validadeAnalise: false,
                        porcentagemGerminacao: false,
                        validadeAnalise1: false,
                        porcentagemGerminacao1: false,
                        validadeAnalise2: false,
                        porcentagemGerminacao2: false,
                        validadeAnalise3: false,
                        porcentagemGerminacao3: false,

                    }
                });
                break;
            case "Serviços": //serviços
                this.setState({
                    camposAtivos: {
                        classificacao1: true,
                        servico: true,
                        subProdutoMudas: false,
                        materialPropagacaoVegetativa: false,
                        especie: false,
                        sistemaProducao: false,
                        tratamento: false,
                        tipo: false,
                        pesoEmbalagem: false,
                        nomeCientifico: false,
                        cultivar: false,
                        categoria: false,
                        grupo: false,
                        embalagem: false,
                        idade: false,
                        unidade: false,
                        safra: false,
                        lote: false,
                        viveiro: false,
                        tratamento: false,
                        peneira: false,
                        numeroCampoProducao: false,
                        numeroLote: false,
                        validadeAnalise: false,
                        porcentagemGerminacao: false,
                        validadeAnalise1: false,
                        porcentagemGerminacao1: false,
                        validadeAnalise2: false,
                        porcentagemGerminacao2: false,
                        validadeAnalise3: false,
                        porcentagemGerminacao3: false,

                    }
                });
                break;
            case "Outros": //outros
                this.setState({
                    camposAtivos: {
                        classificacao1: true,
                        servico: false,
                        subProdutoMudas: false,
                        materialPropagacaoVegetativa: false,
                        especie: false,
                        sistemaProducao: false,
                        tratamento: false,
                        tipo: false,
                        pesoEmbalagem: false,
                        nomeCientifico: false,
                        cultivar: false,
                        categoria: false,
                        grupo: false,
                        embalagem: false,
                        idade: false,
                        unidade: false,
                        safra: false,
                        lote: false,
                        viveiro: false,
                        tratamento: false,
                        peneira: false,
                        numeroCampoProducao: false,
                        numeroLote: false,
                        validadeAnalise: false,
                        porcentagemGerminacao: false,
                        validadeAnalise1: false,
                        porcentagemGerminacao1: false,
                        validadeAnalise2: false,
                        porcentagemGerminacao2: false,
                        validadeAnalise3: false,
                        porcentagemGerminacao3: false,

                    }
                });
                break;

            default:
                this.setState({
                    camposAtivos: {
                        classificacao1: false,
                        servico: false,
                        subProdutoMudas: false,
                        materialPropagacaoVegetativa: false,
                        especie: false,
                        sistemaProducao: false,
                        tratamento: false,
                        tipo: false,
                        pesoEmbalagem: false,
                        nomeCientifico: false,
                        cultivar: false,
                        categoria: false,
                        grupo: false,
                        embalagem: false,
                        idade: false,
                        unidade: false,
                        safra: false,
                        lote: false,
                        viveiro: false,
                        tratamento: false,
                        peneira: false,
                        numeroCampoProducao: false,
                        numeroLote: false,
                        validadeAnalise: false,
                        porcentagemGerminacao: false,
                        validadeAnalise1: false,
                        porcentagemGerminacao1: false,
                        validadeAnalise2: false,
                        porcentagemGerminacao2: false,
                        validadeAnalise3: false,
                        porcentagemGerminacao3: false,

                    }
                });
                break;
        }
    }

    async onChangeEspecie() {
        const idClassificacao = document.getElementById("classificacaoProduto").value;
        const idEspecie = document.getElementById("especieProduto").value;
        const cultivos = await ApiService.BuscarCultivar(null, idClassificacao, idEspecie, null, true);
        const nomeCientifico = await ApiService.BuscarNomeCientifico(null, idClassificacao, idEspecie, null, true);
        const nomeCientificoFilter = nomeCientifico.filter(f => !f.desNm.includes("Não se aplica"));
        const nomeCientificoTratado = nomeCientificoFilter.length > 0 ? nomeCientificoFilter[0] : { idnm: 0, desNm: "" };

        this.setState({
            cultivos: cultivos,
            nomeCientificoSelecionado: nomeCientificoTratado
        });
    }

    async salvarProduto() {
        const optPadraoEspecie = this.state.especies.filter(f => f.desEsp == "Não se aplica")[0].idesp;
        const optPadraoCultivar = this.state.cultivos.filter(f => f.desClv == "Não se aplica")[0].idclv;
        const optPadraoCategoria = this.state.categorias.filter(f => f.desCat == "Não se aplica")[0].idcat;
        const optPadraoTratamento = this.state.tratamentos.filter(f => f.desTrat == "Não se aplica")[0].idtrat;
        const optPadraoPeneira = this.state.peneiras.filter(f => f.desPen == "Não se aplica")[0].idPen;
        const optPadraoTipo = this.state.tipos.filter(f => f.desTipo == "Não se aplica")[0].idtipo;
        const optPadraoGrupo = this.state.grupos.filter(f => f.desGrupo == "Não se aplica")[0].idgrupo;
        const optPadraoLote = this.state.lotes.filter(f => f.desLote == "Não se aplica")[0].idlote;
        const optPadraoSafra = this.state.safras.filter(f => f.desSafra == "Não se aplica")[0].idsafra;
        const optPadraoViveiro = this.state.viveiros.filter(f => f.desViv == "Não se aplica")[0].idviv;
        const optPadraoUnidade = this.state.unidades.filter(f => f.desUnd == "Não se aplica")[0].idund;
        const optPadraoMaterial = this.state.materiais.filter(f => f.desMat == "Não se aplica")[0].idmat;
        const optPadraoSistemaProducao = this.state.sistemasProducao.filter(f => f.desSp == "Não se aplica")[0].idsp;
        const optPadraoEmbalagem = this.state.embalagens.filter(f => f.desEmb == "Não se aplica")[0].idemb;
        const optPadraoPeso = this.state.pesoEmbalagens.filter(f => f.desPeso == "Não se aplica")[0].idpeso;
        const optPadraoSubProduto = this.state.subProdutos.filter(f => f.desSprod == "Não se aplica")[0].idsprod;
        const optPadraoIdade = this.state.idades.filter(f => f.desIdade == "Não se aplica")[0].id;

        const classificacaoProduto = document.getElementById("classificacaoProduto");
        const especieProduto = document.getElementById("especieProduto");
        const cultivarProduto = document.getElementById("cultivarProduto");
        const categoriaProduto = document.getElementById("categoriaProduto");
        const tratamentoProduto = document.getElementById("tratamentoProduto");
        const peneiraProduto = document.getElementById("peneiraProduto");
        const tipoProduto = document.getElementById("tipoProduto");
        const grupoProduto = document.getElementById("grupoProduto");
        const loteProduto = document.getElementById("loteProduto");
        const safraProduto = document.getElementById("safraProduto");
        const viveiroProduto = document.getElementById("viveiroProduto");
        const unidadeProduto = document.getElementById("unidadeProduto");
        const materialProduto = document.getElementById("materialPropagacaoVegetativaProduto");
        const sistemaProducaoProduto = document.getElementById("sistemaProducaoProduto");
        const embalagemProduto = document.getElementById("embalagemProduto");
        const pesoProduto = document.getElementById("pesoProduto");
        const idadeProduto = document.getElementById("idadeProduto");
        const validadeAnaliseProduto = document.getElementById("validadeAnaliseProduto");
        const validadeAnalise1Produto = document.getElementById("validadeAnalise1Produto");
        const validadeAnalise2Produto = document.getElementById("validadeAnalise2Produto");
        const validadeAnalise3Produto = document.getElementById("validadeAnalise3Produto");
        const porcentagemGerminacaoProduto = document.getElementById("porcentagemGerminacaoProduto");
        const porcentagemGerminacao1Produto = document.getElementById("porcentagemGerminacao1Produto");
        const porcentagemGerminacao2Produto = document.getElementById("porcentagemGerminacao2Produto");
        const porcentagemGerminacao3Produto = document.getElementById("porcentagemGerminacao3Produto");
        const subProduto = document.getElementById("subProdutoMudasProduto");
        const nomeProduto = document.getElementById("nomeProduto");

        const idClass = classificacaoProduto && !isNaN(classificacaoProduto.value) ? parseInt(classificacaoProduto.value) : 0;
        const idEsp = this.state.camposAtivos.especie && especieProduto && !isNaN(especieProduto.value) ? parseInt(especieProduto.value) : optPadraoEspecie;
        const idClv = this.state.camposAtivos.cultivar && cultivarProduto && !isNaN(cultivarProduto.value) ? parseInt(cultivarProduto.value) : optPadraoCultivar;
        const idCat = this.state.camposAtivos.categoria && categoriaProduto && !isNaN(categoriaProduto.value) ? parseInt(categoriaProduto.value) : optPadraoCategoria;
        const idTrat = this.state.camposAtivos.tratamento && tratamentoProduto && !isNaN(tratamentoProduto.value) ? parseInt(tratamentoProduto.value) : optPadraoTratamento;
        const idPen = this.state.camposAtivos.peneira && peneiraProduto && !isNaN(peneiraProduto.value) ? parseInt(peneiraProduto.value) : optPadraoPeneira;
        const idTipo = this.state.camposAtivos.tipo && tipoProduto && !isNaN(tipoProduto.value) ? parseInt(tipoProduto.value) : optPadraoTipo;
        const idGrupo = this.state.camposAtivos.grupo && grupoProduto && !isNaN(grupoProduto.value) ? parseInt(grupoProduto.value) : optPadraoGrupo;
        const idLote = this.state.camposAtivos.numereoLote && loteProduto && !isNaN(loteProduto.value) ? parseInt(loteProduto.value) : optPadraoLote;
        const idSafra = this.state.camposAtivos.safra && safraProduto && !isNaN(safraProduto.value) ? parseInt(safraProduto.value) : optPadraoSafra;
        const idViv = this.state.camposAtivos.viveiro && viveiroProduto && !isNaN(viveiroProduto.value) ? parseInt(viveiroProduto.value) : optPadraoViveiro;
        const idUnd = this.state.camposAtivos.unidade && unidadeProduto && !isNaN(unidadeProduto.value) ? parseInt(unidadeProduto.value) : optPadraoUnidade;
        const idMat = this.state.camposAtivos.materialPropagacaoVegetativa && materialProduto && !isNaN(materialProduto.value) ? parseInt(materialProduto.value) : optPadraoMaterial;
        const idSp = this.state.camposAtivos.sistemaProducao && sistemaProducaoProduto && !isNaN(sistemaProducaoProduto.value) ? parseInt(sistemaProducaoProduto.value) : optPadraoSistemaProducao;
        const idEmb = this.state.camposAtivos.embalagem && embalagemProduto && !isNaN(embalagemProduto.value) ? parseInt(embalagemProduto.value) : optPadraoEmbalagem;
        const idPeso = this.state.camposAtivos.peso && pesoProduto && !isNaN(pesoProduto.value) ? parseInt(pesoProduto.value) : optPadraoPeso;
        const porGerminacaoProduto = this.state.camposAtivos.porcentagemGerminacao && porcentagemGerminacaoProduto && !isNaN(porcentagemGerminacaoProduto.value) ? parseInt(porcentagemGerminacaoProduto.value) : 0;
        const porGerminacao1Produto = this.state.camposAtivos.porcentagemGerminacao1 && porcentagemGerminacao1Produto && !isNaN(porcentagemGerminacao1Produto.value) ? parseInt(porcentagemGerminacao1Produto.value) : 0;
        const porGerminacao2Produto = this.state.camposAtivos.porcentagemGerminacao2 && porcentagemGerminacao2Produto && !isNaN(porcentagemGerminacao2Produto.value) ? parseInt(porcentagemGerminacao2Produto.value) : 0;
        const porGerminacao3Produto = this.state.camposAtivos.porcentagemGerminacao3 && porcentagemGerminacao3Produto && !isNaN(porcentagemGerminacao3Produto.value) ? parseInt(porcentagemGerminacao3Produto.value) : 0;
        const idSProd = this.state.camposAtivos.subProdutoMudas && subProduto && !isNaN(subProduto.value) ? parseInt(subProduto.value) : optPadraoSubProduto; // não sei o que é
        const desProd = nomeProduto.value;
        const id = this.state.camposAtivos.idade && idadeProduto && !isNaN(idadeProduto.value) ? parseInt(idadeProduto.value) : optPadraoIdade;

        var valAnaliseProduto = "";
        var valAnalise1Produto = "";
        var valAnalise2Produto = "";
        var valAnalise3Produto = "";

        if (this.state.camposAtivos.validadeAnalise) {
            valAnaliseProduto = Util.formatarDataBrParaBancoDados(validadeAnaliseProduto.value);
        }
        if (this.state.camposAtivos.validadeAnalise1) {
            valAnalise1Produto = Util.formatarDataBrParaBancoDados(validadeAnalise1Produto.value);
        }
        if (this.state.camposAtivos.validadeAnalise2) {
            valAnalise2Produto = Util.formatarDataBrParaBancoDados(validadeAnalise2Produto.value);
        }
        if (this.state.camposAtivos.validadeAnalise3) {
            valAnalise3Produto = Util.formatarDataBrParaBancoDados(validadeAnalise3Produto.value);
        }

        var produto = {
            "idprod": this.props.produtoEditar ? this.props.produtoEditar.idprod : null,
            "id": id, // Idade produto
            "idclass": idClass,
            "idesp": idEsp,
            "idclv": idClv,
            "idcat": idCat,
            "idtrat": idTrat,
            "idpen": idPen,
            "idtipo": idTipo,
            "idgrupo": idGrupo,
            "idlote": idLote,
            "idsafra": idSafra,
            "idviv": idViv,
            "idund": idUnd,
            "idmat": idMat,
            "idsprod": idSProd,
            "idsp": idSp,
            "idemb": idEmb,
            "idpeso": idPeso,
            "dtValAnalise": valAnaliseProduto,
            "dtValPriAnalise": valAnalise1Produto,
            "dtValSegAnalise": valAnalise2Produto,
            "dtValTerAnalise": valAnalise3Produto,
            "analise": porGerminacaoProduto,
            "priReanalise": porGerminacao1Produto,
            "segReanalise": porGerminacao2Produto,
            "terReanalise": porGerminacao3Produto,
            "desProd": desProd,
            "flgAtivo": true
        };

        console.log(produto)
        if (this.validarFormularioProduto(produto)) {
            this.setState({ processando: true });
            var result = null;

            if (this.props.produtoEditar) {
                result = await ApiService.AtualizarProduto(produto);
            }
            else {
                result = await ApiService.AdicionarProduto(produto);                
            }

            if (result) {
                Util.exibirMensagemSucesso("Produto salvo com sucesso");
                this.limparFormularioProduto();
                this.props.buscarProdutos();
                this.toggleModal();
            }
            else {
                Util.exibirMensagensErro(result.erros);
            }
            this.setState({ processando: false });
        }
    }

    validarFormularioProduto(produto) {
        // Todos os campos selecionáveis são obrigatórios...
        var retorno = true;

        if (produto.nomeProduto == "") {
            Util.exibirMensagemErro("Digite o nome do produto")
            retorno = false;
        }

        if (this.state.camposAtivos.subProdutoMudas && produto.idsprod == "0") {
            Util.exibirMensagemErro("Selecione o sub produto");
            retorno = false;
        }

        if (this.state.camposAtivos.materialPropagacaoVegetativa && produto.idmat == "0") {
            Util.exibirMensagemErro("Selecione o material");
            retorno = false;
        }

        if (this.state.camposAtivos.especie && produto.idesp == "0") {
            Util.exibirMensagemErro("Selecione uma espécie");
            retorno = false;
        }

        if (this.state.camposAtivos.sistemaProducao && produto.idsp == "0") {
            Util.exibirMensagemErro("Selecione o Sistema producao");
            retorno = false;
        }

        if (this.state.camposAtivos.tratamento && produto.idtrat == "0") {
            Util.exibirMensagemErro("Selecione o tratamento");
            retorno = false;
        }

        if (this.state.camposAtivos.tipo && produto.idtipo == "0") {
            Util.exibirMensagemErro("Selecione o tipo");
            retorno = false;
        }

        if (this.state.camposAtivos.embalagem && produto.idemb == "0") {
            Util.exibirMensagemErro("Selecione a embalagem")
            retorno = false;
        }

        if (this.state.camposAtivos.pesoEmbalagem && produto.idpeso == "0") {
            Util.exibirMensagemErro("Selecione a produto embalagem")
            retorno = false;
        }

        if (this.state.camposAtivos.nomeCientifico && produto.idnm == "0") {
            Util.exibirMensagemErro("Selecione o nome científico")
            retorno = false;
        }

        // falta classificacao 1
        // falta servico 
        // falta campo produção

        if (this.state.camposAtivos.cultivar && produto.idclv == "0") {
            Util.exibirMensagemErro("Selecione o cultivo");
            retorno = false;
        }

        if (this.state.camposAtivos.categoria && produto.idcat == "0") {
            Util.exibirMensagemErro("Selecione o categoria");
            retorno = false;
        }

        if (this.state.camposAtivos.grupo && produto.idgrupo == "0") {
            Util.exibirMensagemErro("Selecione o grupo");
            retorno = false;
        }

        if (this.state.camposAtivos.idade && produto.ididade == "0") {
            Util.exibirMensagemErro("Selecione a idade");
            retorno = false;
        }

        if (this.state.camposAtivos.unidade && produto.idund == "0") {
            Util.exibirMensagemErro("Selecione a unidade");
            retorno = false;
        }

        if (this.state.camposAtivos.safra && produto.idsafra == "0") {
            Util.exibirMensagemErro("Selecione a safra");
            retorno = false;
        }

        if (this.state.camposAtivos.lote && produto.idlote == "0") {
            Util.exibirMensagemErro("Selecione o lote");
            retorno = false;
        }

        if (this.state.camposAtivos.viveiro && produto.idviv == "0") {
            Util.exibirMensagemErro("Selecione o viveiro");
            retorno = false;
        }

        if (this.state.camposAtivos.tratamento && produto.idtrat == "0") {
            Util.exibirMensagemErro("Selecione o tratamento");
            retorno = false;
        }

        if (this.state.camposAtivos.peneira && produto.idpen == "0") {
            Util.exibirMensagemErro("Selecione a peneira");
            retorno = false;
        }

        return retorno;
    }

    limparFormularioProduto(onChangeClassif) {
        if (onChangeClassif) {
            document.querySelectorAll("select").forEach(function (select) {
                if (select.id != "classificacaoProduto") { select.value = 0 }
            });

            document.querySelectorAll("input[type=text]").forEach(function (text) {
                if (text.id != "nomeProduto") { text.value = "" }
            });
        }
        else {
            document.querySelectorAll("select").forEach(function (select) { select.value = 0 });
            document.querySelectorAll("input[type=text]").forEach(function (text) { text.value = "" });
        }
        
        this.setState(
            {
                camposAtivos: {
                    classificacao1: false,
                    servico: false,
                    subProdutoMudas: false,
                    materialPropagacaoVegetativa: false,
                    especie: false,
                    sistemaProducao: false,
                    tratamento: false,
                    tipo: false,
                    pesoEmbalagem: false,
                    nomeCientifico: false,
                    cultivar: false,
                    categoria: false,
                    grupo: false,
                    embalagem: false,
                    idade: false,
                    unidade: false,
                    safra: false,
                    lote: false,
                    viveiro: false,
                    tratamento: false,
                    peneira: false,
                    numeroCampoProducao: false,
                    numeroLote: false,
                    validadeAnalise: false,
                    porcentagemGerminacao: false,
                    validadeAnalise1: false,
                    porcentagemGerminacao1: false,
                    validadeAnalise2: false,
                    porcentagemGerminacao2: false,
                    validadeAnalise3: false,
                    porcentagemGerminacao3: false
                }
            });
    }

    render() {
        return (
            <div className={"modal-produto-wrapper " + this.state.processando ? "processando" : ""}>
                <ReactModal
                    isOpen={this.state.showModal}
                    ariaHideApp={false}
                    portalClassName="container-modal-produto"
                >
                    <div className="modal-produto-header">
                        <font className="titulo-header">{ this.state.produtoEditar? "EDITAR" : "CRIAR" } PRODUTO</font>
                        <button onClick={this.toggleModal}>X</button>
                    </div>
                    <div className="modal-produto-body">
                        <form autoComplete="off">
                            <div className="row">
                                <div className="col-6">
                                    <div className="form-group">
                                        <label htmlFor="nomeProduto" className="label-form-modal">Descrição</label>
                                        <input type="text" id="nomeProduto" className="form-control input-form-modal" defaultValue={this.props.produtoEditar ? this.props.produtoEditar.desProd : ""} />
                                    </div>
                                </div>
                                <div className="col-6">
                                    <div className="form-group">
                                        <label htmlFor="classificacaoProduto" className="label-form-modal">Classificação</label>
                                        <select
                                            id="classificacaoProduto"
                                            className="form-control input-form-modal"
                                            onChange={() => this.onChangeClassificacao(false)}
                                            defaultValue={this.props.produtoEditar ? this.props.produtoEditar.idclass : "0"}
                                            disabled={this.props.produtoEditar? true : false}
                                        >
                                            <option key="0" value="0">Selecione</option>
                                            {!this.state.classificacoes  ? null
                                                : this.state.classificacoes.map((classificacao) =>
                                                    <option key={classificacao.idclass} value={classificacao.idclass}>{classificacao.desClass}</option>
                                                )}
                                        </select>
                                    </div>
                                </div>
                                <div className={"col-6 " + (this.state.camposAtivos.classificacao1 ? "" :"hidden-form")}>
                                    <div className="form-group">
                                        <label htmlFor="classificacao1Produto" className="label-form-modal">Classificação 1</label>
                                        <select id="classificacao1Produto" className="form-control input-form-modal">
                                            <option key="0" value="0">Selecione</option>
                                            {!this.state.classificacao1 ? null
                                                : this.state.classificacao1.map((classificacao) =>
                                                    <option key={classificacao.idclass} value={classificacao.idclass}>{classificacao.desClass}</option>
                                                )}
                                        </select>
                                    </div>
                                </div>
                                <div className={"col-6 " + (this.state.camposAtivos.servico ? "" : "hidden-form")}>
                                    <div className="form-group">
                                        <label htmlFor="servicoProduto" className="label-form-modal">Serviço</label>
                                        <select id="servicoProduto" className="form-control input-form-modal">
                                            <option key="0" value="0">Selecione</option>
                                            {!this.state.servicos ? null
                                                : this.state.servicos.filter(f => !f.desClass.includes("Não se aplica")).map((servico) =>
                                                    <option key={servico.id} value={servico.idclass}>{servico.desClass}</option>
                                                )}
                                        </select>
                                    </div>
                                </div>
                                <div className={"col-6 " + (this.state.camposAtivos.subProdutoMudas ? "" : "hidden-form")}>
                                    <div className="form-group">
                                        <label htmlFor="subProdutoMudasProduto" className="label-form-modal">Sub-produto mudas</label>
                                        <select
                                            id="subProdutoMudasProduto"
                                            className="form-control input-form-modal"                                                
                                        >
                                            <option key="0" value="0">Selecione</option>
                                            {!this.state.subProdutos ? null
                                                : this.state.subProdutos.filter(f => f.desSProd !== "Não se aplica").map((subProduto) =>
                                                    <option
                                                        key={subProduto.idsprod}
                                                        value={subProduto.idsprod}
                                                        selected={this.props.produtoEditar && subProduto.idsprod == this.props.produtoEditar.idsprod ? true : false}
                                                    >
                                                        {subProduto.desSProd}
                                                    </option>
                                                )}
                                        </select>
                                    </div>
                                </div>
                                <div className={"col-6 " + (this.state.camposAtivos.materialPropagacaoVegetativa ? "" : "hidden-form")}>
                                    <div className="form-group">
                                        <label htmlFor="materialPropagacaoVegetativaProduto" className="label-form-modal">Material de propagação vegetativa</label>
                                        <select
                                            id="materialPropagacaoVegetativaProduto"
                                            className="form-control input-form-modal"
                                        >
                                            <option key="0" value="0">Selecione</option>
                                            {!this.state.materiais ? null
                                                : this.state.materiais.filter(f => f.desMat !== "Não se aplica").map((material) =>
                                                    <option
                                                        key={"opt-material-" + material.idmat}
                                                        value={material.idmat}
                                                        selected={this.props.produtoEditar && material.idmat == this.props.produtoEditar.idmat ? true : false}
                                                    >
                                                        {material.desMat}
                                                    </option>
                                                )}
                                        </select>
                                    </div>
                                </div>
                                <div className={"col-6 " + (this.state.camposAtivos.especie ? "" : "hidden-form")}>
                                    <div className="form-group">
                                        <label htmlFor="especieProduto" className="label-form-modal">Espécie</label>
                                        <select
                                            id="especieProduto"
                                            className="form-control input-form-modal"
                                            onChange={() => this.onChangeEspecie()}
                                        >
                                            <option key="0" value="0">Selecione</option>
                                            {!this.state.especies ? null
                                                : this.state.especies.filter(f => f.desEsp !== "Não se aplica").map((especie) =>
                                                    <option
                                                        key={especie.idesp}
                                                        value={especie.idesp}
                                                        selected={this.props.produtoEditar && especie.idesp == this.props.produtoEditar.idesp ? true : false}
                                                    >
                                                        {especie.desEsp}
                                                    </option>
                                                )}
                                        </select>
                                    </div>
                                </div>
                                <div className={"col-6 " + (this.state.camposAtivos.nomeCientifico ? "" : "hidden-form")}>
                                    <div className="form-group">
                                        <label htmlFor="nomeCientificoProduto" className="label-form-modal">Nome científico</label>
                                        <input id="nomeCientificoProduto" className="form-control input-form-modal" type="text" readOnly={true} defaultValue={this.props.produtoEditar? this.props.produtoEditar.nomeCientifico : this.state.nomeCientificoSelecionado.desNm} />
                                        <input type="hidden" id="nomeCientificoIdProduto" defaultValue={this.state.camposAtivos.nomeCientifico && this.props.produtoEditar ? this.props.produtoEditar.idnm : this.state.nomeCientificoSelecionado.idnm} />
                                    </div>
                                </div>
                                <div className={"col-6 " + (this.state.camposAtivos.cultivar ? "" : "hidden-form")}>
                                    <div className="form-group">
                                        <label htmlFor="cultivarProduto" className="label-form-modal">Cultivar</label>
                                        <select
                                            id="cultivarProduto"
                                            className="form-control input-form-modal"
                                        >
                                            <option key="0" value="0">Selecione</option>
                                            {!this.state.cultivos ? null
                                                : this.state.cultivos.filter(f => !f.desClv.includes("Não se aplica")).map((cultivar) =>
                                                    <option
                                                        key={"opt-cultivar-" + cultivar.idclv}
                                                        value={cultivar.idclv}
                                                        selected={this.props.produtoEditar && cultivar.idclv == this.props.produtoEditar.idclv ? true : false}
                                                    >
                                                        {cultivar.desClv}
                                                    </option>
                                                )}
                                        </select>
                                    </div>
                                </div>
                                <div className={"col-6 " + (this.state.camposAtivos.categoria ? "" : "hidden-form")}>
                                    <div className="form-group">
                                        <label htmlFor="categoriaProduto" className="label-form-modal">Categoria</label>
                                        <select
                                            id="categoriaProduto"
                                            className="form-control input-form-modal"
                                        >
                                            <option key="0" value="0">Selecione</option>
                                            {!this.state.categorias ? null
                                                : this.state.categorias.filter(f => f.desCat !== "Não se aplica").map((categoria) =>
                                                    <option
                                                        key={"opt-categoria-" + categoria.idcat}
                                                        value={categoria.idcat}
                                                        selected={this.props.produtoEditar && categoria.idcat == this.props.produtoEditar.idcat ? true : false}
                                                    >
                                                        {categoria.desCat}
                                                    </option>
                                                )}
                                        </select>
                                    </div>
                                </div>
                                <div className={"col-6 " + (this.state.camposAtivos.tipo ? "" : "hidden-form")}>
                                    <div className="form-group">
                                        <label htmlFor="tipoProduto" className="label-form-modal">Tipo</label>
                                        <select
                                            id="tipoProduto"
                                            className="form-control input-form-modal"
                                        >
                                            <option key="0" value="0">Selecione</option>
                                            {!this.state.tipos ? null
                                                : this.state.tipos.filter(f => f.desTipo !== "Não se aplica").map((tipo) =>
                                                    <option
                                                        key={"opt-tipo-" + tipo.idtipo}
                                                        value={tipo.idtipo}
                                                        selected={this.props.produtoEditar && tipo.idtipo == this.props.produtoEditar.idtipo ? true : false}
                                                    >
                                                        {tipo.desTipo}
                                                    </option>
                                                )}
                                        </select>
                                    </div>
                                </div>
                                <div className={"col-6 " + (this.state.camposAtivos.grupo ? "" : "hidden-form")}>
                                    <div className="form-group">
                                        <label htmlFor="grupoProduto" className="label-form-modal">Grupo</label>
                                        <select
                                            id="grupoProduto"
                                            className="form-control input-form-modal"
                                        >
                                            <option key="0" value="0">Selecione</option>
                                            {!this.state.grupos ? null
                                                : this.state.grupos.filter(f => f.desGrupo !== "Não se aplica").map((grupo) =>
                                                    <option
                                                        key={"opt-grupo-" + grupo.idgrupo}
                                                        value={grupo.idgrupo}
                                                        selected={this.props.produtoEditar && grupo.idgrupo == this.props.produtoEditar.idgrupo ? true : false}
                                                    >
                                                        {grupo.desGrupo}
                                                    </option>
                                                )}
                                        </select>
                                    </div>
                                </div>
                                <div className={"col-6 " + (this.state.camposAtivos.sistemaProducao ? "" : "hidden-form")}>
                                    <div className="form-group">
                                        <label htmlFor="sistemaProducaoProduto" className="label-form-modal">Sistema de produção</label>
                                        <select
                                            id="sistemaProducaoProduto"
                                            className="form-control input-form-modal"
                                        >
                                            <option key="0" value="0">Selecione</option>
                                            {!this.state.sistemasProducao ? null
                                                : this.state.sistemasProducao.filter(f => f.desSp !== "Não se aplica").map((sp) =>
                                                    <option
                                                        key={"opt-sistema-producao-" + sp.idsp}
                                                        value={sp.idsp}
                                                        selected={this.props.produtoEditar && sp.idsp == this.props.produtoEditar.idsp ? true : false}
                                                    >
                                                        {sp.desSp}
                                                    </option>
                                                )}
                                        </select>
                                    </div>
                                </div>
                                <div className={"col-6 " + (this.state.camposAtivos.tratamento ? "" : "hidden-form")}>
                                    <div className="form-group">
                                        <label htmlFor="tratamentoProduto" className="label-form-modal">Tratamento</label>
                                        <select
                                            id="tratamentoProduto"
                                            className="form-control input-form-modal"
                                        >
                                            <option key="0" value="0">Selecione</option>
                                             {!this.state.tratamentos ? null
                                                : this.state.tratamentos.filter(f => f.desTrat !== "Não se aplica").map((tratamento) =>
                                                    <option
                                                        key={"opt-tratamento-" + tratamento.idtrat}
                                                        value={tratamento.idtrat}
                                                        selected={this.props.produtoEditar && tratamento.idtrat == this.props.produtoEditar.idtrat ? true : false}
                                                    >
                                                        {tratamento.desTrat}
                                                    </option>
                                                )}
                                        </select>
                                    </div>
                                </div>
                                <div className={"col-6 " + (this.state.camposAtivos.peneira ? "" : "hidden-form")}>
                                    <div className="form-group">
                                        <label htmlFor="peneiraProduto" className="label-form-modal">Peneira</label>
                                        <select
                                            id="peneiraProduto"
                                            className="form-control input-form-modal"
                                        >
                                            <option key="0" value="0">Selecione</option>
                                            {!this.state.peneiras ? null
                                                : this.state.peneiras.filter(f => f.desPen !== "Não se aplica").map((peneira) =>
                                                    <option
                                                        key={"opt-peneira-" + peneira.idpen}
                                                        value={peneira.idpen}
                                                        selected={this.props.produtoEditar && peneira.idpen == this.props.produtoEditar.idpen ? true : false}
                                                    >
                                                        {peneira.desPen}
                                                    </option>
                                                )}
                                        </select>
                                    </div>
                                </div>
                                <div className={"col-6 " + (this.state.camposAtivos.embalagem ? "" : "hidden-form")}>
                                    <div className="form-group">
                                        <label htmlFor="embalagemProduto" className="label-form-modal">Embalagem</label>
                                        <select
                                            id="embalagemProduto"
                                            className="form-control input-form-modal"                                            
                                        >
                                            <option key="0" value="0">Selecione</option>
                                            {!this.state.embalagens ? null
                                                : this.state.embalagens.filter(f => f.desEmb !== "Não se aplica").map((embalagem) =>
                                                    <option
                                                        key={"opt-emabalagem-" + embalagem.idemb}
                                                        value={embalagem.idemb}
                                                        selected={this.props.produtoEditar && embalagem.idemb == this.props.produtoEditar.idemb ? true : false}
                                                    >
                                                        {embalagem.desEmb}
                                                    </option>
                                                )}
                                        </select>
                                    </div>
                                </div>
                                <div className={"col-6 " + (this.state.camposAtivos.pesoEmbalagem ? "" : "hidden-form")}>
                                    <div className="form-group">
                                        <label htmlFor="pesoEmbalagemProduto" className="label-form-modal">Peso embalagem (Kg)</label>
                                        <select
                                            id="pesoEmbalagemProduto"
                                            className="form-control input-form-modal"
                                        >
                                            <option key="0" value="0">Selecione</option>
                                            {!this.state.pesoEmbalagens ? null
                                                : this.state.pesoEmbalagens.filter(f => f.desPeso !== "Não se aplica").map((peso) =>
                                                    <option
                                                        key={"opt-peso-" + peso.idpeso}
                                                        value={peso.idpeso}
                                                        selected={this.props.produtoEditar && peso.idpeso == this.props.produtoEditar.idpeso ? true : false}
                                                    >
                                                        {peso.desPeso}                                                        
                                                    </option>
                                                )}
                                        </select>
                                    </div>
                                </div>
                                <div className={"col-6 " + (this.state.camposAtivos.numeroCampoProducao? "" : "hidden-form")}>
                                    <div className="form-group">
                                        <label htmlFor="numeroCampoProducaoProduto" className="label-form-modal">Nº Campo de produção</label>
                                        <select
                                            id="numeroCampoProducaoProduto"
                                            className="form-control input-form-modal"
                                        >
                                            <option key="0" value="0">Selecione</option>
                                            <option key="1" value="1">Campo Produção 1</option>
                                        </select>
                                    </div>
                                </div>
                                <div className={"col-6 " + (this.state.camposAtivos.numeroLote ? "" : "hidden-form")}>
                                    <div className="form-group">
                                        <label htmlFor="loteProduto" className="label-form-modal">Nº Lote</label>
                                        <select
                                            id="loteProduto"
                                            className="form-control input-form-modal"
                                        >
                                            <option key="0" value="0">Selecione</option>
                                            {!this.state.lotes ? null
                                                : this.state.lotes.filter(f => f.desLote !== "Não se aplica").map((lote) =>
                                                    <option
                                                        key={"opt-lote-" + lote.idlote}
                                                        value={lote.idlote}
                                                        selected={this.props.produtoEditar && lote.idlote == this.props.produtoEditar.idlote ? true : false}
                                                    >
                                                        {lote.desLote}
                                                    </option>
                                                )}
                                        </select>
                                    </div>
                                </div>
                                <div className={"col-6 " + (this.state.camposAtivos.unidade ? "" : "hidden-form")}>
                                    <div className="form-group">
                                        <label htmlFor="unidadeProduto" className="label-form-modal">Unidade</label>
                                        <select
                                            id="unidadeProduto"
                                            className="form-control input-form-modal"                                            
                                        >
                                            <option key="0" value="0">Selecione</option>
                                            {!this.state.unidades ? null
                                                : this.state.unidades.filter(f => f.desUnd !== "Não se aplica").map((unidade) =>
                                                    <option
                                                        key={"opt-unidade-" + unidade.idund}
                                                        value={unidade.idund}
                                                        selected={this.props.produtoEditar && unidade.idund == this.props.produtoEditar.idund ? true : false}
                                                    >
                                                        {unidade.desUnd}
                                                    </option>
                                                )}
                                        </select>
                                    </div>
                                </div>
                                <div className={"col-6 " + (this.state.camposAtivos.safra ? "" : "hidden-form")}>
                                    <div className="form-group">
                                        <label htmlFor="safraProduto" className="label-form-modal">Safra</label>
                                        <select
                                            id="safraProduto"
                                            className="form-control input-form-modal"                                            
                                        >
                                            <option key="0" value="0">Selecione</option>
                                            {!this.state.safras ? null
                                                : this.state.safras.filter(f => f.desSafra !== "Não se aplica").map((safra) =>
                                                    <option
                                                        key={"opt-safra-" + safra.idsafra}
                                                        value={safra.idsafra}
                                                        selected={this.props.produtoEditar && safra.idsafra == this.props.produtoEditar.idsafra ? true : false}
                                                    >
                                                        {safra.desSafra}
                                                    </option>
                                                )}
                                        </select>
                                    </div>
                                </div>
                                <div className={"col-6 " + (this.state.camposAtivos.viveiro ? "" : "hidden-form")}>
                                    <div className="form-group">
                                        <label htmlFor="viveiroProduto" className="label-form-modal">Viveiro</label>
                                        <select
                                            id="viveiroProduto"
                                            className="form-control input-form-modal"                                            
                                        >
                                            <option key="0" value="0">Selecione</option>
                                            {!this.state.viveiros ? null
                                                : this.state.viveiros.filter(f => f.desViv !== "Não se aplica").map((viveiro) =>
                                                    <option
                                                        key={"opt-viveiro-" + viveiro.idviv}
                                                        value={viveiro.idviv}
                                                        selected={this.props.produtoEditar && viveiro.idviv == this.props.produtoEditar.idviv ? true : false}
                                                    >
                                                        {viveiro.desViv}
                                                    </option>
                                                )}
                                        </select>
                                    </div>
                                </div>
                                <div className={"col-6 " + (this.state.camposAtivos.idade ? "" : "hidden-form")}>
                                    <div className="form-group">
                                        <label htmlFor="idadeProduto" className="label-form-modal">Idade</label>
                                        <select
                                            id="idadeProduto"
                                            className="form-control input-form-modal"                                            
                                        >
                                            <option key="0" value="0">Selecione</option>
                                            {!this.state.idades ? null
                                                : this.state.idades.filter(f => f.desIdade !== "Não se aplica").map((idade) =>
                                                    <option
                                                        key={"opt-idade-" + idade.id}
                                                        value={idade.id}
                                                        selected={this.props.produtoEditar && idade.id == this.props.produtoEditar.id ? true : false}
                                                    >
                                                        {idade.desIdade}
                                                    </option>
                                                )}
                                        </select>
                                    </div>
                                </div>
                                <div className={"col-6 " + (this.state.camposAtivos.validadeAnalise ? "" : "hidden-form")}>
                                    <div className="form-group">
                                        <label htmlFor="validadeAnaliseProduto" className="label-form-modal">Validade análise</label>
                                        <DatePicker
                                            id="validadeAnaliseProduto"
                                            showIcon
                                            onChange={this.onChangeValidadeAnaliseProduto}
                                            selected={this.state.validadeAnaliseProduto}
                                            name="validadeAnaliseProduto"
                                            dateFormat="dd/MM/yyyy"
                                            locale={ptBR}
                                            className="form-control"
                                        ></DatePicker>
                                    </div>
                                </div>
                                <div className={"col-6 " + (this.state.camposAtivos.porcentagemGerminacao ? "" : "hidden-form")}>
                                    <div className="form-group">
                                        <label htmlFor="porcentagemGerminacaoProduto" className="label-form-modal">Porcentagem germinação</label>
                                        <input id="porcentagemGerminacaoProduto" className="form-control input-form-modal" type="text" />
                                    </div>
                                </div>
                                <div className={"col-6 " + (this.state.camposAtivos.validadeAnalise1 ? "" : "hidden-form")}>
                                    <div className="form-group">
                                        <label htmlFor="validadeAnalise1Produto" className="label-form-modal">Validade análise 1</label>
                                        <DatePicker
                                            id="validadeAnalise1Produto"
                                            showIcon
                                            onChange={this.onChangeValidadeAnaliseProduto1}
                                            selected={this.state.validadeAnalise1Produto}
                                            name="validadeAnaliseProduto"
                                            dateFormat="dd/MM/yyyy"
                                            locale={ptBR}
                                            className="form-control"
                                        ></DatePicker>
                                    </div>
                                </div>
                                <div className={"col-6 " + (this.state.camposAtivos.porcentagemGerminacao1 ? "" : "hidden-form")}>
                                    <div className="form-group">
                                        <label htmlFor="porcentagem1GerminacaoProduto" className="label-form-modal">Porcentagem germinação 1</label>
                                        <input id="porcentagem1GerminacaoProduto" className="form-control input-form-modal" type="text" />
                                    </div>
                                </div>
                                <div className={"col-6 " + (this.state.camposAtivos.validadeAnalise2 ? "" : "hidden-form")}>
                                    <div className="form-group">
                                        <label htmlFor="validadeAnalise2Produto" className="label-form-modal">Validade análise 2</label>
                                        <DatePicker
                                            id="validadeAnalise2Produto"
                                            showIcon
                                            onChange={this.onChangeValidadeAnaliseProduto2}
                                            selected={this.state.validadeAnalise2Produto}
                                            name="validadeAnaliseProduto"
                                            dateFormat="dd/MM/yyyy"
                                            locale={ptBR}
                                            className="form-control"
                                        ></DatePicker>
                                    </div>
                                </div>
                                <div className={"col-6 " + (this.state.camposAtivos.porcentagemGerminacao2 ? "" : "hidden-form")}>
                                    <div className="form-group">
                                        <label htmlFor="porcentagem2GerminacaoProduto" className="label-form-modal">Porcentagem germinação 2</label>
                                        <input id="porcentagem2GerminacaoProduto" className="form-control input-form-modal" type="text" />
                                    </div>
                                </div>
                                <div className={"col-6 " + (this.state.camposAtivos.validadeAnalise3 ? "" : "hidden-form")}>
                                    <div className="form-group">
                                        <label htmlFor="validadeAnalise3Produto" className="label-form-modal">Validade análise 3</label>
                                        <DatePicker
                                            id="validadeAnalise3Produto"
                                            showIcon
                                            onChange={this.onChangeValidadeAnaliseProduto3}
                                            selected={this.state.validadeAnalise3Produto}
                                            name="validadeAnaliseProduto"
                                            dateFormat="dd/MM/yyyy"
                                            locale={ptBR}
                                            className="form-control"
                                        ></DatePicker>
                                    </div>
                                </div>
                                <div className={"col-6 " + (this.state.camposAtivos.porcentagemGerminacao3 ? "" : "hidden-form")}>
                                    <div className="form-group">
                                        <label htmlFor="porcentagemGerminacao3Produto" className="label-form-modal">Porcentagem germinação 3</label>
                                        <input id="porcentagemGerminacao3Produto" className="form-control input-form-modal" type="text" />
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-12 container-btn-salvar-produto">
                                    <button className="btn-salvar-produto" type="button" onClick={() => this.salvarProduto() }>SALVAR</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </ReactModal>
            </div>
        );
    }
}

export default ModalProdutos;