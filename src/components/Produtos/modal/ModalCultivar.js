import React, { Component } from 'react';
import ReactModal from 'react-modal';

import Util from '../../Util/Util';
import ApiService from '../../../services/ApiService';
import './css/ModalAtributos.css';
import 'react-responsive-modal/styles.css';

class ModalCultivar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showModalCultivar: false,
            classificacoes: this.props.classificacoes,
            processando: false,
            especies: []
        };

        this.toggleModalCultivar = this.toggleModalCultivar.bind(this);
        this.limparFormularioCultivar = this.limparFormularioCultivar.bind(this);
        this.buscarTodasEspecies = this.buscarTodasEspecies.bind(this);
        this.validarFormularioCultivar = this.validarFormularioCultivar.bind(this);
        this.salvarCultivar = this.salvarCultivar.bind(this);
        this.onChangeClassificacaoCultivar = this.onChangeClassificacaoCultivar.bind(this);
    }

    toggleModalCultivar() {
        console.log("toggle modal especie")
        this.setState(state => ({
            showModalCultivar: !state.showModalCultivar
        }));

        if (this.state.showModalCultivar) {
            this.limparFormularioCultivar();
        }
    }

    buscarTodasEspecies() {
        const idClassificacao = document.getElementById("classificacaoCultivar").value;
        const especies = ApiService.EspecieGetById(idClassificacao);

        this.setState({ especies: especies });
    }

    limparFormularioCultivar() {
        document.querySelectorAll("select").forEach(function (select) { select.value = "" });
        document.querySelectorAll("input[type=text]").forEach(function (text) { text.value = "" });
    }

    validarFormularioCultivar() {
        const idClassificacao = document.getElementById("classificacaoCultivar").value;
        const idEspecie = document.getElementById("especieCultivar").value;
        const nomeCultivar = document.getElementById("nomeCultivar").value;

        if (idClassificacao === 0) {
            Util.exibirMensagemErro("Selecione uma classificação");
            return false;
        }

        if (idEspecie === 0) {
            Util.exibirMensagemErro("Selecione uma espécie");
            return false;
        }

        if (nomeCultivar === "") {
            Util.exibirMensagemErro("Digite um nome");
            return false;
        }

        return true;
    }

    async salvarCultivar() {
        if (this.validarFormularioCultivar()) {
            this.setState({ processando: true });
            const idClassificacao = document.getElementById("classificacaoCultivar").value;
            const idEspecie = document.getElementById("especieCultivar").value;
            const nomeCultivar = document.getElementById("nomeCultivar").value;

            var result = await ApiService.AdicionarCultivar(idClassificacao, idEspecie, nomeCultivar, this.props.usuario);
            if (result) {
                Util.exibirMensagemSucesso("Cultivo criado");
                this.limparFormularioCultivar();
                this.props.buscarDadosAtributos();
                this.toggleModalCultivar();
            }
            else {
                console.log("Erro ao salvar cultivar");
            }

            this.setState({ processando: false });
        }
        
    }

    async onChangeClassificacaoCultivar() {
        const idClassificacao = document.getElementById("classificacaoCultivar").value;
        var result = await ApiService.EspecieGetByClassificacaoId(idClassificacao);
        this.setState({ especies: result });
    }

    render() {
        return (
            <div className="modal-atributo-wrapper">
                <ReactModal
                    isOpen={this.state.showModalCultivar}
                    ariaHideApp={false}
                    portalClassName="container-modal-atributo"
                >
                    <div className="modal-atributo-header">
                        <font className="titulo-header">CRIAR CULTIVAR</font>
                        <button onClick={this.toggleModalCultivar}>X</button>
                    </div>
                    <div className="modal-atributo-body">
                        <form autoComplete="off">
                            <div className="row">
                                <div className="col-6">
                                    <div className="form-group">
                                        <label htmlFor="classificacaoCultivar" className="label-form-modal">Classificação</label>
                                        <select id="classificacaoCultivar" className="form-control input-form-modal" onChange={() => this.onChangeClassificacaoCultivar() }>
                                            <option key="0" value="0">Selecione</option>
                                            {this.state.classificacoes.map((classificacao) =>
                                                <option key={classificacao.idclass} value={classificacao.idclass}>{classificacao.desClass}</option>
                                            )};
                                        </select>
                                    </div>
                                </div>
                                <div className="col-6">
                                    <div className="form-group">
                                        <label htmlFor="especieCultivar" className="label-form-modal">Espécie</label>
                                        <select id="especieCultivar" className="form-control input-form-modal">
                                            <option key="0" value="0">Selecione</option>
                                            {this.state.especies.length > 0 ? this.state.especies.map((especie) =>
                                                <option key={especie.idesp} value={especie.idesp}>{especie.desEsp}</option>
                                            ) :  ""};
                                        </select>
                                    </div>
                                </div>
                                <div className="col-6">
                                    <div className="form-group">
                                        <label htmlFor="nomeCultivar" className="label-form-modal">Cultivar</label>
                                        <input type="text" className="form-control input-form-modal" id="nomeCultivar" />
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-12 container-btn-salvar-atributo">
                                    <button type="button" className="btn-salvar-atributo" id="btn-salvar-cultivar" onClick={() => this.salvarCultivar()}>SALVAR</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </ReactModal>
            </div>
        );
    }
}

export default ModalCultivar;