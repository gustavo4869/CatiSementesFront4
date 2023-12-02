﻿import Notificacao from "./Notificacao";

class Util {

    /* Services -> Keycloak */
    static urlBaseKeycloak = "";
    static urlNovoUsuario = "";
    static urlEditarUsuario = "";
    static urlExcluirUsuario = "";
    /* Services -> Keycloak */

    static validarCpf(strCPF) {
        var Soma;
        var Resto;
        var i = 0;
        Soma = 0;
        if (strCPF == "00000000000") return false;

        var i = 0;
        for (i = 1; i <= 9; i++) Soma = Soma + parseInt(strCPF.substring(i - 1, i)) * (11 - i);
        Resto = (Soma * 10) % 11;

        if ((Resto == 10) || (Resto == 11)) Resto = 0;
        if (Resto != parseInt(strCPF.substring(9, 10))) return false;

        Soma = 0;
        for (i = 1; i <= 10; i++) Soma = Soma + parseInt(strCPF.substring(i - 1, i)) * (12 - i);
        Resto = (Soma * 10) % 11;

        if ((Resto == 10) || (Resto == 11)) Resto = 0;
        if (Resto != parseInt(strCPF.substring(10, 11))) return false;
        return true;
    }

    static validarFormularioUsuario(unidadeAdministrativa, cargo, cpf, nomeCompleto, login, senha, confirmarSenha, isEdit, email, municipio) {
        var mensagensErro = [];
        var regexEmail = /\S+@\S+\.\S+/;
        
        if (unidadeAdministrativa === 0 || unidadeAdministrativa === "") {
            mensagensErro.push("Preencha uma unidade administrativa válida");
        }

        if (cargo === 0 || cargo === "") {
            mensagensErro.push("Preencha um cargo válido");
        }

        if (!Util.validarCpf(cpf)) {
            mensagensErro.push("Preencha um CPF válido");
        }

        console.log("Municipio")
        console.log(municipio)

        if (municipio === "0" || municipio === "") {
            mensagensErro.push("Selecione um município válido");
        }

        if (nomeCompleto === "") {
            mensagensErro.push("Preencha o nome completo");
        }

        if (email === "" || !regexEmail.test(email)) {
            mensagensErro.push("Preencha um e-mail válido");
        }

        if (login === "") {
            mensagensErro.push("Preencha o login do usuário");
        }

        if ((senha === "" && !isEdit)) {
            mensagensErro.push("Preencha uma senha válida");
        }

        if (senha !== confirmarSenha) {
            mensagensErro.push("As senhas não são iguais!");
        }

        return {
            sucesso: mensagensErro.length === 0 ? true : false,
            erros: mensagensErro
        };
    }

    static formatarDataBrParaBancoDados(dataBr) {
        var resultado = "";
        if (dataBr != "") {
            var data = dataBr.split("/");
            if (data.length == 3) {
                var dia = data[0];
                var mes = data[1];
                var ano = data[2];
                resultado = ano + "-" + mes + "-" + dia + "T00:00:00";
            }
        }        
        return resultado;
    }

    static exibirMensagemSucesso(mensagem) {
        Notificacao.sucesso("Sucesso", mensagem);
    }

    static exibirMensagemErro(mensagem) {
        Notificacao.erro("Ops...", mensagem);
    }

    static exibirMensagensErro(mensagens) {
        if (Array.isArray(mensagens)) {
            for (var i = 0; i < mensagens.length; i++) {
                Notificacao.erro("Ops...", mensagens[i]);
            }
        }
    }

    static getPerfilKeycloak(keycloakRoles) {
        var perfil = "Administrador";
        Array.from(keycloakRoles).forEach(function (valor) {
            console.log("Resource Value: " + valor)
            if (valor == "Visualizador") {
                perfil = "Visualizador";
                return;
            }
            else if (valor == "Comum") {
                perfil = "Comum";
                return;
            }
            else if (valor == "Administrador") {
                perfil = "Administrador";
                return;
            }
        });
        return perfil;
    }

    static tratarProdutosExportacao(desClass, listaProdutos) {
        let produtos = [];

        if (listaProdutos.length === 0) {
            return;
        }

        if (desClass === "Grãos") {
            listaProdutos.forEach(function (item) {
                const produto = {
                    id: item.id,
                    "Produto": item.desProd,
                    "Classificação": item.classificacao,
                    "Especie": item.especie,
                    "Sist. de Produção": item.sistemaProducao,
                    "Tratamento": item.tratamento,
                    "Tipo": item.tipo,
                    "Peso Emb.": item.pesoEmbalagem
                };

                produtos.push(produto);
            });

            return produtos;
        }

        if (desClass === "Sementes") {
            listaProdutos.forEach(function (item) {
                const produto = {
                    id: item.id,
                    "Produto": item.desProd,
                    "Class.": item.classificacao,
                    "Esp.": item.especie,
                    "Nome cient.": item.nomeCientifico,
                    "Cultivar": item.cultivar,
                    "Cat.": item.categoria,
                    "Sist. Produção": item.sistemaProducao,
                    "Trat.": item.tratamento,
                    "Peneira": item.peneira,
                    "Peso emb.": item.pesoEmbalagem,
                    "Lote": item.lote,
                    "Safra": item.safra,
                    "Val. Análise": item.dtValAnalise,
                    "% Germinação": item.priReanalise,
                    "Val. Análise 1": item.dtValPriAnalise,
                    "% Germinação 1": item.segReanalise,
                    "Val. Análise 2": item.dtValSegAnalise,
                    "% Germinação 2": item.terReanalise,
                    "Val. Análise 3": item.dtValTerAnalise
                };

                produtos.push(produto);
            });

            return produtos;
        }

        if (desClass === "Mudas") {
            listaProdutos.forEach(function (item) {
                const produto = {
                    id: item.id,
                    "Produto": item.desProd,
                    "Class.": item.classificacao,
                    "Esp.": item.especie,
                    "Nome cient.": item.nomeCientifico,
                    "Cultivar": item.cultivar,
                    "Categoria": item.categoria,
                    "Grupo": item.grupo,
                    "Sist. Produção": item.sistemaProducao,
                    "Tipo": item.tipo,
                    "Emb.": item.embalagem,
                    "Idade": item.idade,
                    "Unidade": item.unidade,
                    "Safra": item.safra,
                    "Lote": item.lote,
                    "Viv.": item.viveiro
                };

                produtos.push(produto);
            });

            return produtos;
        }

        if (desClass === "Material de propagação vegetativa") {
            listaProdutos.forEach(function (item) {
                const produto = {
                    id: item.id,
                    "Produto": item.desProd,
                    "Classificação": item.classificacao,
                    "Material de Prop. Vegetativa": item.material
                };

                produtos.push(produto);
            });

            return produtos;
        }

        if (desClass === "Sub-produto mudas") {
            listaProdutos.forEach(function (item) {
                const produto = {
                    id: item.id,
                    "Produto": item.desProd,
                    "Classificação": item.classificacao,
                    "Sub Produto": item.subProduto
                };

                produtos.push(produto);
            });

            return produtos;
        }

        if (desClass === "Serviços") {
            listaProdutos.forEach(function (item) {
                const produto = {
                    id: item.id,
                    "Produto": item.desProd,
                    "Classificação": item.classificacao,
                    "Classificação 1": item.classificacao1,
                    "Serviço": item.servico
                };

                produtos.push(produto);
            });

            return produtos;
        }

        if (desClass === "Outros") {
            listaProdutos.forEach(function (item) {
                const produto = {
                    id: item.id,
                    "Produto": item.desProd,
                    "Classificação": item.classificacao,
                    "Classificação 1": item.classificacao1
                };

                produtos.push(produto);
            });

            return produtos;
        }
    }

    static tratarPontosVendaExportacao(desTpPdv, listaPdv) {
        let pdvs = [];

        if (listaPdv.length === 0) {
            return;
        }

        if (desTpPdv === "Casa de Agricultura") {
            listaPdv.forEach(function (item) {
                const pdvCidades = item.pdvCidades;
                let listaMunicipios = '';
                if (pdvCidades.length > 0) {
                    pdvCidades.forEach(function (itemCidade, i) {
                        if (pdvCidades.length === 1 || i === (pdvCidades.length - 1)) {
                            listaMunicipios += itemCidade.desCidade;
                        }
                        else if (pdvCidades.length > 1) {
                            listaMunicipios += itemCidade.desCidade + ", ";
                        }
                    });
                }

                const pdv = {
                    id: item.idpdv,
                    "Nome": item.desUnidade,
                    "Status": item.desStatus,
                    "Cidade": item.desMunicipio,
                    "Lista Municípios": listaMunicipios
                };

                pdvs.push(pdv);
            });

            return pdvs;
        }

        if (desTpPdv === "Centro") {
            listaPdv.forEach(function (item) {
                const pdvCidades = item.pdvCidades;
                let listaMunicipios = '';
                if (pdvCidades.length > 0) {
                    pdvCidades.forEach(function (itemCidade, i) {
                        if (pdvCidades.length === 1 || i === (pdvCidades.length - 1)) {
                            listaMunicipios += itemCidade.desCidade;
                        }
                        else if (pdvCidades.length > 1) {
                            listaMunicipios += itemCidade.desCidade + ", ";
                        }
                    });
                }

                const pdv = {
                    id: item.idpdv,
                    "Nome": item.desUnidade,
                    "Status": item.desStatus,
                    "Cidade": item.desMunicipio,
                    "Lista Municípios": listaMunicipios
                };

                pdvs.push(pdv);
            });

            return pdvs;
        }

        if (desTpPdv === "Cat Regional") {
            listaPdv.forEach(function (item) {
                const pdvCidades = item.pdvCidades;
                let listaMunicipios = '';
                if (pdvCidades.length > 0) {
                    pdvCidades.forEach(function (itemCidade, i) {
                        if (pdvCidades.length === 1 || i === (pdvCidades.length - 1)) {
                            listaMunicipios += itemCidade.desCidade;
                        }
                        else if (pdvCidades.length > 1) {
                            listaMunicipios += itemCidade.desCidade + ", ";
                        }
                    });
                }

                const pdv = {
                    id: item.idpdv,
                    "Nome": item.desUnidade,
                    "Status": item.desStatus,
                    "Cidade": item.desMunicipio,
                    "Lista Municípios": listaMunicipios
                };

                pdvs.push(pdv);
            });

            return pdvs;
        }

        if (desTpPdv === "Centro de Sementes") {
            listaPdv.forEach(function (item) {
                const pdvCidades = item.pdvCidades;
                let listaMunicipios = '';
                if (pdvCidades.length > 0) {
                    pdvCidades.forEach(function (itemCidade, i) {
                        if (pdvCidades.length === 1 || i === (pdvCidades.length - 1)) {
                            listaMunicipios += itemCidade.desCidade;
                        }
                        else if (pdvCidades.length > 1) {
                            listaMunicipios += itemCidade.desCidade + ", ";
                        }
                    });
                }

                const pdv = {
                    id: item.idpdv,
                    "Nome": item.desUnidade,
                    "Status": item.desStatus,
                    "Cidade": item.desMunicipio,
                    "Lista Municípios": listaMunicipios
                };

                pdvs.push(pdv);
            });

            return pdvs;
        }

        if (desTpPdv === "Centro de Mudas") {
            listaPdv.forEach(function (item) {
                const pdvCidades = item.pdvCidades;
                let listaMunicipios = '';
                if (pdvCidades.length > 0) {
                    pdvCidades.forEach(function (itemCidade, i) {
                        if (pdvCidades.length === 1 || i === (pdvCidades.length - 1)) {
                            listaMunicipios += itemCidade.desCidade;
                        }
                        else if (pdvCidades.length > 1) {
                            listaMunicipios += itemCidade.desCidade + ", ";
                        }
                    });
                }

                const pdv = {
                    id: item.idpdv,
                    "Nome": item.desUnidade,
                    "Status": item.desStatus,
                    "Cidade": item.desMunicipio,
                    "Lista Municípios": listaMunicipios
                };

                pdvs.push(pdv);
            });

            return pdvs;
        }
    }
}

export default Util;