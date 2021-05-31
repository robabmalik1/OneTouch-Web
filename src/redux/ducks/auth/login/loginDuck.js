const initialState = {
    processingLogin:false,
    user: null,
    failedLogin:null,
    otp: false,
    message: null,
};

export const actionTypes = {
    LOGIN_PROCESSING: "[login] LOGIN_PROCESSING",
    LOGIN_SUCCESS: "[login] LOGIN_SUCCESS",
    LOGIN_ERROR: "[login] LOGIN_ERROR",
    LOGIN_OTP:"[login] LOGIN_OTP",
    LOGIN_FORGOT:"[login] LOGIN_FORGOT",
    LOGIN_ERROR_RESET: "[login] LOGIN_RESET",
}

// actionTypes
export const actions = {
    processingLoginMessage() {
        return {
            type: actionTypes.LOGIN_PROCESSING,
            payload: null
        }
    },
    loginOTP(){
        return{
            type: actionTypes.LOGIN_OTP,
            payload: null
        }
    },
    loginForgot(data){
        return{
            type: actionTypes.LOGIN_FORGOT,
            payload: data
        }
    },
    loginSuccess(data) {
        return {
            type: actionTypes.LOGIN_SUCCESS,
            payload: data
        }
    },
    loginFailed(data) {
        return {
            type: actionTypes.LOGIN_ERROR,
            payload: data
        }
    },
    resetLoginError(){
        return {
            type: actionTypes.LOGIN_ERROR_RESET,
            payload: null
        }
    }
};


// Reducer

export default function loginReducer (state = initialState, action) {
    switch (action.type) {
        case actionTypes.LOGIN_PROCESSING:
            return {
                ...state,
                user: null,
                processingLogin: true,
                failedLogin: null,
                otp: true,
                message: "Processing"
            }
        case actionTypes.LOGIN_OTP:
            return { ...state,
                user: null,
                processingLogin: false,
                failedLogin: null,
                otp: true,
                message: "Processing OTP"
            }
        case actionTypes.LOGIN_FORGOT:
            return { ...state,
                user: null,
                processingLogin: false,
                failedLogin: null,
                otp: false,
                message: action.payload
            }
        case actionTypes.LOGIN_SUCCESS:
            return { ...state,
                user: action.payload,
                processingLogin: false,
                failedLogin: null,
                otp: false,
                message: null
            }
        case actionTypes.LOGIN_ERROR:
            return { ...state,
                user: null,
                processingLogin: false,
                failedLogin: "Login Failed",
                otp: false,
                message: null
            
            }
        case actionTypes.LOGIN_ERROR_RESET:
            return { ...state,
                user: null,
                processingLogin: false,
                failedLogin: null,
                otp: false,
                message: null
            }
        default:
            return state;
    }
};
