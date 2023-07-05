import React, { Component } from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import imgSobre from "../images/Imagem-Sobre.png";
import '../css/sobre.css'

export class Sobre extends Component {
    static displayName = Sobre.name;

    render() {
        return (
            <div className="sobre-container">
                <button className="btn-abrir-modal"><Link to="/Administracao">Acesse aqui</Link></button>
                <button className="btn-sobre"><Link to="/">Home</Link></button>
                <div className="container-conteudo-sobre">
                    <div className="container-conteudo-titulo">
                        <h2 className="titulo-sobre">Sobre a CATI</h2>
                    </div>
                    <br/>
                    <div className="container-conteudo-texto">
                        <p>
                            A CATI, órgão da Secretaria de Agricultura e Abastecimento do Governo do Estado de São Paulo, desde 1967, quando foi criada,
                            vem trabalhando para o produtor rural, prestando serviços e oferecendo seus produtos
                            (DECRETO nº 41.608 de 24/2/1997 - Reorganização da Coordenadoria de Assistência Técnica Integral - CATI,
                            da Secretaria de Agricultura e Abastecimento e dá providências correlatas). Com sede em Campinas (SP), a rede da CATI é composta por 40 Escritórios de
                            Desenvolvimento Rural (EDRs) distribuídos nas várias regiões do Estado de São Paulo.
                            Os 40 EDRs englobam as Casas de Agricultura municipais ( Veja a relação de municípios por região ) que estão presentes em todos os
                            municipios do Estado de São Paulo. Além disto, a CATI possui 21 Núcleos de Produção de Sementes, Mudas e Matrizes, produzindo variedades
                            de sementes e mudas.
                        </p>
                        <img src={imgSobre}></img>
                    </div>
                </div>
            </div>
        );
    }
}
