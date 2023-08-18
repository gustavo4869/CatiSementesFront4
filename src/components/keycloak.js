import Keycloak from "keycloak-js";
import { config } from "../../node_modules/@fortawesome/fontawesome-svg-core/index";
import configData from "../configuration/config.json";

console.log("Component keycloak")

const ambienteProd = configData.ambienteProd;
const urlBaseKeycloak = ambienteProd ? configData.urlBaseKeycloakProd : configData.urlBaseKeycloakDev;

const keycloak = new Keycloak({
    url: urlBaseKeycloak,
    realm: configData.keycloakRealm,
    clientId: configData.keycloakClientId
});

export default keycloak;
