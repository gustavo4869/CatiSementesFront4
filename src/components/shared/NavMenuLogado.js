import React, { Component } from 'react';

import keycloak from '../keycloak';

import setaBaixo from '../images/dropdown-seta-baixo.png';
import setaCima from '../images/dropdown-seta-cima.png';

import '../css/navMenuLogado.css'

class NavMenuLogado extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showDropDown: false,
            nomeUsuario: ""
        };

        this.toggleDropDown = this.toggleDropDown.bind(this);
        this.logout = this.logout.bind(this);
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

    async loadUsername() {
        var usuario = "Usuário";
        console.log("loadUsername")
        console.log(this.props.keycloak)
        if (!this.props.keycloak) {
            return usuario;
        }
            
        if (!this.props.keycloak.userInfo) {
            await this.props.keycloak.loadUserInfo()
                .then(function (userInfo) {
                    usuario = userInfo.preferred_username;
                    console.log("usuario")
                    console.log(usuario)
                });

            this.setState({ nomeUsuario: usuario });
        }
        else {
            this.setState({ nomeUsuario: this.props.keycloak.userInfo.preferred_username });
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