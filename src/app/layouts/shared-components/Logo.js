import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import otlogo from "../../../assets/otlogo.svg";

const useStyles = makeStyles(theme => ({
    root: {
        '& .logo-icon': {
            width: 94, height: 94,
            transition: theme.transitions.create(['width', 'height'], {
                duration: theme.transitions.duration.shortest,
                easing: theme.transitions.easing.easeInOut
            })
        },
        '& .react-badge, & .logo-text': {
            transition: theme.transitions.create('opacity', {
                duration: theme.transitions.duration.shortest,
                easing: theme.transitions.easing.easeInOut
            })
        }
    },
    reactBadge: {
        backgroundColor: 'rgba(0,0,0,0.6)',
        color: '#61DAFB'
    }
}));

function Logo() {
    const classes = useStyles();

    return (
        <div className={clsx(classes.root, "flex items-center")}>
            <img className="-ml-24 w-[calc(100%+2rem)]"  src={otlogo} alt="onetouchlogo" />
            <div className={clsx(classes.reactBadge, "react-badge flex items-center ml-12 mr-8 py-4 px-8 rounded")}>
                <span className="react-text text-12 ml-4">One Touch</span>
            </div>
        </div>
    );
}

export default Logo;
