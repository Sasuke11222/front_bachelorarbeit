import axios from "axios";
const API_URL = 'http://localhost:8080/api/';

class SystemtypDataService {
    getAll() {
        return axios
            .get(API_URL + 'systemtyp');
    }

    get(systemtyp_id) {
        return axios
            .get(API_URL + 'systemtyp/' + systemtyp_id )
    }

    create(systemtyp_name) {
        return axios.post(API_URL + "systemtyp", {
            systemtyp_name
        }).then(response => {
            return response.data || [];
        });
    }

    update(systemtyp_id, data) {
        return axios.put(API_URL + 'systemtyp/', systemtyp_id, data);
    }

    delete(systemtyp_id) {
        return axios
            .delete(API_URL + 'systemtyp/' + systemtyp_id );
    }
}

export default new SystemtypDataService();