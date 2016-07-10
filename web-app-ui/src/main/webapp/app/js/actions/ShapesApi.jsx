import BaseApi from "./BaseApi.jsx";
import AppDispatcher from "./AppDispatcher.jsx";


class ShapesApi extends BaseApi {

    constructor(props) {
        super(props);
    }

    getShapesData() {
        let url = BaseApi.getHost();
        let key = AppDispatcher.KEYS.DATA_REQUEST;
        this.abortPendingRequests(key);
        this._pendingRequests[key] = BaseApi.get(url).end(this.processResponse(key));
    }

    calculateCircle(data) {
        let url = BaseApi.getHost() + "/circle";
        let key = AppDispatcher.KEYS.CALCULATE;
        this.abortPendingRequests(key);
        this._pendingRequests[key] = BaseApi.post(url, data).end(this.processResponse(key));
    }

    calculateRect(data) {
        let url = BaseApi.getHost() + "/rect";
        let key = AppDispatcher.KEYS.CALCULATE;
        this.abortPendingRequests(key);
        this._pendingRequests[key] = BaseApi.post(url, data).end(this.processResponse(key));
    }

}

export default new ShapesApi();