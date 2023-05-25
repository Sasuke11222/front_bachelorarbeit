import http from "../http-common";

class OfficeDataService {
    getAll() {
        return http.get("/office");
    }

    get(office_id) {
        return http.get(`/office/${office_id}`);
    }

    create(data) {
        return http.post("/office", data);
    }

    update(office_id, data) {
        return http.put(`/office/${office_id}`, data);
    }

    delete(office_id) {
        return http.delete(`/office/${office_id}`);
    }


    findByName(version) {
        return http.get(`/systemhersteller?version=${version}`);
    }
}

export default new OfficeDataService();