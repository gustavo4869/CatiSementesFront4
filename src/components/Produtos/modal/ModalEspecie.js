import React, { Component } from 'react';
import ReactModal from 'react-modal';

import Util from '../../Util/Util';
import ApiService from '../../../services/ApiService';
import './css/ModalAtributos.css';
import 'react-responsive-modal/styles.css';

class ModalEspecie extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showModalEspecie: false,
            classificacoes: this.props.classificacoes,
            processando: false
        };

        this.toggleModalEspecie = this.toggleModalEspecie.bind(this);
        this.limparFormularioEspecie = this.limparFormularioEspecie.bind(this);
        this.validarFormularioEspecie = this.validarFormularioEspecie.bind(this);
        this.salvarEspecie = this.salvarEspecie.bind(this);
    }

    toggleModalEspecie() {
        console.log("toggle modal especie")
        this.setState(state => ({
            showModalEspecie: !state.showModalEspecie
        }));

        if (this.state.showModalEspecie) {
            this.limparFormularioEspecie();
        }
    }

    limparFormularioEspecie() {
        document.querySelectorAll("select").forEach(function (select) { select.value = "" });
        document.querySelectorAll("input[type=text]").forEach(function (text) { text.value = "" });
    }

    validarFormularioEspecie() {
        const idClassificacao = document.getElementById("classificacaoEspecie").value;
        const nomeEspecie = document.getElementById("nomeEspecie").value;

        if (idClassificacao == 0) {
            console.log("Selecione classificação");
            return false;
        }

        if (nomeEspecie == "") {
            console.log("digite nome especie");
            return false;
        }

        return true;
    }

    async salvarEspecie() {
        if (this.validarFormularioEspecie()) {
            this.setState({ processando: true });
            const idClassificacao = document.getElementById("classificacaoEspecie").value;
            const nomeEspecie = document.getElementById("nomeEspecie").value;

            var result = await ApiService.AdicionarEspecie(idClassificacao, nomeEspecie, this.props.usuario);
            console.log(result)
            if (result) {
                Util.exibirMensagemSucesso("Espécie criada");
                this.limparFormularioEspecie();
                this.props.buscarDadosAtributos();
                this.toggleModalEspecie();
            }
            else {
                console.log("Erro ao salvar especie")
            }

            this.setState({ processando: false });
        }
    }

    render() {
        return (
            <div className="modal-atributo-wrapper">
                <ReactModal
                    isOpen={this.state.showModalEspecie}
                    ariaHideApp={false}
                    portalClassName="container-modal-atributo"
                >
                    <div className="modal-atributo-header">
                        <font className="titulo-header">{this.state.isEdit ? "EDITAR" : "CRIAR"} ESPÉCIE</font>
                        <button onClick={this.toggleModalEspecie}>X</button>
                    </div>
                    <div className="modal-atributo-body">
                        <form autoComplete="off">
                            <div className="row">
                                <div className="col-6">
                                    <div className="form-group">
                                        <label htmlFor="classificacaoEspecie" className="label-form-modal">Classificação</label>
                                        <select id="classificacaoEspecie" className="form-control input-form-modal">
                                            <option key="0" value="0">Selecione</option>
                                            {this.state.classificacoes.map((classificacao) =>
                                                <option key={classificacao.idclass} value={classificacao.idclass}>{classificacao.desClass}</option>
                                            )};
                                        </select>
                                    </div>
                                </div>
                                <div className="col-6">
                                    <div className="form-group">
                                        <label htmlFor="nomeEspecie" className="label-form-modal">Espécie</label>
                                        <input type="text" className="form-control input-form-modal" id="nomeEspecie" />
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-12 container-btn-salvar-atributo">
                                    <button type="button" className="btn-salvar-atributo" id="btn-salvar-especie" disabled={this.state.processando} onClick={this.salvarEspecie}>SALVAR</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </ReactModal>
            </div>
        );
    }
}

export default ModalEspecie;