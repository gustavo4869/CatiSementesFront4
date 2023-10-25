import React, { Component } from 'react';
import keycloak from '../keycloak';

import NavMenuLogado from '../shared/NavMenuLogado';
import MenuLateralAdministracao from './MenuLateralAdministracao';
import CardMenuPrincipal from './CardMenuPrincipal';
import IndexMenuAdministracao from './IndexMenuAdministracao';
import IndexMenuComum from './IndexMenuComum';
import KeycloakStart from '../shared/KeycloakStart';
import KeycloakNoAuth from '../shared/KeycloakNoAuth';

import './css/IndexAdministracao.css';

class IndexAdministracao extends Component {
    constructor(props) {
        super(props);
        this.state = { keycloak: null, authenticated: false };
    }

    componentDidMount() {
        console.log("MOunt")
        console.log(keycloak)
        keycloak.init({ onLoad: 'login-required', checkLoginIframe: false }).then(authenticated => {
            this.setState({ keycloak: keycloak, authenticated: authenticated })
        });

    }

    render() {
        if (this.state.keycloak) {
            if (this.state.authenticated) {
                if (!this.state.keycloak.hasRealmRole("Comum")) {
                    return (
                        <div className="container-administracao">
                            <IndexMenuAdministracao keycloak={this.state.keycloak}/>
                        </div>);
                }
                else {
                    return (
                        <div className="container-administracao">
                            <IndexMenuComum keycloak={this.state.keycloak} />
                        </div>);
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