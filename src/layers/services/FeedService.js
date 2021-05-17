import { HTTP_FEEDS} from "../lib/HTTPService";
// import { UserModal } from "../model/UserModal";
// import { InstaBasicModel } from "../model/InstaBasicModel";

import CONSTANTS from "../config/constants";
import LocalStore from "../config/localStore";

const FB = CONSTANTS.FEEDS_URL.FB_FEEDS
const RECENT_FB = CONSTANTS.FEEDS_URL.RECENT_FB_FEEDS
const localStore = new LocalStore()

export default class FeedService {
    getFbFeeds(teamId,socialAccountId, accountId) {
        return HTTP_FEEDS.get(FB+"?accountId="+accountId+"&teamId="+teamId+"&pageId=1&socialAccountId="+socialAccountId,  {
            headers: {
                'Content-Type': "application/json",
                'x-access-token': localStore.getToken(),
            }
        })
    }

    getRecentFbFeeds(teamId,accountId) {
        return HTTP_FEEDS.get(RECENT_FB+"?accountId="+accountId+"&teamId="+teamId+"&pageId=1",  {
            headers: {
                contentType: "application/json",
                'x-access-token': localStore.getToken(),
            }
        })
    }


}
