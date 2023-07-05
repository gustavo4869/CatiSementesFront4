import Keycloak from 'keycloak-js'

// Setup Keycloak instance as needed
// Pass initialization options as required or leave blank to load from 'keycloak.json'
const keycloak = new Keycloak({
    realm: "CatiSementes",
    url: "http://10.153.18.52:8080",
    clientId: "CatiSementesFront",
});

export default keycloak