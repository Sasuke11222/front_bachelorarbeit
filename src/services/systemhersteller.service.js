import axios from "axios";
const API_URL = 'http://localhost:8080/api/';

class SystemherstellerDataService {
    getAll() {
        return axios
            .get(API_URL + 'systemhersteller')
            .then(r => {
                sessionStorage.setItem('hersteller', JSON.stringify(r.data));
                return r.data || [];
            });
    }

    getAllSystemhersteller() {
        return axios
            .get(API_URL + 'systemhersteller')
    }

    deleteHerstellerByID(id) {
        console.log(API_URL + 'systemhersteller/' + id )
        return axios
            .delete(API_URL + 'systemhersteller/' + id );
    }

    get(id) {
        console.log(API_URL + 'systemhersteller/' + id )
        return axios
            .get(API_URL + 'systemhersteller/' + id ).then(r => {
                sessionStorage.setItem('hersteller', JSON.stringify(r.data));
                return r.data || [];
            });
    }

    create(herstellername) {
        return axios.post(API_URL + "systemhersteller", {
            herstellername,
        }).then(response => {
            return response.data || [];
        });
    }

    update(systemhersteller_id, data) {
        return axios.put(API_URL + 'systemhersteller/', systemhersteller_id, data);
    }


    getCurrentHersteller() {
        this.getAll();
        return JSON.parse(sessionStorage.getItem('hersteller'));
    }

}

export default new SystemherstellerDataService();