import React from 'react';
import {Icon, List, ListItem, ListItemText, ListSubheader} from '@material-ui/core';
import {makeStyles} from '@material-ui/styles';
import NavLinkAdapter from '../../misc/NavLinkAdapter/NavLinkAdapter';
import Animate from '../../misc/animation/animate';
import {useSelector} from 'react-redux';
const useStyles = makeStyles(theme => ({
    listItem: {
        color              : 'inherit!important',
        textDecoration     : 'none!important',
        height             : 40,
        width              : 'calc(100% - 16px)',
        borderRadius       : '0 20px 20px 0',
        paddingLeft        : 24,
        paddingRight       : 12,
        '&.active'         : {
            backgroundColor    : '#262933 !important',
            color              : theme.palette.secondary.main + '!important',
            pointerEvents      : 'none',
            '& .list-item-icon': {
                color: 'inherit'
            }
        },
        '& .list-item-icon': {
            fontSize   : 16,
            width      : 16,
            height     : 16,
            marginRight: 16
        }
    }
}));

function SidebarContent(props)
{
    const folders = [{
        title: "Connected Profiles",
        handle: "Dashboard"
    },
        {
            title: "Add new profiles",
            handle: "Add"
        }
    ]
    const classes = useStyles();

    return (
        <Animate animation="transition.slideUpIn" delay={400}>

            <div className="flex-auto border-l-1">

                <div>

                    <List>
                        <ListSubheader className={classes.listSubheader} disableSticky>Options</ListSubheader>

                        {folders.length > 0 && folders.map((folder,index) => (
                            <ListItem
                                button
                                component={NavLinkAdapter}
                                to={'/Connect/' + folder.handle} key={index}
                                activeClassName="active"
                                className={classes.listItem}
                            >
                                {/*<Icon className="list-item-icon" color="action">{folder.icon}</Icon>*/}
                                <ListItemText primary={folder.title} disableTypography={true}/>
                            </ListItem>
                        ))}
                    </List>

                    {/*<List>*/}

                    {/*    <ListSubheader className={classes.listSubheader} disableSticky>FILTERS</ListSubheader>*/}

                    {/*</List>*/}

                    <List>

                        {/*<ListSubheader className="pr-24 pl-24" disableSticky>LABELS</ListSubheader>*/}


                    </List>
                </div>
            </div>
        </Animate>
    );
}

export default SidebarContent;
