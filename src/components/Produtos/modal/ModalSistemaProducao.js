import React, { Component } from 'react';
import ReactModal from 'react-modal';

import ApiService from '../../../services/ApiService';
import './css/ModalAtributos.css';
import 'react-responsive-modal/styles.css';

class ModalSistemaProducao extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showModalSistemaProducao: false,
            classificacoes: this.props.classificacoes,
            processando: false
        };

        this.toggleModalSistemaProducao = this.toggleModalSistemaProducao.bind(this);
        this.limparFormularioSistemaProducao = this.limparFormularioSistemaProducao.bind(this);
        this.validarFormularioSistemaProducao = this.validarFormularioSistemaProducao.bind(this);
        this.salvarSistemaProducao = this.salvarSistemaProducao.bind(this);
    }

    toggleModalSistemaProducao() {
        this.setState(state => ({
            showModalSistemaProducao: !state.showModalSistemaProducao
        }));

        if (this.state.showModalSistemaProducao) {
            this.limparFormularioSistemaProducao();
        }
    }

    validarFormularioSistemaProducao() {
        const idClassificacao = document.getElementById("classificacaoSistemaProducao").value;
        const sistemaProducao = document.getElementById("nomeSistemaProducao").value;

        if (idClassificacao == 0) {
            console.log("Selecione classificação");
            return false;
        }

        if (sistemaProducao == "") {
            console.log("digite nome sistema produção");
            return false;
        }

        return true;
    }

    limparFormularioSistemaProducao() {
        document.querySelectorAll("select").forEach(function (select) { select.value = "" });
        document.querySelectorAll("input[type=text]").forEach(function (text) { text.value = "" });
    }

    async salvarSistemaProducao() {
        if (this.validarFormularioSistemaProducao()) {
            this.setState({ processando: true });
            const idClassificacao = document.getElementById("classificacaoSistemaProducao").value;
            const sistemaProducao = document.getElementById("nomeSistemaProducao").value;
            const result = await ApiService.AdicionarSistemaProducao(idClassificacao, sistemaProducao);
            if (result) {
                console.log("sistema de producao criado")
                this.limparFormularioSistemaProducao();
                this.props.buscarDadosAtributos();
                this.toggleModalSistemaProducao();
            }
            else {
                console.log("erro ao criar sistema de producao")
            }

            this.setState({ processando: false });
        }
    }

    render() {
        return (
            <div className="modal-atributo-wrapper">
                <ReactModal
                    isOpen={this.state.showModalSistemaProducao}
                    ariaHideApp={false}
                    portalClassName="container-modal-atributo"
                >
                    <div className="modal-atributo-header">
                        <font className="titulo-header">CRIAR SISTEMA DE PRODUÇÃO</font>
                        <button onClick={this.toggleModalSistemaProducao}>X</button>
                    </div>
                    <div className="modal-atributo-body">
                        <form autoComplete="off">
                            <div className="row">
                                <div className="col-6">
                                    <div className="form-group">
                                        <label htmlFor="classificacaoSistemaProducao" className="label-form-modal">Classificação</label>
                                        <select id="classificacaoSistemaProducao" className="form-control input-form-modal">
                                            <option key="0" value="0">Selecione</option>
                                            {!this.state.classificacoes ? null : this.state.classificacoes.map((classificacao) =>
                                                <option key={classificacao.idclass} value={classificacao.idclass}>{classificacao.desClass}</option>
                                            )};
                                        </select>
                                    </div>
                                </div>
                                <div className="col-6">
                                    <div className="form-group">
                                        <label htmlFor="nomeSistemaProducao" className="label-form-modal">Sistema de produção</label>
                                        <input type="text" className="form-control input-form-modal" id="nomeSistemaProducao" />
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-12 container-btn-salvar-atributo">
                                    <button type="button" className="btn-salvar-atributo" disabled={this.state.processando} id="btnSalvarSistemaProducao" onClick={this.salvarSistemaProducao}>SALVAR</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </ReactModal>
            </div>
        );
    }
}

export default ModalSistemaProducao;