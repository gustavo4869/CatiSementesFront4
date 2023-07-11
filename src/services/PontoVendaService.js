import axios from 'axios';

//const urlBaseApi = "http://10.153.18.53/apipdv/";
const urlBaseApi = "http://191.233.142.249/apipdv/";

class PontoVendaService {
    static async getAllTipoPdv(skip = 0, take = 10) {
        var retorno = {
            sucesso: false,
            mensagem: "",
            pdv: []
        };

        const url = urlBaseApi + "GetAllTipoPdv?skip=" + skip + "&take=" + take;

        const config = {
            headers: {
                "Access-Control-Allow-Origin": "*"
            }
        };

        try {
            await axios.get(url, config)
                .then(response => {
                    console.log("|response")
                    console.log(response)
                    retorno.sucesso = true;
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

            return retorno;
        }
        catch (error) {
            console.log(error.response.data.message);
            retorno.sucesso = false;
            retorno.mensagem = error.response.data.message;
            return retorno;
        }
    }

    /*
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
    }*/
}

export default PontoVendaService;
