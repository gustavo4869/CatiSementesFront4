import axios from 'axios';
import configData from "../configuration/config.json";

/* Services -> Keycloak */
const urlBaseKeycloak = configData.urlBaseApiKeycloak;
const urlBaseKeycloakUsers = configData.urlBaseApiKeycloakUsers;
var bearerToken = "";
/* Services -> Keycloak */

class KeycloakService {

    static buscarUsuarios(token) {
        var retorno = {
            sucesso: false,
            mensagem: "",
            usuarios: []
        };

        const config = {
            headers: {
                "Access-Control-Allow-Origin": "http://localhost:8080",
                Authorization: 'Bearer ' + token,
                'Accept': 'application/json'
            }
        };

        console.log("BuscarUsuarios")
        console.log(config)

        try {
            return axios.get(urlBaseKeycloakUsers, config)
                .then(response => {
                    console.log("|response")
                    console.log(response)
                    var usuarios = [];
                    response.data.forEach(function (usuario) {
                        if (usuario.username !== "admin") {
                            var unidadeAdministrativa = "";
                            var cargo = "";
                            var cpf = "";
                            var nomeCompleto = "";
                            var telefone = "";
                            var observacoes = "";

                            if (usuario.attributes) {
                                unidadeAdministrativa = usuario.attributes.UnidadeAdministrativa ? usuario.attributes.UnidadeAdministrativa[0] : "";
                                cargo = usuario.attributes.Cargo ? usuario.attributes.Cargo[0] : "";
                                cpf = usuario.attributes.CPF ? usuario.attributes.CPF[0] : "";
                                nomeCompleto = usuario.attributes.NomeCompleto ? usuario.attributes.NomeCompleto[0] : "";
                                telefone = usuario.attributes.Telefone ? usuario.attributes.Telefone[0] : "";
                                observacoes = usuario.attributes.Observacoes ? usuario.attributes.Observacoes[0] : "";
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
                                observacoes: observacoes
                            };

                            usuarios.push(user);
                        }

                    });

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

    static async salvarUsuario(idUsuario, unidadeAdministrativa, cargo, cpf, nomeCompleto, telefone, email, login, senha, observacoes, perfil, isEdit, token) {
        console.log("SalvarUsuario")
        console.log(token)
        var retorno = {
            sucesso: false,
            mensagem: "",
            usuarioEditar: null
        };

        const config = {
            headers: {
                "Authorization": 'Bearer ' + token,
                "Access-Control-Allow-Origin": "*"
            }
        };

        const usuario = {
            "attributes": {
                "CPF": cpf,
                "Telefone": telefone,
                "NomeCompleto": nomeCompleto,
                "UnidadeAdministrativa": unidadeAdministrativa,
                "Cargo": cargo,
                "Observacoes": observacoes
            },
            "credentials": [{
                "temporary": false,
                "type": "password",
                "value": senha
            }],
            "groups": [perfil],
            "email": email,
            "emailVerified": true,
            "enabled": true,
            "firstName": nomeCompleto,
            "lastName": "",
            "username": login
        };

        console.log(usuario)

        if (isEdit) {
            console.log("isEdit")
            return await axios.put(urlBaseKeycloakUsers + idUsuario, usuario, config)
                .then(response => {

                    if (senha !== "") {
                        var objSenha = {
                            "type": "password",
                            "temporary": false,
                            "value": senha
                        };

                        axios.put(urlBaseKeycloakUsers + idUsuario + '/reset-password', objSenha, config)
                            .then(response => {
                                console.log("Atualização de senha OK")
                                console.log(response)
                                retorno.sucesso = true;
                                return retorno;
                            })
                            .catch(error => {
                                console.log("Falha atualização de senha")
                                console.log(error)
                            });
                    }

                    retorno.sucesso = true;
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
        else {
            return await axios.post(urlBaseKeycloakUsers, usuario, config)
                .then(response => {
                    console.log("Response post")
                    console.log(response)
                    var headerSplit = response.headers.location.split("/");
                    var userId = headerSplit[headerSplit.length - 1];
                    var attributes = {
                        "attributes": {
                            "CPF": cpf,
                            "Telefone": telefone,
                            "NomeCompleto": nomeCompleto,
                            "UnidadeAdministrativa": unidadeAdministrativa,
                            "Cargo": cargo,
                            "Observacoes": observacoes
                        }
                    };

                    return axios.put(urlBaseKeycloakUsers + userId, attributes, config)
                        .then(response => {
                            console.log("response attr")
                            console.log(response)
                            retorno.sucesso = true;

                            retorno.mensagem = "";
                            retorno.usuarioEditar = response.data;
                            return retorno;
                        })
                        .catch(error => {
                            console.log("Erro attr");
                            console.log(error)
                            return retorno;
                        });                    
                })
                .catch(error => {
                    console.log("Erro")
                    console.log(error)

                    retorno.sucesso = false;
                    retorno.mensagem = error.message;
                    return retorno;
                });
        }
    }

    static async excluirUsuarios(selecionados, token) {
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
                    headers: { Authorization: `Bearer ${token}` }
                };

                await axios.delete(urlBaseKeycloakUsers + id, config)
                    .then(response => {
                        console.log("Sucesso exclusão")

                        retorno.sucesso = true;
                        retorno.mensagem = "";
                    })
                    .catch(error => {
                        console.log("Erro exclusão")
                        console.log(error)

                        retorno.sucesso = false;
                        retorno.mensagem = error.message;

                        return;
                    });
            }
        }

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
}

export default KeycloakService;