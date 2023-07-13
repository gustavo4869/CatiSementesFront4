import React, { Component } from 'react';
import ReactModal from 'react-modal';
import Select from 'react-select';

import RegionalService from '../../../services/pontoVenda/RegionalService';
import CasaAgriculturaService from '../../../services/pontoVenda/CasaAgriculturaService';
import PontoVendaService from '../../../services/pontoVenda/PontoVendaService';
import Util from '../../Util/Util';
import './css/ModalAtributos.css';
import 'react-responsive-modal/styles.css';
import Notificacao from '../../Util/Notificacao';

class ModalPontoVenda extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showModalPontoVenda: false,
            tipoPdv: this.props.tipoPdv,
            especies: [],
            processando: false,
            camposVisiveis: {
                cidade: false,
                casaAgricultura: false,
                catiRegional: false,
                cidadeIsMulti: false
            },
            pontoVenda: {
                idPdv: 0,
                desUnidade: "",
                idReg: 0,
                idTpPdv: 0,
                usuCriacao: "",
                pdvCas: [],
                pdvCidades: [],
            },
            tipoStatusPontoVenda: [
                {
                    label: "Ativo",
                    value: 1
                },
                {
                    label: "Inativo",
                    value: 2
                }
            ]
        };

        this.toggleModalPontoVenda = this.toggleModalPontoVenda.bind(this);
        this.limparFormularioPontoVenda = this.limparFormularioPontoVenda.bind(this);
        this.validarFormularioPontoVenda = this.validarFormularioPontoVenda.bind(this);
        this.salvarPontoVenda = this.salvarPontoVenda.bind(this);
        this.onChangePontoVenda = this.onChangePontoVenda.bind(this);
        this.onChangeCidade = this.onChangeCidade.bind(this);
        this.onChangeNome = this.onChangeNome.bind(this);
        this.onChangeCatiRegional = this.onChangeCatiRegional.bind(this);
        this.onChangeCentro = this.onChangeCentro.bind(this);
        this.onChangeStatus = this.onChangeStatus.bind(this);
        this.onChangeCasaAgricultura = this.onChangeCasaAgricultura.bind(this);
        this.erroAoSalvar = this.erroAoSalvar.bind(this);
    }

    toggleModalPontoVenda() {
        console.log(this.props)
        this.setState(state => ({
            showModalPontoVenda: !state.showModalPontoVenda
        }));

        if (this.state.showModalPontoVenda) {
            this.limparFormularioPontoVenda();
        }
    }

    validarFormularioPontoVenda() {
        const tipoPontoVenda = document.getElementById("tipoPontoVenda").value;
        const nomeUnidadePontoVenda = document.getElementById("nomeUnidadePontoVenda").value;
        const statusPontoVenda = document.getElementById("statusPontoVenda").value;
        const cidadePontoVenda = document.getElementById("cidadePontoVenda").value;
        const casaAgriculturaPontoVenda = document.getElementById("casaAgriculturaPontoVenda").value;
        const catiRegionalPontoVenda = document.getElementById("catiRegionalPontoVenda").value;

        if (tipoPontoVenda === 0) {
            Util.exibirMensagemErro("Selecione o tipo de ponto de venda");
            return false;
        }

        if (nomeUnidadePontoVenda === "") {
            Util.exibirMensagemErro("Digite o nome da unidade do ponto de venda");
            return false;
        }

        if (statusPontoVenda === 0) {
            Util.exibirMensagemErro("Selecione o status do ponto de venda");
            return false;
        }

        if (cidadePontoVenda === 0) {
            Util.exibirMensagemErro("Selecione ao menos 1 cidade do ponto de venda");
            return false;
        }

        if (this.state.camposVisiveis.casaAgricultura && casaAgriculturaPontoVenda === 0) {
            Util.exibirMensagemErro("Selecione ao menos 1 casa da agricultura do ponto de venda");
            return false;
        }

        if (this.state.camposVisiveis.catiRegional && catiRegionalPontoVenda === 0) {
            Util.exibirMensagemErro("Selecione a CATI regional do ponto de venda");
            return false;
        }

        return true;
    }

    limparFormularioPontoVenda() {
        document.querySelectorAll("select").forEach(function (select) { select.value = "" });
        document.querySelectorAll("input[type=text]").forEach(function (text) { text.value = "" });
        this.visibilidadeCamposPontoVenda("");
    }

    async salvarPontoVenda() {
        console.log("Salvar Ponto Venda")
        const tipoPontoVenda = this.state.pontoVenda.idTpPdv;
        console.log(tipoPontoVenda)
        var resultado = {};
        var mensagemSucesso = "";

        this.setState({ processando: true });
        switch (tipoPontoVenda) {
            case 1: // Cati Regional                
                const regional = {
                    idReg: this.state.pontoVenda.idReg,
                    desReg: this.state.pontoVenda.desUnidade,
                    usuCriacao: ""
                }
                console.log("Salvar")
                console.log(this.state.pontoVenda);
                console.log(regional);
                resultado = await RegionalService.addRegional(regional);
                if (!resultado.sucesso) {
                    this.erroAoSalvar(resultado.mensagem);
                    return;
                }
                mensagemSucesso = resultado.mensagem;
                break;

            case 2: // Núcleo de Sementes             
                console.log("Salvar")
                console.log(this.state.pontoVenda);
                resultado = await PontoVendaService.addPdv(this.state.pontoVenda);
                if (!resultado.sucesso) {
                    this.erroAoSalvar(resultado.mensagem);
                    return;
                }
                mensagemSucesso = resultado.mensagem;
                break;

            case 3: // Núcleo de Mudas
                console.log("Salvar")
                console.log(this.state.pontoVenda);
                resultado = await PontoVendaService.addPdv(this.state.pontoVenda);
                if (!resultado.sucesso) {
                    this.erroAoSalvar(resultado.mensagem);
                    return;
                }
                mensagemSucesso = resultado.mensagem;
                break;

            case 4: // Casa da Agricultura
                const ca = {
                    idCa: this.state.pontoVenda.pdvCas[0] ?? 0,
                    idReg: this.state.pontoVenda.idReg,
                    desCa: this.state.pontoVenda.desUnidade,
                    usuCriacao: ""
                };
                console.log("Salvar")
                console.log(this.state.pontoVenda)
                console.log(ca)
                resultado = await CasaAgriculturaService.addCa(ca);
                if (!resultado.sucesso) {
                    this.erroAoSalvar(resultado.mensagem);
                    return;
                }
                mensagemSucesso = resultado.mensagem;
                break;

            default:
                console.log('default');
                break;
        }

        Notificacao.sucesso("Sucesso", mensagemSucesso)
        this.limparFormularioPontoVenda();
        this.toggleModalPontoVenda();
        this.setState({ processando: true });
    }

    erroAoSalvar(mensagem) {
        Notificacao.erro("Erro", mensagem);
        this.setState({ processando: false });
    }

    visibilidadeCamposPontoVenda(codigo) {
        var camposVisiveis = {
            cidade: false,
            casaAgricultura: false,
            catiRegional: false,
            cidadeIsMulti: false
        };

        switch (codigo) {
            case 1: // Cati Regional
                camposVisiveis.cidade = false;
                camposVisiveis.casaAgricultura = false;
                camposVisiveis.catiRegional = false;
                camposVisiveis.cidadeIsMulti = true;
                break;

            case 2: // Nucleo de Sementes
                camposVisiveis.cidade = true;
                camposVisiveis.catiRegional = true;
                camposVisiveis.casaAgricultura = true;
                camposVisiveis.cidadeIsMulti = true;
                break;

            case 3: // Nucleo de Mudas
                camposVisiveis.cidade = true;
                camposVisiveis.catiRegional = true;
                camposVisiveis.casaAgricultura = false;
                camposVisiveis.cidadeIsMulti = false;
                break;

            case 4: // Casa de Agricultura
                camposVisiveis.cidade = false;
                camposVisiveis.catiRegional = true;
                camposVisiveis.casaAgricultura = false;
                camposVisiveis.cidadeIsMulti = false;
                break;

            case "5": // Centro
                camposVisiveis.catiRegional = false;
                camposVisiveis.casaAgricultura = false;
                camposVisiveis.cidadeIsMulti = true;
                break;

            default:
                camposVisiveis.cidade = false;
                camposVisiveis.catiRegional = false;
                camposVisiveis.casaAgricultura = false;
                camposVisiveis.cidadeIsMulti = true;
                break;
        }

        this.setState({ camposVisiveis: camposVisiveis }, () => { console.log(this.state) });
    }

    async onChangePontoVenda(options, action) {
        console.log("Change Ponto Venda")
        console.log(options)
        this.visibilidadeCamposPontoVenda(options.value);
        var pdv = this.state.pontoVenda;
        pdv.idTpPdv = options.value;
        this.setState({ pontoVenda: pdv });       
    }

    onChangeCidade(options, action) {
        var pdv = this.state.pontoVenda;
        var cidadesSelecionadas = [];
        options.forEach(function (option) {
            const cidade = {
                idPcid: 0,
                idPdv: 0,
                codIbge: option.value
            }
            cidadesSelecionadas.push(cidade);
        });
        pdv.pdvCidades = cidadesSelecionadas;

        this.setState({ pontoVenda: pdv });
    }

    onChangeCasaAgricultura(options, action) {
        console.log(this.state)
        var pdv = this.state.pontoVenda;
        var casSelecionadas = [];
        options.forEach(function (option) {
            const ca = {
                idPca: 0,
                idPdv: 0,
                idCa: option.value
            }
            casSelecionadas.push(ca);
        });
        pdv.pdvCas = casSelecionadas;

        this.setState({ pontoVenda: pdv });
    }

    onChangeNome(event) {
        var pdv = this.state.pontoVenda;
        pdv.desUnidade = event.target.value;
        this.setState({
            pontoVenda: pdv
        });
    }

    onChangeStatus(status) {
    }

    onChangeCatiRegional(options) {
        var pdv = this.state.pontoVenda;
        pdv.idReg = options.value;

        this.setState({ pontoVenda: pdv });
    }

    onChangeCentro(centro) {
        this.setState({
            pontoVenda: {
                centro: centro
            }
        });
    }

    render() {
        return (
            <div className={"modal-atributo-wrapper" + this.state.processando ? " processando" : ""}>
                <ReactModal
                    isOpen={this.state.showModalPontoVenda}
                    ariaHideApp={false}
                    portalClassName="container-modal-atributo"
                >
                    <div className="modal-atributo-header">
                        <font className="titulo-header">CRIAR PONTO DE VENDA</font>
                        <button onClick={this.toggleModalPontoVenda}>X</button>
                    </div>
                    <div className="modal-atributo-body">
                        <form autoComplete="off">
                            <div className="row">
                                <div className="col-6">
                                    <div className="form-group">
                                        <label htmlFor="tipoPontoVenda" className="label-form-modal">Tipo de PDV</label>
                                        <Select
                                            id="tipoPontoVenda"
                                            name="tipoPontoVenda"
                                            className=""
                                            onChange={this.onChangePontoVenda}
                                            placeholder="Selecione..."
                                            options={this.props.tipoPdv}
                                        />
                                    </div>
                                </div>
                                <div className="col-6">
                                    <div className="form-group">
                                        <label htmlFor="nomeUnidadePontoVenda" className="label-form-modal">Nome Unidade</label>
                                        <input type="text" className="form-control input-form-modal" id="nomeUnidadePontoVenda" onChange={this.onChangeNome} />
                                    </div>
                                </div>
                                <div className="col-6">
                                    <div className="form-group">
                                        <label htmlFor="statusPontoVenda" className="label-form-modal">Status</label>
                                        <Select
                                            id="statusPontoVenda"
                                            options={this.state.tipoStatusPontoVenda}
                                            placeholder="Selecione..."
                                        />
                                    </div>
                                </div>
                                <div className={"col-6 " + (this.state.camposVisiveis.cidade ? "" : "hidden-form")}>
                                    <div className="form-group">
                                        <label htmlFor="cidadePontoVenda" className="label-form-modal">Cidade</label>
                                        <Select
                                            isMulti
                                            name="cidadePontoVenda"
                                            id="cidadePontoVenda"
                                            options={this.props.municipios}
                                            className="basic-multi-select"
                                            classNamePrefix="select"
                                            onChange={this.onChangeCidade}
                                            placeholder="Selecione..."
                                        />
                                    </div>
                                </div>
                                <div className={"col-6 " + (this.state.camposVisiveis.casaAgricultura ? "" : "hidden-form")}>
                                    <div className="form-group">
                                        <label htmlFor="casaAgriculturaPontoVenda" className="label-form-modal">Casas da Agricultura</label>
                                        <Select
                                            id="casaAgriculturaPontoVenda"
                                            name="casaAgriculturaPontoVenda"
                                            isMulti={true}
                                            className=""
                                            onChange={this.onChangeCasaAgricultura}
                                            placeholder="Selecione..."
                                            options={this.props.comboCa}
                                        />
                                    </div>
                                </div>
                                <div className={"col-6 " + (this.state.camposVisiveis.catiRegional ? "" : "hidden-form")}>
                                    <div className="form-group">
                                        <label htmlFor="catiRegionalPontoVenda" className="label-form-modal">CATI Regional</label>
                                        <Select
                                            id="catiRegionalPontoVenda"
                                            name="catiRegionalPontoVenda"
                                            className=""
                                            onChange={this.onChangeCatiRegional}
                                            placeholder="Selecione..."
                                            options={this.props.comboRegional}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-12 container-btn-salvar-atributo">
                                    <button type="button" className="btn-salvar-atributo" id="btnSalvarNomeCientifico" disabled={this.state.processando} onClick={this.salvarPontoVenda}>SALVAR</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </ReactModal>
            </div>
        );
    }
}

export default ModalPontoVenda;