
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

    create(data) {
        return axios.post(API_URL + 'kraftwerke', data);
    }

    update(kw_id, data) {
        return axios.put(API_URL + 'kraftwerke/${kw_id}', data);
    }

    updateKraftwerksdaten(kw_id,
                          kraftwerksleiter,
                          systemkoordinator,
                          zoneninstanzbesitzer
                          ){
        return axios
            .post(API_URL + "kraftwerke", {
                kraftwerksleiter,
                systemkoordinator,
                zoneninstanzbesitzer
            })
            .then(response => {
                localStorage.setItem("kraftwerksdaten", JSON.stringify(response.data));
                return response.data || [];
            });
    }

    delete(kw_id) {
        return axios.delete(API_URL + 'kraftwerke/', kw_id);
    }

    getCurrentKraftwerk() {
        return JSON.parse(localStorage.getItem('kraftwerk'));;
    }

    getCurrentKraftwerkforMitarbeiter() {
        return JSON.parse(localStorage.getItem('standortfürMitarbeiter'));;
    }

}

export default new KraftwerkeDataService();