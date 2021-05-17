import { combineReducers } from "redux"
//User Profiling
import loginReducer from "./auth/login/loginDuck";
import registerReducer from "./auth/register/registerDuck";
import connectionReducer from "./auth/connections/connectionDuck";


import attachedAccountsReducer from "./attachedAccounts/attachedAccountsDuck";
import instaBasicMediaReducer from "./igMedia/igMediaDuck";
import teamReducer from "./teams/getDetails/getTeamsDuck";
import newTeamReducer from "./teams/createTeam/createTeamDuck";
import currTeamReducer from "./teams/currentTeam/currentTeamDuck";
import fbFeedReducer from "./feeds/getFeeds/getFeedsDuck";
import fuse from 'app/store/reducers/fuse';
import userDetailsReducer from "./authorized/authorizedDuck";

// import Noauth from 'app/auth/store/reducers';

const rootReducer = (asyncReducers) =>
  combineReducers({
    auth: loginReducer,
    register: registerReducer,
    connection: connectionReducer,
    attached_accounts: attachedAccountsReducer,
    ig_basic_media: instaBasicMediaReducer,
    team: teamReducer,
    newTeam: newTeamReducer,
    currTeam: currTeamReducer,
    fbFeeds: fbFeedReducer,
      currUserDetails: userDetailsReducer,

    fuse,
    // Noauth,
    ...asyncReducers
  });

export default rootReducer;