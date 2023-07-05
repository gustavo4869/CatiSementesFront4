import React, { Component } from 'react';
import ReactModal from 'react-modal';

import ApiService from '../../../services/ApiService';
import './css/ModalAtributos.css';
import 'react-responsive-modal/styles.css';

class ModalLote extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showModalLote: false,
            classificacoes: this.props.classificacoes,
            processando: false
        };

        this.toggleModalLote = this.toggleModalLote.bind(this);
        this.limparFormularioLote = this.limparFormularioLote.bind(this);
        this.validarFormularioLote = this.validarFormularioLote.bind(this);
        this.salvarLote = this.salvarLote.bind(this);
    }

    toggleModalLote() {
        this.setState(state => ({
            showModalLote: !state.showModalLote
        }));

        if (this.state.showModalLote) {
            this.limparFormularioLote();
        }
    }

    validarFormularioLote() {
        const idClassificacao = document.getElementById("classificacaoLote").value;
        const nomeLote = document.getElementById("nomeLote").value;

        if (idClassificacao == 0) {
            console.log("Selecione classificação");
            return false;
        }

        if (nomeLote == "") {
            console.log("digite nome Lote");
            return false;
        }

        return true;
    }

    limparFormularioLote() {
        document.querySelectorAll("select").forEach(function (select) { select.value = "" });
        document.querySelectorAll("input[type=text]").forEach(function (text) { text.value = "" });
    }

    async salvarLote() {
        if (this.validarFormularioLote()) {
            this.setState({ processando: true });

            const idClassificacao = document.getElementById("classificacaoLote").value;
            const nomeLote = document.getElementById("nomeLote").value;
            const result = await ApiService.AdicionarLote(idClassificacao, nomeLote);
            if (result) {
                console.log("Lote Adicionado")
                this.limparFormularioLote();
                this.props.buscarDadosAtributos();
                this.toggleModalLote();
            }
            else {
                console.log("Erro add lote")
            }
            this.setState({ processando: false });
        }
    }

    render() {
        return (
            <div className="modal-atributo-wrapper">
                <ReactModal
                    isOpen={this.state.showModalLote}
                    ariaHideApp={false}
                    portalClassName="container-modal-atributo"
                >
                    <div className="modal-atributo-header">
                        <font className="titulo-header">CRIAR LOTE</font>
                        <button onClick={this.toggleModalLote}>X</button>
                    </div>
                    <div className="modal-atributo-body">
                        <form autoComplete="off">
                            <div className="row">
                                <div className="col-6">
                                    <div className="form-group">
                                        <label htmlFor="classificacaoLote" className="label-form-modal">Classificação</label>
                                        <select id="classificacaoLote" className="form-control input-form-modal">
                                            <option key="0" value="0">Selecione</option>
                                            {this.state.classificacoes.map((classificacao) =>
                                                <option key={classificacao.idclass} value={classificacao.idclass}>{classificacao.desClass}</option>
                                            )};
                                        </select>
                                    </div>
                                </div>
                                <div className="col-6">
                                    <div className="form-group">
                                        <label htmlFor="nomeLote" className="label-form-modal">Lote</label>
                                        <input type="text" className="form-control input-form-modal" id="nomeLote" />
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-12 container-btn-salvar-atributo">
                                    <button type="button" className="btn-salvar-atributo" id="btnSalvarLote" disabled={this.state.processando} onClick={this.salvarLote}>SALVAR</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </ReactModal>
            </div>
        );
    }
}

export default ModalLote;