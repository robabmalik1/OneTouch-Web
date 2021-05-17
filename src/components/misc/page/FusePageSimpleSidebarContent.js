import React from 'react';
import { ThemeProvider } from '@material-ui/styles';
import Scrollbars from '../scrollbars/scrollbars';
import clsx from 'clsx';
import { useSelector } from 'react-redux';

function FusePageSimpleSidebarContent(props) {
    const mainThemeDark = useSelector(({ fuse }) => fuse.settings.mainThemeDark);

    const classes = props.classes;

    return (
        <Scrollbars enable={props.innerScroll}>
            {props.header && (
                <ThemeProvider theme={mainThemeDark}>
                    <div className={clsx(classes.sidebarHeader, props.variant, props.sidebarInner && classes.sidebarHeaderInnerSidebar)}>
                        {props.header}
                    </div>
                </ThemeProvider>
            )}

            {props.content && (
                <div className={classes.sidebarContent}>
                    {props.content}
                </div>
            )}
        </Scrollbars>
    );
}

export default FusePageSimpleSidebarContent;
