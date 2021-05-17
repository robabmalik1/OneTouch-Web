import { actions } from "./connectionDuck";
import LocalStore from "../../../../layers/config/localStore";
import ConnectionService from "../../../../layers/services/ConnectionService";

const localStore = new LocalStore()
const conn = new ConnectionService();

export const setSocialAccount = (network)=>dispatch=>{
    localStore.setCurrNetwork(network);
    dispatch(actions.setNetwork(network));
}

export const addSocialAccount =(code,state)=>dispatch=>{
    dispatch(actions.processingConnectionMessage());
    conn.addProfile(code,state)
        .then(res=>{
            if (res.data.code === 200) {
                console.log(res.data);
                dispatch(actions.connectionSuccess(res.data));
            }
            else {
                dispatch(actions.connectionFailed(res.data))
            }
        })
        .catch( err =>
            dispatch(actions.connectionFailed(err))
        );
}

