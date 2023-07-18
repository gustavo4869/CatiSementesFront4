import axios from 'axios';
import configData from "../../configuration/config.json";

class RegionalService {
    static async getAllRegional(skip = 0, take = 10) {
        var retorno = {
            sucesso: false,
            mensagem: "",
            regional: [],
            comboRegional: []
        };

        const url = configData.urlBaseApiPontoVenda + "GetAllRegional?skip=" + skip + "&take=" + take;

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
                        retorno.regional = response.data.data;
                        retorno.comboRegional = response.data.data.map(function (x) { return { label: x.desReg, value: x.idReg }; })
                    }
                    else {
                        retorno.sucesso = false;
                        retorno.mensagem = "GetAllRegional - Erro ao consultar Casa da Agricultura";
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

    static async getRegional(idReg, desReg, flgAtivo = true, skip = 0, take = 10) {
        var retorno = {
            sucesso: false,
            mensagem: "",
            regional: []
        };

        const url = configData.urlBaseApiPontoVenda + "GetRegional?idReg=" + idReg + "&desReg=" + desReg + "&flgAtivo=" + flgAtivo + "&skip=" + skip + "&take=" + take;

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
                        retorno.regional = response.data.data;
                    }
                    else {
                        retorno.sucesso = false;
                        retorno.mensagem = "GetRegional - Erro ao consultar Regional";
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

    static async getByIDRegional(idReg) {
        var retorno = {
            sucesso: false,
            mensagem: "",
            regional: {}
        };

        const url = configData.urlBaseApiPontoVenda + "GetRegional?codigo=" + idReg;

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
                        retorno.regional = response.data.data;
                    }
                    else {
                        retorno.sucesso = false;
                        retorno.mensagem = "GetRegional - Erro ao consultar Regional";
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

    static async addRegional(regional) {
        var retorno = {
            sucesso: false,
            mensagem: ""
        };

        const url = configData.urlBaseApiPontoVenda + "AddRegional";

        const config = {
            headers: {
                "Access-Control-Allow-Origin": "*"
            }
        };

        try {
            await axios.post(url, regional, config)
                .then(response => {
                    console.log("|response")
                    console.log(response)
                    if (response.data.success) {
                        retorno.sucesso = true;
                        retorno.mensagem = "Regional criada com sucesso";
                    }
                    else {
                        retorno.sucesso = false;
                        retorno.mensagem = "AddRegional - Erro ao criar Regional";
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

    static async updateRegional(regional) {
        var retorno = {
            sucesso: false,
            mensagem: ""
        };

        const url = configData.urlBaseApiPontoVenda + "UpdateRegional";

        const config = {
            headers: {
                "Access-Control-Allow-Origin": "*"
            }
        };

        try {
            await axios.put(url, regional, config)
                .then(response => {
                    console.log("|response")
                    console.log(response)
                    if (response.data.success) {
                        retorno.sucesso = true;
                        retorno.mensagem = "Regional alterada com sucesso";
                    }
                    else {
                        retorno.sucesso = false;
                        retorno.mensagem = "UpdateRegional - Erro ao alterar Regional";
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

    static async excluirReg(idReg) {
        var retorno = {
            sucesso: false,
            mensagem: ""
        };

        var reg = {
            idReg: idReg,
            flgAtivo: false
        }

        const url = configData.urlBaseApiPontoVenda + "excluirRegional";

        const config = {
            headers: {
                "Access-Control-Allow-Origin": "*"
            }
        };

        try {
            await axios.put(url, reg, config)
                .then(response => {
                    console.log("|response")
                    console.log(response)
                    if (response.data.success) {
                        retorno.sucesso = true;
                        retorno.mensagem = "Regional excluida com sucesso";
                    }
                    else {
                        retorno.sucesso = false;
                        retorno.mensagem = "ExcluirRegional - Erro ao excluir Regional";
                    }
                    return retorno;
                })
                .catch(error => {
                    console.log("Erro Regional")
                    console.log(error.response.data)

                    retorno.sucesso = false;
                    retorno.mensagem = error.response.data.errors[0];
                    return retorno;
                });

            return retorno;
        }
        catch (error) {
            console.log(error.response.data.errors);
            retorno.sucesso = false;
            retorno.mensagem = error.response.data.errors;
            return retorno;
        }
    }
}

export default RegionalService;
