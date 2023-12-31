﻿import React, { Component } from 'react';
import ReactModal from 'react-modal';

import Util from '../../Util/Util';
import ApiService from '../../../services/ApiService';
import './css/ModalAtributos.css';
import 'react-responsive-modal/styles.css';

class ModalGrupo extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showModalGrupo: false,
            classificacoes: this.props.classificacoes,
            processando: false
        };

        this.toggleModalGrupo = this.toggleModalGrupo.bind(this);
        this.limparFormularioGrupo = this.limparFormularioGrupo.bind(this);
        this.validarFormularioGrupo = this.validarFormularioGrupo.bind(this);
        this.salvarGrupo = this.salvarGrupo.bind(this);
    }

    toggleModalGrupo() {
        this.setState(state => ({
            showModalGrupo: !state.showModalGrupo
        }));

        if (this.state.showModalGrupo) {
            this.limparFormularioGrupo();
        }
    }

    validarFormularioGrupo() {
        const idClassificacao = document.getElementById("classificacaoGrupo").value;
        const nomeGrupo = document.getElementById("nomeGrupo").value;

        if (idClassificacao === 0) {
            Util.exibirMensagemErro("Selecione classificação");
            return false;
        }

        if (nomeGrupo === "") {
            Util.exibirMensagemErro("digite nome Grupo");
            return false;
        }

        return true;
    }

    limparFormularioGrupo() {
        document.querySelectorAll("select").forEach(function (select) { select.value = "" });
        document.querySelectorAll("input[type=text]").forEach(function (text) { text.value = "" });
    }

    async salvarGrupo() {
        if (this.validarFormularioGrupo()) {
            this.setState({ processando: true });
            const idClassificacao = document.getElementById("classificacaoGrupo").value;
            const nomeGrupo = document.getElementById("nomeGrupo").value;
            const result = await ApiService.AdicionarGrupo(idClassificacao, nomeGrupo, this.props.usuario);
            if (result.sucesso) {
                Util.exibirMensagemSucesso("Grupo criado");
                this.limparFormularioGrupo();
                this.props.buscarDadosAtributos();
                this.toggleModalGrupo();
            }
            else {
                if (result.erros !== null && result.erros.length > 0) {
                    Util.exibirMensagemErro(result.erros[0]);
                }
                else {
                    Util.exibirMensagemErro("Erro ao adicionar grupo");
                }                
            }
            this.setState({ processando: false });
        }
    }

    render() {
        return (
            <div className="modal-atributo-wrapper">
                <ReactModal
                    isOpen={this.state.showModalGrupo}
                    ariaHideApp={false}
                    portalClassName="container-modal-atributo"
                >
                    <div className="modal-atributo-header">
                        <font className="titulo-header">CRIAR GRUPO</font>
                        <button onClick={this.toggleModalGrupo}>X</button>
                    </div>
                    <div className="modal-atributo-body">
                        <form autoComplete="off">
                            <div className="row">
                                <div className="col-6">
                                    <div className="form-group">
                                        <label htmlFor="classificacaoGrupo" className="label-form-modal">Classificação</label>
                                        <select id="classificacaoGrupo" className="form-control input-form-modal">
                                            <option key="0" value="0">Selecione</option>
                                            {this.state.classificacoes.map((classificacao) =>
                                                <option key={classificacao.idclass} value={classificacao.idclass}>{classificacao.desClass}</option>
                                            )};
                                        </select>
                                    </div>
                                </div>
                                <div className="col-6">
                                    <div className="form-group">
                                        <label htmlFor="nomeGrupo" className="label-form-modal">Grupo</label>
                                        <input type="text" className="form-control input-form-modal" id="nomeGrupo" />
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-12 container-btn-salvar-atributo">
                                    <button type="button" className="btn-salvar-atributo" id="btnSalvarGrupo" disabled={this.state.processando} onClick={this.salvarGrupo}>SALVAR</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </ReactModal>
            </div>
        );
    }
}

export default ModalGrupo;