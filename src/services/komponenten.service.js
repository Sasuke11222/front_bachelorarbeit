import axios from "axios";
import KraftwerkeDataService from "./kraftwerk.service";
const API_URL = 'http://localhost:8080/api/';

class KomponentDataService {

    constructor(props) {

        this.state = {
            currentStandort: undefined,
        };
    }
    currentStandort = KraftwerkeDataService.getCurrentKraftwerk();

    getAll() {
        return axios
            .get(API_URL + 'it_element')
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

    update(it_element_id, data) {
        return axios.put(API_URL + 'it_element/${it_element_id}', data);
    }

    delete(it_element_id) {
        return axios.delete(API_URL + 'it_element/', it_element_id);
    }

    deleteKomponenteByID(it_element_id) {
        console.log(API_URL + 'it_element/' + it_element_id )
        return axios
            .delete(API_URL + 'it_element/' + it_element_id );
    }

    getKomponentebyKw_ID(kw_id) {
        console.log(API_URL + 'it_element/kraftwerk/' + kw_id )
        return axios
            .get(API_URL + 'it_element/kraftwerk/' + kw_id )
            .then(response => {
                localStorage.setItem("filteredkomponenten", JSON.stringify(response.data));
                return response.data || [];
            });

    }

    getCurrentKomponente() {
        this.getKomponentebyKw_ID(this.currentStandort.kw_id);

        return JSON.parse(localStorage.getItem('filteredkomponenten'));
    }

}

export default new KomponentDataService();