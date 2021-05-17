import { actions } from "./igMediaDuck"
// @ts-ignore
import LocalStore from "../../../layers/config/localStore";
import IgMediaServices from "../../../layers/services/InstagramMedia";
// @ts-ignore
const igMediaServices = new IgMediaServices();


const localStore = new LocalStore()

export const getAllMedia = () => dispatch => {
    //authService from other file
    igMediaServices.getIgBasicMedia().then((res) => {
        if (res.data.data) {
            console.log(res.data.data);
            const payload = createState(res.data.data.user)
            dispatch(actions.setIgMediaState(payload))
        } else {
            //todo remove and do better error handling
            dispatch(actions.failToFetchIgMediaState())

            console.log(res.data)
        }
    }).catch((err) => {
        dispatch(actions.failToFetchIgMediaState())
        console.log(err)
    })
};

export const delCurrMedia = (mediaId) => dispatch => {
    //authService from other file
    igMediaServices.delIgBasicMedia({ user_id: localStore.getClientId(), media_id: mediaId }).then((res) => {
        if (res.data.data) {
            console.log(res.data.data);
        } else {
            //todo remove and do better error handling
            dispatch(actions.failToDelIgMedia())
        }
    }).catch((err) => {
        dispatch(actions.failToDelIgMedia())
        console.log(err)
    })
};



function createState(data) {
    console.log(data)
    //if regarding state is not present in response then set default state
    let payload = { ig_basic_media: (data) ? data : { media: false } }
    return payload
}