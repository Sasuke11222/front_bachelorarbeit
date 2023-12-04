import axios from "axios";
const API_URL = 'http://localhost:8080/api/';

class MitarbeiterDataService {

    constructor(props) {

        this.state = {
            kraftwerk_name: undefined,
            kraftwerksleiter: undefined,
            systemkoordinator: '',
            zoneninstanzbesitzer: ''
        };
    }
    kraftwerk_name;

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

    createMitarbeiter(nachname, vorname, abteilung, telefon, mail, kw_id) {
        return axios.post(API_URL + "neumitarbeiter", {
            kw_id: kw_id, // Use the value of the 'kw_id' property of the 'mitarbeiter' object
            nachname: nachname,
            vorname: vorname,
            abteilung: abteilung,
            telefon: telefon,
            mail: mail
        }).then(response => {
            return response.data || [];
        });
    }

    update(mitarbeiter_id, data) {
        return axios.put(API_URL + 'mitarbeiter/', mitarbeiter_id, data);
    }

    delete(mitarbeiter_id) {
        return axios
            .delete(API_URL + 'mitarbeiter/' + mitarbeiter_id );
    }

    getCurrentMitarbeiter() {
        return JSON.parse(localStorage.getItem('newMitarbeiter'));
    }

}

export default new MitarbeiterDataService();