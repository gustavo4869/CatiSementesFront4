import React, { Component } from 'react';
import axios from 'axios';
import ReactModal from 'react-modal';
import validator from 'validator';
import Select from 'react-select';
import { Tooltip } from 'react-tooltip';

import KeycloakService from '../../services/KeycloakService';
import Util from '../Util/Util';
import Notificacao from '../Util/Notificacao';
import './css/ModalUsuario.css';
import 'react-responsive-modal/styles.css';

class ModalUsuario extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showModal: false,
            usuarioEditar: this.props.usuarioEditar,
            isEdit: this.props.isEdit,
            usuario: "",
            municipioUsuario: "",
            cargo: "",
            unidadeAdministrativa: ""
        };

        this.salvarUsuario = this.salvarUsuario.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
        this.validarSenhaForte = this.validarSenhaForte.bind(this);
        this.validarCPF = this.validarCPF.bind(this);
        this.validarTelefone = this.validarTelefone.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangeMunicipio = this.onChangeMunicipio.bind(this);
        this.onChangeCargo = this.onChangeCargo.bind(this);
        this.onChangeUnidadeAdministrativa = this.onChangeUnidadeAdministrativa.bind(this);
    }

    toggleModal() {
        this.setState(state => ({
            showModal: !state.showModal,
            usuarioEditar: this.props.usuarioEditar,
            isEdit: this.props.isEdit
        }));        
    }

    async salvarUsuario() {
        var unidadeAdministrativa = this.state.unidadeAdministrativa;
        var cargo = this.state.cargo;
        var cpf = document.getElementById("cpfUsuario").value;
        var nomeCompleto = document.getElementById("nomeCompletoUsuario").value;
        var telefone = document.getElementById("telefoneUsuario").value;
        var email = document.getElementById("emailUsuario").value;
        var login = document.getElementById("loginUsuario").value;
        var senha = document.getElementById("senhaUsuario").value;
        var confirmarSenha = document.getElementById("confirmarSenhaUsuario").value;
        var idUsuario = this.state.isEdit ? this.props.usuarioEditar.id : null;
        var perfil = document.getElementById("perfilUsuario").value;
        var municipio = this.state.municipioUsuario;
        
        var retornoValidacao = Util.validarFormularioUsuario(unidadeAdministrativa, cargo, cpf, nomeCompleto, login, senha, confirmarSenha, this.state.isEdit, email, municipio);
        if (!retornoValidacao.sucesso) {
            retornoValidacao.erros.forEach(function (mensagem) {
                Notificacao.erro("", mensagem);
            });            
            return;
        }

        const result = await KeycloakService.salvarUsuario(idUsuario, unidadeAdministrativa, cargo, cpf, nomeCompleto, telefone, email, login, senha, perfil, this.state.isEdit, this.props.keycloakToken, municipio);

        console.log("Salvar usuário result")
        console.log(result)

        if (result.sucesso) {
            this.props.buscarUsuarios();
            this.limparFormularioUsuario();
            this.toggleModal();
            Notificacao.sucesso("Sucesso", "Usuário atualizado com sucesso");
        }
        else {
            console.log("Erro ao salvar usuário")
            console.log(result.mensagem)
            Notificacao.erro("Erro ao salvar", result.mensagem);
        }        
    }

    limparFormularioUsuario() {
        document.getElementById("nomeCompletoUsuario").value = "";
        document.getElementById("senhaUsuario").value = "";
        document.getElementById("emailUsuario").value = "";
        document.getElementById("cpfUsuario").value = "";
        document.getElementById("unidadeAdministrativaUsuario").value = "";
        document.getElementById("cargoUsuario").value = "";
        document.getElementById("telefoneUsuario").value = "";
        document.getElementById("loginUsuario").value = "";
        document.getElementById("municipioUsuario").value = "";
        this.setState({
            usuario: "",
            municipioUsuario: ""
        });
    }

    validarSenhaForte() {
        var inputSenha = document.getElementById("senhaUsuario");
        var senha = inputSenha.value;

        if (senha.length < 8 || validator.isStrongPassword(senha, {
            minLength: 8,
            minLowercase: 1,
            minNumbers: 1,
            minSymbols: 1,
        })
        ) {
            inputSenha.classList.remove("erro");
        }
        else {
            inputSenha.classList.add("erro");
        }
    }

    validarCPF(event) {
        const valor = event.target.value;
        if (valor !== "" && isNaN(valor)) {
            Notificacao.alerta("CPF", "Digitar somente números");
        }
    }

    validarTelefone(event) {
        const valor = event.target.value;
        if (valor !== "" && isNaN(valor)) {
            Notificacao.alerta("Telefone", "Digitar somente números");
        }
    }

    onChangeEmail(event) {
        const valor = event.target.value;
        this.setState({ usuario: valor });
    }

    onChangeMunicipio(event) {
        const valor = event.value;
        this.setState({ municipioUsuario: valor });
    }

    onChangeCargo(event) {
        this.setState({ cargo: event.value });
    }

    onChangeUnidadeAdministrativa(event) {
        this.setState({ unidadeAdministrativa: event.value });
    }

    render() {
        return (
            <div className="modal-usuario-wrapper">
                <ReactModal
                    isOpen={this.state.showModal}
                    ariaHideApp={false}
                    portalClassName ="container-modal-usuario"
                >
                    <div className="modal-usuario-header">
                        <font className="titulo-header">{ this.state.isEdit ? "EDITAR" : "CRIAR" } USUÁRIO</font>
                        <button onClick={this.toggleModal}>X</button>
                    </div>
                    <div className="modal-usuario-body">
                        <form autoComplete="off">
                            <div className="row">
                                <div className="col-6">
                                    <div className="form-group">
                                        <label htmlFor="unidadeAdministrativaUsuario" className="label-modal-usuario">Unidade Administrativa</label>
                                        <Select
                                            name="unidadeAdministrativaUsuario"
                                            id="unidadeAdministrativaUsuario"
                                            options={this.props.unidadesAdministrativas}
                                            className="basic-multi-select"
                                            classNamePrefix="select"
                                            placeholder="Selecione..."
                                            onChange={this.onChangeUnidadeAdministrativa}
                                        />
                                    </div>
                                </div>
                                <div className="col-6">
                                    <div className="form-group">
                                        <label htmlFor="cargoUsuario" className="label-modal-usuario">Cargo</label>
                                        <Select
                                            name="cargoUsuario"
                                            id="cargoUsuario"
                                            options={this.props.cargos}
                                            className="basic-multi-select"
                                            classNamePrefix="select"
                                            placeholder="Selecione..."
                                            onChange={this.onChangeCargo}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-6">
                                    <div className="form-group">
                                        <label htmlFor="cpfUsuario" className="label-modal-usuario">CPF</label>
                                        <input
                                            type="text"
                                            className="form-control input-modal-usuario"
                                            id="cpfUsuario"
                                            defaultValue={this.props.usuarioEditar ? this.props.usuarioEditar.cpf : ""}
                                            onChange={this.validarCPF}
                                            placeholder="Digitar somente números"
                                            maxLength="11"
                                        />
                                    </div>
                                </div>
                                <div className="col-6">
                                    <div className="form-group">
                                        <label htmlFor="municipioUsuario" className="label-modal-usuario">Município</label>
                                        <Select
                                            name="municipioUsuario"
                                            id="municipioUsuario"
                                            options={this.props.municipios}
                                            className="basic-multi-select"
                                            classNamePrefix="select"
                                            onChange={this.onChangeMunicipio}
                                            placeholder="Selecione..."
                                            defaultValue={this.props.municipios.filter(f => f.value === this.state.municipioUsuario) || ""}
                                        />
                                    </div>
                                </div>                                
                            </div>
                            <div className="row">
                                <div className="col-12">
                                    <div className="form-group">
                                        <label htmlFor="nomeCompletoUsuario" className="label-modal-usuario">Nome completo</label>
                                        <input type="text" className="form-control input-modal-usuario" id="nomeCompletoUsuario" defaultValue={this.props.usuarioEditar ? this.props.usuarioEditar.nomeCompleto : ""} />
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-6">
                                    <div className="form-group">
                                        <label htmlFor="telefoneUsuario" className="label-modal-usuario">Telefone</label>
                                        <input
                                            type="text"
                                            className="form-control input-modal-usuario"
                                            id="telefoneUsuario"
                                            defaultValue={this.props.usuarioEditar ? this.props.usuarioEditar.telefone : ""}
                                            onChange={this.validarTelefone}
                                            placeholder="Digitar somente números"
                                            maxLength="11"
                                        />
                                    </div>
                                </div>
                                <div className="col-6">
                                    <div className="form-group">
                                        <label htmlFor="emailUsuario" className="label-modal-usuario">E-mail</label>
                                        <input type="email" className="form-control input-modal-usuario" id="emailUsuario" defaultValue={this.props.usuarioEditar ? this.props.usuarioEditar.email : ""} onChange={this.onChangeEmail} />
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-6">
                                    <div className="form-group">
                                        <label htmlFor="perfilUsuario" className="label-modal-usuario">Perfil</label>
                                        <select id="perfilUsuario" className="form-control input-modal-usuario">
                                            <option value="Administrador">Administrador</option>
                                            <option value="Comum">Comum</option>
                                            <option value="Visualizacao">Visualização</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="col-6">
                                    <div className="form-group">
                                        <label htmlFor="loginUsuario" className="label-modal-usuario">Login usuário</label>
                                        <input readOnly={true} type="text" className="form-control input-modal-usuario" id="loginUsuario" defaultValue={this.props.usuarioEditar ? this.props.usuarioEditar.usuario : this.state.usuario} />
                                    </div>
                                </div>                                
                            </div>
                            <div className="row">
                                <div className="col-6">
                                    <div className="form-group">
                                        <label htmlFor="senhaUsuario" className="label-modal-usuario">Senha</label>
                                        <input
                                            type="password"
                                            className="form-control input-modal-usuario"
                                            id="senhaUsuario"
                                            onChange={this.validarSenhaForte}
                                            data-tooltip-id="senha-tooltip"
                                            data-tooltip-html="<div><b>Requisitos para senha válida:</b><br><ul><li>Conter no minímo 8 caractéres</li><li>Uma letra minúscula</li><li>Uma letra maiúscula</li><li>Um número</li><li>Um caractére especial (!, @, #, $, %...)</li></ul></div>"
                                        />
                                        <Tooltip
                                            id="senha-tooltip"
                                        />
                                    </div>
                                </div>
                                <div className="col-6">
                                    <div className="form-group">
                                        <label htmlFor="confirmarSenhaUsuario" className="label-modal-usuario">Confirmar senha</label>
                                        <input type="password" className="form-control input-modal-usuario" id="confirmarSenhaUsuario" />
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-6"></div>
                                <div className="col-6">
                                    <button className="btn-salvar-usuario" type="button" onClick={this.salvarUsuario}>SALVAR</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </ReactModal>
            </div>
        );
    }
}

export default ModalUsuario;