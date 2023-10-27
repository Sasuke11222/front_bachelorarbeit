import http from "../common/http-common";

class FirewallDataService {
    getAll() {
        return http.get("/status_firewall");
    }

    get(status_firewall_id) {
        return http.get(`/status_firewall/${status_firewall_id}`);
    }

    create(data) {
        return http.post("/status_firewall", data);
    }

    update(status_firewall_id, data) {
        return http.put(`/status_firewall/${status_firewall_id}`, data);
    }

    delete(status_firewall_id) {
        return http.delete(`/status_firewall/${status_firewall_id}`);
    }
}

export default new FirewallDataService();