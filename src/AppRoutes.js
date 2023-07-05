import Home from "./components/Home/Home";
import { Sobre } from "./components/Home/Sobre";

import IndexAdministracao from "./components/Administracao/IndexAdministracao";
import Administracao from "./components/Administracao/Administracao";

import IndexProdutos from "./components/Produtos/pages/IndexProdutos";
import GerenciarProdutos from "./components/Produtos/pages/GerenciarProdutos";
import GerenciarAtributos from "./components/Produtos/pages/GerenciarAtributos";

import IndexUsuario from "./components/Usuario/IndexUsuario";

import IndexPontoVenda from "./components/PontosVendas/pages/IndexPontosVendas";

import KeycloakStart from "./components/shared/KeycloakStart";

const AppRoutes = [
    {
        index: true,
        element: <Home />
    },
    {
        path: '/administracao/administrador',
        element: <Administracao/>
    },
    {
        path: '/administracao/index',
        element: <IndexAdministracao/>
    },
    {
        path: '/usuarios/index',
        element: <IndexUsuario />
    },
    {
        path: '/produtos/index',
        element: <IndexProdutos/>
    },
    {
        path: 'produtos/gerenciar',
        element: <GerenciarProdutos />
    },
    {
        path: 'produtos/atributos',
        element: <GerenciarAtributos/>
    },
    {
        path: 'pontovenda/index',
        element: <IndexPontoVenda />
    },
    {
        path: '/sobre',
        element: <Sobre />
    },
    {
        path: '/start',
        element: <KeycloakStart/>
    }
    
];

export default AppRoutes;
