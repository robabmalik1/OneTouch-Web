import React, {useState} from 'react';
import {Checkbox, Icon, IconButton, Menu, MenuItem} from '@material-ui/core';
function Sidebar(props)
{

    const [menu, setMenu] = useState({
        selectMenu : null,
        foldersMenu: null,
        labelsMenu : null
    });

    function handleMenuOpen(event, menu)
    {
        setMenu({
            ...menu,
            [menu]: event.currentTarget
        });
    }

    function handleMenuClose(event, menu)
    {
        setMenu({
            ...menu,
            [menu]: null
        });
    }


    return (
        <div className="flex flex-1 items-center sm:px-8">


            <IconButton
                className="w-24"
                aria-label="More"
                aria-owns={menu.select ? 'select-menu' : null}
                aria-haspopup="true"
                onClick={(ev) => handleMenuOpen(ev, 'select')}
            >
                {/*<Icon>arrow_drop_down</Icon>*/}
            </IconButton>


            <Menu
                id="select-menu"
                anchorEl={menu.select}
                open={Boolean(menu.select)}
                onClose={(ev) => handleMenuClose(ev, 'select')}
            >


                {/*<MenuItem*/}
                {/*    onClick={(ev) => {*/}
                {/*        dispatch(Actions.selectMailsByParameter('read', false));*/}
                {/*        handleMenuClose(ev, 'select');*/}
                {/*    }}*/}
                {/*>*/}
                {/*    Unread*/}
                {/*</MenuItem>*/}




            </Menu>

            {/*{selectedMailIds.length > 0 && (*/}
            {/*    <React.Fragment>*/}

            {/*        <div className="border-r-1 h-48 w-1 mx-12 my-0"/>*/}

            {/*        <IconButton*/}
            {/*            onClick={(ev) => {*/}
            {/*                dispatch(Actions.setFolderOnSelectedMails(4))*/}
            {/*            }*/}
            {/*            }*/}
            {/*            aria-label="Delete"*/}
            {/*        >*/}
            {/*            <Icon>delete</Icon>*/}
            {/*        </IconButton>*/}

            {/*        <IconButton*/}
            {/*            aria-label="More"*/}
            {/*            aria-owns={menu.folders ? 'folders-menu' : null}*/}
            {/*            aria-haspopup="true"*/}
            {/*            onClick={(ev) => handleMenuOpen(ev, 'folders')}*/}
            {/*        >*/}
            {/*            <Icon>folder</Icon>*/}
            {/*        </IconButton>*/}

            {/*        <Menu*/}
            {/*            id="folders-menu"*/}
            {/*            anchorEl={menu.folders}*/}
            {/*            open={Boolean(menu.folders)}*/}
            {/*            onClose={(ev) => handleMenuClose(ev, 'folders')}*/}
            {/*        >*/}
            {/*            {folders.length > 0 && folders.map((folder) => (*/}
            {/*                <MenuItem*/}
            {/*                    onClick={(ev) => {*/}
            {/*                        dispatch(Actions.setFolderOnSelectedMails(folder.id));*/}
            {/*                        handleMenuClose(ev, 'folders')*/}
            {/*                    }}*/}
            {/*                    key={folder.id}*/}
            {/*                >*/}
            {/*                    {folder.title}*/}
            {/*                </MenuItem>*/}
            {/*            ))}*/}
            {/*        </Menu>*/}

            {/*        <IconButton*/}
            {/*            aria-label="More"*/}
            {/*            aria-owns={menu.labels ? 'labels-menu' : null}*/}
            {/*            aria-haspopup="true"*/}
            {/*            onClick={(ev) => handleMenuOpen(ev, 'labels')}*/}
            {/*        >*/}
            {/*            <Icon>label</Icon>*/}
            {/*        </IconButton>*/}

            {/*    </React.Fragment>*/}
            {/*)}*/}
        </div>
    );
}

export default Sidebar;
