import React, { Component } from 'react';
import ReactModal from 'react-modal';

import ApiService from '../../../services/ApiService';
import Util from '../../Util/Util';
import './css/ModalAtributos.css';
import 'react-responsive-modal/styles.css';

class ModalNomeCientifico extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showModalNomeCientifico: false,
            classificacoes: this.props.classificacoes,
            especies: [],
            processando: false
        };

        this.toggleModalNomeCientifico = this.toggleModalNomeCientifico.bind(this);
        this.limparFormularioNomeCientifico = this.limparFormularioNomeCientifico.bind(this);
        this.validarFormularioNomeCientifico = this.validarFormularioNomeCientifico.bind(this);
        this.salvarNomeCientifico = this.salvarNomeCientifico.bind(this);
        this.onChangeClassificacao = this.onChangeClassificacao.bind(this);
    }

    toggleModalNomeCientifico() {
        this.setState(state => ({
            showModalNomeCientifico: !state.showModalNomeCientifico
        }));

        if (this.state.showModalNomeCientifico) {
            this.limparFormularioNomeCientifico();
        }
    }

    validarFormularioNomeCientifico() {
        const idClassificacao = document.getElementById("classificacaoNomeCientifico").value;
        const idEspecie = document.getElementById("especieNomeCientifico").value;
        const nomeCientifico = document.getElementById("nomeCientifico").value;

        if (idClassificacao == 0) {
            Util.exibirMensagemErro("Selecione classificação");
            return false;
        }

        if (idEspecie == 0) {
            Util.exibirMensagemErro("Selecione Espécie")
            return false;
        }

        if (nomeCientifico == "") {
            Util.exibirMensagemErro("digite nome cientifico");
            return false;
        }

        return true;
    }

    limparFormularioNomeCientifico() {
        document.querySelectorAll("select").forEach(function (select) { select.value = "" });
        document.querySelectorAll("input[type=text]").forEach(function (text) { text.value = "" });
    }

    async salvarNomeCientifico() {
        if (this.validarFormularioNomeCientifico()) {
            this.setState({ processando: true });

            const idClassificacao = document.getElementById("classificacaoNomeCientifico").value;
            const idEspecie = document.getElementById("especieNomeCientifico").value;
            const nomeCientifico = document.getElementById("nomeCientifico").value;

            const result = await ApiService.AdicionarNomeCientifico(idClassificacao, idEspecie, nomeCientifico);
            if (result) {
                Util.exibirMensagemSucesso("Nome científico criado");
                this.props.buscarDadosAtributos();
                this.toggleModalNomeCientifico();
            }
            else {
                Util.exibirMensagemErro("Erro ao adicionar nome cientifico")
            }

            this.setState({ processando: false });
        }
    }

    async onChangeClassificacao() {
        console.log("Change Classif")
        const idClassificacao = document.getElementById("classificacaoNomeCientifico").value;
        const especies = await ApiService.EspecieGetByClassificacaoId(idClassificacao);
        console.log(especies)
        this.setState({ especies: especies.filter(f => !f.desEsp.includes("Não se aplica")) });
    }

    render() {
        return (
            <div className={"modal-atributo-wrapper" + this.state.processando ? " processando" : ""}>
                <ReactModal
                    isOpen={this.state.showModalNomeCientifico}
                    ariaHideApp={false}
                    portalClassName="container-modal-atributo"
                >
                    <div className="modal-atributo-header">
                        <font className="titulo-header">CRIAR NOME CIENTÍFICO</font>
                        <button onClick={this.toggleModalNomeCientifico}>X</button>
                    </div>
                    <div className="modal-atributo-body">
                        <form autoComplete="off">
                            <div className="row">
                                <div className="col-6">
                                    <div className="form-group">
                                        <label htmlFor="classificacaoNomeCientifico" className="label-form-modal">Classificação</label>
                                        <select id="classificacaoNomeCientifico" className="form-control input-form-modal" onChange={this.onChangeClassificacao}>
                                            <option key="0" value="0">Selecione</option>
                                            {this.state.classificacoes.map((classificacao) =>
                                                <option key={classificacao.idclass} value={classificacao.idclass}>{classificacao.desClass}</option>
                                            )};
                                        </select>
                                    </div>
                                </div>
                                <div className="col-6">
                                    <div className="form-group">
                                        <label htmlFor="especieNomeCientifico" className="label-form-modal">Espécie</label>
                                        <select id="especieNomeCientifico" className="form-control input-form-modal">
                                            <option key="0" value="0">Selecione</option>
                                            {this.state.especies.map((especie) =>
                                                <option key={especie.idesp} value={especie.idesp}>{especie.desEsp}</option>
                                            )};
                                        </select>
                                    </div>
                                </div>
                                <div className="col-6">
                                    <div className="form-group">
                                        <label htmlFor="nomeCientifico" className="label-form-modal">Nome científico</label>
                                        <input type="text" className="form-control input-form-modal" id="nomeCientifico" />
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-12 container-btn-salvar-atributo">
                                    <button type="button" className="btn-salvar-atributo" id="btnSalvarNomeCientifico" disabled={this.state.processando} onClick={this.salvarNomeCientifico}>SALVAR</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </ReactModal>
            </div>
        );
    }
}

export default ModalNomeCientifico;