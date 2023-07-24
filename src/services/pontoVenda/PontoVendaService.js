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

    static async getAllStatus(skip = 0, take = 100) {
        var retorno = {
            sucesso: false,
            mensagem: "",
            status: [],
            comboStatus: []
        };

        const url = configData.urlBaseApiPontoVenda + "GetAllStatus?skip=" + skip + "&take=" + take;

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
                        retorno.status = response.data.data;
                        retorno.comboStatus = response.data.data.map(function (x) { return { label: x.desStatus, value: x.idStatus }; })
                    }
                    else {
                        retorno.sucesso = false;
                        retorno.mensagem = "GetAllStatus - Erro ao consultar status";
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

    static async getListaByTipoPDV(idTpPdv, skip = 0, take = 100) {
        var retorno = {
            sucesso: false,
            mensagem: "",
            comboPdv: [],
        };

        const url = configData.urlBaseApiPontoVenda + "GetListaByTipoPDV?codigo=" + idTpPdv + "&skip=" + skip + "&take=" + take;

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
                        retorno.comboPdv = response.data.data.map(function (x) { return { label: x.desUnidade, value: x.idpdv }; })
                    }
                    else {
                        retorno.sucesso = false;
                        retorno.mensagem = "GetListaByTipoPDV - Erro ao consultar Lista de Ponto de Venda";
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

        pdv = this.tratarDadosPdv(pdv);

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

    static async excluirPdv(idPdv, idTpPdv) {
        var retorno = {
            sucesso: false,
            mensagem: ""
        };

        var pdv = {
            idPdv: idPdv,
            idTpPdv: idTpPdv,
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
                    console.log(error)

                    retorno.sucesso = false;
                    retorno.mensagem = error.message;
                    return retorno;
                });

            return retorno;
        }
        catch (error) {
            retorno.sucesso = false;
            retorno.mensagem = error;
            return retorno;
        }
    }

    static tratarDadosPdv(pdv) {
        console.log("Tratar Dados Pdv")
        console.log(pdv)
        if (pdv.pdvCas.length > 0) {
            pdv.pdvCas = pdv.pdvCas.map(m => ({
                "idPdvCa": 0,
                "idPdv": m.idPdv,
                "idCa": m.idCa
            }));
        }
        console.log(pdv.pdvCas)
        if (pdv.pdvCidades.length > 0) {
            pdv.pdvCidades = pdv.pdvCidades.map(m => ({
                "idPdvMun": 0,
                "idPdv": m.idPdv,
                "codIbge": m.codIbge
            }));
        }
        console.log(pdv.pdvCidades)
        return pdv;
    }
}

export default PontoVendaService;
 