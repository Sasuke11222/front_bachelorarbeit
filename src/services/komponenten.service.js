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

    createKomponente(kw_id,
                     kks,
                     kurztext,
                     systemeinheit_id,
                     system_id,
                     status_usb_id,
                     virenschutz_hersteller_id,
                     status_rj45_id,
                     betriebssystem_id,
                     status_firewall_id,
                     status_virenschutz_id,
                     systemhersteller_id,
                     modell,
                     firmwareversion,
                     office_id,
                     ibs_datum,
                     sonstige_sw,
                     checkliste,
                     backup,
                     backup_test
    ) {
        console.log("Kraftwerk " +kw_id.kraftwerk_name +
            " KKS " + kks +
            " Kurztext " +kurztext +
            " Systemeinheit " +systemeinheit_id.systemeinheit_name+
            " System " +system_id.system_name+
            " USB " +status_usb_id.status+
            " Virenschutzhersteller " +virenschutz_hersteller_id.herstellername+
            " RJ45 " +status_rj45_id.status+
            " Betriebssystem " +betriebssystem_id.betriebssystem_name+
            " Firewall " +status_firewall_id.status+
            " Virenschutz " +status_virenschutz_id.status+
            " Systemhersteller " +systemhersteller_id.herstellername+
            " Modell " +modell+
            " Firmware " +firmwareversion+
            " Office " +office_id.version+
            " IBS " +ibs_datum+
            " SW " +sonstige_sw+
            " Checkliste " +checkliste+
            " Backup " +backup+
            " Backup-Test " +backup_test)
        return axios.post(API_URL + "it_element", {
            kw_id,
            kks,
            kurztext,
            systemeinheit_id,
            system_id,
            status_usb_id,
            virenschutz_hersteller_id,
            status_rj45_id,
            betriebssystem_id,
            status_firewall_id,
            status_virenschutz_id,
            systemhersteller_id,
            modell,
            firmwareversion,
            office_id,
            ibs_datum,
            sonstige_sw,
            checkliste,
            backup,
            backup_test
        }).then(response => {
            return response.data || [];
        });
    }

    update(it_element_id, data) {
        return axios.put(API_URL + 'it_element/' + it_element_id, data);
    }

    delete(it_element_id) {
        console.log(API_URL + 'it_element/' + it_element_id )
        return axios
            .delete(API_URL + 'it_element/' + it_element_id );
    }

    deleteKomponenteByID(it_element_id) {
        console.log(API_URL + 'it_element/' + it_element_id )
        return axios
            .delete(API_URL + 'it_element/' + it_element_id );
    }

    getKomponentebyKw_ID(kw_id) {
        //console.log("KraftwerkeDataService: "+ API_URL + 'it_element/kraftwerk/' + kw_id )
        return axios
            .get(API_URL + 'it_element/kraftwerk/' + kw_id )
            .then(response => {
                localStorage.setItem("filteredkomponenten", JSON.stringify(response.data));
                sessionStorage.setItem("komponenten" , JSON.stringify(response.data));
                return response.data || [];
            });

    }

    getCurrentKomponente() {
        this.getKomponentebyKw_ID(this.currentStandort.kw_id);

        return JSON.parse(localStorage.getItem('filteredkomponenten'));

    }

}

export default new KomponentDataService();