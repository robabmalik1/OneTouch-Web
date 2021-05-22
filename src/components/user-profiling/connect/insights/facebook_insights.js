import React, { useEffect, useState} from "react";

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Button from '@material-ui/core/Button';
import AnalyticsDashboardApp from "components/analytics/AnalyticsDashboardApp"
import {Typography, AppBar, Toolbar, Grid} from '@material-ui/core';
import {GetFaceBookInsights} from "layers/services/Insights"

var widget3=null;

export default function FaceBookPageInsightModal(props){
    const [insightsProcessed, setInsightsProcess] = useState(false)
    

    useEffect(()=>{
        GetFaceBookInsights(2, 4, 1619827733, "30 day", 8, responseHandler)
    }, [])

    const responseHandler = (msg, facebookInsights)=>{
        if(!msg){
            widget3 = {
                impressions: {
                    value: facebookInsights.pageImpressions,
                    ofTarget: 12
                },
                chartType: 'line',
                datasets: [
                    {
                        label: 'Impression',
                        data: [
                            67000,
                            54000,
                            82000,
                            57000,
                            72000,
                            57000,
                            87000,
                            72000,
                            89000,
                            98700,
                            112000,
                            136000,
                            110000,
                            149000,
                            98000
                        ],
                        fill: false
                    }
                ],
                labels: [
                    'Jan 1',
                    'Jan 2',
                    'Jan 3',
                    'Jan 4',
                    'Jan 5',
                    'Jan 6',
                    'Jan 7',
                    'Jan 8',
                    'Jan 9',
                    'Jan 10',
                    'Jan 11',
                    'Jan 12',
                    'Jan 13',
                    'Jan 14',
                    'Jan 15'
                ],
                options: {
                    spanGaps: false,
                    legend: {
                        display: false
                    },
                    maintainAspectRatio: false,
                    elements: {
                        point: {
                            radius: 2,
                            borderWidth: 1,
                            hoverRadius: 2,
                            hoverBorderWidth: 1
                        },
                        line: {
                            tension: 0
                        }
                    },
                    layout: {
                        padding: {
                            top: 24,
                            left: 16,
                            right: 16,
                            bottom: 16
                        }
                    },
                    scales: {
                        xAxes: [
                            {
                                display: false
                            }
                        ],
                        yAxes: [
                            {
                                display: false,
                                ticks: {}
                            }
                        ]
                    }
                }
            }
            // widget3.impressions.value = facebookInsights.pageImpressions
            // console.log(widget3)
            setInsightsProcess(true)
        }else{
            alert(msg)
        }
        
    }
    {console.log(widget3)}
    {console.log(insightsProcessed)}
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
                <AnalyticsDashboardApp widget3={widget3}/>
                :
                <AnalyticsDashboardApp widget3={null}/>

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