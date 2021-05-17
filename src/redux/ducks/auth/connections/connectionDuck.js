const initialState = {
    processingConnection:false,
    platform: null,
    network: null,
    failedConnection:null,
    message: null,
};

export const actionTypes = {
    CONNECTION_PROCESSING: "[CONNECTION] CONNECTION_PROCESSING",
    CONNECTION_SUCCESS: "[CONNECTION] CONNECTION_SUCCESS",
    CONNECTION_ERROR: "[CONNECTION] CONNECTION_ERROR",
    CONNECTION_ERROR_RESET: "[CONNECTION] CONNECTION_RESET",
    CONNECTION_NETWORK: "[CONNECTION] CONNECTION_NETWORK"
}

// actionTypes
export const actions = {
    processingConnectionMessage() {
        return {
            type: actionTypes.CONNECTION_PROCESSING,
            payload: null
        }
    },
    setNetwork(data){
        return {
            type: actionTypes.CONNECTION_NETWORK,
            payload: data
        }
    },
    connectionSuccess(data) {
        return {
            type: actionTypes.CONNECTION_SUCCESS,
            payload: data
        }
    },
    connectionFailed(data) {
        return {
            type: actionTypes.CONNECTION_ERROR,
            payload: data
        }
    },
};

export const resetConnectionError= () =>{
    return {
        type: actionTypes.CONNECTION_ERROR_RESET,
        payload: null
    }
}

// Reducer

export default function connectionReducer (state = initialState, action) {
    switch (action.type) {
        case actionTypes.CONNECTION_PROCESSING:
            return {
                ...state,
                platform: null,
                processingConnection: true,
                failedConnection: null,
                network: null,
                message: "Processing"
            }
        case actionTypes.CONNECTION_NETWORK:
            return {
                ...state,
                platform: null,
                processingConnection: true,
                failedConnection: null,
                network: action.payload,
                message: "Processing"
            }
        case actionTypes.CONNECTION_SUCCESS:
            return { ...state,
                platform: action.payload,
                processingConnection: false,
                failedConnection: null,
                network: null,
                message: null
            }
        case actionTypes.CONNECTION_ERROR:
            return { ...state,
                platform: null,
                processingConnection: false,
                failedConnection: action.payload,
                network: null,
                message: null
            };
        case actionTypes.CONNECTION_ERROR_RESET:
            return { ...state,
                platform: null,
                processingConnection: false,
                failedConnection: null,
                network: null,
                message: null
            };
        default:
            return state;
    }
};
