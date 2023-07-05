import React, { Component } from 'react';
import ReactModal from 'react-modal';

import ApiService from '../../../services/ApiService';
import './css/ModalAtributos.css';
import 'react-responsive-modal/styles.css';

class ModalMaterialPropagacaoVegetativa extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showModalMaterialPropagacaoVegetativa: false,
            classificacoes: this.props.classificacoes,
            processando: false
        };

        this.toggleModalMaterialPropagacaoVegetativa = this.toggleModalMaterialPropagacaoVegetativa.bind(this);
        this.limparFormularioMaterialPropagacaoVegetativa = this.limparFormularioMaterialPropagacaoVegetativa.bind(this);
        this.validarFormularioMaterialPropagacaoVegetativa = this.validarFormularioMaterialPropagacaoVegetativa.bind(this);
        this.salvarMaterialPropagacaoVegetativa = this.salvarMaterialPropagacaoVegetativa.bind(this);
    }

    toggleModalMaterialPropagacaoVegetativa() {
        this.setState(state => ({
            showModalMaterialPropagacaoVegetativa: !state.showModalMaterialPropagacaoVegetativa
        }));

        if (this.state.showModalMaterialPropagacaoVegetativa) {
            this.limparFormularioMaterialPropagacaoVegetativa();
        }
    }

    validarFormularioMaterialPropagacaoVegetativa() {
        const idClassificacao = document.getElementById("classificacaoMaterialPropagacaoVegetativa").value;
        const nomeMaterialPropagacaoVegetativa = document.getElementById("nomeMaterialPropagacaoVegetativa").value;

        if (idClassificacao == 0) {
            console.log("Selecione classificação");
            return false;
        }

        if (nomeMaterialPropagacaoVegetativa == "") {
            console.log("digite nome MaterialPropagacaoVegetativa");
            return false;
        }

        return true;
    }

    limparFormularioMaterialPropagacaoVegetativa() {
        document.querySelectorAll("select").forEach(function (select) { select.value = "" });
        document.querySelectorAll("input[type=text]").forEach(function (text) { text.value = "" });
    }

    async salvarMaterialPropagacaoVegetativa() {
        if (this.validarFormularioMaterialPropagacaoVegetativa()) {
            this.setState({ processando: true });
            const idClassificacao = document.getElementById("classificacaoMaterialPropagacaoVegetativa").value;
            const nomeMaterialPropagacaoVegetativa = document.getElementById("nomeMaterialPropagacaoVegetativa").value;
            const result = await ApiService.AdicionarMaterial(idClassificacao, nomeMaterialPropagacaoVegetativa);
            if (result) {
                this.limparFormularioMaterialPropagacaoVegetativa();
                this.props.buscarDadosAtributos();
                this.toggleModalMaterialPropagacaoVegetativa();
            }
            else {
                console.log("Erro ao adicionar material propagação vegetativa")
            }
            this.setState({ processando: false });
        }
    }

    render() {
        return (
            <div className="modal-atributo-wrapper">
                <ReactModal
                    isOpen={this.state.showModalMaterialPropagacaoVegetativa}
                    ariaHideApp={false}
                    portalClassName="container-modal-atributo"
                >
                    <div className="modal-atributo-header">
                        <font className="titulo-header">CRIAR MATERIAL DE PROPAGAÇÃO VEGETATIVA</font>
                        <button onClick={this.toggleModalMaterialPropagacaoVegetativa}>X</button>
                    </div>
                    <div className="modal-atributo-body">
                        <form autoComplete="off">
                            <div className="row">
                                <div className="col-6">
                                    <div className="form-group">
                                        <label htmlFor="classificacaoMaterialPropagacaoVegetativa" className="label-form-modal">Classificação</label>
                                        <select id="classificacaoMaterialPropagacaoVegetativa" className="form-control input-form-modal">
                                            <option key="0" value="0">Selecione</option>
                                            {this.state.classificacoes.map((classificacao) =>
                                                <option key={classificacao.idclass} value={classificacao.idclass}>{classificacao.desClass}</option>
                                            )};
                                        </select>
                                    </div>
                                </div>
                                <div className="col-6">
                                    <div className="form-group">
                                        <label htmlFor="nomeMaterialPropagacaoVegetativa" className="label-form-modal">Material propagação vegetativa</label>
                                        <input type="text" className="form-control input-form-modal" id="nomeMaterialPropagacaoVegetativa" />
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-12 container-btn-salvar-atributo">
                                    <button type="button" className="btn-salvar-atributo" id="btnSalvarMaterialPropagacaoVegetativa" disabled={this.state.processando} onClick={this.salvarMaterialPropagacaoVegetativa}>SALVAR</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </ReactModal>
            </div>
        );
    }
}

export default ModalMaterialPropagacaoVegetativa;