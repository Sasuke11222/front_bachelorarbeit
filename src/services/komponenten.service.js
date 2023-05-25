import axios from "axios";
const API_URL = 'http://localhost:8080/api/';

class KomponentDataService {
    getAll() {
        return axios.get(API_URL + 'it_element');
    }

    get(it_element_id) {
        return axios
            .get(API_URL + 'it_element/', it_element_id)
            .then(response => {
                    localStorage.setItem("it_element", JSON.stringify(response.data));


                return response.data;
            });
    }

    create(data) {
        return axios.post(API_URL + 'it_element', data);
    }

    createTest(data) {
        return axios.post(API_URL + 'it_element', data);
    }

    update(it_element_id, data) {
        return axios.put(API_URL + 'it_element/${it_element_id}', data);
    }

    delete(it_element_id) {
        return axios.delete(API_URL + 'it_element/', it_element_id);
    }

    getCurrentKomponente() {
        return JSON.parse(localStorage.getItem('it_element'));;
    }

}

export default new KomponentDataService();