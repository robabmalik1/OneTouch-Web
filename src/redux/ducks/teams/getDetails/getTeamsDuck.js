const initialState = {
    processingTeams:false,
    teamDetails: null,
    failedGetTeamsDetails:null
};

export const actionTypes = {
    TEAMS_DETAILS_PROCESSING: "[team] TEAMS_DETAILS_PROCESSING",
    TEAMS_DETAILS_SUCCESS: "[team] TEAMS_DETAILS_SUCCESS",
    TEAMS_DETAILS_ERROR: "[team] TEAMS_DETAILS_ERROR",
    TEAMS_DETAILS_ERROR_RESET: "[team] TEAMS_DETAILS_RESET",
}

// actionTypes
export const actions = {
    processingTeamDetails() {
        return {
            type: actionTypes.TEAMS_DETAILS_PROCESSING,
            payload: null
        }
    },
    teamDetailsSuccess(data) {
        return {
            type: actionTypes.TEAMS_DETAILS_SUCCESS,
            payload: data
        }
    },
    teamDetailsFailed(data) {
        return {
            type: actionTypes.TEAMS_DETAILS_ERROR,
            payload: data
        }
    },
};

export const resetTeamDetailsResetError= () =>{
    return {
        type: actionTypes.TEAMS_DETAILS_ERROR_RESET,
        payload: null
    }
}

// Reducer
export default function getTeamsReducer (state = initialState, action) {
    switch (action.type) {
        case actionTypes.TEAMS_DETAILS_PROCESSING:
            return { ...state,
                teamDetails: null,
                processingTeams: true,
                failedGetTeamsDetails: null
            }
        case actionTypes.TEAMS_DETAILS_SUCCESS:
            return { ...state,
                teamDetails: action.payload,
                processingTeams: false,
                failedGetTeamsDetails: null
            }
        case actionTypes.TEAMS_DETAILS_ERROR:
            return { ...state,
                teamDetails: null,
                processingTeams: false,
                failedGetTeamsDetails: action.payload
                 };
        case actionTypes.TEAMS_DETAILS_ERROR_RESET:
            return { ...state,
                teamDetails: null,
                processingTeams: false,
                failedGetTeamsDetails: null
            };
        default:
            return state;
    }
};
