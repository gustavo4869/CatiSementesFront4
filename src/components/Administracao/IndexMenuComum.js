import React, { Component, useState } from 'react';
import NavMenuLogado from '../shared/NavMenuLogado';
import CardMenuPrincipal from './CardMenuPrincipal';

import logoAdministrador from '../images/administrador 1.png';

import './css/IndexAdministracao.css';


const IndexMenuComum = ({ keycloak }) => {
    return (
        <div className="container-administracao">
            <NavMenuLogado keycloak={keycloak} />
            <div className="row container-menu-index">
            </div>
        </div>
    )
}


export default IndexMenuComum;