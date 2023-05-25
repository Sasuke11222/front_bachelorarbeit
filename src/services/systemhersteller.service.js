import axios from "axios";
const API_URL = 'http://localhost:8080/api/';

class SystemherstellerDataService {
    getAll() {
        return axios.get(API_URL + 'systemhersteller');
    }

    get(systemhersteller_id) {
        return axios
            .get(API_URL + 'systemhersteller/', systemhersteller_id);
    }

    create(herstellername) {
        return axios.post(API_URL + "systemhersteller", {
            herstellername,
        });
    }

    update(systemhersteller_id, data) {
        return axios.put(API_URL + 'systemhersteller/', systemhersteller_id, data);
    }

    delete(systemhersteller_id) {
        return axios.delete(API_URL + 'systemhersteller/', systemhersteller_id);
    }

    getCurrentSystem() {
        return JSON.parse(localStorage.getItem('user'));;
    }

}

export default new SystemherstellerDataService();