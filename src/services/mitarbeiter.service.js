import axios from "axios";
const API_URL = 'http://localhost:8080/api/';

class MitarbeiterDataService {
    getAll() {
        return axios.get(API_URL + 'mitarbeiter');
    }

    get(mitarbeiter_id) {
        return axios
            .get(API_URL + 'mitarbeiter/', mitarbeiter_id)
            .then(response => {
                if (response.data.accessToken) {
                    localStorage.setItem("mitarbeiter", JSON.stringify(response.data));
                }

                return response.data;
            });
    }

    create(data) {
        return axios.post(API_URL + 'mitarbeiter', data);
    }

    update(mitarbeiter_id, data) {
        return axios.put(API_URL + 'mitarbeiter/', mitarbeiter_id, data);
    }

    delete(mitarbeiter_id) {
        return axios.delete(API_URL + 'mitarbeiter/', mitarbeiter_id);
    }

    getCurrentSystem() {
        return JSON.parse(localStorage.getItem('user'));;
    }

}

export default new MitarbeiterDataService();