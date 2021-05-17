import { HTTP } from "../lib/HTTPService";
import LocalStore from "../config/localStore";
import CONSTANTS from "../config/constants";
const localStore = new LocalStore()
const INSTA_MEDIA = CONSTANTS.API_URL.INSTAGRAM_MEDIA
const DEL_INSTA_MEDIA = CONSTANTS.API_URL.DEL_IG_BASIC_MEDIA
const postJSON = { user_id: localStore.getClientId() };
export default class InstagramMedia {
    getIgBasicMedia() {
        return HTTP.post(INSTA_MEDIA, postJSON, {
            headers: {
                'Content-Type': "application/json"
            }
        })
    }

    delIgBasicMedia(postDataModel) {
        return HTTP.post(DEL_INSTA_MEDIA, postDataModel, {
            headers: {
                'Content-Type': "application/json"
            }
        })
    }
}