import { actions } from "./authorizedDuck";
import AuthService from "../../../layers/services/AuthService";
import LocalStore from "../../../layers/config/localStore";

const auth = new AuthService()
const localStore = new LocalStore()

function setUser(data) {
    // const { token, user } = data;
    const { accessToken, user} = data;

    localStore.setToken(accessToken);
    localStore.setUser(JSON.stringify(user))
}

export const getUDetails = () => dispatch => {
    dispatch(actions.processingUserDetails())
    auth.getUserDetails()
        .then(res =>{
            if (res.data.code === 200) {
                setUser(res.data)
                dispatch(actions.userDetailsSuccess(res.data))
            }
            else {
                dispatch(actions.userDetailsFailed(res.data))
            }
        })
        .catch( err =>
        dispatch(actions.userDetailsFailed(err))
    );

};
