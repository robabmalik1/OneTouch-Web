import React from 'react';
import Nav from '../../../components/misc/Navigation/nav';
import clsx from 'clsx';
import { useSelector } from 'react-redux';

function Navigation(props) {
    const navigation = useSelector(({ fuse }) => fuse.navigation);

    return (
        <Nav className={clsx("navigation", props.className)} navigation={navigation} layout="vertical" dense={props.dense} />
    );
}

export default Navigation;
