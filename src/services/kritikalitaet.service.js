import axios from "axios";
const API_URL = 'http://localhost:8080/api/';

class KritikalitaetDataService {
    getAll() {
        return axios
            .get(API_URL + 'kritikalitaet');
    }

    get(kritikalitaet_id) {
        return axios
            .get(API_URL + 'kritikalitaet/' + kritikalitaet_id )
    }

    create(kritikalitaet_name) {
        return axios.post(API_URL + "kritikalitaet", {
            kritikalitaet_name
        }).then(response => {
            return response.data || [];
        });
    }

    update(kritikalitaet_id, data) {
        return axios.put(API_URL + 'kritikalitaet/', kritikalitaet_id, data);
    }

    delete(kritikalitaet_id) {
        return axios
            .delete(API_URL + 'kritikalitaet/' + kritikalitaet_id );
    }
}

export default new KritikalitaetDataService();