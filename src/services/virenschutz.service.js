import axios from "axios";
const API_URL = 'http://localhost:8080/api/';

class VirenschutzDataService {
    getAll() {
        return axios
            .get(API_URL + 'status_virenschutz');
    }

    get(status_virenschutz_id) {
        return axios
            .get(API_URL + 'status_virenschutz/' + status_virenschutz_id )
    }

    create(status) {
        return axios.post(API_URL + "status_virenschutz", {
            status
        }).then(response => {
            return response.data || [];
        });
    }

    update(status_virenschutz_id, data) {
        return axios.put(API_URL + 'status_virenschutz/', status_virenschutz_id, data);
    }

    delete(status_virenschutz_id) {
        return axios
            .delete(API_URL + 'status_virenschutz/' + status_virenschutz_id );
    }
}

export default new VirenschutzDataService();