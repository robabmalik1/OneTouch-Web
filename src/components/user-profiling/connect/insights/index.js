import React, {useState} from 'react';
import FaceBookPageInsightModal from "./facebook_insights";
import FacebookInsight from "./facebook_insights";

function InsightsModel(props) {

    return (
        <div>
            {
                (props.account_type === 2 && props.status) &&
                <FaceBookPageInsightModal status ={props.status} closeInsightModal={props.closeInsightModal} />
            }

        </div>
    );
}

export default InsightsModel;