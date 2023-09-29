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

    create(data) {
        return axios.post(API_URL + 'mitarbeiter', data);
    }

    createMitarbeiter(nachname,
    vorname, abteilung, telefon,mail, kw_id) {
        console.log(API_URL + 'mitarbeiter/neu', nachname,
            vorname, abteilung, telefon,mail, kw_id)
        return axios.post(API_URL + "mitarbeiter/neu", {
            kw_id: {

            },
            nachname,
            vorname,
            abteilung,
            telefon,
            mail
        }).then(response => {
            localStorage.setItem("newMitarbeiter", JSON.stringify(response.data));
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
        return JSON.parse(localStorage.getItem('newMitarbeiter'));;
    }

}

export default new MitarbeiterDataService();