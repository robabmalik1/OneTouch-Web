import React from 'react';
import {useDispatch} from "react-redux";
import { useParams} from "react-router-dom";
import jwt_decode from "jwt-decode";
import {actions} from "../../../../redux/ducks/auth/login/loginDuck";
import LocalStore from "../../../../layers/config/localStore";

const localStore = new LocalStore()
function LoginSuccess(props) {
    const {access_token}=useParams();
    const dispatch = useDispatch()
    const user = jwt_decode(access_token).token;

    localStore.setToken(access_token);
    localStore.setUser(JSON.stringify(user))
    localStore.setUserId(user.user_id);
    dispatch(actions.loginSuccess(user));
    props.history.push("/Login")


    // dispatch(actions.loginSuccess(res.data.user));
    return (
        <div>
            {JSON.stringify(jwt_decode(access_token).token)}
        </div>
    );
}

export default LoginSuccess;