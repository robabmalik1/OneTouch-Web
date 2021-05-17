export const actionTypes = {
    INSTAGRAM_BASIC_CODE: "[Attached Accounts] IB",
    INSTAGRAM_GRAPH_CODE: "[Attached Accounts] IG",
    SET_ACCOUNTS: "[Attached Accounts] SET_ACCOUNTS",
    FAILED_TO_FETCH: "[Attached Accounts] FAILED_TO_FETCH",
    INSTAGRAM_BASIC: "[Attached Accounts] INSTAGRAM_BASIC",
    INSTAGRAM_GRAPH: "[Attached Accounts] INSTAGRAM_GRAPH"
}
export const actions = {
    // Set logged in user
    setAttachedAccountsState(data) {
        console.log(data)
        return {
            type: actionTypes.SET_ACCOUNTS,
            payload: data
        };
    },
    failToFetchAccountsState() {
        return {
            type: actionTypes.FAILED_TO_FETCH,
            payload: {}
        }
    }
}

const initialState = {
    accountsFetchTried: false,
    instagram_basic: { connected: false },
    instagram_graph: {
        connected: false,
        token: ""
    }
};
//Update state of all accounts individually
export default function attachedAccountsDuck(state = initialState, action) {
    switch (action.type) {
        case actionTypes.INSTAGRAM_BASIC:
            return {
                ...state,
                instagram_basic: action.payload,
            };
        case actionTypes.INSTAGRAM_GRAPH:
            return {
                ...state,
                instagram_graph: action.payload
            };
        case actionTypes.SET_ACCOUNTS:
            return {
                //todo set other state of other accounts
                accountsFetchTried: true,//set tried to true every time sate is set
                instagram_basic: action.payload.instagram_basic,
                instagram_graph: action.payload.instagram_graph
            }
        case actionTypes.FAILED_TO_FETCH:
            return {
                ...state,
                accountsFetchTried: true
            }
        default:
            return state;
    }
}