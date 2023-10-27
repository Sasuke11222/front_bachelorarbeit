import http from "../common/http-common";

class BetriebssystemDataService {
    getAll() {
        return http.get("/betriebssystem");
    }

    get(betriebssystem_id) {
        return http.get(`/betriebssystem/${betriebssystem_id}`);
    }

    create(data) {
        return http.post("/betriebssystem", data);
    }

    update(betriebssystem_id, data) {
        return http.put(`/betriebssystem/${betriebssystem_id}`, data);
    }

    delete(betriebssystem_id) {
        return http.delete(`/betriebssystem/${betriebssystem_id}`);
    }


    findByName(betriebssystem_name) {
        return http.get(`/betriebssystem?betriebssystem_name=${betriebssystem_name}`);
    }
}

export default new BetriebssystemDataService();