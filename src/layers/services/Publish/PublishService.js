import {HTTP_PUBLISH} from "layers/lib/HTTPService";
import CONSTANTS from "layers/config/constants";
import LocalStore from "../../config/localStore";
const localStore = new LocalStore()

const POST_BASIC = CONSTANTS.API_URL.POST_GENERAL
const SCHEDULE_BASIC = CONSTANTS.API_URL.POST_SCHEDULE
const UPLOAD_MEDIA = CONSTANTS.API_URL.UPLOAD_LOCAL_IMAGES
const GET_POST_SCHEDULED_DETAILS = CONSTANTS.API_URL.GET_POST_SCHEDULED_DETAILS

export default class PublishService{
    publishPosts(post, teamId) {
        return HTTP_PUBLISH.post(POST_BASIC+"?teamId="+teamId, post, {
            headers: {
                'Content-Type': "application/json",
                'x-access-token': localStore.getToken(),
            }
        })
    }

    schedulePosts(post) {
        return HTTP_PUBLISH.post(SCHEDULE_BASIC, post, {
            headers: {
                'Content-Type': "application/json",
                'x-access-token': localStore.getToken(),
            }
        })
    }

    uploadLocalMedia(data, teamId) {
        return HTTP_PUBLISH.post(UPLOAD_MEDIA+"?title=title&privacy=0&teamId="+teamId, data, {
            headers: {
                'Content-Type': "application/json",
                'x-access-token': localStore.getToken(),
            }
        })
    }

    getScheduledPosts(pageid) {
        return HTTP_PUBLISH.get(GET_POST_SCHEDULED_DETAILS+"?fetchPageId="+pageid, {
            headers: {
                'Content-Type': "application/json",
                'x-access-token': localStore.getToken(),
            }
        })
    }
}