import axios from "axios";
const API_URL = 'http://localhost:8080/api/';

class FirewallDataService {
    getAll() {
        return axios
            .get(API_URL + 'status_firewall');
    }

    get(status_firewall_id) {
        return axios
            .get(API_URL + 'status_firewall/' + status_firewall_id )
    }

    create(status) {
        return axios.post(API_URL + "status_firewall", {
            status,
        }).then(response => {
            return response.data || [];
        });
    }

    update(status_firewall_id, data) {
        return axios.put(API_URL + 'status_firewall/', status_firewall_id, data);
    }

    delete(status_firewall_id) {
        return axios
            .delete(API_URL + 'status_firewall/' + status_firewall_id );
    }
}

export default new FirewallDataService();