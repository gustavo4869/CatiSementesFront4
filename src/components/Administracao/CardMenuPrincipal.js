import React, { Component, useState } from 'react';
import './css/CardMenuPrincipal.css';

const CardMenuPrincipal = ({ texto, imagem, url } ) => {
    const AbrirMenu = () => {
        if(url)
            window.location.replace(url);
    }

    return (
        <div className="card-menu" onClick={AbrirMenu}>
            <img src={imagem}></img>
            <p>{texto}</p>
        </div>
    )
}


export default CardMenuPrincipal;