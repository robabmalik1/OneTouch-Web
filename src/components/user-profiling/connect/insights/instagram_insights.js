import React, { useEffect, useState} from "react";

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Button from '@material-ui/core/Button';
import AnalyticsDashboardApp from "components/analytics/AnalyticsDashboardApp"
import {Typography, AppBar, Toolbar, Grid} from '@material-ui/core';
import {GetInstagramInsights} from "layers/services/Insights"
import LocalStore from "../../../../layers/config/localStore";
import { widgets } from './state'

var widgetData = widgets;
const localStore = new LocalStore();
export default function InstaramBusinessInsightModal(props){
    const [insightsProcessed, setInsightsProcess] = useState(false)
    

    useEffect(()=>{
        GetInstagramInsights(localStore.getCurrTeam(), 3, 4, responseHandler)
    }, [])

    const responseHandler = (msg, instagramInsights)=>{
        if(!msg){
            console.log(instagramInsights)
            widgetData.data.widget2.Growth.value =  instagramInsights.impressions
            widgetData.data.widget3.impressions.value =  instagramInsights.reach
            widgetData.data.widget4.Engagement.value =  instagramInsights.profileViews  
    
    
            // widget3.impressions.value = facebookInsights.pageImpressions
             console.log(widgetData)

            setInsightsProcess(true)
        }else{
            alert(msg)
        }
        
    }
    return(
        <>
        <Dialog open={props.status} onClose={()=>props.closeInsightModal(false)}  fullScreen="true">  
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h5" color="inherit">
                        Insights
                    </Typography>
                </Toolbar>
            </AppBar>
            {
                insightsProcessed?
                    <AnalyticsDashboardApp widget={widgetData} type="IB"/>
                    :
                    <h6>Loading ... </h6>

            }
            <DialogActions>
                <Button color="primary" onClose={()=>props.closeInsightModal(false)}>
                    Close
                </Button>
            </DialogActions>
        </Dialog>
        </>
    )
}