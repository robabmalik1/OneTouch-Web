import { actions } from "./loginDuck";
import AuthService from "../../../../layers/services/AuthService";
import LocalStore from "../../../../layers/config/localStore";

const auth = new AuthService()
const localStore = new LocalStore()
//               Register UserService
// export const registerUser = (userData, history) => dispatch => {
//     auth.signUp(userData).then(res => history.push("/Login"))
//         .catch(err =>
//             dispatch(actions.getError(err.response))
//         );
// };

function setUser(data) {
    // const { token, user } = data;
    const { accessToken, user} = data;

    localStore.setToken(accessToken);
    localStore.setUser(JSON.stringify(user))
    localStore.setUserId(user.user_id);
}
//get OTP
export const getOTP = userData => dispatch => {
    dispatch(actions.processingLoginMessage());
    auth.logIn(userData)
        .then(res => {
            //              Save to localStorage
            if (res.data.code === 200) {
                console.log(res)
                // setUser(res.data)
                localStore.setCurrEmail(res.data.user.email);
                dispatch(actions.loginOTP());

            } else {
                dispatch(actions.loginFailed(res.data.error))
            }
        }).catch( err =>
        dispatch(actions.loginFailed(err))
    );
};

//forgot Password
export const forgPassword = email => dispatch => {
    dispatch(actions.processingLoginMessage());
    auth.forgotPassword(email)
        .then(res => {
            //              Save to localStorage
            if (res.data.code === 200) {
                // setUser(res.data)
                // localStore.setCurrEmail(res.data.user.email);
                dispatch(actions.loginForgot(res.data.message));
            } else {
                dispatch(actions.loginFailed(res.data.error))
            }
        }).catch( err =>
        dispatch(actions.loginFailed(err))
    );
};

//Social Login
export const socialLog = network => dispatch => {
    dispatch(actions.processingLoginMessage());
    auth.socialLogin(network)
        .then(res => {
            //              Save to localStorage
            if (res.data.code === 200) {
                // setUser(res.data)
                // localStore.setCurrEmail(res.data.user.email);
                console.log(res.data)
                window.location.assign(res.data.navigateUrl)
                // dispatch(actions.loginForgot(res.data.message));
            } else {
                dispatch(actions.loginFailed(res.data.error))
            }
        }).catch( err =>
        dispatch(actions.loginFailed(err))
    );
};

//reset Password
export const resPassword = (email,np) => dispatch => {
    alert(email);
    dispatch(actions.processingLoginMessage());
    auth.resetPassword(email,np)
        .then(res => {
            //              Save to localStorage
            if (res.data.code === 200) {
                console.log(res.data)
                // setUser(res.data)
                // localStore.setCurrEmail(res.data.user.email);
                // dispatch(actions.loginForgot(res.data.message));
            } else {
                dispatch(actions.loginFailed(res.data.error))
            }
        }).catch( err =>
        dispatch(actions.loginFailed(err))
    );
};
//                      Login - get user token
export const loginUser = userData => dispatch => {
    dispatch(actions.processingLoginMessage());
    auth.validateOTP(userData)
        .then(res => {
        //              Save to localStorage
        if (res.data.code === 200) {
            setUser(res.data)
            dispatch(actions.loginSuccess(res.data.user));
        } else {
            dispatch(actions.loginFailed(res.data.error))
        }
    }).catch( err =>
        dispatch(actions.loginFailed(err))
    );
};

// Login Instagram 
export const loginInstagram = userData => dispatch => {
    auth.loginBasicInsta(userData).then(res => {
        // Save to localStorage
        if (res.data) {
            console.log(res.data);
            // setUser(res.data,dispatch)
        } else {
            console.log("No UserService Logged")
        }
    })
        .catch(err =>
            dispatch(actions.getError(err.response))
        );
};

export const loggedUser = data => dispatch => {
    console.log("LOGGED USER" + data);
    setUser(data, dispatch)
}

// Log user out
export const logoutUser = () => dispatch => {
    // Remove token from local storage
    localStore.removeToken();
    localStore.removeUser();
    localStore.removeCurrTeam();
    localStore.removeUserId();
    // Remove auth header for future requests
    // Set current user to empty object {} which will set isAuthenticated to false
    //todo create reducer and action for logout
    dispatch(actions.loginSuccess(null));
};
