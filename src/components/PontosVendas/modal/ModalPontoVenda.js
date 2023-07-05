import React, { Component } from 'react';
import ReactModal from 'react-modal';
import Select from 'react-select';

import ApiService from '../../../services/ApiService';
import Util from '../../Util/Util';
import './css/ModalAtributos.css';
import 'react-responsive-modal/styles.css';

class ModalPontoVenda extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showModalPontoVenda: false,
            classificacoes: this.props.classificacoes,
            especies: [],
            processando: false,            
            camposVisiveis: {
                casaAgricultura: false,
                catiRegional: false
            },
            pontoVenda: {
                tipo: "",
                nome: "",
                status: "",
                cidades: [],
                casasAgricultura: [],
                catiRegional: "",
                centro: ""
            }
        };

        this.toggleModalPontoVenda = this.toggleModalPontoVenda.bind(this);
        this.limparFormularioPontoVenda = this.limparFormularioPontoVenda.bind(this);
        this.validarFormularioPontoVenda = this.validarFormularioPontoVenda.bind(this);
        this.salvarPontoVenda = this.salvarPontoVenda.bind(this);
        this.onChangePontoVenda = this.onChangePontoVenda.bind(this);
        this.onChangeCidade = this.onChangeCidade.bind(this);
    }

    toggleModalPontoVenda() {
        this.setState(state => ({
            showModalPontoVenda: !state.showModalPontoVenda
        }));

        if (this.state.showModalPontoVenda) {
            this.limparFormularioPontoVenda();
        }
    }

    validarFormularioPontoVenda() {
        const tipoPontoVenda = document.getElementById("tipoPontoVenda").value;
        const nomeUnidadePontoVenda = document.getElementById("nomeUnidadePontoVenda").value;
        const statusPontoVenda = document.getElementById("statusPontoVenda").value;
        const cidadePontoVenda = document.getElementById("cidadePontoVenda").value;
        const casaAgriculturaPontoVenda = document.getElementById("casaAgriculturaPontoVenda").value;
        const catiRegionalPontoVenda = document.getElementById("catiRegionalPontoVenda").value;

        if (tipoPontoVenda == 0) {
            Util.exibirMensagemErro("Selecione o tipo de ponto de venda");
            return false;
        }

        if (nomeUnidadePontoVenda == "") {
            Util.exibirMensagemErro("Digite o nome da unidade do ponto de venda");
            return false;
        }

        if (statusPontoVenda == 0) {
            Util.exibirMensagemErro("Selecione o status do ponto de venda");
            return false;
        }

        if (cidadePontoVenda == 0) {
            Util.exibirMensagemErro("Selecione ao menos 1 cidade do ponto de venda");
            return false;
        }

        if (this.state.camposVisiveis.casaAgricultura && casaAgriculturaPontoVenda == 0) {
            Util.exibirMensagemErro("Selecione ao menos 1 casa da agricultura do ponto de venda");
            return false;
        }

        if (this.state.camposVisiveis.catiRegional && catiRegionalPontoVenda == 0) {
            Util.exibirMensagemErro("Selecione a CATI regional do ponto de venda");
            return false;
        }

        return true;
    }

    limparFormularioPontoVenda() {
        document.querySelectorAll("select").forEach(function (select) { select.value = "" });
        document.querySelectorAll("input[type=text]").forEach(function (text) { text.value = "" });
    }

    async salvarPontoVenda() {
        //if (this.validarFormularioPontoVenda()) {
        //    this.setState({ processando: true });
        //
        //    const idClassificacao = document.getElementById("classificacaoNomeCientifico").value;
        //    const idEspecie = document.getElementById("especieNomeCientifico").value;
        //    const nomeCientifico = document.getElementById("nomeCientifico").value;
        //
        //    const result = await ApiService.AdicionarNomeCientifico(idClassificacao, idEspecie, nomeCientifico);
        //    if (result) {
        //        Util.exibirMensagemSucesso("Nome científico criado");
        //        this.props.buscarDadosAtributos();
        //        this.toggleModalNomeCientifico();
        //    }
        //    else {
        //        Util.exibirMensagemErro("Erro ao adicionar nome cientifico")
        //    }
        //
        //    this.setState({ processando: false });
        //}
    }

    async onChangePontoVenda() {
        console.log("Change Ponto Venda")
    }

    onChangeCidade(options, action) {
        var cidadesSelecionadas = [];
        options.forEach(function (option) {
            cidadesSelecionadas.push(option.value);
        });
        this.setState({
            pontoVenda: {
                cidades: cidadesSelecionadas
            }
        });
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
                        <font className="titulo-header">CRIAR PONTO DE VENDA</font>
                        <button onClick={this.toggleModalPontoVenda}>X</button>
                    </div>
                    <div className="modal-atributo-body">
                        <form autoComplete="off">
                            <div className="row">
                                <div className="col-6">
                                    <div className="form-group">
                                        <label htmlFor="tipoPontoVenda" className="label-form-modal">Tipo de PDV</label>
                                        <select id="tipoPontoVenda" className="form-control input-form-modal" onChange={this.onChangePontoVenda}>
                                            <option key="0" value="0">Selecione</option>                                            
                                        </select>
                                    </div>
                                </div>
                                <div className="col-6">
                                    <div className="form-group">
                                        <label htmlFor="nomeUnidadePontoVenda" className="label-form-modal">Nome Unidade</label>
                                        <input type="text" className="form-control input-form-modal" id="nomeUnidadePontoVenda" />
                                    </div>
                                </div>
                                <div className="col-6">
                                    <div className="form-group">
                                        <label htmlFor="statusPontoVenda" className="label-form-modal">Status</label>
                                        <select id="statusPontoVenda" className="form-control input-form-modal">
                                            <option key="0" value="0">Selecione</option>
                                            <option key="1" value="1">Ativo</option>
                                            <option key="2" value="2">Inativo</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="col-6">
                                    <div className="form-group">
                                        <label htmlFor="cidadePontoVenda" className="label-form-modal">Cidade</label>                                        
                                        <Select
                                            isMulti
                                            name="cidadePontoVenda"
                                            id="cidadePontoVenda"
                                            options={this.props.municipios}
                                            className="basic-multi-select"
                                            classNamePrefix="select"
                                            onChange={this.onChangeCidade}
                                            placeholder="Selecione..."
                                        />
                                    </div>
                                </div>
                                <div className={"col-6 " + (this.state.camposVisiveis.casaAgricultura ? "" : "hidden-form")}>
                                    <div className="form-group">
                                        <label htmlFor="casaAgriculturaPontoVenda" className="label-form-modal">Casas da Agricultura</label>
                                        <select id="casaAgriculturaPontoVenda" className="form-control input-form-modal">
                                            <option key="0" value="0">Selecione</option>
                                        </select>
                                    </div>
                                </div>
                                <div className={"col-6 " + (this.state.camposVisiveis.catiRegional ? "" : "hidden-form")}>
                                    <div className="form-group">
                                        <label htmlFor="catiRegionalPontoVenda" className="label-form-modal">CATI Regional</label>
                                        <select id="catiRegionalPontoVenda" className="form-control input-form-modal">
                                            <option key="0" value="0">Selecione</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-12 container-btn-salvar-atributo">
                                    <button type="button" className="btn-salvar-atributo" id="btnSalvarNomeCientifico" disabled={this.state.processando} onClick={this.salvarNomeCientifico}>SALVAR</button>
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