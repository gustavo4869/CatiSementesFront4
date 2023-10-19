import React, { Component } from 'react';
import ReactModal from 'react-modal';

import Util from '../../Util/Util';
import ApiService from '../../../services/ApiService';
import './css/ModalAtributos.css';
import 'react-responsive-modal/styles.css';

class ModalEmbalagem extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showModalEmbalagem: false,
            classificacoes: this.props.classificacoes,
            processando: false
        };

        this.toggleModalEmbalagem = this.toggleModalEmbalagem.bind(this);
        this.limparFormularioEmbalagem = this.limparFormularioEmbalagem.bind(this);
        this.validarFormularioEmbalagem = this.validarFormularioEmbalagem.bind(this);
        this.salvarEmbalagem = this.salvarEmbalagem.bind(this);
    }

    toggleModalEmbalagem() {
        this.setState(state => ({
            showModalEmbalagem: !state.showModalEmbalagem
        }));

        if (this.state.showModalEmbalagem) {
            this.limparFormularioEmbalagem();
        }
    }

    validarFormularioEmbalagem() {
        const idClassificacao = document.getElementById("classificacaoEmbalagem").value;
        const nomeEmbalagem = document.getElementById("nomeEmbalagem").value;

        if (idClassificacao == 0) {
            console.log("Selecione classificação");
            return false;
        }

        if (nomeEmbalagem == "") {
            console.log("digite nome embalagem");
            return false;
        }

        return true;
    }

    limparFormularioEmbalagem() {
        document.querySelectorAll("select").forEach(function (select) { select.value = "" });
        document.querySelectorAll("input[type=text]").forEach(function (text) { text.value = "" });
    }

    async salvarEmbalagem() {
        if (this.validarFormularioEmbalagem()) {
            this.setState({ processando: true });
            const idClassificacao = document.getElementById("classificacaoEmbalagem").value;
            const nomeEmbalagem = document.getElementById("nomeEmbalagem").value;
            var result = await ApiService.AdicionarEmbalagem(idClassificacao, nomeEmbalagem, this.props.usuario);
            if (result) {
                Util.exibirMensagemSucesso("Embalagem criada");
                this.limparFormularioEmbalagem();
                this.props.buscarDadosAtributos();
                this.toggleModalEmbalagem();
            }
            else {
                console.log("Erro criar emabalagem")
            }
            this.setState({ processando: false });
        }
    }

    render() {
        return (
            <div className="modal-atributo-wrapper">
                <ReactModal
                    isOpen={this.state.showModalEmbalagem}
                    ariaHideApp={false}
                    portalClassName="container-modal-atributo"
                >
                    <div className="modal-atributo-header">
                        <font className="titulo-header">CRIAR EMBALAGEM</font>
                        <button onClick={this.toggleModalEmbalagem}>X</button>
                    </div>
                    <div className="modal-atributo-body">
                        <form autoComplete="off">
                            <div className="row">
                                <div className="col-6">
                                    <div className="form-group">
                                        <label htmlFor="classificacaoEmbalagem" className="label-form-modal">Classificação</label>
                                        <select id="classificacaoEmbalagem" className="form-control input-form-modal">
                                            <option key="0" value="0">Selecione</option>
                                            {this.state.classificacoes.map((classificacao) =>
                                                <option key={classificacao.idclass} value={classificacao.idclass}>{classificacao.desClass}</option>
                                            )};
                                        </select>
                                    </div>
                                </div>
                                <div className="col-6">
                                    <div className="form-group">
                                        <label htmlFor="nomeEmbalagem" className="label-form-modal">Embalagem</label>
                                        <input type="text" className="form-control input-form-modal" id="nomeEmbalagem" />
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-12 container-btn-salvar-atributo">
                                    <button type="button" className="btn-salvar-atributo" id="btnSalvarEmbalagem" disabled={this.state.processando} onClick={this.salvarEmbalagem}>SALVAR</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </ReactModal>
            </div>
        );
    }
}

export default ModalEmbalagem;