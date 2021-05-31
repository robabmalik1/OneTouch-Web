import React, { Component } from 'react';
import { Typography } from '@material-ui/core';
// import {Animate} from '@fuse';
import Animate from '../misc/animation/animate';
//import {useDispatch, useSelector} from 'react-redux';
import Widget1 from './widgets/Widget1';
import Widget2 from './widgets/Widget2';
import Widget3 from './widgets/Widget3';
import Widget4 from './widgets/Widget4';
import Widget5 from './widgets/Widget5';
import { widgets } from './state'

function AnalyticsDashboardApp (props) {
        return (
            <>
                <div className="w-full">

                    <Widget1 data={widgets.data.widget1} />

                    <Animate animation="transition.slideUpIn" delay={200}>

                        <div className="flex flex-col md:flex-row sm:p-8 container">

                            <div className="flex flex-1 flex-col min-w-0">

                                <Animate delay={600}>
                                    <Typography className="p-16 pb-8 text-18 font-300">
                                        How are your active users trending over time?
                                </Typography>
                                </Animate>

                                <div className="flex flex-col sm:flex sm:flex-row pb-32">

                                    <div className="widget flex w-full sm:w-1/3 p-16">
                                        <Widget2 data={props.widget.data.widget2} type={props.type} />
                                    </div>

                                    <div className="widget flex w-full sm:w-1/3 p-16">

                                        <Widget3 data={props.widget.data.widget3} type={props.type}/>
                                    </div>

                                    <div className="widget w-full sm:w-1/3 p-16">
                                        <Widget4 data={props.widget.data.widget4} type={props.type} />
                                    </div>
                                </div>

                                <Animate delay={600}>
                                    <Typography className="px-16 pb-8 text-18 font-300">
                                        How many pages your users visit?
                                </Typography>
                                </Animate>

                                <div className="widget w-full p-16 pb-32">
                                    <Widget5 data={widgets.data.widget5} />
                                </div>

                            </div>
                        </div>
                    </Animate>
                </div>
            </>
        )

}

export default AnalyticsDashboardApp;
