import React, { Component } from 'react';
import ReactModal from 'react-modal';

import ApiService from '../../../services/ApiService';
import './css/ModalAtributos.css';
import 'react-responsive-modal/styles.css';

class ModalTipo extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showModalTipo: false,
            classificacoes: this.props.classificacoes,
            processando: false
        };

        this.toggleModalTipo = this.toggleModalTipo.bind(this);
        this.limparFormularioTipo = this.limparFormularioTipo.bind(this);
        this.validarFormularioTipo = this.validarFormularioTipo.bind(this);
        this.salvarTipo = this.salvarTipo.bind(this);
    }

    toggleModalTipo() {
        this.setState(state => ({
            showModalTipo: !state.showModalTipo
        }));

        if (this.state.showModalTipo) {
            this.limparFormularioTipo();
        }
    }

    validarFormularioTipo() {
        const idClassificacao = document.getElementById("classificacaoTipo").value;
        const nomeTipo = document.getElementById("nomeTipo").value;

        if (idClassificacao == 0) {
            console.log("Selecione classificação");
            return false;
        }

        if (nomeTipo == "") {
            console.log("digite nome Tipo");
            return false;
        }

        return true;
    }

    limparFormularioTipo() {
        document.querySelectorAll("select").forEach(function (select) { select.value = "" });
        document.querySelectorAll("input[type=text]").forEach(function (text) { text.value = "" });
    }

    async salvarTipo() {
        if (this.validarFormularioTipo()) {
            this.setState({ processando: true });

            const idClassificacao = document.getElementById("classificacaoTipo").value;
            const nomeTipo = document.getElementById("nomeTipo").value;
            const result = await ApiService.AdicionarTipo(idClassificacao, nomeTipo);
            if (result) {
                this.limparFormularioTipo();
                this.props.buscarDadosAtributos();
                this.toggleModalTipo();
            }
            else {
                console.log("Erro ao salvar tipo")
            }

            this.setState({ processando: false });
        }
    }

    render() {
        return (
            <div className="modal-atributo-wrapper">
                <ReactModal
                    isOpen={this.state.showModalTipo}
                    ariaHideApp={false}
                    portalClassName="container-modal-atributo"
                >
                    <div className="modal-atributo-header">
                        <font className="titulo-header">CRIAR TIPO</font>
                        <button onClick={this.toggleModalTipo}>X</button>
                    </div>
                    <div className="modal-atributo-body">
                        <form autoComplete="off">
                            <div className="row">
                                <div className="col-6">
                                    <div className="form-group">
                                        <label htmlFor="classificacaoTipo" className="label-form-modal">Classificação</label>
                                        <select id="classificacaoTipo" className="form-control input-form-modal">
                                            <option key="0" value="0">Selecione</option>
                                            {this.state.classificacoes.map((classificacao) =>
                                                <option key={classificacao.idclass} value={classificacao.idclass}>{classificacao.desClass}</option>
                                            )};
                                        </select>
                                    </div>
                                </div>
                                <div className="col-6">
                                    <div className="form-group">
                                        <label htmlFor="nomeTipo" className="label-form-modal">Tipo</label>
                                        <input type="text" className="form-control input-form-modal" id="nomeTipo" />
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-12 container-btn-salvar-atributo">
                                    <button type="button" className="btn-salvar-atributo" id="btnSalvarTipo" disabled={this.state.processando} onClick={this.salvarTipo}>SALVAR</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </ReactModal>
            </div>
        );
    }
}

export default ModalTipo;