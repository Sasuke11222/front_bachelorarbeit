import axios from "axios";
import KraftwerkeDataService from "./kraftwerk.service";
import KomponentenService from "./komponenten.service";
const API_URL = 'http://localhost:8080/api/';

class SystemDataService {

    constructor(props) {

        this.state = {
           currentStandort: undefined,
                   };
    }
    currentStandort = KraftwerkeDataService.getCurrentKraftwerk();

    getAll() {
        return axios
            .get(API_URL + 'systeme')
            .then(response => {
                const systeme = response.data;
                const  requests = systeme.map(system => {
                    return KomponentenService.getKomponentebySystem_ID(system.system_id)
                        .then(komponenten => {
                            system.anzahlKomponente = komponenten.length;
                            return system;
                        })
                })
                return Promise.all(requests);
            })
    }

    getSystembyKw_ID(kw_id) {
        console.log(API_URL + 'systeme/kraftwerk/' + kw_id )
        return axios
            .get(API_URL + 'systeme/kraftwerk/' + kw_id )
            .then(response => {
                localStorage.setItem("filteredsysteme", JSON.stringify(response.data));
                return response.data || [];
            });

    }

    getCurrentSystem() {
        this.getSystembyKw_ID(this.currentStandort.kw_id);

        return JSON.parse(localStorage.getItem('filteredsysteme'));
    }

    get(system_id) {
        return axios
            .get(API_URL + 'systeme/', system_id)
    }

    create(data) {
        return axios.post(API_URL + 'systeme', data);
    }

    update(system_id, data) {
        return axios.put(API_URL + 'systeme/', system_id, data);
    }

    delete(system_id) {
        return axios.delete(API_URL + 'systeme/', system_id);
    }
}

export default new SystemDataService();