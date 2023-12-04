import axios from "axios";
const API_URL = 'http://localhost:8080/api/';

class USBDataService {
    getAll() {
        return axios
            .get(API_URL + 'status_usb');
    }

    get(status_usb_id) {
        return axios
            .get(API_URL + 'status_usb/' + status_usb_id )
    }

    create(status) {
        return axios.post(API_URL + "status_usb", {
            status,
        }).then(response => {
            return response.data || [];
        });
    }

    update(status_usb_id, data) {
        return axios.put(API_URL + 'status_usb/', status_usb_id, data);
    }

    delete(status_usb_id) {
        return axios
            .delete(API_URL + 'status_usb/' + status_usb_id );
    }
}

export default new USBDataService();