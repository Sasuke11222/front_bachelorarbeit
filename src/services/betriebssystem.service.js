import axios from "axios";
const API_URL = 'http://localhost:8080/api/';

class BetriebssystemDataService {
    getAll() {
        return axios
            .get(API_URL + 'betriebssystem');
    }

    get(betriebssystem_id) {
        return axios
            .get(API_URL + 'betriebssystem/' + betriebssystem_id )
    }

    create(betriebssystem_name) {
        return axios.post(API_URL + "betriebssystem", {
            betriebssystem_name
        }).then(response => {
            return response.data.betriebssystem_name || [];
        });
    }

    update(betriebssystem_id, data) {
        return axios.put(API_URL + 'betriebssystem/', betriebssystem_id, data);
    }

    delete(betriebssystem_id) {
        return axios
            .delete(API_URL + 'betriebssystem/' + betriebssystem_id );
    }
}

export default new BetriebssystemDataService();