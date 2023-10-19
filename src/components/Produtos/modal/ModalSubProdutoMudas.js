import React, { Component } from 'react';
import ReactModal from 'react-modal';

import Util from '../../Util/Util';
import ApiService from '../../../services/ApiService';
import './css/ModalAtributos.css';
import 'react-responsive-modal/styles.css';

class ModalSubProdutoMudas extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showModalSubProdutoMudas: false,
            classificacoes: this.props.classificacoes
        };

        this.toggleModalSubProdutoMudas = this.toggleModalSubProdutoMudas.bind(this);
        this.limparFormularioSubProdutoMudas = this.limparFormularioSubProdutoMudas.bind(this);
        this.validarFormularioSubProdutoMudas = this.validarFormularioSubProdutoMudas.bind(this);
        this.salvarSubProdutoMudas = this.salvarSubProdutoMudas.bind(this);
    }

    toggleModalSubProdutoMudas() {
        this.setState(state => ({
            showModalSubProdutoMudas: !state.showModalSubProdutoMudas
        }));

        if (this.state.showModalSubProdutoMudas) {
            this.limparFormularioSubProdutoMudas();
        }
    }

    validarFormularioSubProdutoMudas() {
        const idClassificacao = document.getElementById("classificacaoSubProdutoMudas").value;
        const nomeSubProdutoMudas = document.getElementById("nomeSubProdutoMudas").value;

        if (idClassificacao == 0) {
            console.log("Selecione classificação");
            return false;
        }

        if (nomeSubProdutoMudas == "") {
            console.log("digite nome SubProdutoMudas");
            return false;
        }

        return true;
    }

    limparFormularioSubProdutoMudas() {
        document.querySelectorAll("select").forEach(function (select) { select.value = "" });
        document.querySelectorAll("input[type=text]").forEach(function (text) { text.value = "" });
    }

    async salvarSubProdutoMudas() {
        if (this.validarFormularioSubProdutoMudas()) {
            this.setState({ processando: true });
            const idClassificacao = document.getElementById("classificacaoSubProdutoMudas").value;
            const nomeSubProdutoMudas = document.getElementById("nomeSubProdutoMudas").value;
            const result = await ApiService.AdicionarSubProduto(idClassificacao, nomeSubProdutoMudas, this.props.usuario);
            if (result) {
                Util.exibirMensagemSucesso("Sub-Produto criado");
                this.limparFormularioSubProdutoMudas();
                this.props.buscarDadosAtributos();
                this.toggleModalSubProdutoMudas();
            }
            else {
                console.log("Erro ao adicionar Sub produto")
            }
            this.setState({ processando: false });
        }
    }

    render() {
        return (
            <div className="modal-atributo-wrapper">
                <ReactModal
                    isOpen={this.state.showModalSubProdutoMudas}
                    ariaHideApp={false}
                    portalClassName="container-modal-atributo"
                >
                    <div className="modal-atributo-header">
                        <font className="titulo-header">CRIAR SUB-PRODUTO MUDAS</font>
                        <button onClick={this.toggleModalSubProdutoMudas}>X</button>
                    </div>
                    <div className="modal-atributo-body">
                        <form autoComplete="off">
                            <div className="row">
                                <div className="col-6">
                                    <div className="form-group">
                                        <label htmlFor="classificacaoSubProdutoMudas" className="label-form-modal">Classificação</label>
                                        <select id="classificacaoSubProdutoMudas" className="form-control input-form-modal">
                                            <option key="0" value="0">Selecione</option>
                                            {this.state.classificacoes.map((classificacao) =>
                                                <option key={classificacao.idclass} value={classificacao.idclass}>{classificacao.desClass}</option>
                                            )};
                                        </select>
                                    </div>
                                </div>
                                <div className="col-6">
                                    <div className="form-group">
                                        <label htmlFor="nomeSubProdutoMudas" className="label-form-modal">Sub-produto Mudas</label>
                                        <input type="text" className="form-control input-form-modal" id="nomeSubProdutoMudas" />
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-12 container-btn-salvar-atributo">
                                    <button type="button" className="btn-salvar-atributo" id="btnSalvarSubProdutoMudas" disabled={this.state.processando} onClick={this.salvarSubProdutoMudas}>SALVAR</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </ReactModal>
            </div>
        );
    }
}

export default ModalSubProdutoMudas;