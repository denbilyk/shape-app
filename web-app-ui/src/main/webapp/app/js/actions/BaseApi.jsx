import request from 'superagent';
import AppDispatcher from "./AppDispatcher.jsx";


var SERVER_HOST = getHostUrl();
var TIMEOUT = getTimeOut();

function getTimeOut() {
    var result = 0;
    try {
        result = TIMEOUT_CFG;
    } catch (e) {

    }
    return result;
}


function getHostUrl() {
    var result = "";
    try {
        result = API_URL_CFG;
    } catch (e) {

    }
    return result;
}

export default class BaseApi {

    constructor() {
        this._pendingRequests = {};
    }

    static getHost() {
        return SERVER_HOST;
    }

    processResponse(key) {
        return function (err, res) {
            if (err && err.timeout === TIMEOUT)
                AppDispatcher.dispatch(key, AppDispatcher.REQUEST.TIMEOUT);
            else if (!res || !res.ok) {
                AppDispatcher.dispatch(key, AppDispatcher.REQUEST.ERROR);
            }
            else {
                AppDispatcher.dispatch(key, res.body);
            }

        }
    }

    abortPendingRequests(key) {
        if (this._pendingRequests[key]) {
            this._pendingRequests[key]._callback = function () {
            };
            this._pendingRequests[key].abort();
            this._pendingRequests[key] = null;
        }
    }

    static get(url, timeout) {
        return request
            .get(url)
            .timeout(timeout || TIMEOUT);
    }

    static post(url, data) {
        return request
            .post(url, data);
    }
}