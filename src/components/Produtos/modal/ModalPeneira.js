import React, { Component } from 'react';
import ReactModal from 'react-modal';

import Util from '../../Util/Util';
import ApiService from '../../../services/ApiService';
import './css/ModalAtributos.css';
import 'react-responsive-modal/styles.css';

class ModalPeneira extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showModalPeneira: false,
            classificacoes: props.classificacoes,
            processando: false
        };

        this.toggleModalPeneira = this.toggleModalPeneira.bind(this);
        this.limparFormularioPeneira = this.limparFormularioPeneira.bind(this);
        this.validarFormularioPeneira = this.validarFormularioPeneira.bind(this);
        this.salvarPeneira = this.salvarPeneira.bind(this);
    }

    toggleModalPeneira() {
        this.setState(state => ({
            showModalPeneira: !state.showModalPeneira
        }));

        if (this.state.showModalPeneira) {
            this.limparFormularioPeneira();
        }
    }

    validarFormularioPeneira() {
        const idClassificacao = document.getElementById("classificacaoPeneira").value;
        const nomePeneira = document.getElementById("nomePeneira").value;

        if (idClassificacao == 0) {
            console.log("Selecione classificação");
            return false;
        }

        if (nomePeneira == "") {
            console.log("digite nome peneira");
            return false;
        }

        return true;
    }

    limparFormularioPeneira() {
        document.querySelectorAll("select").forEach(function (select) { select.value = "" });
        document.querySelectorAll("input[type=text]").forEach(function (text) { text.value = "" });
    }

    async salvarPeneira() {
        if (this.validarFormularioPeneira()) {
            this.setState({ processando: true });

            const idClassificacao = document.getElementById("classificacaoPeneira").value;
            const nomePeneira = document.getElementById("nomePeneira").value;
            const result = await ApiService.AdicionarPeneira(idClassificacao, nomePeneira, this.props.usuario);
            if (result) {
                Util.exibirMensagemSucesso("Peneira criada");
                this.limparFormularioPeneira();
                this.props.buscarDadosAtributos();
                this.toggleModalPeneira();
            }
            else {
                console.log("Erro ao adicionar peneira")
            }

            this.setState({ processando: false });
        }
    }

    render() {
        return (
            <div className="modal-atributo-wrapper">
                <ReactModal
                    isOpen={this.state.showModalPeneira}
                    ariaHideApp={false}
                    portalClassName="container-modal-atributo"
                >
                    <div className="modal-atributo-header">
                        <font className="titulo-header">CRIAR PENEIRA</font>
                        <button onClick={this.toggleModalPeneira}>X</button>
                    </div>
                    <div className="modal-atributo-body">
                        <form autoComplete="off">
                            <div className="row">
                                <div className="col-6">
                                    <div className="form-group">
                                        <label htmlFor="classificacaoPeneira" className="label-form-modal">Classificação</label>
                                        <select id="classificacaoPeneira" className="form-control input-form-modal">
                                            <option key="0" value="0">Selecione</option>
                                            {this.state.classificacoes.map((classificacao) =>
                                                <option key={classificacao.idclass} value={classificacao.idclass}>{classificacao.desClass}</option>
                                            )};
                                        </select>
                                    </div>
                                </div>
                                <div className="col-6">
                                    <div className="form-group">
                                        <label htmlFor="nomePeneira" className="label-form-modal">Peneira</label>
                                        <input type="text" className="form-control input-form-modal" id="nomePeneira" />
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-12 container-btn-salvar-atributo">
                                    <button type="button" className="btn-salvar-atributo" id="btnSalvarPeneira" disabled={this.state.processando} onClick={this.salvarPeneira}>SALVAR</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </ReactModal>
            </div>
        );
    }
}

export default ModalPeneira;