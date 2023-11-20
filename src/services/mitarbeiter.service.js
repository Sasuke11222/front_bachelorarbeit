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
        console.log(API_URL + 'mitarbeiter', nachname, vorname, abteilung, telefon, mail, kw_id)
        return axios.post(API_URL + "mitarbeiter", {
            kw_id: kw_id, // Verwende den übergebenen Wert der Variable 'kw_id'
            nachname: nachname, // Verwende den übergebenen Wert der Variable 'nachname'
            vorname: vorname, // Verwende den übergebenen Wert der Variable 'vorname'
            abteilung: abteilung, // Verwende den übergebenen Wert der Variable 'abteilung'
            telefon: telefon, // Verwende den übergebenen Wert der Variable 'telefon'
            mail: mail // Verwende den übergebenen Wert der Variable 'mail'
        }).then(response => {
            return response.data || [];
        });
    }

    update(mitarbeiter_id, data) {
        return axios.put(API_URL + 'mitarbeiter/', mitarbeiter_id, data);
    }

    delete(mitarbeiter_id) {
        return axios.delete(API_URL + 'mitarbeiter/', mitarbeiter_id);
    }

    deleteMitarbeiterByID(mitarbeiter_id) {
        console.log(API_URL + 'mitarbeiter/' + mitarbeiter_id )
        return axios
            .delete(API_URL + 'mitarbeiter/' + mitarbeiter_id );
    }

    getCurrentMitarbeiter() {
        return JSON.parse(localStorage.getItem('newMitarbeiter'));
    }

}

export default new MitarbeiterDataService();