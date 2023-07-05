import React, { Component } from 'react';
import { Collapse, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import './css/footer.css';

export class Footer extends Component {

    render() {
        return (
            <footer>
                <div className="container-footer">
                    <ul className="navbar-nav flex-grow">
                        <NavItem>
                            <NavLink tag={Link} className="text-dark" to="/">Home</NavLink>
                        </NavItem>
                        {/*<NavItem>
                            <NavLink tag={Link} className="text-dark" to="/counter">Sobre</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink tag={Link} className="text-dark" to="/fetch-data">Acesse aqui</NavLink>
                        </NavItem>*/}
                    </ul>
                </div>
            </footer>
        );
    }
}
