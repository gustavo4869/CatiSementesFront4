import axios from 'axios';
import configData from "../configuration/config.json";

/* Services -> Keycloak */
const ambienteProd = configData.ambienteProd;
const urlBaseKeycloak = ambienteProd ? configData.urlBaseApiKeycloakProd : configData.urlBaseApiKeycloakDev;
const urlBaseKeycloakNode = (ambienteProd ? configData.urlBaseApiNodeKeycloakProd : configData.urlBaseApiNodeKeycloakDev) + "AdminApi/";
var bearerToken = "";
/* Services -> Keycloak */

class KeycloakService {

    static buscarUsuarios(token) {
        var retorno = {
            sucesso: false,
            mensagem: "",
            usuarios: []
        };

        try {
            return axios.get(urlBaseKeycloakNode + "usuarios")
                .then(response => {
                    console.log("|response")
                    console.log(response)
                    if (response.data.sucesso) {
                        var usuarios = [];
                        response.data.dados.forEach(function (usuario) {
                            if (usuario.username !== "admin") {
                                let unidadeAdministrativa = "";
                                let cargo = "";
                                let cpf = "";
                                let nomeCompleto = "";
                                let telefone = "";
                                let observacoes = "";
                                let municipio = "";
                                let perfil = "";

                                if (usuario.attributes) {
                                    unidadeAdministrativa = usuario.attributes.UnidadeAdministrativa ? usuario.attributes.UnidadeAdministrativa[0] : "";
                                    cargo = usuario.attributes.Cargo ? usuario.attributes.Cargo[0] : "";
                                    cpf = usuario.attributes.CPF ? usuario.attributes.CPF[0] : "";
                                    nomeCompleto = usuario.attributes.NomeCompleto ? usuario.attributes.NomeCompleto[0] : "";
                                    telefone = usuario.attributes.Telefone ? usuario.attributes.Telefone[0] : "";
                                    observacoes = usuario.attributes.Observacoes ? usuario.attributes.Observacoes[0] : "";
                                    municipio = usuario.attributes.Municipio ? usuario.attributes.Municipio[0] : "";
                                    perfil = usuario.attributes.Perfil ? usuario.attributes.Perfil[0] : "";
                                }

                                var user = {
                                    id: usuario.id,
                                    unidadeAdministrativa: unidadeAdministrativa,
                                    cargo: cargo,
                                    email: usuario.email,
                                    nomeCompleto: nomeCompleto,
                                    usuario: usuario.username,
                                    cpf: cpf,
                                    telefone: telefone,
                                    observacoes: observacoes,
                                    municipio: municipio,
                                    perfil: perfil
                                };

                                usuarios.push(user);
                            }

                        });
                    }
                    console.log(usuarios)
                    retorno.sucesso = true;
                    retorno.usuarios = usuarios;
                    console.log(retorno)
                    return retorno;
                })
                .catch(error => {
                    console.log("Erro")
                    console.log(error)

                    retorno.sucesso = false;
                    retorno.mensagem = error.message;
                    return retorno;
                });
        }
        catch (error) {
            console.log(error.response.data.message);
            retorno.sucesso = false;
            retorno.mensagem = error.response.data.message;
            return retorno;
        }
    }

    static async salvarUsuario(param) {
        console.log("SalvarUsuario")
        console.log(param)
        var retorno = {
            sucesso: false,
            mensagem: "",
            usuarioEditar: null
        };

        const usuario = {
            "cpf": param.cpf,
            "telefone": param.telefone,
            "nomeCompleto": param.nomeCompleto,
            "unidadeAdministrativa": param.unidadeAdministrativa,
            "cargo": param.cargo,
            "senha": param.senha,
            "email": param.email,
            "emailVerified": true,
            "enabled": true,
            "firstName": param.nomeCompleto,
            "lastName": "",
            "username": param.login,
            "clientRoles": param.perfil,
            "municipio": param.municipio.toString(),
            "perfil": param.perfil
        };

        console.log(usuario)

        if (param.isEdit) {
            console.log("isEdit")
            await axios.post(urlBaseKeycloakNode + "editarUsuario", usuario)
                .then(response => {
                    console.log("Response")
                    console.log(response)
                    retorno.sucesso = response.data.sucesso;
                    retorno.mensagem = response.data.mensagem;
                })
                .catch(error => {
                    console.log("Erro")
                    console.log(error)

                    retorno.sucesso = false;
                    retorno.mensagem = error;
                });
        }
        else {
            await axios.post(urlBaseKeycloakNode + "criarUsuario", usuario)
                .then(response => {
                    console.log("Response post")
                    console.log(response)
                    response = response.data;
                    if (response.sucesso) {
                        retorno.sucesso = true;
                        retorno.mensagem = "Usuário incluído com sucesso!";
                        this.EnviarEmailCriacaoUsuario(usuario.email, usuario.nomeCompleto, usuario.senha, usuario.username);
                    }
                    else {
                        retorno.sucesso = false;
                        retorno.mensagem = response.mensagem;
                    }
                })
                .catch(error => {
                    console.log("Erro")
                    console.log(error)

                    retorno.sucesso = false;
                    retorno.mensagem = error.data;
                });
        }

        return retorno;
    }

    static async excluirUsuarios(selecionados) {
        console.log("Excluir usuarios")
        var retorno = {
            sucesso: true,
            mensagem: ""
        };

        for (var i = 0, len = selecionados.length; i < len; ++i) {
            if (selecionados[i].checked && retorno.sucesso) {
                var id = selecionados[i].id.split("radio-")[1];
                console.log("DeleteUsuario")
                console.log(id)

                const config = {
                    headers: { "Content-Type": "application/json" }
                };

                const data = {
                    id: id
                };

                await axios.post(urlBaseKeycloakNode + "excluirUsuario", data, config)
                    .then(response => {
                        console.log("Sucesso exclusão")
                        retorno.sucesso = response.data.sucesso;
                        retorno.mensagem = "";
                    })
                    .catch(error => {
                        console.log("Erro exclusão")
                        console.log(error)

                        retorno.sucesso = false;
                        retorno.mensagem = error;

                        return;
                    });
            }
        }
        return retorno;
    }

    static async alterarSenha(idUsuario) {
        console.log("alterar Senha")
        console.log(idUsuario)
        var retorno = {
            sucesso: false,
            mensagem: "",
            usuarioEditar: null
        };

        var body = {
            id: idUsuario,
            redirectUri: configData.resetSenhaRedirectUri
        };
        
        await axios.post(urlBaseKeycloakNode + "AtualizarSenha", body)
            .then(response => {
                console.log("Response")
                console.log(response)
                retorno.sucesso = response.data.sucesso;
            })
            .catch(error => {
                console.log("Erro")
                console.log(error)

                retorno.sucesso = false;
                retorno.mensagem = error;
            });

        return retorno;
    }

    static async GetBearerToken() {
        if (bearerToken === "") {
            var urlBearer = urlBaseKeycloak + "protocol/openid-connect/token"

            const params = new URLSearchParams();
            params.append("client_id", "cat-api");
            params.append("client_secret", "F73XAOepGEUFZqhO6bOaLYTRIhGQNVMp");
            params.append("grant_type", "client_credentials");

            await axios.post(urlBearer, params)
                .then(response => {
                    console.log("Sucesso bearer")
                    console.log(response);
                    bearerToken = response.access_token;
                })
                .catch(error => {
                    console.log("Erro bearer")
                    console.log(error)

                });
        }

        return bearerToken;
    }

    static async EnviarEmailCriacaoUsuario(email, nome, senha, usuario) {
        console.log("EnviarEmailCriacaoUsuario")

        const config = {
            headers: {
                "Access-Control-Allow-Origin": "*"
            }
        };

        if (email === "") {
            return;
        }

        var url = configData.urlApiEmail + "?email=" + email + "&nome=" + nome + "&senha=" + senha + "&usuario=" + usuario;

        var result = null;
        await axios.post(url, {} , config)
            .then(response => {
                console.log("sucesso envio e-mail")
                console.log(response)
            })
            .catch(error => {
                console.log("Error envio e-mail")
                console.log(error)
                result = {
                    sucesso: false,
                    erros: error
                };
            });

        return result;
    }
}

export default KeycloakService;