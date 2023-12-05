import axios from "axios";
import KraftwerkeDataService from "./kraftwerk.service";
const API_URL = 'http://localhost:8080/api/';

class SystemDataService {

    constructor(props) {

        this.state = {
            currentStandort: undefined,
        };
    }
    currentStandort = KraftwerkeDataService.getCurrentKraftwerk();

    getAll() {
        return axios
            .get(API_URL + 'systeme')
    }

    getSystembyKw_ID(kw_id) {
        return axios
            .get(API_URL + 'systeme/kraftwerk/' + kw_id)
            .then(response => {
                localStorage.setItem("filteredsysteme", JSON.stringify(response.data));
                return response.data || [];
            });
    }

    getCurrentSystem() {
        this.getSystembyKw_ID(this.currentStandort.kw_id);

        return JSON.parse(localStorage.getItem('filteredsysteme'));
    }

    get(system_id) {
        return axios
            .get(API_URL + 'systeme/' + system_id ).then(r => {
                localStorage.setItem('SystemFürKomponente', JSON.stringify(r.data));
                return r.data || [];
            });
    }

    createSystem(system_name,
                 beschreibung,
                 systemtyp_id,
                 kritikalitaet_id,
                 zonen_id,
                 kw_id,
                 mitarbeiter_id,
                 systemverantwortlicher_id,
                 buerozugang,
                 fernzugang,
                 errichter,
                 pdn,
                 zugangsart,
                 pdndate,
                 ksp_a,
                 ksp_b,
                 ksp_y,
                 box_n,
                 box_p,
                 box_q,
                 box_r,
                 box_y,
                 jae_a,
                 jae_b,
                 jae_c,
                 jae_d,
                 jae_e,
                 jae_f,
                 jae_y,
                 lip_r,
                 lip_s,
                 lip_y,
                 isms_Relevant,
                 isms_Auswirkung,
                 isms_Reduzierung,
                 isms_Begruendung,
                 ) {
        return axios.post(API_URL + "systeme", {
            kw_id: kw_id,
            system_name: system_name,
            beschreibung: beschreibung,
            systemtyp_id: systemtyp_id,
            kritikalitaet_id: kritikalitaet_id,
            zonen_id: zonen_id,
            mitarbeiter_id: mitarbeiter_id,
            systemverantwortlicher_id: systemverantwortlicher_id,
            buerozugang: buerozugang,
            fernzugang: fernzugang,
            errichter: errichter,
            pdn: pdn,
            zugangsart: zugangsart,
            pdndate: pdndate,
            ksp_a: ksp_a,
            ksp_b: ksp_b,
            ksp_y: ksp_y,
            box_n: box_n,
            box_p: box_p,
            box_q: box_q,
            box_r: box_r,
            box_y: box_y,
            jae_a: jae_a,
            jae_b: jae_b,
            jae_c: jae_c,
            jae_d: jae_d,
            jae_e: jae_e,
            jae_f: jae_f,
            jae_y: jae_y,
            lip_r: lip_r,
            lip_s: lip_s,
            lip_y: lip_y,
            isms_Relevant: isms_Relevant,
            isms_Auswirkung: isms_Auswirkung,
            isms_Reduzierung: isms_Reduzierung,
            isms_Begruendung: isms_Begruendung,
        }).then(response => {
            return response.data || [];
        });
    }

    update(system_id,
           system_name,
           beschreibung,
           systemtyp_id,
           kritikalitaet_id,
           zonen_id,
           kw_id,
           mitarbeiter_id,
           systemverantwortlicher_id,
           buerozugang,
           fernzugang,
           errichter,
           pdn,
           zugangsart,
           pdndate,
           ksp_a,
           ksp_b,
           ksp_y,
           box_n,
           box_p,
           box_q,
           box_r,
           box_y,
           jae_a,
           jae_b,
           jae_c,
           jae_d,
           jae_e,
           jae_f,
           jae_y,
           lip_r,
           lip_s,
           lip_y,
           isms_Relevant,
           isms_Auswirkung,
           isms_Reduzierung,
           isms_Begruendung,) {
        console.log(system_id,
            + " " + system_name,
            + " " + beschreibung,
            + " " + systemtyp_id.systemtyp_name,
            + " " + kritikalitaet_id.kritikalitaet_name,
            + " " + zonen_id.zone,
            + " " + kw_id.kraftwerk_name,
            + " " + mitarbeiter_id.vorname + " " + mitarbeiter_id.nachname,
            + " " + systemverantwortlicher_id,
            + " " + buerozugang,
            + " " + fernzugang,
            + " " + errichter,
            + " " + pdn,
            + " " + zugangsart,
            + " " + pdndate,
            + " " + ksp_a,
            + " " + ksp_b,
            + " " + ksp_y,
            + " " + box_n,
            + " " + box_p,
            + " " + box_q,
            + " " + box_r,
            + " " + box_y,
            + " " + jae_a,
            + " " + jae_b,
            + " " + jae_c,
            + " " + jae_d,
            + " " + jae_e,
            + " " + jae_f,
            + " " + jae_y,
            + " " + lip_r,
            + " " + lip_s,
            + " " + lip_y,
            + " " + isms_Relevant,
            + " " + isms_Auswirkung,
            + " " + isms_Reduzierung,
            + " " + isms_Begruendung,)
        return axios.put(API_URL + 'systeme/',
            system_id,
            system_name,
            beschreibung,
            systemtyp_id,
            kritikalitaet_id,
            zonen_id,
            kw_id,
            mitarbeiter_id,
            systemverantwortlicher_id,
            buerozugang,
            fernzugang,
            errichter,
            pdn,
            zugangsart,
            pdndate,
            ksp_a,
            ksp_b,
            ksp_y,
            box_n,
            box_p,
            box_q,
            box_r,
            box_y,
            jae_a,
            jae_b,
            jae_c,
            jae_d,
            jae_e,
            jae_f,
            jae_y,
            lip_r,
            lip_s,
            lip_y,
            isms_Relevant,
            isms_Auswirkung,
            isms_Reduzierung,
            isms_Begruendung
        );
    }

    delete(system_id) {
        return axios
            .delete(API_URL + 'systeme/' + system_id );
    }
}

export default new SystemDataService();