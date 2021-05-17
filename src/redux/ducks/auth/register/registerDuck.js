export const actionTypes = {
    REGISTER_PROCESSING: "[register] REGISTER_PROCESSING",
    REGISTER_SUCCESS: "[register] REGISTER_SUCCESS",
    REGISTER_ERROR: "[register] REGISTER_ERROR",
    REGISTER_ERROR_RESET: "[register] REGISTER_RESET",
}

// actionTypes
export const actions = {
    processingRegisterMessage() {
        return {
            type: actionTypes.REGISTER_PROCESSING,
            payload: null
        }
    },
    registerSuccess(data) {
        return {
            type: actionTypes.REGISTER_SUCCESS,
            payload: data
        }
    },
    registerFailed(data) {
        return {
            type: actionTypes.REGISTER_ERROR,
            payload: data
        }
    },
};

export const resetRegisterError= () =>{
    return {
        type: actionTypes.REGISTER_ERROR_RESET,
        payload: null
    }
}

// Reducer
const initialState = {
    processingRegister:false,
    registerMessage: null,
    failedRegister:null
};


export default function registerReducer (state = initialState, action) {
    switch (action.type) {
        case actionTypes.REGISTER_PROCESSING:
            return { ...state,
                registerMessage: null,
                processingRegister: true,
                failedRegister: null
            }
        case actionTypes.REGISTER_SUCCESS:
            return { ...state,
                registerMessage: action.payload,
                processingRegister: false,
                failedRegister: null
            }
        case actionTypes.REGISTER_ERROR:
            return { ...state,
                registerMessage: null,
                processingRegister: false,
                failedRegister: action.payload
            };
        case actionTypes.REGISTER_ERROR_RESET:
            return { ...state,
                registerMessage: null,
                processingRegister: false,
                failedRegister: null
            };
        default:
            return state;
    }
};
