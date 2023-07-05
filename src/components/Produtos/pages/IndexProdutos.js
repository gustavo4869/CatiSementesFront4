import React, { Component } from 'react';
import keycloak from '../../keycloak';

import NavMenuLogado from '../../shared/NavMenuLogado';
import MenuLateralAdministracao from '../../Administracao/MenuLateralAdministracao';
import CardMenuPrincipal from '../../Administracao/CardMenuPrincipal';
import KeycloakStart from '../../shared/KeycloakStart';
import KeycloakNoAuth from '../../shared/KeycloakNoAuth';

import logoCategorizacao from '../../images/categorizacao 1.png';
import logoProdutos from '../../images/adicionar-produto 1.png';

import '../css/IndexProdutos.css';

class Administracao extends Component {
    constructor(props) {
        super(props);
        this.state = { keycloak: null, authenticated: false };
    }

    componentDidMount() {
        keycloak.init({ onLoad: 'login-required' }).then(authenticated => {
            keycloak.loadUserInfo();
            this.setState({ keycloak: keycloak, authenticated: authenticated, nomeUsuario: keycloak.userInfo })
        });
    }
    render() {
        if (this.state.keycloak) {
            if (this.state.authenticated) {
                if (!this.state.keycloak.hasRealmRole("Comum")) {
                    return (
                        <div className="container-administracao">
                            <NavMenuLogado keycloak={this.state.keycloak} />
                            <MenuLateralAdministracao menuAtivo="PRODUTOS" />
                            <div className="row container-menu">
                                <CardMenuPrincipal texto="GERENCIAR ATRIBUTOS DE PRODUTOS" imagem={logoCategorizacao} url="/produtos/atributos" />
                                <CardMenuPrincipal texto="GERENCIAR PRODUTOS" imagem={logoProdutos} url="/produtos/gerenciar" />
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