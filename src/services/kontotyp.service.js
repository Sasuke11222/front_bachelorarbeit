import axios from "axios";
const API_URL = 'http://localhost:8080/api/';

class KontotypDataService {
    getAll() {
        return axios
            .get(API_URL + 'kontotyp');
    }

    get(kontotyp_id) {
        return axios
            .get(API_URL + 'kontotyp/' + kontotyp_id )
    }

    create(kontotyp) {
        return axios.post(API_URL + "kontotyp", {
            kontotyp
        }).then(response => {
            return response.data || [];
        });
    }

    update(kontotyp_id, data) {
        return axios.put(API_URL + 'kontotyp/', kontotyp_id, data);
    }

    delete(kontotyp_id) {
        return axios
            .delete(API_URL + 'kontotyp/' + kontotyp_id );
    }
}

export default new KontotypDataService();