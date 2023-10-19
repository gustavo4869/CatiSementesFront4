import React, { Component } from 'react';
import ReactModal from 'react-modal';

import Util from '../../Util/Util';
import ApiService from '../../../services/ApiService';
import './css/ModalAtributos.css';
import 'react-responsive-modal/styles.css';

class ModalCategoria extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showModalCategoria: false,
            classificacoes: this.props.classificacoes,
            processando: false
        };

        this.toggleModalCategoria = this.toggleModalCategoria.bind(this);
        this.validarFormularioCategoria = this.validarFormularioCategoria.bind(this);
        this.limparFormularioCategoria = this.limparFormularioCategoria.bind(this);
        this.salvarCategoria = this.salvarCategoria.bind(this);
    }

    toggleModalCategoria() {
        console.log("toggle modal categoria")
        this.setState(state => ({
            showModalCategoria: !state.showModalCategoria
        }));

        if (this.state.showModalCategoria) {
            this.limparFormularioCategoria();
        }
    }

    limparFormularioCategoria() {
        document.querySelectorAll("input[type=text]").forEach(function (text) { text.value = "" });
    }

    validarFormularioCategoria() {
        const idClassificacao = document.getElementById("classificacaoCategoria").value;
        const siglaCategoria = document.getElementById("siglaCategoria").value;
        const nomeCategoria = document.getElementById("nomeCategoria").value;

        if (idClassificacao == 0) {
            console.log("Selecione classificação");
            return false;
        }

        if (siglaCategoria == "") {
            console.log("digite sigla")
            return false;
        }

        if (nomeCategoria == "") {
            console.log("digite nome categoria");
            return false;
        }

        return true;
    }

    async salvarCategoria() {
        if (this.validarFormularioCategoria()) {
            this.setState({ processando: true });
            const idClassificacao = document.getElementById("classificacaoCategoria").value;
            const nomeCategoria = document.getElementById("nomeCategoria").value;
            const siglaCategoria = document.getElementById("siglaCategoria").value;
            const result = await ApiService.AdicionarCategoria(idClassificacao, nomeCategoria, siglaCategoria, this.props.usuario);

            if (result) {
                Util.exibirMensagemSucesso("Categoria criada");
                this.limparFormularioCategoria();
                this.props.buscarDadosAtributos();
                this.toggleModalCategoria();
            }
            else {
                console.log("ERRO AO CRIAR CATEGORIA")
            }
            this.setState({ processando: false });
        }
    }

    render() {
        return (
            <div className="modal-atributo-wrapper">
                <ReactModal
                    isOpen={this.state.showModalCategoria}
                    ariaHideApp={false}
                    portalClassName="container-modal-atributo"
                >
                    <div className="modal-atributo-header">
                        <font className="titulo-header">{this.state.isEdit ? "EDITAR" : "CRIAR"} CATEGORIA</font>
                        <button onClick={this.toggleModalCategoria}>X</button>
                    </div>
                    <div className="modal-atributo-body">
                        <form autoComplete="off">
                            <div className="row">
                                <div className="col-6">
                                    <div className="form-group">
                                        <label htmlFor="classificacaoCategoria" className="label-form-modal">Classificação</label>
                                        <select id="classificacaoCategoria" className="form-control input-form-modal">
                                            <option key="0" value="0">Selecione</option>
                                            {this.state.classificacoes.map((classificacao) =>
                                                <option key={classificacao.idclass} value={classificacao.idclass}>{classificacao.desClass}</option>
                                            )};
                                        </select>
                                    </div>
                                </div>
                                <div className="col-6">
                                    <div className="form-group">
                                        <label htmlFor="siglaCategoria" className="label-form-modal">Sigla</label>
                                        <input type="text" className="form-control input-form-modal" id="siglaCategoria" />
                                    </div>
                                </div>
                                <div className="col-6">
                                    <div className="form-group">
                                        <label htmlFor="nomeCategoria" className="label-form-modal">Categoria</label>
                                        <input type="text" className="form-control input-form-modal" id="nomeCategoria" />
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-12 container-btn-salvar-atributo">
                                    <button type="button" className="btn-salvar-atributo" id="btnSalvarCategoria" disabled={this.state.processando} onClick={this.salvarCategoria}>SALVAR</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </ReactModal>
            </div>
        );
    }
}

export default ModalCategoria;