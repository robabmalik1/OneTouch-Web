import { actions } from "./attachedAccountsDuck"
import AuthServices from "../../../layers/services/AuthService";
const authServices = new AuthServices();

export const getAllAttachedAccounts = () => dispatch => {
    //authService from other file
    authServices.getAttachedAccounts().then((res) => {
        if (res.data.data) {
            const payload = createState(res.data.data)
            dispatch(actions.setAttachedAccountsState(payload))
        } else {
            //todo remove and do better error handling
            // dispatch(actions.failToFetchAccountsState())
            console.log(res.data)
        }
    }).catch((err) => {
        dispatch(actions.failToFetchAccountsState())
        console.log(err)
    })
};

function createState(data) {
    console.log(data)
    //if regarding state is not present in response then set default state
    let payload = {
        instagram_basic: (data.instagram.basic_instagram) ? data.instagram.basic_instagram : { connected: false },
        instagram_graph: (data.instagram.graph_instagram) ? data.instagram.graph_instagram : { connected: false, token: "" }
    }
    return payload
}