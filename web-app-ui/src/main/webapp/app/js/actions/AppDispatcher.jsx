import {Dispatcher} from "flux";
import assign from 'object-assign';

var fluxDispatcher = new Dispatcher();
var AppDispatcher = assign(
    {
        dispatch(key, data, params) {
            var payload = {
                actionType: key,
                data: data
            };

            if (params) {
                payload.params = params;
            }
            fluxDispatcher.dispatch({payload: payload});
        },

        register(key, callback){
            return fluxDispatcher.register((resp) => {
                var payload = resp.payload;
                if (payload.actionType === key) {
                    callback(resp.payload);
                }
            });
        }
    },

    {
        KEYS: {
            DATA_REQUEST: "DATA_REQUEST",
            CALCULATE:"CALCULATE"
        },
        EVENTS: {
            DATA_LOAD: "DATA_LOAD",
        },
        REQUEST: {
            PENDING: "PENDING",
            TIMEOUT: "TIMEOUT",
            ERROR: "ERROR"
        }
    }
);

export default AppDispatcher;
