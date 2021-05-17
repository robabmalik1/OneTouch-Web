import { actions } from "./getTeamsDuck";

import TeamsService from "../../../../layers/services/TeamsService";
import LocalStore from "../../../../layers/config/localStore";
import {currentTeam} from "../currentTeam/currentTeamOps";
import {getUDetails} from "../../authorized/authorizedOps";

const TS = new TeamsService();

export const getTeamDetails = () => dispatch => {
    dispatch(actions.processingTeamDetails());
    TS.getDetails()
        .then(res=>{
            if(res.data.status==="success"){
                const localStore = new LocalStore();
                localStore.setCurrTeam(res.data['teamSocialAccountDetails'][0][0]['team_id']);
                // const currTeam = this.LocalStore.getCurrTeam();
                dispatch(currentTeam(res.data['teamSocialAccountDetails'][0][0]['team_id']));
                dispatch(getUDetails());
                dispatch(actions.teamDetailsSuccess(res.data));
            }
            else{
                dispatch(actions.teamDetailsFailed(res.data))
            }
        })
        .catch( err =>
            dispatch(actions.teamDetailsFailed(err))
        );

}