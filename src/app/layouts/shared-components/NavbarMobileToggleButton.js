import React from 'react';
import { Icon, IconButton } from '@material-ui/core';
import * as Actions from 'app/store/actions';
import { useDispatch } from 'react-redux';

function NavbarMobileToggleButton(props) {
    const dispatch = useDispatch();

    return (
        <IconButton className={props.className} onClick={ev => dispatch(Actions.navbarToggleMobile())} color="inherit" disableRipple>
            {props.children}
        </IconButton>
    );
}

NavbarMobileToggleButton.defaultProps = {
    children: <Icon>push_pin</Icon>
};

export default NavbarMobileToggleButton;
