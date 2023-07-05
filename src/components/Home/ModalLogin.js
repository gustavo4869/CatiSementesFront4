import React from 'react';
import Axios from "axios";
import ReactModal from 'react-modal';
import '../css/modalLogin.css';
import { BrowserRouter, Route, Link } from 'react-router-dom';

const keycloakUserLoginUrl = "";
const client = Axios.create();

class ModalLogin extends React.Component {

    state = {
        openModal: false,
        txtUsuario: "",
        txtSenha: ""
    }

    login = () => {
        /*var parametros = {
            usuario: this.state.txtUsuario,
            senha: this.state.txtSenha
        };

        console.log("Enviar parametros");
        console.log(parametros)
        const response = client.post("/Administracao/Login", parametros)
            .then((response) => {
                console.log("response");
                console.log(response);
                var retorno = response.data;
                if (!retorno.sucesso) {
                    alert("Erro login - " + retorno.mensagem);
                }

                alert("Autenticado")
            }).catch((erro) => {
                console.log("Erro");
                console.log(erro)
            });*/
    }

    onChangeUsuario = event => {
        this.setState({
            txtUsuario: event.target.value
        });

        console.log("usuario: " + event.target.value);
    }

    onChangeSenha = event => {
        this.setState({
            txtSenha: event.target.value
        });

        console.log("senha: " + event.target.value);
    }

    onClickButton = e => {
        e.preventDefault()
        this.setState({ openModal: true })
    }

    onCloseModal = () => {
        this.setState({ openModal: false })
    }

    componentDidMount() {
        ReactModal.setAppElement('body');
    }

    render() {
        return (
            <div>
                <button className="btn-abrir-modal"><Link to="/Administracao">Acesse aqui</Link></button>
                <ReactModal isOpen={this.state.openModal} onClose={this.onCloseModal} portalClassName="modal-login">
                    <button className="btn-fechar-modal" onClick={this.onCloseModal}>X</button>
                    <div>
                        <div className="container-titulo-modal">
                            <p>Acessar conta</p>
                        </div>
                        <form>
                            <label className="input-label">Usuário</label>
                            <input type="text" className="input-text" value={this.state.value} onChange={this.onChangeUsuario} placeholder="Digite seu usuário aqui..."/>
                            <br/>
                            <label className="input-label">Senha</label>
                            <input type="password" className="input-text" value={this.state.value} onChange={this.onChangeSenha} placeholder="Digite sua senha aqui..."/>
                            <br />
                            <button type="button" className="btn-entrar" onClick={this.login}>ENTRAR</button>
                        </form>
                    </div>
                </ReactModal>
            </div>            
        );
    }
}

export default ModalLogin;