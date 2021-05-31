import {HTTP_FEEDS} from "layers/lib/HTTPService";
import LocalStore from "../../config/localStore";

import CONSTANTS from "../../config/constants";

const localStore = new LocalStore()

const FACEBOOK_PAGE = CONSTANTS.INSIGHTS.FACEBOOK_PAGE
const  TWITTER= CONSTANTS.INSIGHTS.TWITTER
const  INSTAGRAM= CONSTANTS.INSIGHTS.INSTAGRAM


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

    getTwitterInsights(teamId,accountId, filterPeriod) {
        let query = "?teamId="+teamId+"&filterPeriod="+filterPeriod+"&accountId="+accountId 
        return HTTP_FEEDS.get(TWITTER+query, {
            headers: {
                'Content-Type': "application/json",
                'x-access-token': localStore.getToken(),
            }
        })
    }

    getInstagramInsights(teamId,accountId, filterPeriod) {
        let query = "?teamId="+teamId+"&filterPeriod="+filterPeriod+"&accountId="+accountId 
        return HTTP_FEEDS.get(INSTAGRAM+query, {
            headers: {
                'Content-Type': "application/json",
                'x-access-token': localStore.getToken(),
            }
        })
    }
}
