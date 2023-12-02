import React, { Component } from 'react';
import ReactModal from 'react-modal';
import Select from 'react-select';

import './css/ModalUsuario.css';
import 'react-responsive-modal/styles.css';

class ModalFiltroAvancadoUsuario extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showModalFiltro: false,
            filtro: this.props.filtros
        };

        this.toggleModalFiltro = this.toggleModalFiltro.bind(this);
        this.onChangeMunicipio = this.onChangeMunicipio.bind(this);
        this.onChangeCargo = this.onChangeCargo.bind(this);
        this.onChangeUnidadeAdministrativa = this.onChangeUnidadeAdministrativa.bind(this);
        this.limparFormularioUsuario = this.limparFormularioUsuario.bind(this);
        this.filtrar = this.filtrar.bind(this);
    }

    toggleModalFiltro() {
        console.log("Toogle Filtro")
        console.log(this.props)
        this.setState(state => ({
            showModalFiltro: !state.showModalFiltro,
            filtro: this.props.filtro
        }));        
    }

    limparFormularioUsuario() {
        this.setState((state) => ({
            filtro: {
                ...state.filtro,
                municipio: "",
                cargo: "",
                unidadeAdministrativa: ""
            }
        }));
    }

    onChangeMunicipio(event) {
        console.log(event)
        this.setState(filtro => ({
            filtro: {
                ...filtro.filtro,
                municipio: event ? event.value : ""
            }
        }));
    }

    onChangeCargo(event) {
        this.setState(filtro => ({
            filtro: {
                ...filtro.filtro,
                cargo: event ? event.value : ""
            }
        }));
    }

    onChangeUnidadeAdministrativa(event) {
        this.setState(filtro => ({
            filtro: {
                ...filtro.filtro,
                unidadeAdministrativa: event ? event.value : ""
            }
        }));
    }

    filtrar() {
        console.log("Filtrar")
        console.log(this.state.filtro)
        console.log(this.props.filtro)

        this.props.filtrarModal(this.state.filtro);
    }

    render() {
        return (
            <div className="modal-usuario-wrapper">
                <ReactModal
                    isOpen={this.state.showModalFiltro}
                    ariaHideApp={false}
                    portalClassName="container-modal-usuario container-modal-filtro-usuario"
                >
                    <div className="modal-usuario-header">
                        <font className="titulo-header">FILTRAR USUÁRIO</font>
                        <button onClick={this.toggleModalFiltro}>X</button>
                    </div>
                    <div className="modal-usuario-body">
                        <form autoComplete="off">
                            <div className="row">
                                <div className="col-12">
                                    <div className="form-group">
                                        <label htmlFor="filtroCargoUsuario" className="label-modal-usuario">Cargo</label>
                                        <Select
                                            name="filtroCargoUsuario"
                                            id="filtroCargoUsuario"
                                            options={this.props.cargos}
                                            className="basic-multi-select"
                                            classNamePrefix="select"
                                            placeholder="Selecione..."
                                            onChange={this.onChangeCargo}
                                            isClearable={true}
                                            defaultValue={this.props.cargos.filter(f => f.value === this.props.filtro.cargo) || ""}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-12">
                                    <div className="form-group">
                                        <label htmlFor="filtroUnidadeAdministrativaUsuario" className="label-modal-usuario">Unidade Administrativa</label>
                                        <Select
                                            name="filtroUnidadeAdministrativaUsuario"
                                            id="filtroUnidadeAdministrativaUsuario"
                                            options={this.props.unidadesAdministrativas}
                                            className="basic-multi-select"
                                            classNamePrefix="select"
                                            placeholder="Selecione..."
                                            onChange={this.onChangeUnidadeAdministrativa}
                                            isClearable={true}
                                            defaultValue={this.props.unidadesAdministrativas.filter(f => f.value === this.props.filtro.unidadeAdministrativa) || ""}
                                        />
                                    </div>
                                </div>                            
                            </div>
                            <div className="row">
                                <div className="col-12">
                                    <div className="form-group">
                                        <label htmlFor="filtroMunicipioUsuario" className="label-modal-usuario">Município</label>
                                        <Select
                                            name="filtroMunicipioUsuario"
                                            id="filtroMunicipioUsuario"
                                            options={this.props.municipios}
                                            className="basic-multi-select"
                                            classNamePrefix="select"
                                            placeholder="Selecione..."
                                            onChange={this.onChangeMunicipio}
                                            isClearable={true}
                                            defaultValue={this.props.municipios.filter(f => f.value === this.props.filtro.municipio) || ""}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-6"></div>
                                <div className="col-6">
                                    <button className="btn-salvar-usuario" type="button" onClick={this.filtrar}>FILTRAR</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </ReactModal>
            </div>
        );
    }
}

export default ModalFiltroAvancadoUsuario;