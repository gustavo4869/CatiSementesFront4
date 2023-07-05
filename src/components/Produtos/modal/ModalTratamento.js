import React, { Component } from 'react';
import ReactModal from 'react-modal';

import ApiService from '../../../services/ApiService';
import './css/ModalAtributos.css';
import 'react-responsive-modal/styles.css';

class ModalTratamento extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showModalTratamento: false,
            classificacoes: this.props.classificacoes,
            processando: false
        };

        this.toggleModalTratamento = this.toggleModalTratamento.bind(this);
        this.limparFormularioTratamento = this.limparFormularioTratamento.bind(this);
        this.validarFormularioTratamento = this.validarFormularioTratamento.bind(this);
        this.salvarTratamento = this.salvarTratamento.bind(this);
    }

    toggleModalTratamento() {
        this.setState(state => ({
            showModalTratamento: !state.showModalTratamento
        }));

        if (this.state.showModalTratamento) {
            this.limparFormularioTratamento();
        }
    }

    validarFormularioTratamento() {
        const idClassificacao = document.getElementById("classificacaoTratamento").value;
        const nomeTratamento = document.getElementById("nomeTratamento").value;

        if (idClassificacao == 0) {
            console.log("Selecione classificação");
            return false;
        }

        if (nomeTratamento == "") {
            console.log("digite nome tratamento");
            return false;
        }

        return true;
    }

    limparFormularioTratamento() {
        document.querySelectorAll("select").forEach(function (select) { select.value = "" });
        document.querySelectorAll("input[type=text]").forEach(function (text) { text.value = "" });
    }

    async salvarTratamento() {
        if (this.validarFormularioTratamento()) {
            this.setState({ processando: true });
            const idClassificacao = document.getElementById("classificacaoTratamento").value;
            const nomeTratamento = document.getElementById("nomeTratamento").value;
            var result = await ApiService.AdicionarTratamento(idClassificacao, nomeTratamento);
            if (result) {
                console.log("tratamento criado")
                this.limparFormularioTratamento();
                this.props.buscarDadosAtributos();
                this.toggleModalTratamento();
            }
            else {
                console.log("erro ao criar tratamento")
            }
            this.setState({ processando: false });
        }
    }

    render() {
        return (
            <div className="modal-atributo-wrapper">
                <ReactModal
                    isOpen={this.state.showModalTratamento}
                    ariaHideApp={false}
                    portalClassName="container-modal-atributo"
                >
                    <div className="modal-atributo-header">
                        <font className="titulo-header">CRIAR EMBALAGEM</font>
                        <button onClick={this.toggleModalTratamento}>X</button>
                    </div>
                    <div className="modal-atributo-body">
                        <form autoComplete="off">
                            <div className="row">
                                <div className="col-6">
                                    <div className="form-group">
                                        <label htmlFor="classificacaoTratamento" className="label-form-modal">Classificação</label>
                                        <select id="classificacaoTratamento" className="form-control input-form-modal">
                                            <option key="0" value="0">Selecione</option>
                                            {this.state.classificacoes.map((classificacao) =>
                                                <option key={classificacao.idclass} value={classificacao.idclass}>{classificacao.desClass}</option>
                                            )};
                                        </select>
                                    </div>
                                </div>
                                <div className="col-6">
                                    <div className="form-group">
                                        <label htmlFor="nomeTratamento" className="label-form-modal">Tratamento</label>
                                        <input type="text" className="form-control input-form-modal" id="nomeTratamento" />
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-12 container-btn-salvar-atributo">
                                    <button type="button" className="btn-salvar-atributo" id="btnSalvarTratamento" disabled={this.state.processando} onClick={this.salvarTratamento}>SALVAR</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </ReactModal>
            </div>
        );
    }
}

export default ModalTratamento;