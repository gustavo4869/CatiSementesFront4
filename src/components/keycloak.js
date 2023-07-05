import Keycloak from "keycloak-js";

console.log("Component keycloak")

const keycloak = new Keycloak({
    url: "http://10.153.18.52:8080",
    realm: "CatiSementes",
    clientId: "CatiSementesFront",
});

export default keycloak;
