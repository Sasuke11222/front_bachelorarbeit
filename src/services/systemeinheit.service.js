import http from "../http-common";

class SystemeinheitDataService {
    getAll() {
        return http.get("/systemeinheit");
    }

    get(systemeinheit_id) {
        return http.get(`/systemeinheit/${systemeinheit_id}`);
    }

    create(data) {
        return http.post("/systemeinheit", data);
    }

    update(systemeinheit_id, data) {
        return http.put(`/systemeinheit/${systemeinheit_id}`, data);
    }

    delete(systemeinheit_id) {
        return http.delete(`/systemeinheit/${systemeinheit_id}`);
    }
}

export default new SystemeinheitDataService();