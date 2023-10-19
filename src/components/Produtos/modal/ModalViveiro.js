import React, { Component } from 'react';
import ReactModal from 'react-modal';

import Util from '../../Util/Util';
import ApiService from '../../../services/ApiService';
import './css/ModalAtributos.css';
import 'react-responsive-modal/styles.css';

class ModalViveiro extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showModalViveiro: false,
            classificacoes: this.props.classificacoes,
            processando: false
        };

        this.toggleModalViveiro = this.toggleModalViveiro.bind(this);
        this.limparFormularioViveiro = this.limparFormularioViveiro.bind(this);
        this.validarFormularioViveiro = this.validarFormularioViveiro.bind(this);
        this.salvarViveiro = this.salvarViveiro.bind(this);
    }

    toggleModalViveiro() {
        this.setState(state => ({
            showModalViveiro: !state.showModalViveiro
        }));

        if (this.state.showModalViveiro) {
            this.limparFormularioViveiro();
        }
    }

    validarFormularioViveiro() {
        const idClassificacao = document.getElementById("classificacaoViveiro").value;
        const nomeViveiro = document.getElementById("nomeViveiro").value;

        if (idClassificacao == 0) {
            console.log("Selecione classificação");
            return false;
        }

        if (nomeViveiro == "") {
            console.log("digite nome Viveiro");
            return false;
        }

        return true;
    }

    limparFormularioViveiro() {
        document.querySelectorAll("select").forEach(function (select) { select.value = "" });
        document.querySelectorAll("input[type=text]").forEach(function (text) { text.value = "" });
    }

    async salvarViveiro() {
        if (this.validarFormularioViveiro()) {
            this.setState({ processando: true });
            const idClassificacao = document.getElementById("classificacaoViveiro").value;
            const nomeViveiro = document.getElementById("nomeViveiro").value;
            const result = await ApiService.AdicionarViveiro(idClassificacao, nomeViveiro, this.props.usuario);
            if (result) {
                Util.exibirMensagemSucesso("Viveiro criado");
                this.limparFormularioViveiro();
                this.props.buscarDadosAtributos();
                this.toggleModalViveiro();
            }
            else {
                console.log("Erro ao adicionar Viveiro")
            }
            this.setState({ processando: false });
        }
    }

    render() {
        return (
            <div className="modal-atributo-wrapper">
                <ReactModal
                    isOpen={this.state.showModalViveiro}
                    ariaHideApp={false}
                    portalClassName="container-modal-atributo"
                >
                    <div className="modal-atributo-header">
                        <font className="titulo-header">CRIAR EMBALAGEM</font>
                        <button onClick={this.toggleModalViveiro}>X</button>
                    </div>
                    <div className="modal-atributo-body">
                        <form autoComplete="off">
                            <div className="row">
                                <div className="col-6">
                                    <div className="form-group">
                                        <label htmlFor="classificacaoViveiro" className="label-form-modal">Classificação</label>
                                        <select id="classificacaoViveiro" className="form-control input-form-modal">
                                            <option key="0" value="0">Selecione</option>
                                            {this.state.classificacoes.map((classificacao) =>
                                                <option key={classificacao.idclass} value={classificacao.idclass}>{classificacao.desClass}</option>
                                            )};
                                        </select>
                                    </div>
                                </div>
                                <div className="col-6">
                                    <div className="form-group">
                                        <label htmlFor="nomeViveiro" className="label-form-modal">Viveiro</label>
                                        <input type="text" className="form-control input-form-modal" id="nomeViveiro" />
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-12 container-btn-salvar-atributo">
                                    <button type="button" className="btn-salvar-atributo" id="btnSalvarViveiro" disabled={this.state.processando} onClick={this.salvarViveiro}>SALVAR</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </ReactModal>
            </div>
        );
    }
}

export default ModalViveiro;