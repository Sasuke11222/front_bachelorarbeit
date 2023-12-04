import axios from "axios";
const API_URL = 'http://localhost:8080/api/';

class RJ45DataService {
    getAll() {
        return axios
            .get(API_URL + 'status_rj45');
    }

    get(status_rj45_id) {
        return axios
            .get(API_URL + 'status_rj45/' + status_rj45_id )
    }

    create(status) {
        return axios.post(API_URL + "status_rj45", {
            status,
        }).then(response => {
            return response.data || [];
        });
    }

    update(status_rj45_id, data) {
        return axios.put(API_URL + 'status_rj45/', status_rj45_id, data);
    }

    delete(status_rj45_id) {
        return axios
            .delete(API_URL + 'status_rj45/' + status_rj45_id );
    }
}

export default new RJ45DataService();