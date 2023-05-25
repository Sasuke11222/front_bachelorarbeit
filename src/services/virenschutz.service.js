import http from "../http-common";

class VirenschutzDataService {
    getAll() {
        return http.get("/status_virenschutz");
    }

    get(status_virenschutz_id) {
        return http.get(`/status_virenschutz/${status_virenschutz_id}`);
    }

    create(data) {
        return http.post("/status_virenschutz", data);
    }

    update(status_virenschutz_id, data) {
        return http.put(`/status_virenschutz/${status_virenschutz_id}`, data);
    }

    delete(status_virenschutz_id) {
        return http.delete(`/status_virenschutz/${status_virenschutz_id}`);
    }
}

export default new VirenschutzDataService();