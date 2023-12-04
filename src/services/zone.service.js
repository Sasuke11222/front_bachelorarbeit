import axios from "axios";
const API_URL = 'http://localhost:8080/api/';

class ZoneDataService {
    getAll() {
        return axios
            .get(API_URL + 'zone');
    }

    get(zonen_id) {
        return axios
            .get(API_URL + 'zone/' + zonen_id )
    }

    create(zone) {
        return axios.post(API_URL + "zone", {
            zone
        }).then(response => {
            return response.data || [];
        });
    }

    update(zonen_id, data) {
        return axios.put(API_URL + 'zone/', zonen_id, data);
    }

    delete(zonen_id) {
        return axios
            .delete(API_URL + 'zone/' + zonen_id );
    }
}

export default new ZoneDataService();