const initialState = {
    processingCreateTeam:false,
    createTeamResponse: null,
    createTeamFailed:null
};

export const actionTypes = {
    CREATE_TEAM_PROCESSING: "[team] CREATE_TEAM_PROCESSING",
    CREATE_TEAM_SUCCESS: "[team] CREATE_TEAM_SUCCESS",
    CREATE_TEAM_ERROR: "[team] CREATE_TEAM_ERROR",
    CREATE_TEAM_ERROR_RESET: "[team] CREATE_TEAM_RESET",
}

// actionTypes
export const actions = {
    processingCreateTeam() {
        return {
            type: actionTypes.CREATE_TEAM_PROCESSING,
            payload: null
        }
    },
    createTeamSuccess(data) {
        return {
            type: actionTypes.CREATE_TEAM_SUCCESS,
            payload: data
        }
    },
    createTeamFailed(data) {
        return {
            type: actionTypes.CREATE_TEAM_ERROR,
            payload: data
        }
    },
};

export const resetCreateTeamResetError= () =>{
    return {
        type: actionTypes.CREATE_TEAM_ERROR_RESET,
        payload: null
    }
}

// Reducer
export default function createTeamReducer (state = initialState, action) {
    switch (action.type) {
        case actionTypes.CREATE_TEAM_PROCESSING:
            return { ...state,
                createTeamResponse: null,
                processingTeams: true,
                createTeamFailed: null
            }
        case actionTypes.CREATE_TEAM_SUCCESS:
            return { ...state,
                createTeamResponse: action.payload,
                processingTeams: false,
                createTeamFailed: null
            }
        case actionTypes.CREATE_TEAM_ERROR:
            return { ...state,
                createTeamResponse: null,
                processingTeams: false,
                createTeamFailed: action.payload
                 };
        case actionTypes.CREATE_TEAM_ERROR_RESET:
            return { ...state,
                createTeamResponse: null,
                processingTeams: false,
                createTeamFailed: null
            };
        default:
            return state;
    }
};
