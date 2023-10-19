import React, { Component } from 'react';
import ReactModal from 'react-modal';
import Select from 'react-select';

import PontoVendaService from '../../../services/pontoVenda/PontoVendaService';
import Util from '../../Util/Util';
import './css/ModalAtributos.css';
import 'react-responsive-modal/styles.css';
import Notificacao from '../../Util/Notificacao';

class ModalPontoVenda extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showModalPontoVenda: false,
            processando: false,
            camposVisiveis: {
                cidade: false,
                casaAgricultura: false,
                catiRegional: false,
                cidadeIsMulti: false
            },
            pontoVenda: this.props.pdv
        };

        this.toggleModalPontoVenda = this.toggleModalPontoVenda.bind(this);
        this.limparFormularioPontoVenda = this.limparFormularioPontoVenda.bind(this);
        this.validarFormularioPontoVenda = this.validarFormularioPontoVenda.bind(this);
        this.salvarPontoVenda = this.salvarPontoVenda.bind(this);
        this.onChangePontoVenda = this.onChangePontoVenda.bind(this);
        this.onChangeCidade = this.onChangeCidade.bind(this);
        this.onChangeNome = this.onChangeNome.bind(this);
        this.onChangeCatiRegional = this.onChangeCatiRegional.bind(this);
        this.onChangeCentro = this.onChangeCentro.bind(this);
        this.onChangeStatus = this.onChangeStatus.bind(this);
        this.onChangeCasaAgricultura = this.onChangeCasaAgricultura.bind(this);
        this.onChangeListaCidades = this.onChangeListaCidades.bind(this);
        this.onChangeNucleoSementes = this.onChangeNucleoSementes.bind(this);
        this.erroAoSalvar = this.erroAoSalvar.bind(this);
    }

    toggleModalPontoVenda() {
        console.log("PROPS")
        console.log(this.props)
        this.setState(state => ({
            showModalPontoVenda: !state.showModalPontoVenda,
            pontoVenda: this.props.pdv
        }));

        if (this.state.showModalPontoVenda) {
            this.limparFormularioPontoVenda();
        }
        else {
            this.visibilidadeCamposPontoVenda(this.props.pdv.idTpPdv);
        }
    }

    validarFormularioPontoVenda() {
        const tipoPontoVenda = this.state.pontoVenda.idTpPdv;
        const nomeUnidadePontoVenda = this.state.pontoVenda.desUnidade;
        const statusPontoVenda = this.state.pontoVenda.idStatus;
        const cidadePontoVenda = this.state.pontoVenda.codIbge;

        if (tipoPontoVenda === 0) {
            document.getElementById("tipoPontoVenda").focus();
            Util.exibirMensagemErro("Selecione o tipo de ponto venda");
            return false;
        }

        if (nomeUnidadePontoVenda === "") {
            document.getElementById("nomeUnidadePontoVenda").focus();
            Util.exibirMensagemErro("Digite o nome da unidade do ponto venda");
            return false;
        }

        if (statusPontoVenda === 0) {
            document.getElementById("statusPontoVenda").focus();
            Util.exibirMensagemErro("Selecione o status do ponto de venda");
            return false;
        }

        if (cidadePontoVenda === 0) {
            document.getElementById("cidadePontoVenda").focus();
            Util.exibirMensagemErro("Selecione ao menos 1 cidade do ponto venda");
            return false;
        }

        return true;
    }

    limparFormularioPontoVenda() {
        document.querySelectorAll("select").forEach(function (select) { select.value = "" });
        document.querySelectorAll("input[type=text]").forEach(function (text) { text.value = "" });
        this.visibilidadeCamposPontoVenda("");
    }

    async salvarPontoVenda() {
        console.log("Salvar Ponto Venda")
        var mensagemSucesso = "";
        var resultado = {};

        if (!this.validarFormularioPontoVenda()) {
            return;
        }

        this.setState({ processando: true });

        var state = this.state.pontoVenda;
        if (state.idPdv !== 0) {
            console.log("Editar Ponto Venda IOnternal")
            console.log(state);
            state.usuAlteracao = this.props.usuario;
            resultado = await PontoVendaService.updatePdv(state);
        }
        else {
            console.log("Criar Ponto Venda IOnternal")
            console.log(state);
            state.usuCriacao = this.props.usuario;
            resultado = await PontoVendaService.addPdv(state);
        }

        if (!resultado.sucesso) {
            this.erroAoSalvar(resultado.mensagem);
            this.setState({ processando: false });
            return;
        }
        mensagemSucesso = resultado.mensagem;
        Notificacao.sucesso("Sucesso", mensagemSucesso)
        this.limparFormularioPontoVenda();
        this.toggleModalPontoVenda();
        this.props.carregarDados();
        this.setState({ processando: false });
    }

    erroAoSalvar(mensagem) {
        Notificacao.erro("Erro", mensagem);
        this.setState({ processando: false });
    }

    visibilidadeCamposPontoVenda(codigo) {
        console.log('visibilidadeCamposPontoVenda')
        console.log(codigo)
        var camposVisiveis = {
            cidade: false,
            casaAgricultura: false,
            catiRegional: false,
            cidadeIsMulti: false
        };

        switch (codigo) {
            case 1:
                camposVisiveis.cidade = true;
                camposVisiveis.casaAgricultura = false;
                camposVisiveis.catiRegional = false;
                camposVisiveis.cidadeIsMulti = false;
                break;

            case 2:
                camposVisiveis.cidade = true;
                camposVisiveis.catiRegional = false;
                camposVisiveis.casaAgricultura = true;
                camposVisiveis.cidadeIsMulti = false;
                camposVisiveis.nucleoSementes = false;
                break;

            case 3:
                camposVisiveis.cidade = false;
                camposVisiveis.catiRegional = false;
                camposVisiveis.casaAgricultura = false;
                camposVisiveis.cidadeIsMulti = false;
                break;

            case 4:
                camposVisiveis.cidade = false;
                camposVisiveis.catiRegional = true;
                camposVisiveis.casaAgricultura = false;
                camposVisiveis.nucleoSementes = true;
                camposVisiveis.cidadeIsMulti = false;                
                break;

            case 5:
                camposVisiveis.cidade = true;
                camposVisiveis.catiRegional = false;
                camposVisiveis.casaAgricultura = false;
                camposVisiveis.cidadeIsMulti = true;
                break;

            default:
                camposVisiveis.cidade = false;
                camposVisiveis.catiRegional = false;
                camposVisiveis.casaAgricultura = false;
                camposVisiveis.cidadeIsMulti = false;
                break;
        }

        this.setState({ camposVisiveis: camposVisiveis }, () => { console.log(this.state) });
    }

    async onChangePontoVenda(options, action) {
        console.log("Change Ponto Venda")
        console.log(options)
        console.log(this.props.nomeUsuario)
        this.visibilidadeCamposPontoVenda(options.value);
        var pdv = this.state.pontoVenda;
        console.log(this.state)
        pdv.idTpPdv = options.value;
        this.setState({ pontoVenda: pdv });       
    }

    onChangeCidade(options, action) {
        console.log("Onchange Cidade")
        console.log(options)
        var pdv = this.state.pontoVenda;
        pdv.codIbge = options.value;

        this.setState({ pontoVenda: pdv });
    }

    onChangeListaCidades(options, action) {
        console.log("OnChangeListaCidades")
        console.log(options)
        var pdv = this.state.pontoVenda;
        var cidadesSelecionadas = [];
        options.forEach(function (option) {
            const cidade = {
                idPdvMun: 0,
                idPdv: 0,
                codIbge: option.value
            }
            cidadesSelecionadas.push(cidade);
        });
        pdv.pdvCidades = cidadesSelecionadas;

        this.setState({ pontoVenda: pdv });
    }

    onChangeCasaAgricultura(options, action) {
        console.log(this.state)
        var pdv = this.state.pontoVenda;
        var casSelecionadas = [];
        options.forEach(function (option) {
            const ca = {
                idPca: 0,
                idPdv: 0,
                idCa: option.value
            }
            casSelecionadas.push(ca);
        });
        pdv.pdvCas = casSelecionadas;

        this.setState({ pontoVenda: pdv });
    }

    onChangeNome(event) {
        var pdv = this.state.pontoVenda;
        pdv.desUnidade = event.target.value;
        this.setState({
            pontoVenda: pdv
        });
    }

    onChangeStatus(option) {
        var pdv = this.state.pontoVenda;        
        pdv.idStatus = option.value;
        this.setState({
            pontoVenda: pdv
        });
    }

    onChangeCatiRegional(options) {
        var pdv = this.state.pontoVenda;
        pdv.idReg = options.value;

        this.setState({ pontoVenda: pdv });
    }

    onChangeCentro(centro) {
        this.setState({
            pontoVenda: {
                centro: centro
            }
        });
    }

    onChangeNucleoSementes(option) {
        var pdv = this.state.pontoVenda;
        pdv.idNs = option.value;

        this.setState({ pontoVenda: pdv });
    }

    render() {
        return (
            <div className={"modal-atributo-wrapper" + this.state.processando ? " processando" : ""}>
                <ReactModal
                    isOpen={this.state.showModalPontoVenda}
                    ariaHideApp={false}
                    portalClassName="container-modal-atributo"
                >
                    <div className="modal-atributo-header">
                        <font className="titulo-header">{this.state.pontoVenda.idPdv !== 0 ? "EDITAR" : "CRIAR"} PONTO VENDA</font>
                        <button onClick={this.toggleModalPontoVenda}>X</button>
                    </div>
                    <div className="modal-atributo-body">
                        <form autoComplete="off">
                            <div className="row">
                                <div className="col-6">
                                    <div className="form-group">
                                        <label htmlFor="tipoPontoVenda" className="label-form-modal">Tipo de PDV</label>
                                        <Select
                                            id="tipoPontoVenda"
                                            name="tipoPontoVenda"
                                            className=""
                                            onChange={this.onChangePontoVenda}
                                            placeholder="Selecione..."
                                            options={this.props.tipoPdv}
                                            defaultValue={this.props.tipoPdv.filter(f => f.value === this.state.pontoVenda.idTpPdv) || ""}
                                        />
                                    </div>
                                </div>
                                <div className="col-6">
                                    <div className="form-group">
                                        <label htmlFor="nomeUnidadePontoVenda" className="label-form-modal">Nome Unidade</label>
                                        <input type="text" className="form-control input-form-modal" id="nomeUnidadePontoVenda" onChange={this.onChangeNome} value={this.state.pontoVenda.desUnidade} />
                                    </div>
                                </div>
                                <div className="col-6">
                                    <div className="form-group">
                                        <label htmlFor="statusPontoVenda" className="label-form-modal">Status</label>
                                        <Select
                                            name="statusPontosVenda"
                                            id="statusPontoVenda"
                                            options={this.props.comboStatus}
                                            placeholder="Selecione..."
                                            onChange={this.onChangeStatus}
                                            defaultValue={this.props.comboStatus.filter(f => f.value === this.state.pontoVenda.idStatus) || ""}
                                        />
                                    </div>
                                </div>
                                <div className={"col-6"}>
                                    <div className="form-group">
                                        <label htmlFor="cidadePontoVenda" className="label-form-modal">Cidade</label>
                                        <Select
                                            name="cidadePontoVenda"
                                            id="cidadePontoVenda"
                                            options={this.props.municipios}
                                            className="basic-multi-select"
                                            classNamePrefix="select"
                                            onChange={this.onChangeCidade}
                                            placeholder="Selecione..."        
                                            defaultValue={this.props.municipios.filter(f => f.value === this.state.pontoVenda.codIbge) || ""}
                                        />
                                    </div>
                                </div>
                                <div className={"col-12 " + (this.state.camposVisiveis.cidade ? "" : "hidden-form")}>
                                    <div className="form-group">
                                        <label htmlFor="listaCidadePontoVenda" className="label-form-modal">Lista de Municípios</label>
                                        <Select
                                            isMulti={true}
                                            name="listaCidadePontoVenda"
                                            id="listaCidadePontoVenda"
                                            options={this.props.municipios}
                                            className="basic-multi-select"
                                            classNamePrefix="select"
                                            onChange={this.onChangeListaCidades}
                                            placeholder="Selecione..."
                                            defaultValue={this.props.municipios.filter(f => this.state.pontoVenda.pdvCidades.map(m => m.codIbge).includes(f.value)) || ""}
                                        />
                                    </div>
                                </div>
                                <div className={"col-6 " + (this.state.camposVisiveis.casaAgricultura ? "" : "hidden-form")}>
                                    <div className="form-group">
                                        <label htmlFor="casaAgriculturaPontoVenda" className="label-form-modal">Casa de Agricultura</label>
                                        <Select
                                            id="casaAgriculturaPontoVenda"
                                            name="casaAgriculturaPontoVenda"
                                            isMulti={true}
                                            className=""
                                            onChange={this.onChangeCasaAgricultura}
                                            placeholder="Selecione..."
                                            options={this.props.comboCa}
                                            defaultValue={this.props.comboCa.filter(f => this.state.pontoVenda.pdvCas.map(m => m.idCa).includes(f.value)) || ""}
                                        />
                                    </div>
                                </div>
                                <div className={"col-6 " + (this.state.camposVisiveis.nucleoSementes ? "" : "hidden-form")}>
                                    <div className="form-group">
                                        <label htmlFor="nucleoSementesPontoVenda" className="label-form-modal">Núcleo de Sementes</label>
                                        <Select
                                            id="nucleoSementesPontoVenda"
                                            name="nucleoSementesPontoVenda"
                                            className=""
                                            onChange={this.onChangeNucleoSementes}
                                            placeholder="Selecione..."
                                            defaultValue={this.props.comboSementes.filter(f => this.state.pontoVenda.idNs) || ""}
                                            options={this.props.comboSementes}
                                        />
                                    </div>
                                </div>
                                <div className={"col-6 " + (this.state.camposVisiveis.catiRegional ? "" : "hidden-form")}>
                                    <div className="form-group">
                                        <label htmlFor="catiRegionalPontoVenda" className="label-form-modal">CATI Regional</label>
                                        <Select
                                            id="catiRegionalPontoVenda"
                                            name="catiRegionalPontoVenda"
                                            className=""
                                            onChange={this.onChangeCatiRegional}
                                            placeholder="Selecione..."
                                            options={this.props.comboRegional}
                                            defaultValue={this.props.comboRegional.filter(f => f.value === this.state.pontoVenda.idReg) || ""}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-12 container-btn-salvar-atributo">
                                    <button type="button" className="btn-salvar-atributo" id="btnSalvarNomeCientifico" disabled={this.state.processando} onClick={this.salvarPontoVenda}>SALVAR</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </ReactModal>
            </div>
        );
    }
}

export default ModalPontoVenda;