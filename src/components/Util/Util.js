import Notificacao from "./Notificacao";

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

    static validarFormularioUsuario(unidadeAdministrativa, cargo, cpf, nomeCompleto, login, senha, confirmarSenha, isEdit) {
        var mensagensErro = [];

        if (unidadeAdministrativa === 0 || unidadeAdministrativa === "") {
            mensagensErro.push("Preencha uma unidade administrativa válida");
        }

        if (cargo === 0 || cargo === "") {
            mensagensErro.push("Preencha um cargo válido");
        }

        if (!Util.validarCpf(cpf)) {
            mensagensErro.push("Preencha um CPF válido");
        }

        if (nomeCompleto === "") {
            mensagensErro.push("Preencha o nome completo");
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
            sucesso: mensagensErro.length == 0 ? true : false,
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
}

export default Util;