import http from "../common/http-common";

class USBDataService {
    getAll() {
        return http.get("/status_usb");
    }

    get(status_usb_id) {
        return http.get(`/status_usb/${status_usb_id}`);
    }

    create(data) {
        return http.post("/status_usb", data);
    }

    update(status_usb_id, data) {
        return http.put(`/status_usb/${status_usb_id}`, data);
    }

    delete(status_usb_id) {
        return http.delete(`/status_usb/${status_usb_id}`);
    }
}

export default new USBDataService();