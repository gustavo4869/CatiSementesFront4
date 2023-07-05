import React, { Component } from 'react';
import ReactModal from 'react-modal';

import ApiService from '../../../services/ApiService';
import './css/ModalAtributos.css';
import 'react-responsive-modal/styles.css';

class ModalClassificacao extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showModalClassificacao: false,
            isEdit: false,
            processando: false
        };

        this.toggleModalClassificacao = this.toggleModalClassificacao.bind(this);
        this.limparFormularioClassificacao = this.limparFormularioClassificacao.bind(this);
        this.validarFormularioClassificacao = this.validarFormularioClassificacao.bind(this);
        this.salvarClassificacao = this.salvarClassificacao.bind(this);
    }

    toggleModalClassificacao() {
        console.log("toggle modal classificação")
        this.setState(state => ({
            showModalClassificacao: !state.showModalClassificacao
        }));

        if (!this.state.showModalClassificacao) {
            console.log("Abrir modal classificação")
        }
        else {
            this.limparFormularioClassificacao();
        }
    }


    validarFormularioClassificacao() {
        const nomeClassificacao = document.getElementById("nomeClassificacao").value;

        if (nomeClassificacao == "") {
            console.log("digite a classificacação");
            return false;
        }

        return true;
    }

    async salvarClassificacao() {
        if (this.validarFormularioClassificacao()) {
            this.setState({ processando: true });
            const classificacao = document.getElementById("nomeClassificacao").value;
            var result = await ApiService.AdicionarClassificacao(classificacao);

            if (result) {
                this.limparFormularioClassificacao();
                this.props.buscarDadosAtributos();
                this.toggleModalClassificacao();
            }
            else {
                console.log("erro add classificação")
            }
            this.setState({ processando: false });

        }
    }

    limparFormularioClassificacao() {
        document.querySelectorAll("input[type=text]").forEach(function (text) { text.value = "" });
    }

    render() {
        return (
            <div className="modal-atributo-wrapper">
                <ReactModal
                    isOpen={this.state.showModalClassificacao}
                    ariaHideApp={false}
                    portalClassName="container-modal-atributo"
                >
                    <div className="modal-atributo-header">
                        <font className="titulo-header">{ this.state.isEdit? "EDITAR" : "CRIAR" } CLASSIFICAÇÃO</font>
                        <button onClick={this.toggleModalClassificacao}>X</button>
                    </div>
                    <div className="modal-atributo-body">
                        <form autoComplete="off">
                            <div className="row">
                                <div className="col-6">
                                    <div className="form-group">
                                        <label htmlFor="idClassificacao" className="label-form-modal">ID</label>
                                        <input type="text" className="form-control input-form-modal" readOnly={true} id="idClassificacao" />
                                    </div>
                                </div>
                                <div className="col-6">
                                    <div className="form-group">
                                        <label htmlFor="nomeClassificacao" className="label-form-modal">Classificação</label>
                                        <input type="text" className="form-control input-form-modal" id="nomeClassificacao" />
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-12 container-btn-salvar-atributo">
                                    <button type="button" className="btn-salvar-atributo" onClick={this.salvarClassificacao} disabled={this.state.processando}>SALVAR</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </ReactModal>
            </div>
        );
    }
}

export default ModalClassificacao;