import axios from "axios";
const API_URL = 'http://localhost:8080/api/';

class OfficeDataService {
    getAll() {
        return axios
            .get(API_URL + 'office');
    }

    get(office_id) {
        return axios
            .get(API_URL + 'office/' + office_id )
    }

    create(version) {
        return axios.post(API_URL + "office", {
            version
        }).then(response => {
            return response.data || [];
        });
    }

    update(office_id, data) {
        return axios.put(API_URL + 'office/', office_id, data);
    }

    delete(office_id) {
        return axios
            .delete(API_URL + 'office/' + office_id );
    }
}

export default new OfficeDataService();