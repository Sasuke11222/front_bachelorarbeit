import axios from "axios";
const API_URL = 'http://localhost:8080/api/';

class KontoartDataService {
    getAll() {
        return axios
            .get(API_URL + 'kontoart');
    }

    get(kontoart_id) {
        return axios
            .get(API_URL + 'kontoart/' + kontoart_id )
    }

    create(kontoart) {
        return axios.post(API_URL + "kontoart", {
            kontoart
        }).then(response => {
            return response.data || [];
        });
    }

    update(kontoart_id, data) {
        return axios.put(API_URL + 'kontoart/', kontoart_id, data);
    }

    delete(kontoart_id) {
        return axios
            .delete(API_URL + 'kontoart/' + kontoart_id );
    }
}

export default new KontoartDataService();