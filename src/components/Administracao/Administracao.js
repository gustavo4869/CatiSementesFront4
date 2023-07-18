import React, { Component } from 'react';
import keycloak from '../keycloak';

import NavMenuLogado from '../shared/NavMenuLogado';
import MenuLateralAdministracao from './MenuLateralAdministracao';
import CardMenuPrincipal from './CardMenuPrincipal';
import KeycloakStart from '../shared/KeycloakStart';
import KeycloakNoAuth from '../shared/KeycloakNoAuth';

import logoUsuarios from '../images/silhueta-de-multiplos-usuarios 1.png';
import logoUnidades from '../images/localizador 1.png';
import logoProdutos from '../images/adicionar-produto 1.png';

import './css/Administracao.css';

class Administracao extends Component {
    constructor(props) {
        super(props);
        this.state = { keycloak: null, authenticated: false };
    }

    componentDidMount() {
        keycloak.init({ onLoad: 'login-required' }).then(authenticated => {
            keycloak.loadUserInfo();
            this.setState({ keycloak: keycloak, authenticated: authenticated })
        })
    }
    render() {
        if (this.state.keycloak) {
            if (this.state.authenticated) {
                if (!this.state.keycloak.hasRealmRole("Comum")) {
                    return (
                        <div className="container-administracao">
                            <NavMenuLogado keycloak={this.state.keycloak} />
                            <MenuLateralAdministracao menuAtivo="ADMINISTRADOR" />
                            <div className="row container-menu">
                                <CardMenuPrincipal texto="GERENCIAR USUÁRIOS" imagem={logoUsuarios} url="/usuarios/index" />
                                <CardMenuPrincipal texto="PONTOS DE VENDAS" imagem={logoUnidades} url="/pontovenda/index"/>
                                <CardMenuPrincipal texto="GERENCIAR PRODUTOS E ATRIBUTOS" imagem={logoProdutos} url="/produtos/index" />
                            </div>
                        </div>
                    );
                }
                else {
                    return (<h1>Você não tem acesso!</h1>);
                }
            }
            else {
                return (<KeycloakNoAuth />)
            }
        }
        return (
            <KeycloakStart />
        );
    }
}

export default Administracao;