import React, { Component } from 'react';
import ReactModal from 'react-modal';

import Util from '../../Util/Util';
import ApiService from '../../../services/ApiService';
import './css/ModalAtributos.css';
import 'react-responsive-modal/styles.css';

class ModalCampoProducao extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showModalCampoProducao: false,
            classificacoes: props.classificacoes,
            processando: false            
        };

        this.toggleModalCampoProducao = this.toggleModalCampoProducao.bind(this);
        this.limparFormularioCampoProducao = this.limparFormularioCampoProducao.bind(this);
        this.validarFormularioCampoProducao = this.validarFormularioCampoProducao.bind(this);
        this.salvarCampoProducao = this.salvarCampoProducao.bind(this);
    }

    toggleModalCampoProducao() {
        this.setState(state => ({
            showModalCampoProducao: !state.showModalCampoProducao
        }));

        if (this.state.showModalCampoProducao) {
            this.limparFormularioCampoProducao();
        }
    }

    validarFormularioCampoProducao() {
        const idClassificacao = document.getElementById("classificacaoCampoProducao").value;
        const nomeCampoProducao = document.getElementById("nomeCampoProducao").value;

        if (idClassificacao == 0) {
            Util.exibirMensagemErro("Selecione a classificação");
            return false;
        }

        if (nomeCampoProducao == "") {
            Util.exibirMensagemErro("Digite o nome do campo de produção");
            return false;
        }

        return true;
    }

    limparFormularioCampoProducao() {
        document.querySelectorAll("select").forEach(function (select) { select.value = "" });
        document.querySelectorAll("input[type=text]").forEach(function (text) { text.value = "" });
    }

    async salvarCampoProducao() {
        if (this.validarFormularioCampoProducao()) {
            this.setState({ processando: true });

            const idClassificacao = document.getElementById("classificacaoCampoProducao").value;
            const nomeCampoProducao = document.getElementById("nomeCampoProducao").value;
            const result = await ApiService.AdicionarCampoProducao(idClassificacao, nomeCampoProducao, this.props.usuario);
            console.log("result")
            console.log(result)
            if (result.sucesso) {
                Util.exibirMensagemSucesso("Campo de Produção criado");
                this.props.buscarDadosAtributos();
                this.toggleModalCampoProducao();
            }
            else {
                Util.exibirMensagensErro(result.erros);
            }

            this.setState({ processando: false });
        }
    }

    render() {
        return (
            <div className={"modal-atributo-wrapper" + this.state.processando ? " processando" : ""}>
                <ReactModal
                    isOpen={this.state.showModalCampoProducao}
                    ariaHideApp={false}
                    portalClassName="container-modal-atributo"
                >
                    <div className="modal-atributo-header">
                        <font className="titulo-header">CRIAR EMBALAGEM</font>
                        <button onClick={this.toggleModalCampoProducao}>X</button>
                    </div>
                    <div className="modal-atributo-body">
                        <form autoComplete="off">
                            <div className="row">
                                <div className="col-6">
                                    <div className="form-group">
                                        <label htmlFor="classificacaoCampoProducao" className="label-form-modal">Classificação</label>
                                        <select id="classificacaoCampoProducao" className="form-control input-form-modal">
                                            <option key="0" value="0">Selecione</option>
                                            {this.state.classificacoes.map((classificacao) =>
                                                <option key={classificacao.idclass} value={classificacao.idclass}>{classificacao.desClass}</option>
                                            )};
                                        </select>
                                    </div>
                                </div>
                                <div className="col-6">
                                    <div className="form-group">
                                        <label htmlFor="nomeCampoProducao" className="label-form-modal">Nº Campo de produção</label>
                                        <input type="text" className="form-control input-form-modal" id="nomeCampoProducao" />
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-12 container-btn-salvar-atributo">
                                    <button type="button" className="btn-salvar-atributo" id="btnSalvarCampoProducao" disabled={this.state.processando} onClick={this.salvarCampoProducao}>SALVAR</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </ReactModal>
            </div>
        );
    }
}

export default ModalCampoProducao;