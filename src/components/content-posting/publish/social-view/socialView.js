import React from 'react';
// import { Avatar, Button, Tab, Tabs, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
// import Animate from '../../../misc/animation/animate';
import PageSimple from '../../../misc/page/simple';
// FusePageSimple,
import Preview from './tabs/Preview';

const useStyles = makeStyles(theme => ({
    layoutHeader: {
        height: 320,
        minHeight: 320,
        [theme.breakpoints.down('md')]: {
            height: 240,
            minHeight: 240
        }
    }
}));

function ProfilePage(props) {
    const classes = useStyles();

    return (
        // 
        <PageSimple
            classes={{
                header: classes.layoutHeader,
                toolbar: ""
                // px-16 sm:px-24
            }}

            content={
                <Preview caption={props.caption} img={props.img} selectedAccounts={props.selectedAccounts} />
            }
        />
    )
}

export default ProfilePage;