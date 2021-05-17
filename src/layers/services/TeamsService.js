import { HTTP } from "../lib/HTTPService";
import LocalStore from "../config/localStore";

import CONSTANTS from "../config/constants";

const localStore = new LocalStore()

const TEAMS = CONSTANTS.TEAMS_URL.TEAM_DETAILS
const TEAM_BY_ID = CONSTANTS.TEAMS_URL.TEAM_DETAILS_BY_ID
const CREATE_TEAMS = CONSTANTS.TEAMS_URL.CREATE_TEAM

export default class TeamsService {
    getDetails() {
        return HTTP.get(TEAMS, {
            headers: {
                'Content-Type': "application/json",
                'x-access-token': localStore.getToken(),
            }
        })
    }

    getDetailsById(teamID) {
        return HTTP.get(TEAM_BY_ID+"/?TeamId="+teamID, {
            headers: {
                'Content-Type': "application/json",
                'x-access-token': localStore.getToken(),
            }
        })
    }


    createTeam(teamDataModel) {
        return HTTP.post(CREATE_TEAMS,teamDataModel, {
            headers: {
                'Content-Type': "application/json",
                'x-access-token': localStore.getToken(),
            }
        })
    }

}
