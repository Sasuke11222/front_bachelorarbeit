import axios from "axios";
const API_URL = 'http://localhost:8080/api/';

class SystemeinheitDataService {
    getAll() {
        return axios
            .get(API_URL + 'systemeinheit');
    }

    get(systemeinheit_id) {
        return axios
            .get(API_URL + 'systemeinheit/' + systemeinheit_id )
    }

    create(systemeinheit_name) {
        return axios.post(API_URL + "systemeinheit", {
            systemeinheit_name
        }).then(response => {
            return response.data || [];
        });
    }

    update(systemeinheit_id, data) {
        return axios.put(API_URL + 'systemeinheit/', systemeinheit_id, data);
    }

    delete(systemeinheit_id) {
        return axios
            .delete(API_URL + 'systemeinheit/' + systemeinheit_id );
    }
}

export default new SystemeinheitDataService();