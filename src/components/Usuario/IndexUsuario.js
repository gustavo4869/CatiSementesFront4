import React, { Component } from 'react';
import keycloak from '../keycloak';
import axios from 'axios';

import Carregando from '../shared/Carregando';
import KeycloakStart from '../shared/KeycloakStart';
import KeycloakNoAuth from '../shared/KeycloakNoAuth';
import NavMenuLogado from '../shared/NavMenuLogado';
import MenuLateralAdministracao from '../Administracao/MenuLateralAdministracao';
import ModalUsuario from './ModalUsuario';
import KeycloakService from '../../services/KeycloakService';
import Notificacao from '../Util/Notificacao';

import logoUsuarios from '../images/silhueta-de-multiplos-usuarios 1.png';

import './css/IndexUsuario.css';

class IndexUsuario extends Component {
    constructor(props) {
        super(props);

        this.state = {
            processando: false,
            keycloak: null,
            authenticated: false,
            usuarios: [],
            keycloakToken: null,
            usuarioEditar: null,
            showModal: false,
            nomeUsuario: null,
            isEdit: false,
            perfil: "",
            idUsuario: ""
        };

        this.toggleModal = React.createRef();

    }

    componentDidMount() {
        keycloak.init({ onLoad: 'login-required' }).then(authenticated => {
            keycloak.loadUserInfo();
            
            this.setState({
                keycloak: keycloak,
                authenticated: authenticated,
                keycloakToken: keycloak.token,
                perfil: "",
                idUsuario: keycloak.subject
            });

            this.buscarUsuarios(keycloak.token);
        });

    }

    async buscarUsuarios(token) {        
        this.setState({ processando: true });
        var userToken = "";
        if (token) {
            userToken = token;
            this.setState({ keycloakToken: token });
        }
        else {
            userToken = this.state.keycloakToken;
        }

        const result = await KeycloakService.buscarUsuarios(userToken);
        console.log(result)
        if (result.sucesso) {
            this.setState({ usuarios: result.usuarios });
        }
        else {
            Notificacao.erro("Erro", "Erro ao buscar usuários");
        }

        this.setState({ processando: false });
    }

    novoUsuario() {
        this.setState({ usuarioEditar: null, isEdit: false });
        this.toggleModal.current.toggleModal();
    }

    async excluirUsuarios() {
        console.log("Excluir usuarios")
        var selecionados = document.getElementsByClassName("radio-btn-usuario");
        var result = await KeycloakService.excluirUsuarios(selecionados, this.state.keycloakToken);
        console.log(result)
        if (!result.sucesso) {
            console.log("Erro ao excluir usuarios")
            console.log(result.mensagem)
        }
        else {
            console.log("Usuários excluídos com sucesso")
            this.buscarUsuarios(null);
        }
    }

    editarUsuarios() {
        console.log("Editar usuario")
        var checkbox = document.getElementsByClassName("radio-btn-usuario");
        var selecionados = [];
        for (var i = 0; i < checkbox.length; i++) {
            if (checkbox[i].checked) {
                selecionados.push(checkbox[i]);
            }
        }

        if (selecionados.length > 1 || selecionados.length == 0) {
            console.log("Selecione apenas 1 usuário");
            return;
        }

        var id = selecionados[0].id.split("radio-")[1];
        console.log(id)
        var usuarioEditar = this.state.usuarios.find(obj => {
            return obj.id === id;
        });

        console.log(usuarioEditar)
        this.setState({ usuarioEditar: usuarioEditar, isEdit: true });
        this.toggleModal.current.toggleModal();
    }

    checkAllUsuarios() {
        var checks = document.getElementsByClassName("radio-btn-usuario");
        for (var i = 0; i < checks.length; i++) {
            checks[i].checked = !checks[i].checked;
        }
    }

    render() {
        if (this.state.keycloak) {
            if (this.state.authenticated) {
                if (!this.state.keycloak.hasRealmRole("Comum")) {
                    return (
                        <div className="container-usuario">
                            <NavMenuLogado keycloak={this.state.keycloak} />
                            <MenuLateralAdministracao menuAtivo="USUARIOS" />
                            <div className="container-usuario-conteudo">
                                <div className="row container-busca">
                                    <div className="col-2 container-titulo">
                                        <img src={logoUsuarios}></img>
                                        <font>GERENCIAR USUÁRIOS</font>
                                    </div>
                                    <div className="col-10 container-input">
                                        <input type="text" placeholder="Buscar usuários" disabled={true} />
                                        <button
                                            className="btn-editar"
                                            disabled={this.state.keycloak.hasRealmRole("Visualizador")}
                                            onClick={this.novoUsuario.bind(this)}
                                        >
                                            <font>Criar usuário</font>
                                        </button>
                                        <ModalUsuario
                                            ref={this.toggleModal}
                                            keycloakToken={this.state.keycloak.token}
                                            usuarioEditar={this.state.usuarioEditar}
                                            buscarUsuarios={this.buscarUsuarios.bind(this)}
                                            isEdit={this.state.isEdit}
                                        />
                                    </div>
                                </div>
                                <div className="row container-acoes">
                                    <button
                                        className="btn-editar"
                                        onClick={this.editarUsuarios.bind(this)}
                                        disabled={this.state.keycloak.hasRealmRole("Visualizador")}
                                    >
                                        Editar
                                    </button>
                                    <button
                                        className="btn-excluir"
                                        onClick={this.excluirUsuarios.bind(this)}
                                        disabled={this.state.keycloak.hasRealmRole("Visualizador")}
                                    >
                                        Excluir
                                    </button>
                                </div>
                                <div className="row container-tabela-usuarios">
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>Selecionar todos <br /> <input type="checkbox" id="checkAllUsuarios" onClick={this.checkAllUsuarios.bind(this)} /></th>
                                                <th>Unidade Administrativa</th>
                                                <th>Cargo/Função</th>
                                                <th>CPF</th>
                                                <th>Nome Completo</th>
                                                <th>Telefone</th>
                                                <th>E-mail</th>
                                                <th>Login Usuário</th>
                                                <th>Observações</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {this.state.usuarios.map((usuario) =>
                                                <tr id={"tr-" + usuario.id}>
                                                    <td><input type="checkbox" className="radio-btn-usuario" id={"radio-" + usuario.id} /></td>
                                                    <td>{usuario.unidadeAdministrativa}</td>
                                                    <td>{usuario.cargo}</td>
                                                    <td>{usuario.cpf}</td>
                                                    <td>{usuario.nomeCompleto}</td>
                                                    <td>{usuario.telefone}</td>
                                                    <td>{usuario.email}</td>
                                                    <td>{usuario.usuario}</td>
                                                    <td>{usuario.observacoes}</td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    );
                }
                else {
                    return (<h1>Você não tem acesso!</h1>)
                }
            }
            else {
                return (<KeycloakNoAuth />)
            }
        }
        return (
            <KeycloakStart/>
        );
    }
}

export default IndexUsuario;