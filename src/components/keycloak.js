import Keycloak from "keycloak-js";
const keycloak = new Keycloak({
    url: "http://10.153.18.52:8080/auth",
    realm: "CatiSementesV2",
    clientId: "CatiSementesFrontV2",
});

export default keycloak;
