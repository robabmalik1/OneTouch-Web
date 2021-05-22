import {HTTP_FEEDS} from "layers/lib/HTTPService";
import LocalStore from "../../config/localStore";

import CONSTANTS from "../../config/constants";

const localStore = new LocalStore()

const FACEBOOK_PAGE = CONSTANTS.INSIGHTS.FACEBOOK_PAGE


export default class TeamsService {
    getFaceBookInsights(teamId, filterPeriod, since, until, accountId) {
        let query = "?teamId="+teamId+"&filterPeriod="+filterPeriod+"&since="+since+"&until="+until+"&accountId="+accountId 
        return HTTP_FEEDS.get(FACEBOOK_PAGE+query, {
            headers: {
                'Content-Type': "application/json",
                'x-access-token': localStore.getToken(),
            }
        })
    }
}
