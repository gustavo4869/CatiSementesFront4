import Keycloak from "keycloak-js";
import configData from "../configuration/config.json";

console.log("Component keycloak")

const keycloak = new Keycloak({
    url: configData.urlBaseKeycloak,
    realm: configData.keycloakRealm,
    clientId: configData.keycloakClientId
});

export default keycloak;
