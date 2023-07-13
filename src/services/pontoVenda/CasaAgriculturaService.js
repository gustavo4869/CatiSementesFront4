import axios from 'axios';
import configData from "../../configuration/config.json";

class CasaAgriculturaService {
    static async getAllCa(skip = 0, take = 10) {
        var retorno = {
            sucesso: false,
            mensagem: "",
            ca: [],
            comboCa: []
        };

        const url = configData.urlBaseApiPontoVenda + "GetAllCa?skip=" + skip + "&take=" + take;

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
                    if (response.data.success) {
                        retorno.sucesso = true;
                        retorno.ca = response.data.data;
                        retorno.comboCa = response.data.data.map(function (x) { return { label: x.desCa, value: x.idCa }; })
                    }
                    else {
                        retorno.sucesso = false;
                        retorno.mensagem = "GetAllCa - Erro ao consultar Casa da Agricultura";
                    }
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

    static async getCa(idCa, idReg, desCa, flgAtivo = true, skip = 0, take = 10) {
        var retorno = {
            sucesso: false,
            mensagem: "",
            ca: [],
            comboCa: []
        };

        const url = configData.urlBaseApiPontoVenda + "GetCa?idCa=" + idCa + "&idReg=" +idReg+ "&desCa=" + desCa + "&flgAtivo=" + flgAtivo + "&skip=" + skip + "&take=" + take;

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
                    if (response.data.success) {
                        retorno.sucesso = true;
                        retorno.ca = response.data.data;
                        retorno.comboCa = response.data.data.map(function (x) { return { label: x.desCa, value: x.idCa }; })
                    }
                    else {
                        retorno.sucesso = false;
                        retorno.mensagem = "GetCa - Erro ao consultar Casa da Agricultura";
                    }
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

    static async getByIDCa(idCa) {
        var retorno = {
            sucesso: false,
            mensagem: "",
            ca: {}
        };

        const url = configData.urlBaseApiPontoVenda + "GetCa?codigo=" + idCa;

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
                    if (response.data.success) {
                        retorno.sucesso = true;
                        retorno.ca = response.data.data;
                        retorno.comboCa = response.data.data.map(function (x) { return { label: x.desCa, value: x.idCa }; })
                    }
                    else {
                        retorno.sucesso = false;
                        retorno.mensagem = "GetCa - Erro ao consultar Casa da Agricultura";
                    }
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

    static async addCa(ca) {
        var retorno = {
            sucesso: false,
            mensagem: ""
        };

        const url = configData.urlBaseApiPontoVenda + "AddCa";

        const config = {
            headers: {
                "Access-Control-Allow-Origin": "*"
            }
        };

        try {
            await axios.post(url, ca, config)
                .then(response => {
                    console.log("|response")
                    console.log(response)
                    if (response.data.success) {
                        retorno.sucesso = true;
                        retorno.mensagem = "Casa da Agricultura criada com sucesso";
                    }
                    else {
                        retorno.sucesso = false;
                        retorno.mensagem = "AddCa - Erro ao criar Casa da Agricultura";
                    }
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

    static async updateCa(ca) {
        var retorno = {
            sucesso: false,
            mensagem: ""
        };

        const url = configData.urlBaseApiPontoVenda + "UpdateCa";

        const config = {
            headers: {
                "Access-Control-Allow-Origin": "*"
            }
        };

        try {
            await axios.put(url, ca, config)
                .then(response => {
                    console.log("|response")
                    console.log(response)
                    if (response.data.success) {
                        retorno.sucesso = true;
                        retorno.mensagem = "Casa da Agricultura alterada com sucesso";
                    }
                    else {
                        retorno.sucesso = false;
                        retorno.mensagem = "UpdateCa - Erro ao alterar Casa da Agricultura";
                    }
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
}

export default CasaAgriculturaService;
