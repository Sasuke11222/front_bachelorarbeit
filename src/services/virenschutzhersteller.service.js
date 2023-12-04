import axios from "axios";
const API_URL = 'http://localhost:8080/api/';

class VirenschutzherstellerDataService {
    getAll() {
        return axios
            .get(API_URL + 'virenschutzhersteller');
    }

    get(virenschutz_hersteller_id) {
        return axios
            .get(API_URL + 'virenschutzhersteller/' + virenschutz_hersteller_id )
    }

    create(herstellername, version) {
        return axios.post(API_URL + "virenschutzhersteller", {
            herstellername,
            version
        }).then(response => {
            return response.data || [];
        });
    }

    update(virenschutz_hersteller_id, data) {
        return axios.put(API_URL + 'virenschutzhersteller/', virenschutz_hersteller_id, data);
    }

    delete(virenschutz_hersteller_id) {
        return axios
            .delete(API_URL + 'virenschutzhersteller/' + virenschutz_hersteller_id );
    }
}

export default new VirenschutzherstellerDataService();