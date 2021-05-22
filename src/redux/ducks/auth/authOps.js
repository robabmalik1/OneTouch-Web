import jwt_decode from "jwt-decode";
import { actions } from "./authDuck";
import AuthService from "../../../layers/services/AuthService";
import LocalStore from "../../../layers/config/localStore";

const auth = new AuthService()
const localStore = new LocalStore()
//               Register UserService
export const registerUser = (userData, history) => dispatch => {
    auth.signUp(userData).then(res => history.push("/Login"))
        .catch(err =>
            dispatch(actions.getError(err.response))
        );
};

function setUser(data, dispatch) {
    console.log("SET USER" + data);
    const { token, user } = data;
    // const { token } = data;

    localStore.setToken(token);
    localStore.setClientId(user._id)
    alert("USERID: " + user._id);
    //                  Decode token to get user data
    const decoded = jwt_decode(token);
    console.log("DECODED: " + decoded);
    //                  Set current user
    dispatch(actions.setCurrentUser(decoded));
}

//                      Login - get user token
export const loginUser = userData => dispatch => {
    auth.logIn(userData).then(res => {
        //              Save to localStorage
        if (res.data) {
            console.log("SETTING USER" + res.data);
            setUser(res.data, dispatch)
        } else {
            console.log("No UserService Logged")
        }
    })
        .catch(err =>
            dispatch(actions.getError(err.response))
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
    // Remove auth header for future requests
    // Set current user to empty object {} which will set isAuthenticated to false
    dispatch(actions.setCurrentUser({}));
};
