import React, { Component } from 'react';
import ReactModal from 'react-modal';

import Util from '../../Util/Util';
import ApiService from '../../../services/ApiService';
import './css/ModalAtributos.css';
import 'react-responsive-modal/styles.css';

class ModalSafra extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showModalSafra: false,
            classificacoes: this.props.classificacoes,
            processando: false
        };

        this.toggleModalSafra = this.toggleModalSafra.bind(this);
        this.limparFormularioSafra = this.limparFormularioSafra.bind(this);
        this.validarFormularioSafra = this.validarFormularioSafra.bind(this);
        this.salvarSafra = this.salvarSafra.bind(this);
    }

    toggleModalSafra() {
        this.setState(state => ({
            showModalSafra: !state.showModalSafra
        }));

        if (this.state.showModalSafra) { // fechar
            this.limparFormularioSafra();
        }
    }

    validarFormularioSafra() {
        const idClassificacao = document.getElementById("classificacaoSafra").value;
        const nomeSafra = document.getElementById("nomeSafra").value;

        if (idClassificacao == 0) {
            console.log("Selecione classificação");
            return false;
        }

        if (nomeSafra == "") {
            console.log("digite nome Safra");
            return false;
        }

        return true;
    }

    limparFormularioSafra() {
        document.querySelectorAll("select").forEach(function (select) { select.value = "" });
        document.querySelectorAll("input[type=text]").forEach(function (text) { text.value = "" });
    }

    async salvarSafra() {
        if (this.validarFormularioSafra()) {
            this.setState({ processando: true });
            const idClassificacao = document.getElementById("classificacaoSafra").value;
            const nomeSafra = document.getElementById("nomeSafra").value;
            var result = await ApiService.AdicionarSafra(idClassificacao, nomeSafra, this.props.usuario);
            if (result) {
                Util.exibirMensagemSucesso("Safra criada");
                this.limparFormularioSafra();
                this.props.buscarDadosAtributos();
                this.toggleModalSafra();
            }
            else {
                console.log("Erro criar safra")
            }
            this.setState({ processando: false });
        }
    }

    render() {
        return (
            <div className="modal-atributo-wrapper">
                <ReactModal
                    isOpen={this.state.showModalSafra}
                    ariaHideApp={false}
                    portalClassName="container-modal-atributo"
                >
                    <div className="modal-atributo-header">
                        <font className="titulo-header">CRIAR SAFRA</font>
                        <button onClick={this.toggleModalSafra}>X</button>
                    </div>
                    <div className="modal-atributo-body">
                        <form autoComplete="off">
                            <div className="row">
                                <div className="col-6">
                                    <div className="form-group">
                                        <label htmlFor="classificacaoSafra" className="label-form-modal">Classificação</label>
                                        <select id="classificacaoSafra" className="form-control input-form-modal">
                                            <option key="0" value="0">Selecione</option>
                                            {this.state.classificacoes.map((classificacao) =>
                                                <option key={classificacao.idclass} value={classificacao.idclass}>{classificacao.desClass}</option>
                                            )};
                                        </select>
                                    </div>
                                </div>
                                <div className="col-6">
                                    <div className="form-group">
                                        <label htmlFor="nomeSafra" className="label-form-modal">Safra</label>
                                        <input type="text" className="form-control input-form-modal" id="nomeSafra" />
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-12 container-btn-salvar-atributo">
                                    <button type="button" className="btn-salvar-atributo" id="btnSalvarSafra" disabled={this.state.processando} onClick={this.salvarSafra}>SALVAR</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </ReactModal>
            </div>
        );
    }
}

export default ModalSafra;