import React, { Component } from 'react';
import keycloak from '../keycloak';

import NavMenuLogado from '../shared/NavMenuLogado';
import MenuLateralAdministracao from './MenuLateralAdministracao';
import CardMenuPrincipal from './CardMenuPrincipal';
import KeycloakStart from '../shared/KeycloakStart';
import KeycloakNoAuth from '../shared/KeycloakNoAuth';

import logoAdministrador from '../images/administrador 1.png';
import logoProdutos from '../images/adicionar-produto 1.png';
import logoPontoVenda from '../images/localizador 1.png';

import './css/IndexAdministracao.css';

class IndexAdministracao extends Component {
    constructor(props) {
        super(props);
        this.state = { keycloak: null, authenticated: false };
    }

    componentDidMount() {
        console.log("MOunt")
        console.log(keycloak)
        keycloak.init({ onLoad: 'login-required', checkLoginIframe: false, enableLogging : true}).then(authenticated => {
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
                            <div className="row container-menu-index">
                                <CardMenuPrincipal texto="ADMINISTRADOR" imagem={logoAdministrador} url="/Administracao/Administrador" />
                                <CardMenuPrincipal texto="GERENCIAR PRODUTOS E ATRIBUTOS" imagem={logoProdutos} url="/produtos/index" />
                                <CardMenuPrincipal texto="PONTOS DE VENDA" imagem={logoPontoVenda} url="/pontovenda/index" />
                            </div>
                        </div>);
                }
                else {
                    return (<h1>Você não tem acesso!</h1>)
                }
            }
            else return (<KeycloakNoAuth />)

            return (
                <KeycloakStart />
            );
        }
    }
}

export default IndexAdministracao;