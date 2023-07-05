import React, { Component } from 'react';
import ReactModal from 'react-modal';

import ApiService from '../../../services/ApiService';
import Util from '../../Util/Util';
import './css/ModalAtributos.css';
import 'react-responsive-modal/styles.css';

class ModalPesoEmbalagem extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showModalPesoEmbalagem: false,
            classificacoes: this.props.classificacoes,
            processando: false
        };

        this.toggleModalPesoEmbalagem = this.toggleModalPesoEmbalagem.bind(this);
        this.limparFormularioPesoEmbalagem = this.limparFormularioPesoEmbalagem.bind(this);
        this.validarFormularioPesoEmbalagem = this.validarFormularioPesoEmbalagem.bind(this);
        this.salvarPesoEmbalagem = this.salvarPesoEmbalagem.bind(this);
    }

    toggleModalPesoEmbalagem() {
        this.setState(state => ({
            showModalPesoEmbalagem: !state.showModalPesoEmbalagem
        }));

        if (this.state.showModalPesoEmbalagem) {
            this.limparFormularioPesoEmbalagem();
        }
    }

    validarFormularioPesoEmbalagem() {
        const idClassificacao = document.getElementById("classificacaoPesoEmbalagem").value;
        const nomePesoEmbalagem = document.getElementById("nomePesoEmbalagem").value;

        if (idClassificacao == 0) {
            Util.exibirMensagemErro("Selecione a classificação");
            return false;
        }

        if (nomePesoEmbalagem == "") {
            Util.exibirMensagemErro("Digite o peso da embalagem");
            return false;
        }

        return true;
    }

    limparFormularioPesoEmbalagem() {
        document.querySelectorAll("select").forEach(function (select) { select.value = "" });
        document.querySelectorAll("input[type=text]").forEach(function (text) { text.value = "" });
    }

    async salvarPesoEmbalagem() {
        if (this.validarFormularioPesoEmbalagem()) {
            this.setState({ processando: true });
            const idClassificacao = document.getElementById("classificacaoPesoEmbalagem").value;
            const nomePesoEmbalagem = document.getElementById("nomePesoEmbalagem").value;
            var result = await ApiService.AdicionarPesoEmbalagem(idClassificacao, nomePesoEmbalagem);
            if (result) {
                Util.exibirMensagemSucesso("Peso de embalagem criada");
                this.props.buscarDadosAtributos();
                this.toggleModalPesoEmbalagem();
            }
            else {
                Util.exibirMensagemErro("Erro criar Peso emabalagem")
            }
            this.setState({ processando: false });
        }
    }

    render() {
        return (
            <div className="modal-atributo-wrapper">
                <ReactModal
                    isOpen={this.state.showModalPesoEmbalagem}
                    ariaHideApp={false}
                    portalClassName="container-modal-atributo"
                >
                    <div className="modal-atributo-header">
                        <font className="titulo-header">CRIAR PESO EMBALAGEM</font>
                        <button onClick={this.toggleModalPesoEmbalagem}>X</button>
                    </div>
                    <div className="modal-atributo-body">
                        <form autoComplete="off">
                            <div className="row">
                                <div className="col-6">
                                    <div className="form-group">
                                        <label htmlFor="classificacaoPesoEmbalagem" className="label-form-modal">Classificação</label>
                                        <select id="classificacaoPesoEmbalagem" className="form-control input-form-modal">
                                            <option key="0" value="0">Selecione</option>
                                            {this.state.classificacoes.map((classificacao) =>
                                                <option key={classificacao.idclass} value={classificacao.idclass}>{classificacao.desClass}</option>
                                            )};
                                        </select>
                                    </div>
                                </div>
                                <div className="col-6">
                                    <div className="form-group">
                                        <label htmlFor="nomePesoEmbalagem" className="label-form-modal">Peso Embalagem</label>
                                        <input type="text" className="form-control input-form-modal" id="nomePesoEmbalagem" />
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-12 container-btn-salvar-atributo">
                                    <button type="button" className="btn-salvar-atributo" id="btnSalvarPesoEmbalagem" disabled={this.state.processando} onClick={this.salvarPesoEmbalagem}>SALVAR</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </ReactModal>
            </div>
        );
    }
}

export default ModalPesoEmbalagem;