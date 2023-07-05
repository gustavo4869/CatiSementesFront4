import { useKeycloak } from "@react-keycloak/web";

const usePrivateRoute = ({ children }) => {
 const { keycloak } = useKeycloak();

 const isLoggedIn = keycloak.authenticated;

 return isLoggedIn ? children : null;
};

export default usePrivateRoute;