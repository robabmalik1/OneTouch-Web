import {HTTP_FEEDS} from "../lib/HTTPService";

import CONSTANTS from "../config/constants";

const POST_BASIC = CONSTANTS.API_URL.POST_BASIC_INSTA

export default class InstagramUpload{
    postBasic(postDataModel) {
        return HTTP_FEEDS.post(POST_BASIC, postDataModel, {
            headers: {
                'Content-Type': "application/json"
            }
        })
    }
}