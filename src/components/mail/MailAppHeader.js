import React from 'react';
import {Hidden, Icon, IconButton, Input, Paper} from '@material-ui/core';
import {ThemeProvider} from '@material-ui/styles';
import {useDispatch, useSelector} from 'react-redux';
import * as Actions from './store/actions';

function MailAppHeader(props)
{
    const dispatch = useDispatch();
    const searchText = useSelector(({mailApp}) => mailApp.mails.searchText);
    const mainTheme = useSelector(({fuse}) => fuse.settings.mainTheme);

    return (
        <ThemeProvider theme={mainTheme}>
            <div className="flex flex-1">
                <Paper className="flex items-center w-full h-36 sm:h-56 p-8 pl-4 md:pl-16 rounded-8 " elevation={1}>
                    <Hidden lgUp>
                        <IconButton
                            onClick={(ev) => props.pageLayout.current.toggleLeftSidebar()}
                            aria-label="open left sidebar"
                        >
                            <Icon>menu</Icon>
                        </IconButton>
                    </Hidden>

                    <Icon color="action">search</Icon>

                    <Input
                        placeholder="Search"
                        className="pl-16"
                        disableUnderline
                        fullWidth
                        value={searchText}
                        inputProps={{
                            'aria-label': 'Search'
                        }}
                        onChange={ev => dispatch(Actions.setSearchText(ev))}
                    />
                </Paper>
            </div>
        </ThemeProvider>
    );
}

export default MailAppHeader;
