import http from "../http-common";

class RJ45DataService {
    getAll() {
        return http.get("/status_rj45");
    }

    get(status_rj45_id) {
        return http.get(`/status_rj45/${status_rj45_id}`);
    }

    create(data) {
        return http.post("/status_rj45", data);
    }

    update(status_rj45_id, data) {
        return http.put(`/status_rj45/${status_rj45_id}`, data);
    }

    delete(status_rj45_id) {
        return http.delete(`/status_rj45/${status_rj45_id}`);
    }
}

export default new RJ45DataService();