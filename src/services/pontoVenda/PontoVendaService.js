import axios from 'axios';
import configData from "../../configuration/config.json";

class PontoVendaService {
    static async getAllTipoPdv(skip = 0, take = 100) {
        var retorno = {
            sucesso: false,
            mensagem: "",
            pdv: [],
            comboPdv: []
        };

        const url = configData.urlBaseApiPontoVenda + "GetAllTipoPdv?skip=" + skip + "&take=" + take;

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
                        retorno.pdv = response.data.data;
                        retorno.comboPdv = response.data.data.map(function (x) { return { label: x.desTpPdv, value: x.idTpPdv }; })
                    }
                    else {
                        retorno.sucesso = false;
                        retorno.mensagem = "GetAllTipoPdv - Erro ao consultar Tipo de Pdv";
                    }
                    return retorno;
                })
                .catch(error => {
                    console.log("Erro")
                    console.log(error)

                    retorno.sucesso = false;
                    retorno.mensagem = error.response.data.errors[0];
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

    static async getAllPdv(skip = 0, take = 100) {
        var retorno = {
            sucesso: false,
            mensagem: "",
            pdv: [],
        };

        const url = configData.urlBaseApiPontoVenda + "GetAllPdv?skip=" + skip + "&take=" + take;

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
                        retorno.pdv = response.data.data;
                    }
                    else {
                        retorno.sucesso = false;
                        retorno.mensagem = "GetAllPdv - Erro ao consultar Pdv";
                    }
                    return retorno;
                })
                .catch(error => {
                    console.log("Erro")
                    console.log(error)

                    retorno.sucesso = false;
                    retorno.mensagem = error.response.data.errors[0];
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

    static async getPdv(desUnidade, skip = 0, take = 100) {
        var retorno = {
            sucesso: false,
            mensagem: "",
            pdv: [],
        };

        const url = configData.urlBaseApiPontoVenda + "GetPdv?DesUnidade=" + desUnidade + "&skip=" + skip + "&take=" + take;

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
                        retorno.pdv = response.data.data;
                    }
                    else {
                        retorno.sucesso = false;
                        retorno.mensagem = "GetPdv - Erro ao consultar Ponto de Venda";
                    }
                    return retorno;
                })
                .catch(error => {
                    console.log("Erro")
                    console.log(error)

                    retorno.sucesso = false;
                    retorno.mensagem = error.response.data.errors[0];
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

    static async getByIDPdv(idPdv) {
        var retorno = {
            sucesso: false,
            mensagem: "",
            pdv: {}
        };

        const url = configData.urlBaseApiPontoVenda + "GetPdv?codigo=" + idPdv;

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
                        retorno.mensagem = "GetPdv - Erro ao consultar Ponto de Venda";
                    }
                    return retorno;
                })
                .catch(error => {
                    console.log("Erro")
                    console.log(error)

                    retorno.sucesso = false;
                    retorno.mensagem = error.response.data.errors[0];
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

    static async addPdv(pdv) {
        var retorno = {
            sucesso: false,
            mensagem: ""
        };

        const url = configData.urlBaseApiPontoVenda + "AddPdv";

        const config = {
            headers: {
                "Access-Control-Allow-Origin": "*"
            }
        };

        try {
            await axios.post(url, pdv, config)
                .then(response => {
                    console.log("|response")
                    console.log(response)
                    if (response.data.success) {
                        retorno.sucesso = true;
                        retorno.mensagem = "Ponto de Venda criado com sucesso";
                    }
                    else {
                        retorno.sucesso = false;
                        retorno.mensagem = "AddPdv - Erro ao criar Ponto de Venda";
                    }
                    return retorno;
                })
                .catch(error => {
                    console.log("Erro")
                    console.log(error)

                    retorno.sucesso = false;
                    retorno.mensagem = error.response.data.errors[0];
                    return retorno;
                });

            return retorno;
        }
        catch (error) {
            retorno.sucesso = false;
            retorno.mensagem = "Erro Ponto Venda";
            return retorno;
        }
    }

    static async updatePdv(pdv) {
        var retorno = {
            sucesso: false,
            mensagem: ""
        };

        const url = configData.urlBaseApiPontoVenda + "updatePdv";

        const config = {
            headers: {
                "Access-Control-Allow-Origin": "*"
            }
        };

        try {
            await axios.put(url, pdv, config)
                .then(response => {
                    console.log("|response")
                    console.log(response)
                    if (response.data.success) {
                        retorno.sucesso = true;
                        retorno.mensagem = "Ponto de Venda alterada com sucesso";
                    }
                    else {
                        retorno.sucesso = false;
                        retorno.mensagem = "UpdatePdv - Erro ao alterar Ponto de Venda";
                    }
                    return retorno;
                })
                .catch(error => {
                    console.log("Erro Ponto Venda")
                    console.log(error)

                    retorno.sucesso = false;
                    retorno.mensagem = "Erro ponto venda";
                    return retorno;
                });

            return retorno;
        }
        catch (error) {
            console.log(error);
            retorno.sucesso = false;
            retorno.mensagem = error.response.data.errors;
            return retorno;
        }
    }

    static async excluirPdv(idPdv) {
        var retorno = {
            sucesso: false,
            mensagem: ""
        };

        var pdv = {
            idPdv: idPdv,
            flgAtivo: false
        }

        const url = configData.urlBaseApiPontoVenda + "excluirPdv";

        const config = {
            headers: {
                "Access-Control-Allow-Origin": "*"
            }
        };

        try {
            await axios.put(url, pdv, config)
                .then(response => {
                    console.log("|response")
                    console.log(response)
                    if (response.data.success) {
                        retorno.sucesso = true;
                        retorno.mensagem = "Ponto de Venda excluido com sucesso";
                    }
                    else {
                        retorno.sucesso = false;
                        retorno.mensagem = "ExcluirPdv - Erro ao excluir Ponto de Venda";
                    }
                    return retorno;
                })
                .catch(error => {
                    console.log("Erro Ponto Venda")
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

export default PontoVendaService;
 