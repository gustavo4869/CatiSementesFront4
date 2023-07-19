import React, { useState, useEffect } from 'react';

import { BrowserRouter, Route, Link } from 'react-router-dom';
import imgHome from "../images/background-home.png";
import imgCatiSementes from "../images/NavMenuLogo_1.png";
import '../css/home.css'

const Home = () => {
        return (
            <div className="home-container">
                <button className="btn-abrir-modal"><Link to="/Administracao/Index" >Acesse aqui</Link></button>
                {/*<button className="btn-sobre"><Link to="/sobre">Sobre</Link></button>*/}
                <div className="container-conteudo">
                    <div className="container-conteudo-img">
                        <img className="conteudo-img" src={imgCatiSementes}></img>
                    </div>
                    <div className="barra-vertical-home"></div>
                    {/*<div className="container-conteudo-texto">
                        <p>
                            A plataforma é uma solução de integração de funcionalidades para o Departamento de Sementes, Mudas e Matrizes (DSMM), da CATI,
                            para ajudar no processo de produzir e disponibilizar ao produtor rural SEMENTES e MUDAS com qualidade genética, fisiológica e sanitária.
                        </p>
                    </div>*/}
                </div>
            </div>
    )
}

export default Home;