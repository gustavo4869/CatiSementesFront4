import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import '../css/KeycloakStart.css';

const KeycloakStart = () => {
    return (
        <div className="container-keycloakstart">
            <FontAwesomeIcon icon={faSpinner} className="fa-spin" />
        </div>
    );
}

export default KeycloakStart;