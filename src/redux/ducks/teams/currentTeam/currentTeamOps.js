import { actions } from "./currentTeamDuck";
import TeamsService from "../../../../layers/services/TeamsService";

const TS = new TeamsService();

export const currentTeam = currTeamData => dispatch => {
    dispatch(actions.processingCurrentTeam());
    TS.getDetailsById(currTeamData)
        .then(res=>{
            if(res.data.status ==="success"){
                dispatch(actions.CurrentTeamSuccess(res.data));
            }
            else{
                dispatch(actions.CurrentTeamFailed(res.data));
            }
        })
        .catch( err =>
            dispatch(actions.CurrentTeamFailed({error: "error"}))
        );
    }