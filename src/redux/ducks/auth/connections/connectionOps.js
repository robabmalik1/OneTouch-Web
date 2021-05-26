import { actions } from "./connectionDuck";
import LocalStore from "../../../../layers/config/localStore";
import ConnectionService from "../../../../layers/services/ConnectionService";
import {getTeamDetails} from "../../teams/getDetails/getTeamsOps";

const localStore = new LocalStore()
const conn = new ConnectionService();

export const setSocialAccount = (network)=>dispatch=>{
    localStore.setCurrNetwork(network);
    dispatch(actions.setNetwork(network));
}

export const addSocialAccount =(code,state)=>dispatch=>{
    dispatch(actions.processingConnectionMessage());
    console.log(code);
    conn.addProfile(code,state)
        .then(res=>{
            console.log(res.data);
            if (res.data.code === 200) {
                dispatch(actions.connectionSuccess(res.data));
                dispatch(getTeamDetails())
            }
            else {
                dispatch(actions.connectionFailed(res.data))
            }
        })
        .catch( err =>
            dispatch(actions.connectionFailed(err))
        );
}

