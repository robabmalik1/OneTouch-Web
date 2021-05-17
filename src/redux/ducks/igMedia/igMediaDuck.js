export const actionTypes = {
    FAILED_TO_FETCH: "[IG MEDIA] FAILED_TO_FETCH",
    SET_MEDIA: "[IG MEDIA] SET_IG_BASIC_MEDIA",
    FAILED_TO_DEL: "[IG MEDIA] FAILED_TO_DEL",
}

export const actions = {
    // Set logged in user
    setIgMediaState(data) {
        return {
            type: actionTypes.SET_MEDIA,
            payload: data
        };
    },
    failToFetchIgMediaState() {
        return {
            type: actionTypes.FAILED_TO_FETCH,
            payload: {}
        }
    },
    failToDelIgMedia() {
        return {
            type: actionTypes.FAILED_TO_DEL,
            payload: {}
        }
    }
}

const initialState = {
    igMediaFetchTried: false,
    ig_basic_media: { media: {} },
};
//Update state of all accounts individually
export default function igMediaDuck (state = initialState, action) {
    switch (action.type) {
        case actionTypes.SET_MEDIA:
            return {
                //todo set other state of other accounts
                igMediaFetchTried: true,//set tried to true every time sate is set
                ig_basic_media: action.payload.ig_basic_media,
            }
        case actionTypes.FAILED_TO_FETCH:
            return {
                ...state,
                igMediaFetchTried: false,
            }
        default:
            return state;
    }
}