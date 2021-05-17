import { actions } from "./getFeedsDuck";

import FeedService from "../../../../layers/services/FeedService";

const FS = new FeedService();

export const getFacebookFeeds = (teamId,socialAccountId,accountId) => dispatch => {
    dispatch(actions.processingfeeds());
    FS.getFbFeeds(teamId,socialAccountId,accountId)
        .then(res=>{
            if(res.data.status==="success"){
                // const localStore = new LocalStore();
                // localStore.setCurrTeam(res.data['teamSocialAccountDetails'][0][0]['team_id']);
                dispatch(actions.feedsSuccess(res.data));
            }
            else{
                dispatch(actions.feedsFailed(res.data))
            }
        })
        .catch( err =>
            dispatch(actions.feedsFailed(err))
        );

}


export const getRecentFbFeeds = () => dispatch => {
    dispatch(actions.processingfeeds());
    FS.getRecentFbFeeds()
        .then(res=>{
            if(res.data.status==="success"){
                // const localStore = new LocalStore();
                // localStore.setCurrTeam(res.data['teamSocialAccountDetails'][0][0]['team_id']);
                dispatch(actions.feedsSuccess(res.data));
            }
            else{
                dispatch(actions.feedsFailed(res.data))
            }
        })
        .catch( err =>
            dispatch(actions.feedsFailed(err))
        );

}