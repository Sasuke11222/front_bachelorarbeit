import http from "../common/http-common";

class VirenschutzherstellerDataService {
    getAll() {
        return http.get("/virenschutzhersteller");
    }

    get(virenschutz_hersteller_id) {
        return http.get(`/virenschutzhersteller/${virenschutz_hersteller_id}`);
    }

    create(data) {
        return http.post("/virenschutzhersteller", data);
    }

    update(virenschutz_hersteller_id, data) {
        return http.put(`/virenschutzhersteller/${virenschutz_hersteller_id}`, data);
    }

    delete(virenschutz_hersteller_id) {
        return http.delete(`/virenschutzhersteller/${virenschutz_hersteller_id}`);
    }
}

export default new VirenschutzherstellerDataService();