import React, { Component } from 'react';
import ReactModal from 'react-modal';

import Util from '../../Util/Util';
import ApiService from '../../../services/ApiService';
import './css/ModalAtributos.css';
import 'react-responsive-modal/styles.css';

class ModalUnidade extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showModalUnidade: false,
            classificacoes: this.props.classificacoes,
            processando: false
        };

        this.toggleModalUnidade = this.toggleModalUnidade.bind(this);
        this.limparFormularioUnidade = this.limparFormularioUnidade.bind(this);
        this.validarFormularioUnidade = this.validarFormularioUnidade.bind(this);
        this.salvarUnidade = this.salvarUnidade.bind(this);
    }

    toggleModalUnidade() {
        this.setState(state => ({
            showModalUnidade: !state.showModalUnidade
        }));

        if (this.state.showModalUnidade) {
            this.limparFormularioUnidade();
        }
    }

    validarFormularioUnidade() {
        const idClassificacao = document.getElementById("classificacaoUnidade").value;
        const nomeUnidade = document.getElementById("nomeUnidade").value;

        if (idClassificacao == 0) {
            console.log("Selecione classificação");
            return false;
        }

        if (nomeUnidade == "") {
            console.log("digite nome Unidade");
            return false;
        }

        return true;
    }

    limparFormularioUnidade() {
        document.querySelectorAll("select").forEach(function (select) { select.value = "" });
        document.querySelectorAll("input[type=text]").forEach(function (text) { text.value = "" });
    }

    async salvarUnidade() {
        if (this.validarFormularioUnidade()) {
            this.setState({ processando: true });
            const idClassificacao = document.getElementById("classificacaoUnidade").value;
            const nomeUnidade = document.getElementById("nomeUnidade").value;
            const result = await ApiService.AdicionarUnidade(idClassificacao, nomeUnidade, this.props.usuario);
            if (result) {
                Util.exibirMensagemSucesso("Unidade criada");
                this.limparFormularioUnidade();
                this.props.buscarDadosAtributos();
                this.toggleModalUnidade();
            }
            else {
                console.log("Erro ao adicionar Unidade");
            }
            this.setState({ processando: false });
        }
    }

    render() {
        return (
            <div className="modal-atributo-wrapper">
                <ReactModal
                    isOpen={this.state.showModalUnidade}
                    ariaHideApp={false}
                    portalClassName="container-modal-atributo"
                >
                    <div className="modal-atributo-header">
                        <font className="titulo-header">CRIAR UNIDADE</font>
                        <button onClick={this.toggleModalUnidade}>X</button>
                    </div>
                    <div className="modal-atributo-body">
                        <form autoComplete="off">
                            <div className="row">
                                <div className="col-6">
                                    <div className="form-group">
                                        <label htmlFor="classificacaoUnidade" className="label-form-modal">Classificação</label>
                                        <select id="classificacaoUnidade" className="form-control input-form-modal">
                                            <option key="0" value="0">Selecione</option>
                                            {this.state.classificacoes.map((classificacao) =>
                                                <option key={classificacao.idclass} value={classificacao.idclass}>{classificacao.desClass}</option>
                                            )};
                                        </select>
                                    </div>
                                </div>
                                <div className="col-6">
                                    <div className="form-group">
                                        <label htmlFor="nomeUnidade" className="label-form-modal">Unidade</label>
                                        <input type="text" className="form-control input-form-modal" id="nomeUnidade" />
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-12 container-btn-salvar-atributo">
                                    <button type="button" className="btn-salvar-atributo" id="btnSalvarUnidade" disabled={this.state.processando} onClick={this.salvarUnidade}>SALVAR</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </ReactModal>
            </div>
        );
    }
}

export default ModalUnidade;