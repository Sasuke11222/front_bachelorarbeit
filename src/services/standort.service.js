import axios from "axios";
const API_URL = 'http://localhost:8080/api/';

class StandortDataService {
    getAll() {
        return axios
            .get(API_URL + 'kraftwerke');
    }

    get(kw_id) {
        return axios
            .get(API_URL + 'kraftwerke/' + kw_id )
    }

    create(herstellername, version) {
        return axios.post(API_URL + "kraftwerke", {
            herstellername,
            version
        }).then(response => {
            return response.data || [];
        });
    }

    update(kw_id, data) {
        return axios.put(API_URL + 'kraftwerke/', kw_id, data);
    }

    delete(kw_id) {
        return axios
            .delete(API_URL + 'kraftwerke/' + kw_id );
    }
}

export default new StandortDataService();