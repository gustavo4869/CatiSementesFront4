import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import '../css/carregando.css';

const KeycloakNoAuth = () => {
    return (
        <div className="container-carregando">
            <FontAwesomeIcon icon={faSpinner} className="fa-spin" />
        </div>
    );
}

export default KeycloakNoAuth;