import React, {useState} from 'react';
import FaceBookPageInsightModal from "./facebook_insights";
import TwitterInsightModal from "./twitter_insights";
import InstagramBusinessInsightModal from "./instagram_insights";

function InsightsModel(props) {

    return (
        <div>
            {
                (props.account_type === 2 && props.status) &&
                <FaceBookPageInsightModal status ={props.status} closeInsightModal={props.closeInsightModal} />
            }
            {
                (props.account_type === 4 && props.status) &&
                <TwitterInsightModal status ={props.status} closeInsightModal={props.closeInsightModal} />
            }
            {
                (props.account_type === 12 && props.status) &&
                <InstagramBusinessInsightModal status ={props.status} closeInsightModal={props.closeInsightModal} />
            }
        </div>
    );
}

export default InsightsModel;