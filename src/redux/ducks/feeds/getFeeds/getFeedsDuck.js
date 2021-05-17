const initialState = {
    processingFeeds:false,
    feeds: null,
    failedGetFeeds:null
};

export const actionTypes = {
    FEEDS_PROCESSING: "[team] FEEDS_PROCESSING",
    FEEDS_SUCCESS: "[team] FEEDS_SUCCESS",
    FEEDS_ERROR: "[team] FEEDS_ERROR",
    FEEDS_ERROR_RESET: "[team] TEAMS_DETAILS_RESET",
}

// actionTypes
export const actions = {
    processingfeeds() {
        return {
            type: actionTypes.FEEDS_PROCESSING,
            payload: null
        }
    },
    feedsSuccess(data) {
        return {
            type: actionTypes.FEEDS_SUCCESS,
            payload: data
        }
    },
    feedsFailed(data) {
        return {
            type: actionTypes.FEEDS_ERROR,
            payload: data
        }
    },
};

export const resetfeedsResetError= () =>{
    return {
        type: actionTypes.FEEDS_ERROR_RESET,
        payload: null
    }
}

// Reducer
export default function feedsReducer (state = initialState, action) {
    switch (action.type) {
        case actionTypes.FEEDS_PROCESSING:
            return { ...state,
                feeds: null,
                processingFeeds: true,
                failedGetFeeds: null
            }
        case actionTypes.FEEDS_SUCCESS:
            return { ...state,
                feeds: action.payload,
                processingFeeds: false,
                failedGetFeeds: null
            }
        case actionTypes.FEEDS_ERROR:
            return { ...state,
                feeds: null,
                processingFeeds: false,
                failedGetFeeds: action.payload
            };
        case actionTypes.FEEDS_ERROR_RESET:
            return { ...state,
                feeds: null,
                processingFeeds: false,
                failedGetFeeds: null
            };
        default:
            return state;
    }
};
