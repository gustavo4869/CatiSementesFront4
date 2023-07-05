import axios from 'axios';
import KeycloakService from './KeycloakService';

/* Services -> Keycloak */
const urlBaseApi = "http://191.233.142.249/APICAT";
var bearerToken = "";
//const urlBaseApi = "https://localhost:44324";
//const urlBaseApi = "http://localhost:5267";
/* Services -> Keycloak */

class ApiService {

    static async CategoriaGetAll() {
        console.log("Categoria Get All")

        var url = urlBaseApi + '/GetAllCategoria';

        if (bearerToken == "") {
            //bearerToken = await KeycloakService.GetBearerToken();
        }

        const config = {
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Authorization": "Bearer " + bearerToken
            }
        };

        var result = [];
        await axios.get(url, config)
            .then(response => {
                console.log("sucesso")
                console.log(response)
                result = {
                    sucesso: true,
                    data: response.data.data.filter(valor => valor.flgAtivo)
                };
            })
            .catch(error => {
                console.log("Error")
                console.log(error)
                result = {
                    sucesso: false,
                    erros: error.response.data.errors
                };
            });

        return result;
    }

    static async CategoriaGetById(id) {
        console.log("Categoria By Id")

        var url = urlBaseApi + '/GetByIdCategoria?codigo=' + id;

        const config = {
            headers: {
                "Access-Control-Allow-Origin": "*"
            }
        };

        var result = [];
        await axios.get(url, config)
            .then(response => {
                console.log("sucesso")
                console.log(response)
                result = {
                    sucesso: true,
                    data: response.data.data
                };
            })
            .catch(error => {
                console.log("Error")
                console.log(error)
                result = {
                    sucesso: false,
                    erros: error.response.data.errors
                };
            });

        return result;
    }

    static async BuscarCategoria(idCategoria, idClassificacao, nomeCategoria, siglaCategoria, ativo) {
        console.log("Buscar Categoria")
        console.log("IdClassif: " + idClassificacao)

        idCategoria = idCategoria ? idCategoria : "";
        idClassificacao = idClassificacao ? idClassificacao : "";
        nomeCategoria = nomeCategoria ? nomeCategoria : "";
        siglaCategoria = siglaCategoria ? siglaCategoria : "";
        ativo = ativo ? ativo : "";

        var url = urlBaseApi + '/GetCategoria?Idcat=' + idCategoria + '&Idclass=' + idClassificacao + '&DesCat=' + nomeCategoria + '&Sigla=' + siglaCategoria + '&FlgAtivo=' + ativo;

        const config = {
            headers: {
                "Access-Control-Allow-Origin": "*"
            }
        };

        var result = [];
        await axios.get(url, config)
            .then(response => {
                console.log("succeso")
                console.log(response)
                result = {
                    sucesso: true,
                    data: response.data.data
                };
            })
            .catch(error => {
                console.log("Error")
                console.log(error)
                result = {
                    sucesso: false,
                    erros: error.response.data.errors
                };
            });

        return result;
    }

    static async AdicionarCategoria(idClassificacao, nomeCategoria, siglaCategoria) {
        console.log("Add Categoria")

        var url = urlBaseApi + '/AddCategoria';

        const config = {
            headers: {
                "Access-Control-Allow-Origin": "*"
            }
        };

        var categoria = {
            "idclass": idClassificacao,
            "desCat": nomeCategoria,
            "sigla": siglaCategoria
        };

        var result = false;
        await axios.post(url, categoria, config)
            .then(response => {
                console.log("sucesso")
                console.log(response)
                result = {
                    sucesso: true
                };
            })
            .catch(error => {
                console.log("Error")
                console.log(error)
                result = {
                    sucesso: false,
                    erros: error.response.data.errors
                };
            });

        return result;
    }

    static async AtualizarCategoria(id, idClassificacao, nomeCategoria, sigla, ativo) {
        console.log("Atualizar Categoria")

        var url = urlBaseApi + '/UpdateCategoria';

        const config = {
            headers: {
                "Access-Control-Allow-Origin": "*"
            }
        };

        var categoria = {
            "idCat": id,
            "idclass": idClassificacao,
            "desCat": nomeCategoria,
            "sigla": sigla,
            "flgAtivo": ativo
        };

        var result = false;
        axios.put(url, categoria, config)
            .then(response => {
                console.log("sucesso")
                console.log(response)
                result = {
                    sucesso: true
                };
            })
            .catch(error => {
                console.log("Error")
                console.log(error)
                result = {
                    sucesso: false,
                    erros: error.response.data.errors
                };
            });

        return result;
    }

    static async ClassificacaoGetAll() {
        console.log("ClassificacaoGetAll")
        var url = urlBaseApi + '/GetAllClassif';

        const config = {
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept",
                "Origin": "https://localhost:44488"
            }
        };

        var result = [];

        await axios.get(url)
            .then(response => {
                result = {
                    sucesso: true,
                    data: response.data.data.filter(valor => valor.flgAtivo)
                };
            })
            .catch(error => {
                console.log("Error Get All Classif")
                console.log(error)
                result = {
                    sucesso: false,
                    erros: error.response.data.errors
                };
            });

        console.log(result)
        return result;
    }

    static async ClassificacaoGetById(id) {
        console.log("ClassificacaoGetById")
        var url = urlBaseApi + '/GetByIdClassif?codigo='+id;

        const config = {
            headers: {
                "Access-Control-Allow-Origin": "*"
            }
        };

        var result = {};

        await axios.get(url, config)
            .then(response => {
                console.log("Get Classif By Id")
                console.log(response)
                result = {
                    sucesso: true,
                    data: response.data.data
                };
            })
            .catch(error => {
                console.log("Error Get By Id")
                console.log(error)
                result = {
                    sucesso: false,
                    erros: error.response.data.errors
                };
            });

        return result;
    }

    static async AdicionarClassificacao(descricaoClassificacao) {
        console.log("Add Classificacação")
        
        var url = urlBaseApi + '/AddClassif';

        const config = {
            headers: {
                "Access-Control-Allow-Origin": "*"
            }
        };

        var classificacao = {
            "desClass": descricaoClassificacao
        };

        var result = false;
        await axios.post(url, classificacao, config)
            .then(response => {
                console.log("Add Classif")
                console.log(response)
                result = {
                    sucesso: true
                };
            })
            .catch(error => {
                console.log("Error Add Classif")
                console.log(error)
                result = {
                    sucesso: false,
                    erros: error.response.data.errors
                };
            });

        return result;
    }

    static async AtualizarClassificacao(id, descricao, ativo) {
        console.log("Atualizar Classificacação")

        var url = urlBaseApi + '/UpdateClassif';

        const config = {
            headers: {
                "Access-Control-Allow-Origin": "*"
            }
        };

        var classificacao = {
            "id": id,
            "desClass": descricao,
            "flgAtivo": ativo
        };

        var result = false;
        await axios.put(url, classificacao, config)
            .then(response => {
                console.log("Update Classif")
                console.log(response)
                result = {
                    sucesso: true
                };
            })
            .catch(error => {
                console.log("Error Update Classif")
                console.log(error)
                result = {
                    sucesso: false,
                    erros: error.response.data.errors
                };
            });

        return result;
    }

    static async CultivarGetAll() {
        console.log("CultivarGetAll")
        
        var url = urlBaseApi + '/GetAllCultivar';

        const config = {
            headers: {
                "Access-Control-Allow-Origin": "*"
            }
        };

        var result = [];
        await axios.get(url, config)
            .then(response => {
                console.log("Get All Cultivar")
                console.log(response)
                result = {
                    sucesso: true,
                    data: response.data.data.filter(valor => valor.flgAtivo)
                };
            })
            .catch(error => {
                console.log("Error Get All Cultivar")
                console.log(error)
                result = {
                    sucesso: false,
                    erros: error.response.data.errors
                };
            });

        return result;
    }

    static async CultivarGetById(id) {
        console.log("CultivarGetById")

        var url = urlBaseApi + '/GetByIdCultivar?codigo='+id;

        const config = {
            headers: {
                "Access-Control-Allow-Origin": "*"
            }
        };

        var result = [];
        await axios.get(url, config)
            .then(response => {
                console.log("Get Cultivar By Id")
                console.log(response)
                result = response.data;
                result = {
                    sucesso: true,
                    data: response.data.data
                };
            })
            .catch(error => {
                console.log("Error Get All Cultivar")
                console.log(error)
                result = {
                    sucesso: false,
                    erros: error.response.data.errors
                };
            });

        return result;
    }

    static async BuscarCultivar(idCultivar, idClassificacao, idEspecie, nomeCultivar, ativo) {
        console.log("Buscar Cultivar")
        console.log("IdClassif: " + idClassificacao)

        idCultivar = idCultivar ? idCultivar : "";
        idClassificacao = idClassificacao ? idClassificacao : "";
        idEspecie = idEspecie ? idEspecie : "";
        nomeCultivar = nomeCultivar ? nomeCultivar : "";
        ativo = ativo ? ativo : "";

        var url = urlBaseApi + '/GetCultivar?Idclv='+ idCultivar +'&Idesp=' + idEspecie + '&Idclass=' + idClassificacao + '&DesClv=' + nomeCultivar + '&FlgAtivo=' + ativo;

        console.log(url)

        const config = {
            headers: {
                "Access-Control-Allow-Origin": "*"
            }
        };

        var result = [];
        await axios.get(url, config)
            .then(response => {
                console.log("succeso")
                console.log(response)
                result = {
                    sucesso: true,
                    data: response.data.data
                };
            })
            .catch(error => {
                console.log("Error")
                console.log(error)
                result = {
                    sucesso: false,
                    erros: error.response.data.errors
                };
            });

        return result;
    }

    static async AdicionarCultivar(idClassificacao, idEspecie, descricao) {
        console.log("Add Cultivar")

        var url = urlBaseApi + '/AddCultivar';

        const config = {
            headers: {
                "Access-Control-Allow-Origin": "*"
            }
        };

        var cultivar = {
            "idclass": idClassificacao,
            "idesp": idEspecie,
            "desClv": descricao
        };

        var result = false;
        await axios.post(url, cultivar, config)
            .then(response => {
                console.log("Add Cultivar")
                console.log(response)
                result = {
                    sucesso: true
                };
            })
            .catch(error => {
                console.log("Error Add Cultivar")
                console.log(error)
                result = {
                    sucesso: false,
                    erros: error.response.data.errors
                };
            });

        return result;
    }

    static async AtualizarCultivar(id, idClassificacao, idEspecie, descricao, ativo) {
        console.log("Atualizar Cultivar")

        var url = urlBaseApi + '/UpdateCultivar';

        const config = {
            headers: {
                "Access-Control-Allow-Origin": "*"
            }
        };

        var cultivar = {
            "idclv": id,
            "idclass": idClassificacao,
            "idesp": idEspecie,
            "desClv": descricao,
            "flgAtivo": ativo
        };

        var result = false;
        axios.put(url, cultivar, config)
            .then(response => {
                console.log("Update Cultivar")
                console.log(response)
                result = {
                    sucesso: true
                };
            })
            .catch(error => {
                console.log("Error Update Cultivar")
                console.log(error)
                result = {
                    sucesso: false,
                    erros: error.response.data.errors
                };
            });

        return result;
    }

    static async EspecieGetAll() {
        console.log("EspecieGetAll")

        var url = urlBaseApi + '/GetAllEspecie';

        const config = {
            headers: {
                "Access-Control-Allow-Origin": "*"
            }
        };

        var result = [];
        await axios.get(url, config)
            .then(response => {
                console.log("Get All Especie")
                console.log(response)
                result = {
                    sucesso: true,
                    data: response.data.data.filter(valor => valor.flgAtivo)
                };
            })
            .catch(error => {
                console.log("Error Get All Especie")
                console.log(error)
                result = {
                    sucesso: false,
                    erros: error.response.data.errors
                };
            });

        console.log(result)
        return result;

    }

    static async EspecieGetById(id) {
        console.log("EspecieGetById")

        var url = urlBaseApi + '/GetByIdEspecie?codigo='+id;

        const config = {
            headers: {
                "Access-Control-Allow-Origin": "*"
            }
        };

        var result = {};
        await axios.get(url, config)
            .then(response => {
                console.log("Get Espécie By Id")
                console.log(response)
                result = {
                    sucesso: true,
                    data: response.data.data
                };
            })
            .catch(error => {
                console.log("Error Get By Id Espécie")
                console.log(error)
                result = {
                    sucesso: false,
                    erros: error.response.data.errors
                };
            });

        return result;
    }

    static async BuscarEspecie(idEspecie, idClassificacao, nomeEspecie, ativo) {
        console.log("Buscar especie")
        console.log("IdClassif: " + idClassificacao)

        idEspecie = idEspecie ? idEspecie : "";
        idClassificacao = idClassificacao ? idClassificacao : "";
        nomeEspecie = nomeEspecie ? nomeEspecie : "";
        ativo = ativo ? ativo : "";

        var url = urlBaseApi + '/GetEspecie?Idesp=' + idEspecie + '&Idclass=' + idClassificacao + '&DesEsp=' + nomeEspecie + '&FlgAtivo=' + ativo;

        const config = {
            headers: {
                "Access-Control-Allow-Origin": "*"
            }
        };

        var result = [];
        await axios.get(url, config)
            .then(response => {
                console.log("Get Espécie By Classificacao Id")
                console.log(response)
                result = {
                    sucesso: true,
                    erros: response.data.data.filter(d => d.flgAtivo)
                };
            })
            .catch(error => {
                console.log("Error Get By Id Espécie")
                console.log(error)
                result = {
                    sucesso: false,
                    erros: error.response.data.errors
                };
            });

        return result;
    }

    static async AdicionarEspecie(idClassificacao, descricao) {
        console.log("Add Espécie")

        var url = urlBaseApi + '/AddEspecie';

        const config = {
            headers: {
                "Access-Control-Allow-Origin": "*"
            }
        };

        var especie = {
            "idclass": idClassificacao,
            "desEsp": descricao
        };

        var result = false;
        await axios.post(url, especie, config)
            .then(response => {
                console.log("Add Espécie")
                console.log(response)
                result = {
                    sucesso: true
                };
            })
            .catch(error => {
                console.log("Error Add Espécie")
                console.log(error)
                result = {
                    sucesso: false,
                    erros: error.response.data.errors
                };
            });

        return result;
    }

    static async AtualizarEspecie(id, idClassificacao, descricao, ativo) {
        console.log("Atualizar Espécie")

        var url = urlBaseApi + '/UpdateEspecie';

        const config = {
            headers: {
                "Access-Control-Allow-Origin": "*"
            }
        };

        var especie = {
            "idesp": id,
            "idclass": idClassificacao,
            "desEsp": descricao,
            "flgAtivo": ativo
        };

        var result = false;
        await axios.put(url, especie, config)
            .then(response => {
                console.log("Update Espécie")
                console.log(response)
                result = {
                    sucesso: true
                };
            })
            .catch(error => {
                console.log("Error Update Espécie")
                console.log(error)
                result = {
                    sucesso: false,
                    erros: error.response.data.errors
                };
            });

        return result;
    }

    static async EspecieGetByClassificacaoId(idClassificacao) {
        console.log("EspecieGetByClassificacaoId")

        var url = urlBaseApi + '/GetEspecie?Idclass=' + idClassificacao;

        const config = {
            headers: {
                "Access-Control-Allow-Origin": "*"
            }
        };

        var result = [];
        await axios.get(url, config)
            .then(response => {
                console.log("Get Espécie By Classificacao Id")
                console.log(response)
                result = {
                    sucesso: true,
                    data: response.data.data.filter(d => d.flgAtivo)
                };
            })
            .catch(error => {
                console.log("Error Get By Id Espécie")
                console.log(error)
                result = {
                    sucesso: false,
                    erros: error.response.data.errors
                };
            });

        return result;
    }

    static async SistemaProducaoGetAll() {
        console.log("Sistema Producao Get All")

        var url = urlBaseApi + '/GetAllSP';

        const config = {
            headers: {
                "Access-Control-Allow-Origin": "*"
            }
        };

        var result = [];
        await axios.get(url, config)
            .then(response => {
                console.log("sucesso")
                console.log(response)
                result = {
                    sucesso: true,
                    data: response.data.data.filter(valor => valor.flgAtivo)
                };
            })
            .catch(error => {
                console.log("Error")
                console.log(error)
                result = {
                    sucesso: false,
                    erros: error.response.data.errors
                };
            });

        return result;
    }

    static async SistemaProducaoGetById(id) {
        console.log("Sistema Producao By Id")

        var url = urlBaseApi + '/GetByIdSistemaProducao?codigo=' + id;

        const config = {
            headers: {
                "Access-Control-Allow-Origin": "*"
            }
        };

        var result = [];
        await axios.get(url, config)
            .then(response => {
                console.log("sucesso")
                console.log(response)
                result = {
                    sucesso: true,
                    data: response.data.data
                };
                result = response.data.data;
            })
            .catch(error => {
                console.log("Error")
                console.log(error)
                result = {
                    sucesso: false,
                    erros: error.response.data.errors
                };
            });

        return result;
    }

    static async BuscarSistemaProducao(idSistemaProducao, idClassificacao, nomeSistemaProducao, ativo) {
        console.log("Buscar Sistema Producao")
        console.log("IdClassif: " + idClassificacao)

        idSistemaProducao = idSistemaProducao ? idSistemaProducao : "";
        idClassificacao = idClassificacao ? idClassificacao : "";
        nomeSistemaProducao = nomeSistemaProducao ? nomeSistemaProducao : "";
        ativo = ativo ? ativo : "";

        var url = urlBaseApi + '/GetSP?Idsp=' + idSistemaProducao + '&Idclass=' + idClassificacao + '&DesSp=' + nomeSistemaProducao + '&FlgAtivo=' + ativo;

        const config = {
            headers: {
                "Access-Control-Allow-Origin": "*"
            }
        };

        var result = [];
        await axios.get(url, config)
            .then(response => {
                console.log("succeso")
                console.log(response)
                result = {
                    sucesso: true,
                    data: response.data.data
                };
            })
            .catch(error => {
                console.log("Error")
                console.log(error)
                result = {
                    sucesso: false,
                    erros: error.response.data.errors
                };
            });

        return result;
    }

    static async AdicionarSistemaProducao(idClassificacao, nomeSistemaProducao) {
        console.log("Add Sistema Producao")

        var url = urlBaseApi + '/AddSP';

        const config = {
            headers: {
                "Access-Control-Allow-Origin": "*"
            }
        };

        var sistemaProducao = {
            "idclass": idClassificacao,
            "desSp": nomeSistemaProducao
        };

        var result = false;
        await axios.post(url, sistemaProducao, config)
            .then(response => {
                console.log("sucesso")
                console.log(response)
                result = {
                    sucesso: true
                };
            })
            .catch(error => {
                console.log("Error")
                console.log(error)
                result = {
                    sucesso: false,
                    erros: error.response.data.errors
                };
            });

        return result;
    }

    static async AtualizarSistemaProducao(id, idClassificacao, nomeSistemaProducao, ativo) {
        console.log("Atualizar Sistema Producao")

        var url = urlBaseApi + '/UpdateSp';

        const config = {
            headers: {
                "Access-Control-Allow-Origin": "*"
            }
        };

        var sistemaProducao = {
            "idSp": id,
            "idclass": idClassificacao,
            "desSp": nomeSistemaProducao,
            "flgAtivo": ativo
        };

        var result = false;
        axios.put(url, sistemaProducao, config)
            .then(response => {
                console.log("sucesso")
                console.log(response)
                result = {
                    sucesso: true
                };
            })
            .catch(error => {
                console.log("Error")
                console.log(error)
                result = {
                    sucesso: false,
                    erros: error.response.data.errors
                };
            });

        return result;
    }

    static async TratamentoGetAll() {
        console.log("Tratamento Get All")

        var url = urlBaseApi + '/GetAllTratamento';

        const config = {
            headers: {
                "Access-Control-Allow-Origin": "*"
            }
        };

        var result = [];
        await axios.get(url, config)
            .then(response => {
                console.log("sucesso")
                console.log(response)
                result = {
                    sucesso: true,
                    data: response.data.data.filter(valor => valor.flgAtivo)
                };
            })
            .catch(error => {
                console.log("Error")
                console.log(error)
                result = {
                    sucesso: false,
                    erros: error.response.data.errors
                };
            });

        return result;
    }

    static async TratamentoGetById(id) {
        console.log("Tratamento By Id")

        var url = urlBaseApi + '/GetByIdTratamento?codigo=' + id;

        const config = {
            headers: {
                "Access-Control-Allow-Origin": "*"
            }
        };

        var result = [];
        await axios.get(url, config)
            .then(response => {
                console.log("sucesso")
                console.log(response)
                result = {
                    sucesso: true,
                    data: response.data.data
                };
            })
            .catch(error => {
                console.log("Error")
                console.log(error)
                result = {
                    sucesso: false,
                    erros: error.response.data.errors
                };
            });

        return result;
    }

    static async BuscarTratamento(idTratamento, idClassificacao, nomeTratamento, ativo) {
        console.log("Buscar Tratamento")
        console.log("IdClassif: " + idClassificacao)

        idTratamento = idTratamento ? idTratamento : "";
        idClassificacao = idClassificacao ? idClassificacao : "";
        nomeTratamento = nomeTratamento ? nomeTratamento : "";
        ativo = ativo ? ativo : "";

        var url = urlBaseApi + '/GetTratamento?Idtrat=' + idTratamento + '&Idclass=' + idClassificacao + '&DesTrat=' + nomeTratamento + '&FlgAtivo=' + ativo;

        const config = {
            headers: {
                "Access-Control-Allow-Origin": "*"
            }
        };

        var result = [];
        await axios.get(url, config)
            .then(response => {
                console.log("succeso")
                console.log(response)
                result = {
                    sucesso: true,
                    data: response.data.data
                };
            })
            .catch(error => {
                console.log("Error")
                console.log(error)
                result = {
                    sucesso: false,
                    erros: error.response.data.errors
                };
            });

        return result;
    }

    static async AdicionarTratamento(idClassificacao, nomeTratamento) {
        console.log("Add Tratamento")

        var url = urlBaseApi + '/AddTratamento';

        const config = {
            headers: {
                "Access-Control-Allow-Origin": "*"
            }
        };

        var tratamento = {
            "idclass": idClassificacao,
            "desTrat": nomeTratamento
        };

        var result = false;
        await axios.post(url, tratamento, config)
            .then(response => {
                console.log("sucesso")
                console.log(response)
                result = {
                    sucesso: true
                };
            })
            .catch(error => {
                console.log("Error")
                console.log(error)
                result = {
                    sucesso: false,
                    erros: error.response.data.errors
                };
            });

        return result;
    }

    static async AtualizarTratamento(id, idClassificacao, nomeTratamento, ativo) {
        console.log("Atualizar Tratamento")

        var url = urlBaseApi + '/UpdateTratamento';

        const config = {
            headers: {
                "Access-Control-Allow-Origin": "*"
            }
        };

        var tratamento = {
            "idtrat": id,
            "idclass": idClassificacao,
            "desTrat": nomeTratamento,
            "flgAtivo": ativo
        };

        var result = false;
        axios.put(url, tratamento, config)
            .then(response => {
                console.log("sucesso")
                console.log(response)
                result = {
                    sucesso: true
                };
            })
            .catch(error => {
                console.log("Error")
                console.log(error)
                result = {
                    sucesso: false,
                    erros: error.response.data.errors
                };
            });

        return result;
    }

    static async PeneiraGetAll() {
        console.log("Peneira Get All")

        var url = urlBaseApi + '/GetAllPeneira';

        const config = {
            headers: {
                "Access-Control-Allow-Origin": "*"
            }
        };

        var result = [];
        await axios.get(url, config)
            .then(response => {
                console.log("sucesso")
                console.log(response)
                result = {
                    sucesso: true,
                    data: response.data.data.filter(valor => valor.flgAtivo)
                };
            })
            .catch(error => {
                console.log("Error")
                console.log(error)
                result = {
                    sucesso: false,
                    erros: error.response.data.errors
                };
            });

        return result;
    }

    static async PeneiraGetById(id) {
        console.log("Peneira By Id")

        var url = urlBaseApi + '/GetByIdPeneira?codigo=' + id;

        const config = {
            headers: {
                "Access-Control-Allow-Origin": "*"
            }
        };

        var result = [];
        await axios.get(url, config)
            .then(response => {
                console.log("sucesso")
                console.log(response)
                result = {
                    sucesso: true,
                    data: response.data.data
                };
            })
            .catch(error => {
                console.log("Error")
                console.log(error)
                result = {
                    sucesso: false,
                    erros: error.response.data.errors
                };
            });

        return result;
    }

    static async BuscarPeneira(idPeneira, idClassificacao, nomePeneira, ativo) {
        console.log("Buscar Peneira")
        console.log("IdClassif: " + idClassificacao)

        idPeneira = idPeneira ? idPeneira : "";
        idClassificacao = idClassificacao ? idClassificacao : "";
        nomePeneira = nomePeneira ? nomePeneira : "";
        ativo = ativo ? ativo : "";

        var url = urlBaseApi + '/GetPeneira?Idpen=' + idPeneira + '&Idclass=' + idClassificacao + '&DesPen=' + nomePeneira + '&FlgAtivo=' + ativo;

        const config = {
            headers: {
                "Access-Control-Allow-Origin": "*"
            }
        };

        var result = [];
        await axios.get(url, config)
            .then(response => {
                console.log("succeso")
                console.log(response)
                result = {
                    sucesso: true,
                    data: response.data.data
                }
            })
            .catch(error => {
                console.log("Error")
                console.log(error)
                result = {
                    sucesso: false,
                    erros: error.response.data.errors
                };
            });

        return result;
    }

    static async AdicionarPeneira(idClassificacao, nomePeneira) {
        console.log("Add Peneira")

        var url = urlBaseApi + '/AddPeneira';

        const config = {
            headers: {
                "Access-Control-Allow-Origin": "*"
            }
        };

        var peneira = {
            "idclass": idClassificacao,
            "desPen": nomePeneira
        };

        var result = false;
        await axios.post(url, peneira, config)
            .then(response => {
                console.log("sucesso")
                console.log(response)
                result = {
                    sucesso: true
                };
            })
            .catch(error => {
                console.log("Error")
                console.log(error)
                result = {
                    sucesso: false,
                    erros: error.response.data.errors
                };
            });

        return result;
    }

    static async AtualizarPeneira(id, idClassificacao, nomePeneira, ativo) {
        console.log("Atualizar Tratamento")

        var url = urlBaseApi + '/UpdatePeneira';

        const config = {
            headers: {
                "Access-Control-Allow-Origin": "*"
            }
        };

        var peneira = {
            "idpen": id,
            "idclass": idClassificacao,
            "desPen": nomePeneira,
            "flgAtivo": ativo
        };

        var result = false;
        axios.put(url, peneira, config)
            .then(response => {
                console.log("sucesso")
                console.log(response)
                result = {
                    sucesso: true
                };
            })
            .catch(error => {
                console.log("Error")
                console.log(error)
                result = {
                    sucesso: false,
                    erros: error.response.data.errors
                };
            });

        return result;
    }

    static async LoteGetAll() {
        console.log("Lote Get All")

        var url = urlBaseApi + '/GetAllLote';

        const config = {
            headers: {
                "Access-Control-Allow-Origin": "*"
            }
        };

        var result = [];
        await axios.get(url, config)
            .then(response => {
                console.log("sucesso")
                console.log(response)
                result = {
                    sucesso: true,
                    data: response.data.data.filter(valor => valor.flgAtivo)
                };
            })
            .catch(error => {
                console.log("Error")
                console.log(error)
                result = {
                    sucesso: false,
                    erros: error.response.data.errors
                };
            });

        return result;
    }

    static async LoteGetById(id) {
        console.log("Lote By Id")

        var url = urlBaseApi + '/GetByIdLote?codigo=' + id;

        const config = {
            headers: {
                "Access-Control-Allow-Origin": "*"
            }
        };

        var result = [];
        await axios.get(url, config)
            .then(response => {
                console.log("sucesso")
                console.log(response)
                result = {
                    sucesso: true,
                    data: response.data.data
                };
            })
            .catch(error => {
                console.log("Error")
                console.log(error)
                result = {
                    sucesso: false,
                    erros: error.response.data.errors
                };
            });

        return result;
    }

    static async BuscarLote(idLote, idClassificacao, nomeLote, ativo) {
        console.log("Buscar Lote")
        console.log("IdClassif: " + idClassificacao)

        idLote = idLote ? idLote : "";
        idClassificacao = idClassificacao ? idClassificacao : "";
        nomeLote = nomeLote ? nomeLote : "";
        ativo = ativo ? ativo : "";

        var url = urlBaseApi + '/GetLote?Idlote=' + idLote + '&Idclass=' + idClassificacao + '&DesLote=' + nomeLote + '&FlgAtivo=' + ativo;

        const config = {
            headers: {
                "Access-Control-Allow-Origin": "*"
            }
        };

        var result = [];
        await axios.get(url, config)
            .then(response => {
                console.log("succeso")
                console.log(response)
                result = {
                    sucesso: true,
                    data: response.data.data
                };
            })
            .catch(error => {
                console.log("Error")
                console.log(error)
                result = {
                    sucesso: false,
                    erros: error.response.data.errors
                };
            });

        return result;
    }

    static async AdicionarLote(idClassificacao, nomeLote) {
        console.log("Add Lote")

        var url = urlBaseApi + '/AddLote';

        const config = {
            headers: {
                "Access-Control-Allow-Origin": "*"
            }
        };

        var lote = {
            "idclass": idClassificacao,
            "desLote": nomeLote
        };

        var result = false;
        await axios.post(url, lote, config)
            .then(response => {
                console.log("sucesso")
                console.log(response)
                result = {
                    sucesso: true
                };
            })
            .catch(error => {
                console.log("Error")
                console.log(error)
                result = {
                    sucesso: false,
                    erros: error.response.data.errors
                };
            });

        return result;
    }

    static async AtualizarLote(id, idClassificacao, nomeLote, ativo) {
        console.log("Atualizar Lote")

        var url = urlBaseApi + '/UpdateLote';

        const config = {
            headers: {
                "Access-Control-Allow-Origin": "*"
            }
        };

        var lote = {
            "idlote": id,
            "idclass": idClassificacao,
            "desPen": nomeLote,
            "flgAtivo": ativo
        };

        var result = false;
        axios.put(url, lote, config)
            .then(response => {
                console.log("sucesso")
                console.log(response)
                result = {
                    sucesso: true
                };
            })
            .catch(error => {
                console.log("Error")
                console.log(error)
                result = {
                    sucesso: false,
                    erros: error.response.data.errors
                };
            });

        return result;
    }

    static async SafraGetAll() {
        console.log("Safra Get All")

        var url = urlBaseApi + '/GetAllSafra';

        const config = {
            headers: {
                "Access-Control-Allow-Origin": "*"
            }
        };

        var result = [];
        await axios.get(url, config)
            .then(response => {
                console.log("sucesso")
                console.log(response)
                result = {
                    sucesso: true,
                    data: response.data.data.filter(valor => valor.flgAtivo)
                };
            })
            .catch(error => {
                console.log("Error")
                console.log(error)
                result = {
                    sucesso: false,
                    erros: error.response.data.errors
                };
            });

        return result;
    }

    static async SafraGetById(id) {
        console.log("Safra By Id")

        var url = urlBaseApi + '/GetByIdSafra?codigo=' + id;

        const config = {
            headers: {
                "Access-Control-Allow-Origin": "*"
            }
        };

        var result = [];
        await axios.get(url, config)
            .then(response => {
                console.log("sucesso")
                console.log(response)
                result = {
                    sucesso: true,
                    data: response.data.data
                };
            })
            .catch(error => {
                console.log("Error")
                console.log(error)
                result = {
                    sucesso: false,
                    erros: error.response.data.errors
                };
            });

        return result;
    }

    static async BuscarSafra(idSafra, idClassificacao, nomeSafra, ativo) {
        console.log("Buscar Safra")
        console.log("IdClassif: " + idClassificacao)

        idSafra = idSafra ? idSafra : "";
        idClassificacao = idClassificacao ? idClassificacao : "";
        nomeSafra = nomeSafra ? nomeSafra : "";
        ativo = ativo ? ativo : "";

        var url = urlBaseApi + '/GetSafra?Idsafra=' + idSafra + '&Idclass=' + idClassificacao + '&DesSafra=' + nomeSafra + '&FlgAtivo=' + ativo;

        const config = {
            headers: {
                "Access-Control-Allow-Origin": "*"
            }
        };

        var result = [];
        await axios.get(url, config)
            .then(response => {
                console.log("succeso")
                console.log(response)
                result = {
                    sucesso: true,
                    data: response.data.data
                };
            })
            .catch(error => {
                console.log("Error")
                console.log(error)
                result = {
                    sucesso: false,
                    erros: error.response.data.errors
                };
            });

        return result;
    }

    static async AdicionarSafra(idClassificacao, nomeSafra) {
        console.log("Add Safra")

        var url = urlBaseApi + '/AddSafra';

        const config = {
            headers: {
                "Access-Control-Allow-Origin": "*"
            }
        };

        var safra = {
            "idclass": idClassificacao,
            "desSafra": nomeSafra
        };

        var result = false;
        await axios.post(url, safra, config)
            .then(response => {
                console.log("sucesso")
                console.log(response)
                result = {
                    sucesso: true
                };
            })
            .catch(error => {
                console.log("Error")
                console.log(error)
                result = {
                    sucesso: false,
                    erros: error.response.data.errors
                };
            });

        return result;
    }

    static async AtualizarSafra(id, idClassificacao, nomeSafra, ativo) {
        console.log("Atualizar Safra")

        var url = urlBaseApi + '/UpdateSafra';

        const config = {
            headers: {
                "Access-Control-Allow-Origin": "*"
            }
        };

        var safra = {
            "idsafra": id,
            "idclass": idClassificacao,
            "desSafra": nomeSafra,
            "flgAtivo": ativo
        };

        var result = false;
        axios.put(url, safra, config)
            .then(response => {
                console.log("sucesso")
                console.log(response)
                result = true;
            })
            .catch(error => {
                console.log("Error")
                console.log(error)
            });

        return result;
    }

    static async TipoGetAll() {
        console.log("Tipo Get All")

        var url = urlBaseApi + '/GetAllTipo';

        const config = {
            headers: {
                "Access-Control-Allow-Origin": "*"
            }
        };

        var result = [];
        await axios.get(url, config)
            .then(response => {
                console.log("sucesso")
                console.log(response)
                result = {
                    sucesso: true,
                    data: response.data.data.filter(valor => valor.flgAtivo)
                };
            })
            .catch(error => {
                console.log("Error")
                console.log(error)
                result = {
                    sucesso: false,
                    erros: error.response.data.errors
                };
            });

        return result;
    }

    static async TipoGetById(id) {
        console.log("Tipo By Id")

        var url = urlBaseApi + '/GetByIdTipo?codigo=' + id;

        const config = {
            headers: {
                "Access-Control-Allow-Origin": "*"
            }
        };

        var result = [];
        await axios.get(url, config)
            .then(response => {
                console.log("sucesso")
                console.log(response)
                result = {
                    sucesso: true,
                    data: response.data.data
                };
            })
            .catch(error => {
                console.log("Error")
                console.log(error)
                result = {
                    sucesso: false,
                    erros: error.response.data.errors
                };
            });

        return result;
    }

    static async BuscarTipo(idTipo, idClassificacao, nomeTipo, ativo) {
        console.log("Buscar Tipo")
        console.log("IdClassif: " + idClassificacao)

        idTipo = idTipo ? idTipo : "";
        idClassificacao = idClassificacao ? idClassificacao : "";
        nomeTipo = nomeTipo ? nomeTipo : "";
        ativo = ativo ? ativo : "";

        var url = urlBaseApi + '/GetTipo?Idtipo=' + idTipo + '&Idclass=' + idClassificacao + '&DesTipo=' + nomeTipo + '&FlgAtivo=' + ativo;

        const config = {
            headers: {
                "Access-Control-Allow-Origin": "*"
            }
        };

        var result = [];
        await axios.get(url, config)
            .then(response => {
                console.log("succeso")
                console.log(response)
                result = {
                    sucesso: true,
                    data: response.data.data
                };
            })
            .catch(error => {
                console.log("Error")
                console.log(error)
                result = {
                    sucesso: false,
                    erros: error.response.data.errors
                };
            });

        return result;
    }

    static async AdicionarTipo(idClassificacao, nomeTipo) {
        console.log("Add Tipo")

        var url = urlBaseApi + '/AddTipo';

        const config = {
            headers: {
                "Access-Control-Allow-Origin": "*"
            }
        };

        var tipo = {
            "idclass": idClassificacao,
            "desTipo": nomeTipo 
        };

        var result = false;
        await axios.post(url, tipo, config)
            .then(response => {
                console.log("sucesso")
                console.log(response)
                result = {
                    sucesso: true
                };
            })
            .catch(error => {
                console.log("Error")
                console.log(error)
                result = {
                    sucesso: false,
                    erros: error.response.data.errors
                };
            });

        return result;
    }

    static async AtualizarTipo(id, idClassificacao, nomeTipo, ativo) {
        console.log("Atualizar Tipo")

        var url = urlBaseApi + '/UpdateTipo';

        const config = {
            headers: {
                "Access-Control-Allow-Origin": "*"
            }
        };

        var tipo = {
            "idtipo": id,
            "idclass": idClassificacao,
            "desTipo": nomeTipo,
            "flgAtivo": ativo
        };

        var result = false;
        axios.put(url, tipo, config)
            .then(response => {
                console.log("sucesso")
                console.log(response)
                result = {
                    sucesso: true
                };
            })
            .catch(error => {
                console.log("Error")
                console.log(error)
                result = {
                    sucesso: false,
                    erros: error.response.data.errors
                };
            });

        return result;
    }

    static async ViveiroGetAll() {
        console.log("Viveiro Get All")

        var url = urlBaseApi + '/GetAllViveiro';

        const config = {
            headers: {
                "Access-Control-Allow-Origin": "*"
            }
        };

        var result = [];
        await axios.get(url, config)
            .then(response => {
                console.log("sucesso")
                console.log(response)
                result = {
                    sucesso: true,
                    data: response.data.data.filter(valor => valor.flgAtivo)
                };
            })
            .catch(error => {
                console.log("Error")
                console.log(error)
                result = {
                    sucesso: false,
                    erros: error.response.data.errors
                };
            });

        return result;
    }

    static async ViveiroGetById(id) {
        console.log("Viveiro By Id")

        var url = urlBaseApi + '/GetByIdViveiro?codigo=' + id;

        const config = {
            headers: {
                "Access-Control-Allow-Origin": "*"
            }
        };

        var result = [];
        await axios.get(url, config)
            .then(response => {
                console.log("sucesso")
                console.log(response)
                result = {
                    sucesso: true,
                    data: response.data.data
                };
            })
            .catch(error => {
                console.log("Error")
                console.log(error)
                result = {
                    sucesso: false,
                    erros: error.response.data.errors
                };
            });

        return result;
    }

    static async BuscarViveiro(idViveiro, idClassificacao, nomeViveiro, ativo) {
        console.log("Buscar Viveiro")
        console.log("IdClassif: " + idClassificacao)

        idViveiro = idViveiro ? idViveiro : "";
        idClassificacao = idClassificacao ? idClassificacao : "";
        nomeViveiro = nomeViveiro ? nomeViveiro : "";
        ativo = ativo ? ativo : "";

        var url = urlBaseApi + '/GetViveiro?Idviv=' + idViveiro + '&Idclass=' + idClassificacao + '&DesViv=' + nomeViveiro + '&FlgAtivo=' + ativo;

        const config = {
            headers: {
                "Access-Control-Allow-Origin": "*"
            }
        };

        var result = [];
        await axios.get(url, config)
            .then(response => {
                console.log("succeso")
                console.log(response)
                result = {
                    sucesso: true,
                    data: response.data.data
                };
            })
            .catch(error => {
                console.log("Error")
                console.log(error)
                result = {
                    sucesso: false,
                    erros: error.response.data.errors
                };
            });

        return result;
    }

    static async AdicionarViveiro(idClassificacao, nomeViveiro) {
        console.log("Add Viveiro")

        var url = urlBaseApi + '/AddViveiro';

        const config = {
            headers: {
                "Access-Control-Allow-Origin": "*"
            }
        };

        var viveiro = {
            "idclass": idClassificacao,
            "desViv": nomeViveiro
        };

        var result = false;
        await axios.post(url, viveiro, config)
            .then(response => {
                console.log("sucesso")
                console.log(response)
                result = {
                    sucesso: true
                };
            })
            .catch(error => {
                console.log("Error")
                console.log(error)
                result = {
                    sucesso: false,
                    erros: error.response.data.errors
                };
            });

        return result;
    }

    static async AtualizarViveiro(id, idClassificacao, nomeViveiro, ativo) {
        console.log("Atualizar Viveiro")

        var url = urlBaseApi + '/UpdateViveiro';

        const config = {
            headers: {
                "Access-Control-Allow-Origin": "*"
            }
        };

        var viveiro = {
            "idviv": id,
            "idclass": idClassificacao,
            "desViveiro": nomeViveiro,
            "flgAtivo": ativo
        };

        var result = false;
        axios.put(url, viveiro, config)
            .then(response => {
                console.log("sucesso")
                console.log(response)
                result = {
                    sucesso: true
                };
            })
            .catch(error => {
                console.log("Error")
                console.log(error)
                result = {
                    sucesso: false,
                    erros: error.response.data.errors
                };
            });

        return result;
    }

    static async GrupoGetAll() {
        console.log("Grupo Get All")

        var url = urlBaseApi + '/GetAllGrupo';

        const config = {
            headers: {
                "Access-Control-Allow-Origin": "*"
            }
        };

        var result = [];
        await axios.get(url, config)
            .then(response => {
                console.log("sucesso")
                console.log(response)
                result = {
                    sucesso: true,
                    data: response.data.data.filter(valor => valor.flgAtivo)
                };
            })
            .catch(error => {
                console.log("Error")
                console.log(error)
                result = {
                    sucesso: false,
                    erros: error.response.data.errors
                };
            });

        return result;
    }

    static async GrupoGetById(id) {
        console.log("Grupo By Id")

        var url = urlBaseApi + '/GetByIdGrupo?codigo=' + id;

        const config = {
            headers: {
                "Access-Control-Allow-Origin": "*"
            }
        };

        var result = [];
        await axios.get(url, config)
            .then(response => {
                console.log("sucesso")
                console.log(response)
                result = {
                    sucesso: true,
                    data: response.data.data
                };
            })
            .catch(error => {
                console.log("Error")
                console.log(error)
                result = {
                    sucesso: false,
                    erros: error.response.data.errors
                };
            });

        return result;
    }

    static async BuscarGrupo(idGrupo, idClassificacao, nomeGrupo, ativo) {
        console.log("Buscar Grupo")
        console.log("IdClassif: " + idClassificacao)

        idGrupo = idGrupo ? idGrupo : "";
        idClassificacao = idClassificacao ? idClassificacao : "";
        nomeGrupo = nomeGrupo ? nomeGrupo : "";
        ativo = ativo ? ativo : "";

        var url = urlBaseApi + '/GetGrupo?Idgrupo=' + idGrupo + '&Idclass=' + idClassificacao + '&DesGrupo=' + nomeGrupo + '&FlgAtivo=' + ativo;

        const config = {
            headers: {
                "Access-Control-Allow-Origin": "*"
            }
        };

        var result = [];
        await axios.get(url, config)
            .then(response => {
                console.log("succeso")
                console.log(response)
                result = {
                    sucesso: true,
                    data: response.data.data
                };
            })
            .catch(error => {
                console.log("Error")
                console.log(error)
                result = {
                    sucesso: false,
                    erros: error.response.data.errors
                };
            });

        return result;
    }

    static async AdicionarGrupo(idClassificacao, nomeGrupo) {
        console.log("Add Grupo")

        var url = urlBaseApi + '/AddGrupo';

        const config = {
            headers: {
                "Access-Control-Allow-Origin": "*"
            }
        };

        var grupo = {
            "idclass": idClassificacao,
            "desGrupo": nomeGrupo
        };

        var result = false;
        await axios.post(url, grupo, config)
            .then(response => {
                console.log("sucesso")
                console.log(response)
                result = {
                    sucesso: true
                };
            })
            .catch(error => {
                console.log("Error")
                console.log(error)
                result = {
                    sucesso: false,
                    erros: error.response.data.errors
                };
            });

        return result;
    }

    static async AtualizarGrupo(id, idClassificacao, nomeGrupo, ativo) {
        console.log("Atualizar Grupo")

        var url = urlBaseApi + '/UpdateGrupo';

        const config = {
            headers: {
                "Access-Control-Allow-Origin": "*"
            }
        };

        var grupo = {
            "idgrupo": id,
            "idclass": idClassificacao,
            "desGrupo": nomeGrupo,
            "flgAtivo": ativo
        };

        var result = false;
        axios.put(url, grupo, config)
            .then(response => {
                console.log("sucesso")
                console.log(response)
                result = {
                    sucesso: true
                };
            })
            .catch(error => {
                console.log("Error")
                console.log(error)
                result = {
                    sucesso: false,
                    erros: error.response.data.errors
                };
            });

        return result;
    }

    static async IdadeGetAll() {
        console.log("Idade Get All")

        var url = urlBaseApi + '/GetAllIdade';

        const config = {
            headers: {
                "Access-Control-Allow-Origin": "*"
            }
        };

        var result = [];
        await axios.get(url, config)
            .then(response => {
                console.log("sucesso")
                console.log(response)
                result = {
                    sucesso: true,
                    data: response.data.data.filter(valor => valor.flgAtivo)
                };
            })
            .catch(error => {
                console.log("Error")
                console.log(error)
                result = {
                    sucesso: false,
                    erros: error.response.data.errors
                };
            });

        return result;
    }

    static async IdadeGetById(id) {
        console.log("Idade By Id")

        var url = urlBaseApi + '/GetByIdIdade?codigo=' + id;

        const config = {
            headers: {
                "Access-Control-Allow-Origin": "*"
            }
        };

        var result = [];
        await axios.get(url, config)
            .then(response => {
                console.log("sucesso")
                console.log(response)
                result = {
                    sucesso: true,
                    data: response.data.data
                };
            })
            .catch(error => {
                console.log("Error")
                console.log(error)
                result = {
                    sucesso: false,
                    erros: error.response.data.errors
                };
            });

        return result;
    }

    static async BuscarIdade(idIdade, idClassificacao, nomeIdade, ativo) {
        console.log("Buscar Idade")
        console.log("IdClassif: " + idClassificacao)

        idIdade = idIdade ? idIdade : "";
        idClassificacao = idClassificacao ? idClassificacao : "";
        nomeIdade = nomeIdade ? nomeIdade : "";
        ativo = ativo ? ativo : "";

        var url = urlBaseApi + '/GetIdade?Id=' + idIdade + '&Idclass=' + idClassificacao + '&DesIdade=' + nomeIdade + '&FlgAtivo=' + ativo;

        const config = {
            headers: {
                "Access-Control-Allow-Origin": "*"
            }
        };

        var result = [];
        await axios.get(url, config)
            .then(response => {
                console.log("succeso")
                console.log(response)
                result = {
                    sucesso: true,
                    data: response.data.data
                };
            })
            .catch(error => {
                console.log("Error")
                console.log(error)
                result = {
                    sucesso: false,
                    erros: error.response.data.errors
                };
            });

        return result;
    }

    static async AdicionarIdade(idClassificacao, nomeIdade) {
        console.log("Add Idade")

        var url = urlBaseApi + '/AddIdade';

        const config = {
            headers: {
                "Access-Control-Allow-Origin": "*"
            }
        };

        var idade = {
            "idclass": idClassificacao,
            "desIdade": nomeIdade
        };

        var result = false;
        await axios.post(url, idade, config)
            .then(response => {
                console.log("sucesso")
                console.log(response)
                result = {
                    sucesso: true
                };
            })
            .catch(error => {
                console.log("Error")
                console.log(error)
                result = {
                    sucesso: false,
                    erros: error.response.data.errors
                };
            });

        return result;
    }

    static async AtualizarIdade(id, idClassificacao, nomeIdade, ativo) {
        console.log("Atualizar Idade")

        var url = urlBaseApi + '/UpdateIdade';

        const config = {
            headers: {
                "Access-Control-Allow-Origin": "*"
            }
        };

        var idade = {
            "id": id,
            "idclass": idClassificacao,
            "desIdade": nomeIdade,
            "flgAtivo": ativo
        };

        var result = false;
        axios.put(url, idade, config)
            .then(response => {
                console.log("sucesso")
                console.log(response)
                result = {
                    sucesso: true
                };
            })
            .catch(error => {
                console.log("Error")
                console.log(error)
                result = {
                    sucesso: false,
                    erros: error.response.data.errors
                };
            });

        return result;
    }

    static async MaterialGetAll() {
        console.log("Material Get All")

        var url = urlBaseApi + '/GetAllMaterial';

        const config = {
            headers: {
                "Access-Control-Allow-Origin": "*"
            }
        };

        var result = [];
        await axios.get(url, config)
            .then(response => {
                console.log("sucesso")
                console.log(response)
                result = {
                    sucesso: true,
                    data: response.data.data.filter(valor => valor.flgAtivo)
                };
            })
            .catch(error => {
                console.log("Error")
                console.log(error)
                result = {
                    sucesso: false,
                    erros: error.response.data.errors
                };
            });

        return result;
    }

    static async MaterialGetById(id) {
        console.log("Material By Id")

        var url = urlBaseApi + '/GetByIdMaterial?codigo=' + id;

        const config = {
            headers: {
                "Access-Control-Allow-Origin": "*"
            }
        };

        var result = [];
        await axios.get(url, config)
            .then(response => {
                console.log("sucesso")
                console.log(response)
                result = {
                    sucesso: true,
                    data: response.data.data
                };
            })
            .catch(error => {
                console.log("Error")
                console.log(error)
                result = {
                    sucesso: false,
                    erros: error.response.data.errors
                };
            });

        return result;
    }

    static async BuscarMaterial(idMaterial, idClassificacao, nomeMaterial, ativo) {
        console.log("Buscar Material")
        console.log("IdClassif: " + idClassificacao)

        idMaterial = idMaterial ? idMaterial : "";
        idClassificacao = idClassificacao ? idClassificacao : "";
        nomeMaterial = nomeMaterial ? nomeMaterial : "";
        ativo = ativo ? ativo : "";

        var url = urlBaseApi + '/GetMaterial?Idmat=' + idMaterial + '&Idclass=' + idClassificacao + '&DesMat=' + nomeMaterial + '&FlgAtivo=' + ativo;

        const config = {
            headers: {
                "Access-Control-Allow-Origin": "*"
            }
        };

        var result = [];
        await axios.get(url, config)
            .then(response => {
                console.log("succeso")
                console.log(response)
                result = {
                    sucesso: true,
                    data: response.data.data
                };
            })
            .catch(error => {
                console.log("Error")
                console.log(error)
                result = {
                    sucesso: false,
                    erros: error.response.data.errors
                };
            });

        return result;
    }

    static async AdicionarMaterial(idClassificacao, nomeMaterial) {
        console.log("Add Material")

        var url = urlBaseApi + '/AddMaterial';

        const config = {
            headers: {
                "Access-Control-Allow-Origin": "*"
            }
        };

        var material = {
            "idclass": idClassificacao,
            "desMat": nomeMaterial
        };

        var result = false;
        await axios.post(url, material, config)
            .then(response => {
                console.log("sucesso")
                console.log(response)
                result = true;
                result = {
                    sucesso: true
                };
            })
            .catch(error => {
                console.log("Error")
                console.log(error)
                result = {
                    sucesso: false,
                    erros: error.response.data.errors
                };
            });

        return result;
    }

    static async AtualizarMaterial(id, idClassificacao, nomeMaterial, ativo) {
        console.log("Atualizar Material")

        var url = urlBaseApi + '/UpdateMaterial';

        const config = {
            headers: {
                "Access-Control-Allow-Origin": "*"
            }
        };

        var material = {
            "idmat": id,
            "idclass": idClassificacao,
            "desMat": nomeMaterial,
            "flgAtivo": ativo
        };

        var result = false;
        axios.put(url, material, config)
            .then(response => {
                console.log("sucesso")
                console.log(response)
                result = {
                    sucesso: true
                };
            })
            .catch(error => {
                console.log("Error")
                console.log(error)
                result = {
                    sucesso: false,
                    erros: error.response.data.errors
                };
            });

        return result;
    }

    static async SubProdutoGetAll() {
        console.log("SubProduto Get All")

        var url = urlBaseApi + '/GetAllSubProduto';

        const config = {
            headers: {
                "Access-Control-Allow-Origin": "*"
            }
        };

        var result = [];
        await axios.get(url, config)
            .then(response => {
                console.log("sucesso")
                console.log(response)
                result = {
                    sucesso: true,
                    data: response.data.data.filter(valor => valor.flgAtivo)
                };
            })
            .catch(error => {
                console.log("Error")
                console.log(error)
                result = {
                    sucesso: false,
                    erros: error.response.data.errors
                };
            });

        return result;
    }

    static async SubProdutoGetById(id) {
        console.log("SubProduto By Id")

        var url = urlBaseApi + '/GetByIdSubProduto?codigo=' + id;

        const config = {
            headers: {
                "Access-Control-Allow-Origin": "*"
            }
        };

        var result = [];
        await axios.get(url, config)
            .then(response => {
                console.log("sucesso")
                console.log(response)
                result = {
                    sucesso: true,
                    data: response.data.data
                };
                result = response.data.data;
            })
            .catch(error => {
                console.log("Error")
                console.log(error)
                result = {
                    sucesso: false,
                    erros: error.response.data.errors
                };
            });

        return result;
    }

    static async BuscarSubProduto(idSubProduto, idClassificacao, nomeSubProduto, ativo) {
        console.log("Buscar SubProduto")
        console.log("IdClassif: " + idClassificacao)

        idSubProduto = idSubProduto ? idSubProduto : "";
        idClassificacao = idClassificacao ? idClassificacao : "";
        nomeSubProduto = nomeSubProduto ? nomeSubProduto : "";
        ativo = ativo ? ativo : "";

        var url = urlBaseApi + '/GetSubProduto?Idsprod=' + idSubProduto + '&Idclass=' + idClassificacao + '&DesSprod=' + nomeSubProduto + '&FlgAtivo=' + ativo;

        const config = {
            headers: {
                "Access-Control-Allow-Origin": "*"
            }
        };

        var result = [];
        await axios.get(url, config)
            .then(response => {
                console.log("succeso")
                console.log(response)
                result = {
                    sucesso: false,
                    data: response.data.data
                };
            })
            .catch(error => {
                console.log("Error")
                console.log(error)
                result = {
                    sucesso: false,
                    erros: error.response.data.errors
                };
            });

        return result;
    }

    static async AdicionarSubProduto(idClassificacao, nomeSubProduto) {
        console.log("Add SubProduto")

        var url = urlBaseApi + '/AddSubProduto';

        const config = {
            headers: {
                "Access-Control-Allow-Origin": "*"
            }
        };

        var subProduto = {
            "idclass": idClassificacao,
            "desSprod": nomeSubProduto
        };

        var result = false;
        await axios.post(url, subProduto, config)
            .then(response => {
                console.log("sucesso")
                console.log(response)
                result = {
                    sucesso: true
                };
            })
            .catch(error => {
                console.log("Error")
                console.log(error)
                result = {
                    sucesso: false,
                    erros: error.response.data.errors
                };
            });

        return result;
    }

    static async AtualizarSubProduto(id, idClassificacao, nomeSubProduto, ativo) {
        console.log("Atualizar SubProduto")

        var url = urlBaseApi + '/UpdateSubProduto';

        const config = {
            headers: {
                "Access-Control-Allow-Origin": "*"
            }
        };

        var subProduto = {
            "idsprod": id,
            "idclass": idClassificacao,
            "desSprod": nomeSubProduto,
            "flgAtivo": ativo
        };

        var result = false;
        axios.put(url, subProduto, config)
            .then(response => {
                console.log("sucesso")
                console.log(response)
                result = {
                    sucesso: true
                };
            })
            .catch(error => {
                console.log("Error")
                console.log(error)
                result = {
                    sucesso: false,
                    erros: error.response.data.errors
                };
            });

        return result;
    }

    static async UnidadeGetAll() {
        console.log("Unidade Get All")

        var url = urlBaseApi + '/GetAllUnidade';

        const config = {
            headers: {
                "Access-Control-Allow-Origin": "*"
            }
        };

        var result = [];
        await axios.get(url, config)
            .then(response => {
                console.log("sucesso")
                console.log(response)
                result = {
                    sucesso: true,
                    data: response.data.data.filter(valor => valor.flgAtivo)
                };
            })
            .catch(error => {
                console.log("Error")
                console.log(error)
                result = {
                    sucesso: false,
                    erros: error.response.data.errors
                };
            });

        return result;
    }

    static async UnidadeGetById(id) {
        console.log("Unidade By Id")

        var url = urlBaseApi + '/GetByIdUnidade?codigo=' + id;

        const config = {
            headers: {
                "Access-Control-Allow-Origin": "*"
            }
        };

        var result = [];
        await axios.get(url, config)
            .then(response => {
                console.log("sucesso")
                console.log(response)
                result = {
                    sucesso: true,
                    data: response.data.data
                };
            })
            .catch(error => {
                console.log("Error")
                console.log(error)
                result = {
                    sucesso: false,
                    erros: error.response.data.errors
                };
            });

        return result;
    }

    static async BuscarUnidade(idUnidade, idClassificacao, nomeUnidade, ativo) {
        console.log("Buscar Unidade")
        console.log("IdClassif: " + idClassificacao)

        idUnidade = idUnidade ? idUnidade : "";
        idClassificacao = idClassificacao ? idClassificacao : "";
        nomeUnidade = nomeUnidade ? nomeUnidade : "";
        ativo = ativo ? ativo : "";

        var url = urlBaseApi + '/GetUnidade?Idund=' + idUnidade + '&Idclass=' + idClassificacao + '&DesUnd=' + nomeUnidade + '&FlgAtivo=' + ativo;

        const config = {
            headers: {
                "Access-Control-Allow-Origin": "*"
            }
        };

        var result = [];
        await axios.get(url, config)
            .then(response => {
                console.log("succeso")
                console.log(response)
                result = {
                    sucesso: true,
                    data: response.data.data
                };
            })
            .catch(error => {
                console.log("Error")
                console.log(error)
                result = {
                    sucesso: false,
                    erros: error.response.data.errors
                };
            });

        return result;
    }

    static async AdicionarUnidade(idClassificacao, nomeUnidade) {
        console.log("Add Unidade")

        var url = urlBaseApi + '/AddUnidade';

        const config = {
            headers: {
                "Access-Control-Allow-Origin": "*"
            }
        };

        var unidade = {
            "idclass": idClassificacao,
            "desUnd": nomeUnidade
        };

        var result = false;
        await axios.post(url, unidade, config)
            .then(response => {
                console.log("sucesso")
                console.log(response)
                result = {
                    sucesso: true
                };
            })
            .catch(error => {
                console.log("Error")
                console.log(error)
                result = {
                    sucesso: false,
                    erros: error.response.data.errors
                };
            });

        return result;
    }

    static async AtualizarUnidade(id, idClassificacao, nomeUnidade, ativo) {
        console.log("Atualizar Unidade")

        var url = urlBaseApi + '/UpdateUnidade';

        const config = {
            headers: {
                "Access-Control-Allow-Origin": "*"
            }
        };

        var unidade = {
            "idund": id,
            "idclass": idClassificacao,
            "desUnd": nomeUnidade,
            "flgAtivo": ativo
        };

        var result = false;
        axios.put(url, unidade, config)
            .then(response => {
                console.log("sucesso")
                console.log(response)
                result = {
                    sucesso: true
                };
            })
            .catch(error => {
                console.log("Error")
                console.log(error)
                result = {
                    sucesso: false,
                    erros: error.response.data.errors
                };
            });

        return result;
    }

    static async ProdutoGetAll() {
        console.log("Produto Get All")

        var url = urlBaseApi + '/GetAllProduto';

        const config = {
            headers: {
                "Access-Control-Allow-Origin": "*"
            }
        };

        var result = [];
        await axios.get(url, config)
            .then(response => {
                console.log("sucesso")
                console.log(response)
                result = {
                    sucesso: true,
                    data: response.data.data
                };
            })
            .catch(error => {
                console.log("Error")
                console.log(error)
                result = {
                    sucesso: false,
                    erros: error.response.data.errors
                };
            });

        return result;
    }

    static async ProdutoGetById(id) {
        console.log("Produto By Id")

        var url = urlBaseApi + '/GetByIdProduto?codigo=' + id;

        const config = {
            headers: {
                "Access-Control-Allow-Origin": "*"
            }
        };

        var result = [];
        await axios.get(url, config)
            .then(response => {
                console.log("sucesso")
                console.log(response)
                result = {
                    sucesso: true,
                    data: response.data.data
                };
            })
            .catch(error => {
                console.log("Error")
                console.log(error)
                result = {
                    sucesso: false,
                    erros: error.response.data.errors
                };
            });

        return result;
    }

    static async BuscarProduto(produto) {
        console.log("Buscar Produto ")

        produto.Idprod = produto.Idprod ? produto.Idprod : "";
        produto.Idclass = produto.Idclass ? produto.Idclass : "";
        produto.Idesp = produto.Idesp ? produto.Idesp : "";
        produto.Idclv = produto.Idclv ? produto.Idclv : "";
        produto.Idcat = produto.Idcat ? produto.Idcat : "";
        produto.Idtrat = produto.Idtrat ? produto.Idtrat : "";
        produto.Idpen = produto.Idpen ? produto.Idpen : "";
        produto.Idtipo = produto.Idtipo ? produto.Idtipo : "";
        produto.Idgrupo = produto.Idgrupo ? produto.Idgrupo : "";
        produto.Idlote = produto.Idlote ? produto.Idlote : "";
        produto.Idsafra = produto.Idsafra ? produto.Idsafra : "";
        produto.Idviv = produto.Idviv ? produto.Idviv : "";
        produto.Idund = produto.Idund ? produto.Idund : "";
        produto.Idmat = produto.Idmat ? produto.Idmat : "";
        produto.Idsprod = produto.Idsprod ? produto.Idsprod : "";
        produto.Id = produto.Id ? produto.Id : "";
        produto.Idsp = produto.Idsp ? produto.Idsp : "";
        produto.Idemb = produto.Idemb ? produto.Idemb : "";
        produto.Idpeso = produto.Idpeso ? produto.Idpeso : "";
        produto.DtValAnalise = produto.DtValAnalise ? produto.DtValAnalise : "";
        produto.DtValPriAnalise = produto.DtValPriAnalise ? produto.DtValPriAnalise : "";
        produto.DtValSegAnalise = produto.DtValSegAnalise ? produto.DtValSegAnalise : "";
        produto.DtValTerAnalise = produto.DtValTerAnalise ? produto.DtValTerAnalise : "";
        produto.Analise = produto.Analise ? produto.Analise : "";
        produto.PriReanalise = produto.PriReanalise ? produto.PriReanalise : "";
        produto.SegReanalise = produto.SegReanalise ? produto.SegReanalise : "";
        produto.TerReanalise = produto.TerReanalise ? produto.TerReanalise : "";

        var url = urlBaseApi + '/GetProduto?Idprod=' + produto.Idprod + '&Idclass=' + produto.Idclass +
            '&Idesp=' + produto.Idesp + '&Idclv=' + produto.Idclv + '&Idcat=' + produto.Idcat +
            '&Idtrat=' + produto.Idtrat + '&Idpen=' + produto.Idpen + '&Idtipo=' + produto.Idtipo +
            '&Idgrupo=' + produto.Idgrupo + '&Idlote=' + produto.Idgrupo + '&Idlote=' + produto.Idlote +
            '&Idsafra=' + produto.Idsafra + '&Idviv=' + produto.Idviv + '&Idund=' + produto.Idund +
            '&Idmat=' + produto.Idmat + '&Idsprod=' + produto.Idsprod + '&Id=' + produto.Id +
            '&Idsp=' + produto.Idsp + '&Idemb=' + produto.Idemb + '&Idpeso=' + produto.Idpeso +
            '&DtValAnalise=' + produto.DtValAnalise + '&DtValPriAnalise=' + produto.DtValPriAnalise +
            '&DtValSegAnalise=' + produto.DtValSegAnalise + '&DtValTerAnalise=' + produto.DtValTerAnalise +
            '&Analise=' + produto.Analise + '&PriReanalise=' + produto.PriReanalise + '&SegReanalise=' + produto.SegReanalise +
            '&TerReanalise=' + produto.TerReanalise;

        const config = {
            headers: {
                "Access-Control-Allow-Origin": "*"
            }
        };

        var result = [];
        await axios.get(url, config)
            .then(response => {
                console.log("succeso")
                console.log(response)
                result = {
                    sucesso: true,
                    data: response.data.data
                };
            })
            .catch(error => {
                console.log("Error")
                console.log(error)
                result = {
                    sucesso: false,
                    erros: error.response.data.errors
                };
            });

        return result;
    }

    static async AdicionarProduto(produto) {
        console.log("Add Produto")

        var url = urlBaseApi + '/AddProduto';

        const config = {
            headers: {
                "Access-Control-Allow-Origin": "*"
            }
        };

        var result = false;
        await axios.post(url, produto, config)
            .then(response => {
                console.log("sucesso")
                console.log(response)
                result = {
                    sucesso: true
                };
            })
            .catch(error => {
                console.log("Error")
                console.log(error)
                result = {
                    sucesso: false,
                    erros: error.response.data.errors
                };
            });

        return result;
    }

    static async AtualizarProduto(produto) {
        console.log("Atualizar Produto")

        var url = urlBaseApi + '/UpdateProduto';

        const config = {
            headers: {
                "Access-Control-Allow-Origin": "*"
            }
        };

        var result = false;
        await axios.put(url, produto, config)
            .then(response => {
                console.log("sucesso")
                console.log(response)
                result = {
                    sucesso: true,
                    data: response.data.data
                };
            })
            .catch(error => {
                console.log("Error")
                console.log(error)
                result = {
                    sucesso: false,
                    erros: error.response.data.errors
                };
            });

        return result;
    }

    static async EmbalagemGetAll() {
        console.log("Embalagem Get All")

        var url = urlBaseApi + '/GetAllEmbalagem';

        const config = {
            headers: {
                "Access-Control-Allow-Origin": "*"
            }
        };

        var result = [];
        await axios.get(url, config)
            .then(response => {
                console.log("sucesso")
                console.log(response)
                result = {
                    sucesso: true,
                    data: response.data.data.filter(valor => valor.flgAtivo)
                };
            })
            .catch(error => {
                console.log("Error")
                console.log(error)
                result = {
                    sucesso: false,
                    erros: error.response.data.errors
                };
            });

        return result;
    }

    static async EmbalagemGetById(id) {
        console.log("Embalagem By Id")

        var url = urlBaseApi + '/GetByIdEmbalagem?codigo=' + id;

        const config = {
            headers: {
                "Access-Control-Allow-Origin": "*"
            }
        };

        var result = [];
        await axios.get(url, config)
            .then(response => {
                console.log("sucesso")
                console.log(response)
                result = {
                    sucesso: true,
                    data: response.data.data
                };
            })
            .catch(error => {
                console.log("Error")
                console.log(error)

                result = {
                    sucesso: false,
                    erros: error.response.data.errors
                };
            });

        return result;
    }

    static async BuscarEmbalagem(idEmbalagem, idClassificacao, nomeEmbalagem, ativo) {
        console.log("Buscar Embalagem")
        console.log("IdClassif: " + idClassificacao)

        idEmbalagem = idEmbalagem ? idEmbalagem : "";
        idClassificacao = idClassificacao ? idClassificacao : "";
        nomeEmbalagem = nomeEmbalagem ? nomeEmbalagem : "";
        ativo = ativo ? ativo : "";

        var url = urlBaseApi + '/GetEmbalagem?Idemb=' + idEmbalagem + '&Idclass=' + idClassificacao + '&DesEmb=' + nomeEmbalagem + '&FlgAtivo=' + ativo;

        const config = {
            headers: {
                "Access-Control-Allow-Origin": "*"
            }
        };

        var result = [];
        await axios.get(url, config)
            .then(response => {
                console.log("succeso")
                console.log(response)
                result = {
                    sucesso: true,
                    data: response.data.data
                };
            })
            .catch(error => {
                console.log("Error")
                console.log(error)
                result = {
                    sucesso: false,
                    erros: error.response.data.errors
                };
            });

        return result;
    }

    static async AdicionarEmbalagem(idClassificacao, nomeEmbalagem) {
        console.log("Add Embalagem")

        var url = urlBaseApi + '/AddEmbalagem';

        const config = {
            headers: {
                "Access-Control-Allow-Origin": "*"
            }
        };

        var embalagem = {
            "idclass": idClassificacao,
            "desEmb": nomeEmbalagem
        };

        var result = false;
        await axios.post(url, embalagem, config)
            .then(response => {
                console.log("sucesso")
                console.log(response)
                result = {
                    sucesso: true
                };
            })
            .catch(error => {
                console.log("Error")
                console.log(error)
                result = {
                    sucesso: false,
                    erros: error.response.data.errors
                };
            });

        return result;
    }

    static async AtualizarEmbalagem(id, idClassificacao, nomeEmbalagem, ativo) {
        console.log("Atualizar Embalagem")

        var url = urlBaseApi + '/UpdateEmbalagem';

        const config = {
            headers: {
                "Access-Control-Allow-Origin": "*"
            }
        };

        var embalagem = {
            "idemb": id,
            "idclass": idClassificacao,
            "desEmb": nomeEmbalagem,
            "flgAtivo": ativo
        };

        var result = false;
        axios.put(url, embalagem, config)
            .then(response => {
                console.log("sucesso")
                console.log(response)
                result = {
                    sucesso: true
                };
            })
            .catch(error => {
                console.log("Error")
                console.log(error)
                result = {
                    sucesso: false,
                    erros: error.response.data.errors
                };
            });

        return result;
    }

    static async PesoEmbalagemGetAll() {
        console.log("Peso Embalagem Get All")

        var url = urlBaseApi + '/GetAllPesoEmbalagem';

        const config = {
            headers: {
                "Access-Control-Allow-Origin": "*"
            }
        };

        var result = [];
        await axios.get(url, config)
            .then(response => {
                console.log("sucesso")
                console.log(response)
                result = {
                    sucesso: false,
                    data: response.data.data.filter(valor => valor.flgAtivo)
                };
            })
            .catch(error => {
                console.log("Error")
                console.log(error)
                result = {
                    sucesso: false,
                    erros: error.response.data.errors
                };
            });

        return result;
    }

    static async PesoEmbalagemGetById(id) {
        console.log("Peso Embalagem By Id")

        var url = urlBaseApi + '/GetByIdPesoEmbalagem?codigo=' + id;

        const config = {
            headers: {
                "Access-Control-Allow-Origin": "*"
            }
        };

        var result = [];
        await axios.get(url, config)
            .then(response => {
                console.log("sucesso")
                console.log(response)
                result = {
                    sucesso: false,
                    data: response.data.data
                };
            })
            .catch(error => {
                console.log("Error")
                console.log(error)
                result = {
                    sucesso: false,
                    erros: error.response.data.errors
                };
            });

        return result;
    }

    static async BuscarPesoEmbalagem(idPesoEmbalagem, idClassificacao, nomePesoEmbalagem, ativo) {
        console.log("Buscar Peso Embalagem")
        console.log("IdClassif: " + idClassificacao)

        idPesoEmbalagem = idPesoEmbalagem ? idPesoEmbalagem : "";
        idClassificacao = idClassificacao ? idClassificacao : "";
        nomePesoEmbalagem = nomePesoEmbalagem ? nomePesoEmbalagem : "";
        ativo = ativo ? ativo : "";

        var url = urlBaseApi + '/GetPesoEmbalagem?Idpeso=' + idPesoEmbalagem + '&Idclass=' + idClassificacao + '&DesPeso=' + nomePesoEmbalagem + '&FlgAtivo=' + ativo;

        const config = {
            headers: {
                "Access-Control-Allow-Origin": "*"
            }
        };

        var result = [];
        await axios.get(url, config)
            .then(response => {
                console.log("succeso")
                console.log(response)
                result = response.data.data;
                result = {
                    sucesso: true,
                    data: response.data.data
                };
            })
            .catch(error => {
                console.log("Error")
                console.log(error)

                result = {
                    sucesso: false,
                    erros: error.response.data.errors
                };
            });

        return result;
    }

    static async AdicionarPesoEmbalagem(idClassificacao, nomePesoEmbalagem) {
        console.log("Add Peso Embalagem")

        var url = urlBaseApi + '/AddPesoEmbalagem';

        const config = {
            headers: {
                "Access-Control-Allow-Origin": "*"
            }
        };

        var pesoEmbalagem = {
            "idclass": idClassificacao,
            "desPeso": nomePesoEmbalagem
        };

        var result = false;
        await axios.post(url, pesoEmbalagem, config)
            .then(response => {
                console.log("sucesso")
                console.log(response)
                result = {
                    sucesso: true
                };
            })
            .catch(error => {
                console.log("Error")
                console.log(error)
                result = {
                    sucesso: false,
                    erros: error.response.data.errors
                };
            });

        return result;
    }

    static async AtualizarPesoEmbalagem(id, idClassificacao, nomePesoEmbalagem, ativo) {
        console.log("Atualizar Peso Embalagem")

        var url = urlBaseApi + '/UpdatePesoEmbalagem';

        const config = {
            headers: {
                "Access-Control-Allow-Origin": "*"
            }
        };

        var pesoEmbalagem = {
            "idpeso": id,
            "idclass": idClassificacao,
            "desPeso": nomePesoEmbalagem,
            "flgAtivo": ativo
        };

        var result = false;
        axios.put(url, pesoEmbalagem, config)
            .then(response => {
                console.log("sucesso")
                console.log(response)
                result = {
                    sucesso: true
                };
            })
            .catch(error => {
                console.log("Error")
                console.log(error)
                result = {
                    sucesso: false,
                    erros: error.response.data.errors
                };
            });

        return result;
    }

    static async NomeCientificoGetAll() {
        console.log("NomeCientifico Get All")

        var url = urlBaseApi + '/GetAllNomeCientifico';

        const config = {
            headers: {
                "Access-Control-Allow-Origin": "*"
            }
        };

        var result = [];
        await axios.get(url, config)
            .then(response => {
                console.log("sucesso")
                console.log(response)
                result = {
                    sucesso: true,
                    data: response.data.data.filter(valor => valor.flgAtivo)
                };
            })
            .catch(error => {
                console.log("Error")
                console.log(error)
                result = {
                    sucesso: false,
                    erros: error.response.data.errors
                };
            });

        return result;
    }

    static async NomeCientificoGetById(id) {
        console.log("NomeCientifico By Id")

        var url = urlBaseApi + '/GetByIdNomeCientifico?codigo=' + id;

        const config = {
            headers: {
                "Access-Control-Allow-Origin": "*"
            }
        };

        var result = [];
        await axios.get(url, config)
            .then(response => {
                console.log("sucesso")
                console.log(response)
                result = {
                    sucesso: true,
                    data: response.data.data
                };
            })
            .catch(error => {
                console.log("Error")
                console.log(error)
                result = {
                    sucesso: false,
                    erros: error.response.data.errors
                };
            });

        return result;
    }

    static async BuscarNomeCientifico(idNomeCientifico, idClassificacao, idEspecie, nomeNomeCientifico, ativo) {
        console.log("Buscar NomeCientifico")
        console.log("IdClassif: " + idClassificacao)

        idNomeCientifico = idNomeCientifico ? idNomeCientifico : "";
        idClassificacao = idClassificacao ? idClassificacao : "";
        idEspecie = idEspecie ? idEspecie : "";
        nomeNomeCientifico = nomeNomeCientifico ? nomeNomeCientifico : "";
        ativo = ativo ? ativo : "";

        var url = urlBaseApi + '/GetNomeCientifico?Idnm=' + idNomeCientifico + '&Idclass=' + idClassificacao + '&Idesp=' + idEspecie + '&DesNm=' + nomeNomeCientifico + '&FlgAtivo=' + ativo;

        const config = {
            headers: {
                "Access-Control-Allow-Origin": "*"
            }
        };

        var result = [];
        await axios.get(url, config)
            .then(response => {
                console.log("succeso")
                console.log(response)
                result = {
                    sucesso: true,
                    data: response.data.data
                };
            })
            .catch(error => {
                console.log("Error")
                console.log(error)
                result = {
                    sucesso: false,
                    erros: error.response.data.errors
                };
            });

        return result;
    }

    static async AdicionarNomeCientifico(idClassificacao, idEspecie, nomeNomeCientifico) {
        console.log("Add Nome Cientifico")

        var url = urlBaseApi + '/AddNomeCientifico';

        const config = {
            headers: {
                "Access-Control-Allow-Origin": "*"
            }
        };

        var nomeCientifico = {
            "idclass": idClassificacao,
            "idesp": idEspecie,
            "desNm": nomeNomeCientifico
        };

        var result = false;
        await axios.post(url, nomeCientifico, config)
            .then(response => {
                console.log("sucesso")
                console.log(response)
                result = {
                    sucesso: true
                };
            })
            .catch(error => {
                console.log("Error")
                console.log(error)
                result = {
                    sucesso: false,
                    erros: error.response.data.errors
                };
            });

        return result;
    }

    static async AtualizarNomeCientifico(id, idClassificacao, idEspecie, nomeNomeCientifico, ativo) {
        console.log("Atualizar Nome Cientifico")

        var url = urlBaseApi + '/UpdateNomeCientifico';

        const config = {
            headers: {
                "Access-Control-Allow-Origin": "*"
            }
        };

        var nomeCientifico = {
            "idnm": id,
            "idclass": idClassificacao,
            "idesp": idEspecie,
            "desNm": nomeNomeCientifico,
            "flgAtivo": ativo
        };

        var result = false;
        axios.put(url, nomeCientifico, config)
            .then(response => {
                console.log("sucesso")
                console.log(response)
                result = {
                    sucesso: true
                };
            })
            .catch(error => {
                console.log("Error")
                console.log(error)
                result = {
                    sucesso: false,
                    erros: error.response.data.errors
                };
            });

        return result;
    }

    static async CampoProducaoGetAll() {
        console.log("CampoProducap Get All")

        var url = urlBaseApi + '/GetAllCampoProducao';

        const config = {
            headers: {
                "Access-Control-Allow-Origin": "*"
            }
        };

        var result = [];
        await axios.get(url, config)
            .then(response => {
                console.log("sucesso")
                console.log(response)
                result = {
                    sucesso: true,
                    data: response.data.data.filter(valor => valor.flgAtivo)
                };
            })
            .catch(error => {
                console.log("Error")
                console.log(error)
                result = {
                    sucesso: false,
                    erros: error.response.data.errors
                };
            });

        return result;
    }

    static async CampoProducaoGetById(id) {
        console.log("CampoProducao By Id")

        var url = urlBaseApi + '/GetByIdCampoProducao?codigo=' + id;

        const config = {
            headers: {
                "Access-Control-Allow-Origin": "*"
            }
        };

        var result = null;
        await axios.get(url, config)
            .then(response => {
                console.log("sucesso")
                console.log(response)
                result = {
                    sucesso: true,
                    data: response.data.data
                };
            })
            .catch(error => {
                console.log("Error")
                console.log(error)
                result = {
                    sucesso: false,
                    erros: error.response.data.errors
                };
            });

        return result;
    }

    static async BuscarCampoProducao(idCampoProducao, idClassificacao, nomeCampoProducao, ativo) {
        console.log("Buscar CampoProducao")
        console.log("IdClassif: " + idClassificacao)

        idCampoProducao = idCampoProducao ? idCampoProducao : "";
        idClassificacao = idClassificacao ? idClassificacao : "";
        nomeCampoProducao = nomeCampoProducao ? nomeCampoProducao : "";
        ativo = ativo ? ativo : "";

        var url = urlBaseApi + '/GetCampoProducao?Idcamp=' + idCampoProducao + '&Idclass=' + idClassificacao + '&DesCamp=' + nomeCampoProducao + '&FlgAtivo=' + ativo;

        const config = {
            headers: {
                "Access-Control-Allow-Origin": "*"
            }
        };

        var result = null;
        await axios.get(url, config)
            .then(response => {
                console.log("succeso")
                console.log(response)
                result = {
                    sucesso: true,
                    data: response.data.data
                };
            })
            .catch(error => {
                console.log("Error")
                console.log(error)
                result = {
                    sucesso: false,
                    erros: error.response.data.errors
                };
            });

        return result;
    }

    static async AdicionarCampoProducao(idClassificacao, nomeCampoProducao) {
        console.log("Add CampoProducao")

        var url = urlBaseApi + '/AddCampoProducao';

        const config = {
            headers: {
                "Access-Control-Allow-Origin": "*"
            }
        };

        var campoProducao = {
            "idclass": idClassificacao,
            "desCamp": nomeCampoProducao
        };

        var result = null;
        await axios.post(url, campoProducao, config)
            .then(response => {
                console.log("sucesso")
                console.log(response)
                result = {
                    sucesso: true,
                    data: response.data.data
                }
            })
            .catch(error => {
                console.log("Error")
                console.log(error)
                result = {
                    sucesso: false,
                    erros: error.response.data.errors
                };
            });

        return result;
    }

    static async AtualizarCampoProducao(id, idClassificacao, nomeCampoProducao, ativo) {
        console.log("Atualizar Campo Producao")

        var url = urlBaseApi + '/UpdateCampoProducao';

        const config = {
            headers: {
                "Access-Control-Allow-Origin": "*"
            }
        };

        var campoProducao = {
            "idcamp": id,
            "idclass": idClassificacao,
            "desCamp": nomeCampoProducao,
            "flgAtivo": ativo
        };

        var result = null;
        await axios.put(url, campoProducao, config)
            .then(response => {
                console.log("sucesso")
                console.log(response)
                result = {
                    sucesso: true
                };
            })
            .catch(error => {
                console.log("Error")
                console.log(error)
                result = {
                    sucesso: false,
                    erros: error.response.data.errors
                };
            });

        return result;
    }

    
}

export default ApiService;