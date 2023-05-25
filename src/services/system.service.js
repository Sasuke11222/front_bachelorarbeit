import axios from "axios";
const API_URL = 'http://localhost:8080/api/';

class SystemDataService {
    getAll() {
        return axios.get(API_URL + 'systeme');
    }

    getSystembyKw_ID(kw_id) {
        return axios
            .get(API_URL + 'systeme/kraftwerk/' , kw_id );
    }

    get(system_id) {
        return axios
            .get(API_URL + 'systeme/', system_id)
            .then(response => {
                if (response.data.accessToken) {
                    localStorage.setItem("systeme", JSON.stringify(response.data));
                }

                return response.data;
            });
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