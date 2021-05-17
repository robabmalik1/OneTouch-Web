import {actions} from "./registerDuck";

import AuthService from "../../../../layers/services/AuthService";

const auth = new AuthService()

export const registerUser = (userData, history) => dispatch => {
    dispatch(actions.processingRegisterMessage());
    auth.signUp(userData)
        .then(res => {
            if(res.data.status==="success") {
                dispatch(actions.registerSuccess(res.data.message));
            }
            else{
                dispatch(actions.registerFailed(res.data.error));
            }
        })
        .catch(err =>
            dispatch(actions.registerFailed("Failed to register"))
        );
};