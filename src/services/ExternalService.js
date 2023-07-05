import axios from 'axios';

class ExternalService {

    static async buscarMunicipios() {
        console.log("buscarMunicipios")
        var dados = {};
        await axios.get("https://servicodados.ibge.gov.br/api/v1/localidades/estados/SP/municipios")
            .then(response => {
                console.log("then")
                dados = {
                    sucesso: true,
                    dados: response.data.map(function (x) { return { label: x.nome, value: x.id }; })
                };
            })
            .catch(error => {
                console.log("Erro Municipios")
                console.log(error)
                dados = {
                    sucesso: false,
                    mensagem: error
                };
            });
        return dados;
    }
}

export default ExternalService;