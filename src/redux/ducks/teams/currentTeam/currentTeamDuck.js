const initialState = {
    processingTeams:false,
    CurrentTeam: null,
    CurrentTeamFailed:null
};

export const actionTypes = {
    CURRENT_TEAM_PROCESSING: "[team] CURRENT_TEAM_PROCESSING",
    CURRENT_TEAM_SUCCESS: "[team] CURRENT_TEAM_SUCCESS",
    CURRENT_TEAM_ERROR: "[team] CURRENT_TEAM_ERROR",
    CURRENT_TEAM_ERROR_RESET: "[team] CURRENT_TEAM_RESET",
}

// actionTypes
export const actions = {
    processingCurrentTeam() {
        return {
            type: actionTypes.CURRENT_TEAM_PROCESSING,
            payload: null
        }
    },
    CurrentTeamSuccess(data) {
        return {
            type: actionTypes.CURRENT_TEAM_SUCCESS,
            payload: data
        }
    },
    CurrentTeamFailed(data) {
        return {
            type: actionTypes.CURRENT_TEAM_ERROR,
            payload: data
        }
    },
};

export const resetCurrentTeamResetError= () =>{
    return {
        type: actionTypes.CURRENT_TEAM_ERROR_RESET,
        payload: null
    }
}

// Reducer
export default function currentTeamReducer(state = initialState, action) {
    switch (action.type) {
        case actionTypes.CURRENT_TEAM_PROCESSING:
            return { ...state,
                CurrentTeam: null,
                processingTeams: true,
                CurrentTeamFailed: null
            }
        case actionTypes.CURRENT_TEAM_SUCCESS:
            return { ...state,
                CurrentTeam: action.payload,
                processingTeams: false,
                CurrentTeamFailed: null
            }
        case actionTypes.CURRENT_TEAM_ERROR:
            return { ...state,
                CurrentTeam: null,
                processingTeams: false,
                CurrentTeamFailed: action.payload
                 };
        case actionTypes.CURRENT_TEAM_ERROR_RESET:
            return { ...state,
                CurrentTeam: null,
                processingTeams: false,
                CurrentTeamFailed: null
            };
        default:
            return state;
    }
};
