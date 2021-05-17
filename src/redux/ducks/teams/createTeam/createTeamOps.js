import { actions } from "./createTeamDuck";
import TeamsService from "../../../../layers/services/TeamsService";
import {getTeamDetails} from "../getDetails/getTeamsOps";

const TS = new TeamsService();

export const createNewTeam = teamData => dispatch => {
    alert("Creatingg new team")
    dispatch(actions.processingCreateTeam());
    TS.createTeam(teamData)
        .then(res=>{
            if(res.data.status==="success"){
                dispatch(actions.createTeamSuccess(res.data))
                dispatch(getTeamDetails());
            }
            else{
                dispatch(actions.createTeamFailed(res.data))
            }
        })
        .catch( err =>
            dispatch(actions.createTeamFailed(err))
        );

}