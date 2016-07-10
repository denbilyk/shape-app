import AppDispatcher from "../actions/AppDispatcher.jsx";
import {EventEmitter} from "events";


class ShapesStore extends EventEmitter {

    constructor(...args) {
        super(...args);
        this.circle = {};
        this.rect = {};
    }

    getCircleData() {
        return this.circle;
    }

    getRectData() {
        return this.rect;
    }


    addDataReloadListener(callback) {
        this.on(AppDispatcher.EVENTS.DATA_LOAD, callback);
    }

    removeDataReloadListener(callback) {
        this.removeListener(AppDispatcher.EVENTS.DATA_LOAD, callback);
    }

    processErrors(resp) {
        if (resp.data === AppDispatcher.REQUEST.TIMEOUT) {
            console.log("Request timeout");
            console.log(resp);
            return false;
        }
        else if (resp.data === AppDispatcher.REQUEST.ERROR) {
            console.log("Request error");
            console.log(resp);
            return false;
        }
        return true;
    }

    processType(data) {
        switch (data.type) {
            case "CIRCLE":
                store.circle.calculated = data.calculated;
                store.circle.square = data.square;
                break;

            case "RECT":
                store.rect.calculated = data.calculated;
                store.rect.square = data.square;
                break;
        }
    }

}


var store = new ShapesStore();
ShapesStore.dataToken = AppDispatcher.register(AppDispatcher.KEYS.DATA_REQUEST, (resp) => {
    if (store.processErrors(resp)) {
        if (!resp.data) return true;
        resp.data.map((shape) => {
            store.processType(shape);
        });
        store.emit(AppDispatcher.EVENTS.DATA_LOAD);
    }
    return true;
});

ShapesStore.calculateToken = AppDispatcher.register(AppDispatcher.KEYS.CALCULATE, (resp) => {
    if (store.processErrors(resp)) {
        if (!resp.data) return true;
        store.processType(resp.data);
    }
    store.emit(AppDispatcher.EVENTS.DATA_LOAD);
    return true;
});


export default store;