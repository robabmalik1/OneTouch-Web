import React, { useState } from 'react';
import { AppBar, Avatar, Typography, Icon, ListItemIcon, ListItemText, Popover, MenuItem } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import {useDispatch, useSelector} from 'react-redux';
import clsx from 'clsx';

import { Link } from 'react-router-dom';
import {logoutUser} from "../../../redux/ducks/auth/login/loginOps";

const useStyles = makeStyles(theme => ({
    root: {
        '&.user': {
            '& .username, & .email': {
                transition: theme.transitions.create('opacity', {
                    duration: theme.transitions.duration.shortest,
                    easing: theme.transitions.easing.easeInOut
                })
            }
        }
    },
    avatar: {
        width: 72,
        height: 72,
        position: 'absolute',
        top: 22,
        padding: 3,
        background: theme.palette.background.default,
        boxSizing: 'content-box',
        left: '50%',
        transform: 'translateX(-50%)',
        transition: theme.transitions.create('all', {
            duration: theme.transitions.duration.shortest,
            easing: theme.transitions.easing.easeInOut,
        }),
        '& > img': {
            borderRadius: '50%'
        }
    }
}));

function UserNavbarHeader(props) {

    const userData = useSelector(({ auth }) => auth.user);

    const [userMenu, setUserMenu] = useState(null);
    const dispatch = new useDispatch();

    const userMenuClick = event => {
        setUserMenu(event.currentTarget);
    };

    const userMenuClose = () => {
        setUserMenu(null);
    };



    const classes = useStyles();

    return (
        <>
            <AppBar
                position="static"
                color="primary"
                elevation={0}
                classes={{ root: classes.root }}
                className="user relative flex flex-col items-center justify-center pt-15 pb-32 mb-32 z-0"
            >
                <Typography className="username text-12 whitespace-no-wrap" color="inherit">{userData.first_name + " "+ userData.last_name}</Typography>

                <Avatar
                    className={clsx(classes.avatar, "avatar")}
                    alt="user photo"
                    src={userData.profile_picture}
                    onClick={userMenuClick}
                />

            </AppBar>

            <Popover
                open={Boolean(userMenu)}
                anchorEl={userMenu}
                onClose={userMenuClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center'
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center'
                }}
                classes={{
                    paper: "py-8"
                }}
            >
                {!userData.is_admin_user ? (
                    <React.Fragment>
                        <MenuItem onClick={()=>{dispatch(logoutUser())}}>
                            <ListItemIcon className="min-w-40">
                                <Icon>lock</Icon>
                            </ListItemIcon>
                            <ListItemText className="pl-0" primary="Logout" />
                        </MenuItem>
                    </React.Fragment>
                ) : (
                        <React.Fragment>
                            <MenuItem component={Link} to="/pages/profile" onClick={userMenuClose}>
                                <ListItemIcon className="min-w-40">
                                    <Icon>account_circle</Icon>
                                </ListItemIcon>
                                <ListItemText className="pl-0" primary="My Profile" />
                            </MenuItem>
                            <MenuItem component={Link} to="/apps/mail" onClick={userMenuClose}>
                                <ListItemIcon className="min-w-40">
                                    <Icon>mail</Icon>
                                </ListItemIcon>
                                <ListItemText className="pl-0" primary="Inbox" />
                            </MenuItem>
                            <MenuItem
                                onClick={() => {
                                    // dispatch(authActions.logoutUser());
                                    userMenuClose();
                                }}
                            >
                                <ListItemIcon className="min-w-40">
                                    <Icon>exit_to_app</Icon>
                                </ListItemIcon>
                                <ListItemText className="pl-0" primary="Logout" />
                            </MenuItem>
                        </React.Fragment>
                    )}
            </Popover>

        </>
    );
}

export default UserNavbarHeader;
