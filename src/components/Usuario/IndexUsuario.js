import React, { Component } from 'react';
import keycloak from '../keycloak';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileExcel, faFilePdf } from '@fortawesome/free-solid-svg-icons'

import KeycloakStart from '../shared/KeycloakStart';
import KeycloakNoAuth from '../shared/KeycloakNoAuth';
import NavMenuLogado from '../shared/NavMenuLogado';
import MenuLateralAdministracao from '../Administracao/MenuLateralAdministracao';
import ModalUsuario from './ModalUsuario';
import ModalFiltroAvancadoUsuario from './ModalFiltroAvancadoUsuario';
import KeycloakService from '../../services/KeycloakService';
import Notificacao from '../Util/Notificacao';
import ExternalService from '../../services/ExternalService';
import PdvService from '../../services/pontoVenda/PontoVendaService';
import Dados from "../../configuration/dados.json";


import logoUsuarios from '../images/silhueta-de-multiplos-usuarios 1.png';

import './css/IndexUsuario.css';

class IndexUsuario extends Component {
    constructor(props) {
        super(props);

        this.state = {
            processando: false,
            keycloak: null,
            authenticated: false,
            usuarios: [],
            usuariosOriginal: [],
            keycloakToken: null,
            usuarioEditar: null,
            showModal: false,
            showModalFiltro: false,
            nomeUsuario: null,
            isEdit: false,
            perfil: "",
            idUsuario: "",
            emailBusca: "",
            municipios: [],
            cargos: Dados.cargos,
            unidadesAdministrativas: [],
            filtroUsuario: {
                nome: "",
                unidadeAdministrativa: "",
                cargo: "",
                municipio: ""
            }
        };

        this.toggleModal = React.createRef();
        this.toggleModalFiltro = React.createRef();
    }

    componentDidMount() {
        keycloak.init({ onLoad: 'login-required' }).then(authenticated => {
            this.setState({
                keycloak: keycloak,
                authenticated: authenticated,
                keycloakToken: keycloak.token,
                perfil: "",
                idUsuario: keycloak.subject
            });
            this.buscarUsuarios(keycloak.token);
            this.buscarMunicipios();
            this.buscarUnidades();
        });

    }

    async buscarMunicipios() {
        const municipios = await ExternalService.buscarMunicipios();
        this.setState({ municipios: municipios.dados });
    }

    async buscarUsuarios(token) {
        this.setState({ processando: true });
        var userToken = "";
        if (token) {
            userToken = token;
            this.setState({ keycloakToken: token });
        }
        else {
            userToken = this.state.keycloakToken;
        }

        const result = await KeycloakService.buscarUsuarios(userToken);
        if (result.sucesso) {
            result.usuarios = result.usuarios.map(item => {
                const mun = this.state.municipios.filter(f => f.value === parseInt(item.municipio === "" ? "0" : item.municipio));
                let nomeMun = "";
                if (mun.length > 0) {
                    nomeMun = mun[0].label ?? "";
                }

                const un = item.unidadeAdministrativa;
                let unidade = null;
                let unidadeNome = "";
                let idUnidade = "";
                if (!isNaN(un) && un !== "") {
                    unidade = this.state.unidadesAdministrativas.filter(f => f.value === parseInt(item.unidadeAdministrativa))[0];
                    unidadeNome = unidade.label;
                    idUnidade = unidade.value;                    
                }                
                
                return {
                    ...item,
                    nomeMunicipio: nomeMun,
                    unidadeAdministrativa: unidadeNome,
                    idUnidadeAdministrativa: idUnidade
                }
            });
            this.setState({ usuarios: result.usuarios, usuariosOriginal: result.usuarios });
        }
        else {
            console.log(result);
            Notificacao.erro("Erro", "Erro ao buscar usuários");
        }

        this.setState({ processando: false });
    }

    async buscarUnidades() {
        let result = await PdvService.getAllPdv(0, 1000);

        if (!result.sucesso) {
            Notificacao.erro("Erro", "Não foi possível buscar unidades");
        }

        this.setState({
            unidadesAdministrativas: result.pdv.map(u => {
                return {
                    label: u.desUnidade,
                    value: u.idpdv
                }
            })
        });
    }

    novoUsuario() {
        this.setState({ usuarioEditar: null, isEdit: false },
            function () {
                this.toggleModal.current.toggleModal();
            });        
    }

    abrirFiltroUsuario() {
        this.toggleModalFiltro.current.toggleModalFiltro();
    }

    async excluirUsuarios() {
        var selecionados = document.getElementsByClassName("radio-btn-usuario");

        if (Array.from(selecionados).filter(x => x.id === "radio-" + keycloak.subject).length > 0) {
            Notificacao.erro("Erro", "Não é possível excluir seu próprio acesso. Desmarque o seu usuário e tente novamente.");
            return;
        }

        var result = await KeycloakService.excluirUsuarios(selecionados);
        if (!result.sucesso) {
            Notificacao.erro("Erro", "Erro ao excluir usuarios")
        }
        else {
            Notificacao.sucesso("Sucesso", "Usuários excluídos com sucesso")
        }

        this.buscarUsuarios(null);
    }

    editarUsuarios() {
        var checkbox = document.getElementsByClassName("radio-btn-usuario");
        var selecionados = [];
        for (var i = 0; i < checkbox.length; i++) {
            if (checkbox[i].checked) {
                selecionados.push(checkbox[i]);
            }
        }

        if (selecionados.length > 1 || selecionados.length === 0) {
            Notificacao.alerta("Usuários", "Selecione apenas 1 usuário");
            return;
        }

        var id = selecionados[0].id.split("radio-")[1];
        var usuarioEditar = this.state.usuarios.find(obj => {
            return obj.id === id;
        });

        this.setState({ usuarioEditar: usuarioEditar, isEdit: true }, () => {
            this.toggleModal.current.toggleModal();
        });
    }

    checkAllUsuarios() {
        const checkAll = document.getElementById("checkAllUsuarios").checked;
        var checks = document.getElementsByClassName("radio-btn-usuario");
        for (var i = 0; i < checks.length; i++) {
            checks[i].checked = checkAll;
        }
    }

    uncheckAllUsuarios() {
        var checks = document.getElementsByClassName("radio-btn-usuario");
        for (var i = 0; i < checks.length; i++) {
            checks[i].checked = false;
        }
    }

    filtrarUsuarios(event) {
        const email = event.target.value;
        let filtroState = this.state.filtroUsuario;
        filtroState.nome = email;
        if (filtroState.nome === "" && filtroState.cargo === "" && filtroState.unidadeAdministrativa === "" && filtroState.municipio === "") {
            this.setState(filtro => ({
                usuarios: this.state.usuariosOriginal,
                filtroUsuario: filtroState
            }));
        }
        else {
            this.setState({
                filtroUsuario: filtroState,
                usuarios: this.state.usuariosOriginal.filter(usuario => {
                    const verificaNome = filtroState.nome === "" || usuario.email?.includes(filtroState.nome) || usuario.cpf?.includes(filtroState.nome);
                    const verificaCargo = filtroState.cargo === "" || usuario.cargo === filtroState.cargo;
                    const verificaUnidadeAdministrativa = filtroState.unidadeAdministrativa === "" || usuario.idUnidadeAdministrativa == filtroState.unidadeAdministrativa; // Usando == para coerção de tipo
                    const verificaMunicipio = filtroState.municipio === "" || usuario.municipio.includes(filtroState.municipio);

                    return verificaNome && verificaCargo && verificaUnidadeAdministrativa && verificaMunicipio;
                })
            });
        }
    }

    filtrarModal(filtro) {
        this.setState(state => ({
            filtroUsuario: {
                ...state.filtroUsuario,
                municipio: filtro.municipio,
                unidadeAdministrativa: filtro.unidadeAdministrativa,
                cargo: filtro.cargo
            }
        }), () => {
            this.filtrarUsuarios({ target: { value: this.state.filtroUsuario.nome } });
            this.toggleModalFiltro.current.toggleModalFiltro();
        });
    }

    apagarBuscaUsuarios() {
        this.setState({
            filtroUsuario: {
                nome: "",
                municipio: "",
                unidadeAdministrativa: "",
                cargo: ""
            }
        }, () => {
            this.filtrarUsuarios({ target: { value: "" } });
        });
    }

    getUnidadeAdministrativa(id) {
        return this.state.unidadesAdministrativas.filter(f => f.value === id)[0].label;
    }

    render() {
        if (this.state.keycloak) {
            if (this.state.authenticated) {
                if (!this.state.keycloak.hasRealmRole("Comum")) {
                    return (
                        <div className="container-usuario">
                            <NavMenuLogado keycloak={this.state.keycloak} />
                            <MenuLateralAdministracao menuAtivo="USUARIOS" texto="USUÁRIOS" />
                            <div className="container-usuario-conteudo">
                                <div className="row container-busca-usuarios">
                                    <div className="col-2 container-titulo">
                                        <img src={logoUsuarios}></img>
                                        <font>GERENCIAR USUÁRIOS</font>
                                    </div>
                                    <div className="col-10 container-input container-input-usuarios">
                                        <div className="wrapper-busca">
                                            <div className="wrapper-input-busca">
                                                <input className="input-busca-usuario" type="text" placeholder="Buscar usuários" onChange={this.filtrarUsuarios.bind(this)} value={this.state.filtroUsuario.nome} />
                                                <div className="btn-apagar-busca-usuario" onClick={this.apagarBuscaUsuarios.bind(this)}>X</div>
                                                <div className="btn-busca-usuario"></div>                                                
                                            </div>
                                            <button className="btn-filtro-avancado-usuario" onClick={this.abrirFiltroUsuario.bind(this)}></button>                                                
                                            <button
                                                className="btn-editar"
                                                disabled={this.state.keycloak.hasRealmRole("Visualizacao")}
                                                onClick={this.novoUsuario.bind(this)}
                                            >
                                                <font>Criar usuário</font>
                                            </button>
                                        </div>                                        
                                        <ModalUsuario
                                            ref={this.toggleModal}
                                            keycloakToken={this.state.keycloak.token}
                                            usuarioEditar={this.state.usuarioEditar}
                                            buscarUsuarios={this.buscarUsuarios.bind(this)}
                                            isEdit={this.state.isEdit}
                                            municipios={this.state.municipios}
                                            unidadesAdministrativas={this.state.unidadesAdministrativas}
                                            cargos={this.state.cargos}
                                        />
                                        <ModalFiltroAvancadoUsuario
                                            ref={this.toggleModalFiltro}
                                            filtrarModal={this.filtrarModal.bind(this)}
                                            buscarUsuarios={this.buscarUsuarios.bind(this)}
                                            municipios={this.state.municipios}
                                            unidadesAdministrativas={this.state.unidadesAdministrativas}
                                            cargos={this.state.cargos}
                                            filtro={this.state.filtroUsuario}
                                        />
                                    </div>
                                </div>
                                <div className="row container-acoes">
                                    <button
                                        className="btn-editar"
                                        onClick={this.editarUsuarios.bind(this)}
                                        disabled={this.state.keycloak.hasRealmRole("Visualizacao")}
                                    >
                                        Editar
                                    </button>
                                    <button
                                        className="btn-excluir"
                                        onClick={this.excluirUsuarios.bind(this)}
                                        disabled={this.state.keycloak.hasRealmRole("Visualizacao")}
                                    >
                                        Excluir
                                    </button>
                                </div>
                                <div className="row container-tabela-usuarios">
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>Selecionar todos <br /> <input type="checkbox" id="checkAllUsuarios" onClick={this.checkAllUsuarios.bind(this)} /></th>
                                                <th>Unidade Administrativa</th>
                                                <th>Cargo/Função</th>
                                                <th>Município</th>
                                                <th>CPF</th>
                                                <th>Nome Completo</th>
                                                <th>Telefone</th>
                                                <th>E-mail</th>
                                                <th>Login Usuário</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {this.state.usuarios.map((usuario) =>
                                                <tr id={"tr-" + usuario.id}>
                                                    <td><input type="checkbox" className="radio-btn-usuario" id={"radio-" + usuario.id} /></td>
                                                    <td>{usuario.unidadeAdministrativa}</td>
                                                    <td>{usuario.cargo}</td>
                                                    <td>{usuario.nomeMunicipio}</td>
                                                    <td>{usuario.cpf}</td>
                                                    <td>{usuario.nomeCompleto}</td>
                                                    <td>{usuario.telefone}</td>
                                                    <td>{usuario.email}</td>
                                                    <td>{usuario.usuario}</td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    );
                }
                else {
                    return (<h1>Você não tem acesso!</h1>)
                }
            }
            else {
                return (<KeycloakNoAuth />)
            }
        }
        return (
            <KeycloakStart />
        );
    }
}

export default IndexUsuario;