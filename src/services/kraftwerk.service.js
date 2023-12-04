import axios from "axios";
const API_URL = 'http://localhost:8080/api/';

class KraftwerkeDataService {
    getAll() {
        return axios
            .get(API_URL + 'kraftwerke')
    }

    get(kw_id) {
        return axios
            .get(API_URL + 'kraftwerke/' + kw_id)
            .then(response => {
                sessionStorage.setItem("kraftwerk", JSON.stringify(response.data));
                return response.data || [];
            });
    }

    create(kraftwerk_name,
           kraftwerksleiter,
           zoneninstanzbesitzer,
           systemkoordinator) {
        return axios.post(API_URL + "kraftwerke", {
            kraftwerk_name: kraftwerk_name,
            kraftwerksleiter: kraftwerksleiter,
            zoneninstanzbesitzer: zoneninstanzbesitzer,
            systemkoordinator: systemkoordinator
        }).then(response => {
            return response.data || [];
        });
    }

    updateKraftwerksdaten(
        kw_id,
        kraftwerk_name,
        kraftwerksleiter,
        systemkoordinator,
        zoneninstanzbesitzer
    ){
        return axios
            .put(API_URL + "kraftwerke/" + kw_id, { // Verwendung von put statt post
                kw_id,
                kraftwerk_name,
                kraftwerksleiter,
                zoneninstanzbesitzer,
                systemkoordinator,
            })
            .then(response => {
                const kraftwerk = {
                    kw_id,
                    kraftwerk_name,
                    kraftwerksleiter,
                    zoneninstanzbesitzer,
                    systemkoordinator,
                };
                console.log("Daten erfolgreich aktualisiert:", JSON.stringify(kraftwerk));
                sessionStorage.removeItem("kraftwerk");
                sessionStorage.setItem("kraftwerk", JSON.stringify(kraftwerk));
                //localStorage.setItem("kraftwerksdaten", JSON.stringify(kraftwerk));
                return kraftwerk || [];
            });
    }

    delete(kw_id) {
        return axios.delete(API_URL + 'kraftwerke/', kw_id);
    }

    getCurrentKraftwerk() {
        return JSON.parse(sessionStorage.getItem('kraftwerk'));
    }

}

export default new KraftwerkeDataService();