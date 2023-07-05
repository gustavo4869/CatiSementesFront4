import React, { Component } from 'react';
import axios from 'axios';
import ReactModal from 'react-modal';

import KeycloakService from '../../services/KeycloakService';
import Util from '../Util/Util';

import imgBtnAdicionar from '../../images/Adicionar.png';

import './css/ModalUsuario.css';
import 'react-responsive-modal/styles.css';

class CardAtributo extends Component {
    constructor(props) {
        super(props);

        this.state = {
            dados: [],
            nomeClassificacao: ""
        };
    }

    render() {
        return (
            <div className="card-atributo col-3 mt-4">
                <div className="card-atributo-header">
                    <label>{ this.props.nomeClassificacao }</label>
                    <button onClick={this.props.abrirModal}><img src={imgBtnAdicionar}></img></button>
                </div>
                <div className="card-atributo-body">
                    {this.props.dados.map((peso) =>
                        <div
                            className="item-atributo"
                        >
                            <div
                                className="item-atributo"
                                key={"pesoEmbalagem-" + peso.idpeso}
                                id={"card-pesoEmbalagem-" + peso.idpeso}
                            >
                                <span>{peso.desPeso}</span>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        );
    }
}

export default CardAtributo;