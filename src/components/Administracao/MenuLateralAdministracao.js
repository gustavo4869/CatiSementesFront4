import React, { Component } from 'react';
import './css/MenuLateralAdministracao.css';

const MenuLateralAdministracao = (props) => {

    return (
        <div className="container-menu-lateral-administracao">
            <button className="titulo-menu" onClick={() => window.location.replace('/Administracao/Index') }>
                <font>ADMINISTRADOR</font>
            </button>
            <button className={props.menuAtivo === "USUARIOS" ? "active opcao-menu" : "opcao-menu"} onClick={() => window.location.replace('/Usuarios/Index')}>
                <font>Usuários</font>
            </button>
            <button className={props.menuAtivo === "PRODUTOS" ? "active opcao-menu" : "opcao-menu"} onClick={() => window.location.replace('/Produtos/Index')}>
                <font>Produtos</font>
            </button>
            <button className={props.menuAtivo === "PONTOSVENDAS" ? "active opcao-menu" : "opcao-menu"} onClick={() => window.location.replace('/PontoVenda/Index')}>
                <font>Pontos de venda</font>
            </button>
            <button className="produtos-menu">
                <font>{props.texto}</font>
            </button>

        </div>
    );
}

export default MenuLateralAdministracao;