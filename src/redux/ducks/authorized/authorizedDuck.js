const initialState = {
    processingUserDetails:false,
    userDetails: null,
    failedUserDetails:null
};

export const actionTypes = {
    USER_DETAILS_PROCESSING: "[authorized] USER_DETAILS_PROCESSING",
    USER_DETAILS_SUCCESS: "[authorized] USER_DETAILS_SUCCESS",
    USER_DETAILS_ERROR: "[authorized] USER_DETAILS_ERROR",
    USER_DETAILS_ERROR_RESET: "[authorized] USER_DETAILS_ERROR_RESET",
}

// actionTypes
export const actions = {
    processingUserDetails() {
        return {
            type: actionTypes.USER_DETAILS_PROCESSING,
            payload: null
        }
    },
    userDetailsSuccess(data) {
        return {
            type: actionTypes.USER_DETAILS_SUCCESS,
            payload: data
        }
    },
    userDetailsFailed(data) {
        return {
            type: actionTypes.USER_DETAILS_ERROR,
            payload: data
        }
    },
};

export const resetLoginError= () =>{
    return {
        type: actionTypes.USER_DETAILS_ERROR_RESET,
        payload: null
    }
}

// Reducer

export default function userDetailsReducer (state = initialState, action) {
    switch (action.type) {
        case actionTypes.USER_DETAILS_PROCESSING:
            return {
                ...state,
                userDetails: null,
                processingUserDetails: true,
                failedUserDetails: null
            }
        case actionTypes.USER_DETAILS_SUCCESS:
            return { ...state,
                userDetails: action.payload,
                processingUserDetails: false,
                failedUserDetails: null
            }
        case actionTypes.USER_DETAILS_ERROR:
            return { ...state,
                userDetails: null,
                processingUserDetails: false,
                failedUserDetails: action.payload };
        case actionTypes.USER_DETAILS_ERROR_RESET:
            return { ...state,
                userDetails: null,
                processingUserDetails: false,
                failedUserDetails: null
            };
        default:
            return state;
    }
};
