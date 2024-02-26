import React, { Component } from 'react';

import KeycloakService from '../../services/KeycloakService';

import setaBaixo from '../images/dropdown-seta-baixo.png';
import setaCima from '../images/dropdown-seta-cima.png';

import '../css/navMenuLogado.css'
import Notificacao from '../Util/Notificacao';

class NavMenuLogado extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showDropDown: false,
            nomeUsuario: "",
            emailUsuario: ""
        };

        this.toggleDropDown = this.toggleDropDown.bind(this);
        this.logout = this.logout.bind(this);
        this.alterarSenha = this.alterarSenha.bind(this);
        this.loadUsername = this.loadUsername.bind(this);
    }

    async componentDidMount() {
        await this.loadUsername();
    }

    toggleDropDown() {
        this.setState(state => ({
            showDropDown: !state.showDropDown
        }));
    }

    logout() {
        this.props.keycloak.logout();
    }

    async alterarSenha() {
        console.log(this.state)
        if (this.state.emailUsuario === "") {
            Notificacao.alerta("Ops!", "e-mail não configurado");
            return;
        }
        const resultado = await KeycloakService.alterarSenha(this.props.keycloak.userInfo.sub);
        if (resultado.sucesso) {
            Notificacao.sucesso("Senha", "Foi enviado um e-mail para sua caixa de entrada, verifique as instruções");
        }
    }

    async loadUsername() {
        var usuario = "Usuário";
        var email = "";

        if (!this.props.keycloak) {
            return usuario;
        }
            
        if (!this.props.keycloak.userInfo) {
            await this.props.keycloak.loadUserInfo()
                .then(function (userInfo) {
                    console.log("info")
                    console.log(userInfo)
                    usuario = userInfo.preferred_username;
                    email = userInfo.email ?? "";
                });

            this.setState({ nomeUsuario: usuario, emailUsuario: email });
        }
        else {
            this.setState({ nomeUsuario: this.props.keycloak.userInfo.preferred_username, emailUsuario: this.props.keycloak.userInfo.email ?? "" });
        }
    }

    render() {
        return (
            <div className="input-field nav-menu-logado">
                <div className="container-dropdown">
                    <div className="menu">
                        <button onClick={this.toggleDropDown}>
                            <span>Olá, {this.state.nomeUsuario}</span>
                            <img alt="" src={this.state.showDropDown?setaCima:setaBaixo}></img>
                        </button>
                        <ul className={this.state.showDropDown ? "menu-active" : "menu-inactive"}>
                            <li>
                                <button onClick={this.alterarSenha}>Alterar senha</button>
                            </li>
                            <li>
                                <button onClick={this.logout}>Sair</button>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}

export default NavMenuLogado;