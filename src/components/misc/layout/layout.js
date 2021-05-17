/* global gapi */
import React, {useEffect} from 'react';

import {connect, useDispatch, useSelector} from "react-redux";

import {getTeamDetails} from "../../../redux/ducks/teams/getDetails/getTeamsOps";

import clsx from "clsx";
import NavbarWrapperLayout1 from "../../../app/layouts/layout1/components/NavbarWrapperLayout1";
import Scrollbars from "../scrollbars/scrollbars";
import Message from "../message/message";
import {makeStyles} from "@material-ui/styles";
import {loadGapi} from "../../mail/store/actions/gapiLoadingActionCreators";



export default function Layout(props) {
    const config = useSelector(({ fuse }) => fuse.settings.defaults.layout.config);

    const classes = useStyles(props);
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(getTeamDetails());
        dispatch(loadGapi());
    },[])

    return (
        <>

            <div id="fuse-layout" className={clsx(classes.root, config.mode, ' fullwidth scroll-content')}>

                < div className="flex flex-1 flex-col overflow-hidden relative" >
                    < div className={classes.wrapper} >
                        <NavbarWrapperLayout1 />

                        < div className={classes.contentWrapper} >

                            < Scrollbars className={classes.content} scrollToTopOnChildChange >
                                {props.children}
                            </Scrollbars >

                        </div >
                    </div >

                </div >

                < Message />
            </div >

        </>
    );
}


const useStyles = makeStyles(theme => ({
    root: {
        position: 'relative',
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        backgroundColor: theme.palette.background.default,
        color: theme.palette.text.primary,
        '&.boxed': {
            maxWidth: 1280,
            margin: '0 auto',
            boxShadow: theme.shadows[3]
        },
        '&.scroll-body': {
            '& $wrapper': {
                height: 'auto',
                flex: '0 0 auto',
                overflow: 'auto'
            },
            '& $contentWrapper': {},
            '& $content': {}
        },
        '&.scroll-content': {
            '& $wrapper': {},
            '& $contentWrapper': {},
            '& $content': {}
        },
        '& .navigation': {
            '& .list-subheader-text, & .list-item-text, & .item-badge, & .arrow-icon': {
                transition: theme.transitions.create('opacity', {
                    duration: theme.transitions.duration.shortest,
                    easing: theme.transitions.easing.easeInOut
                })
            },
        }
    },
    wrapper: {
        display: 'flex',
        position: 'relative',
        width: '100%',
        height: '100%',
        flex: '1 1 auto',
    },
    contentWrapper: {
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        zIndex: 3,
        overflow: 'hidden',
        flex: '1 1 auto'
    },
    content: {
        position: 'relative',
        display: 'flex',
        overflow: 'auto',
        flex: '1 1 auto',
        flexDirection: 'column',
        width: '100%',
        '-webkit-overflow-scrolling': 'touch',
        zIndex: 2
    }
}));
