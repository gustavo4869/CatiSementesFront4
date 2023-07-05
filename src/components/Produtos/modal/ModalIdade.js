import React, { Component } from 'react';
import ReactModal from 'react-modal';

import ApiService from '../../../services/ApiService';
import './css/ModalAtributos.css';
import 'react-responsive-modal/styles.css';

class ModalIdade extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showModalIdade: false,
            classificacoes: this.props.classificacoes,
            processando: false
        };

        this.toggleModalIdade = this.toggleModalIdade.bind(this);
        this.limparFormularioIdade = this.limparFormularioIdade.bind(this);
        this.validarFormularioIdade = this.validarFormularioIdade.bind(this);
        this.salvarIdade = this.salvarIdade.bind(this);
    }

    toggleModalIdade() {
        this.setState(state => ({
            showModalIdade: !state.showModalIdade
        }));

        if (this.state.showModalIdade) {
            this.limparFormularioIdade();
        }
    }

    validarFormularioIdade() {
        const idClassificacao = document.getElementById("classificacaoIdade").value;
        const nomeIdade = document.getElementById("nomeIdade").value;

        if (idClassificacao == 0) {
            console.log("Selecione classificação");
            return false;
        }

        if (nomeIdade == "") {
            console.log("digite nome Idade");
            return false;
        }

        return true;
    }

    limparFormularioIdade() {
        document.querySelectorAll("select").forEach(function (select) { select.value = "" });
        document.querySelectorAll("input[type=text]").forEach(function (text) { text.value = "" });
    }

    async salvarIdade() {
        if (this.validarFormularioIdade()) {
            this.setState({ processando: true });
            const idClassificacao = document.getElementById("classificacaoIdade").value;
            const nomeIdade = document.getElementById("nomeIdade").value;
            const result = await ApiService.AdicionarIdade(idClassificacao, nomeIdade);
            if (result) {
                this.limparFormularioIdade();
                this.props.buscarDadosAtributos();
                this.toggleModalIdade();
            }
            else {
                console.log("Erro ao salvar idade1")
            }
            this.setState({ processando: false });
        }
    }

    render() {
        return (
            <div className="modal-atributo-wrapper">
                <ReactModal
                    isOpen={this.state.showModalIdade}
                    ariaHideApp={false}
                    portalClassName="container-modal-atributo"
                >
                    <div className="modal-atributo-header">
                        <font className="titulo-header">CRIAR EMBALAGEM</font>
                        <button onClick={this.toggleModalIdade}>X</button>
                    </div>
                    <div className="modal-atributo-body">
                        <form autoComplete="off">
                            <div className="row">
                                <div className="col-6">
                                    <div className="form-group">
                                        <label htmlFor="classificacaoIdade" className="label-form-modal">Classificação</label>
                                        <select id="classificacaoIdade" className="form-control input-form-modal">
                                            <option key="0" value="0">Selecione</option>
                                            {this.state.classificacoes.map((classificacao) =>
                                                <option key={classificacao.idclass} value={classificacao.idclass}>{classificacao.desClass}</option>
                                            )};
                                        </select>
                                    </div>
                                </div>
                                <div className="col-6">
                                    <div className="form-group">
                                        <label htmlFor="nomeIdade" className="label-form-modal">Idade</label>
                                        <input type="text" className="form-control input-form-modal" id="nomeIdade" />
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-12 container-btn-salvar-atributo">
                                    <button type="button" className="btn-salvar-atributo" id="btnSalvarIdade" disabled={this.state.processando} onClick={this.salvarIdade}>SALVAR</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </ReactModal>
            </div>
        );
    }
}

export default ModalIdade;