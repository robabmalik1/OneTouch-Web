import { HTTP } from "../lib/HTTPService";

import CONSTANTS from "../config/constants";
import LocalStore from "../config/localStore";


const ADD_SOCIAL_PROFILE = CONSTANTS.API_URL.ADD_SOCIAL_PROFILE;

const localStore = new LocalStore();

export default class ConnectionService {
    addProfile(code,state) {
        return HTTP.get(ADD_SOCIAL_PROFILE+"?code="+code+"&state="+state, {
            headers: {
                'Content-Type': "application/json",
                'x-access-token': localStore.getToken(),
            }
        })
    }


}
