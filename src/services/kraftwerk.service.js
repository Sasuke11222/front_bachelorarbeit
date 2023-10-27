import axios from "axios";
const API_URL = 'http://localhost:8080/api/';

class KraftwerkeDataService {
    getAll() {
        return axios
            .get(API_URL + 'kraftwerke')
    }

    get(kw_id) {
        console.log(API_URL + 'kraftwerke/' + kw_id )
        return axios
            .get(API_URL + 'kraftwerke/' + kw_id ).then(r => {
                localStorage.setItem('standortfürMitarbeiter', JSON.stringify(r.data));
                return r.data || [];
            });
    }

    getAktuellesKraftwerk(kw_id, kraftwerk_name, kraftwerksleiter, systemkoordinator, zoneninstanzbesitzer) {
        return axios
            .post(API_URL + "kraftwerke", {
                kw_id,
                kraftwerk_name,
                kraftwerksleiter,
                systemkoordinator,
                zoneninstanzbesitzer
            })
            .then(response => {
                localStorage.setItem("kraftwerk", JSON.stringify(response.data));
                return response.data || [];
            });
    }

    create(kraftwerk_name,
           kraftwerksleiter,
           systemkoordinator,
           zoneninstanzbesitzer) {
        return axios
            .post(API_URL + "kraftwerke", {
                kraftwerk_name,
                kraftwerksleiter,
                systemkoordinator,
                zoneninstanzbesitzer
            })
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
                systemkoordinator,
                zoneninstanzbesitzer
            })
            .then(response => {
                const kraftwerk = {
                    kw_id,
                    kraftwerk_name,
                    kraftwerksleiter,
                    systemkoordinator,
                    zoneninstanzbesitzer
                };
                console.log("Daten erfolgreich aktualisiert:", JSON.stringify(kraftwerk));
                localStorage.removeItem("kraftwerk");
                localStorage.setItem("kraftwerk", JSON.stringify(kraftwerk));
                //localStorage.setItem("kraftwerksdaten", JSON.stringify(kraftwerk));
                return kraftwerk || [];
            });
    }

    delete(kw_id) {
        return axios.delete(API_URL + 'kraftwerke/', kw_id);
    }

    getCurrentKraftwerk() {
        return JSON.parse(localStorage.getItem('kraftwerk'));
    }

    selectedKraftwerk(){
        return localStorage.getItem("standortinfos");
    }

    getCurrentKraftwerkforMitarbeiter() {
        return JSON.parse(localStorage.getItem('standortfürMitarbeiter'));;
    }

}

export default new KraftwerkeDataService();