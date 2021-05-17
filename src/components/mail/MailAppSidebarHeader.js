import React, {useState} from 'react';
import {Icon, MenuItem, TextField} from '@material-ui/core';
import Animate from '../misc/animation/animate';

const accounts = {
    'creapond'    : 'johndoe@creapond.com',
    'withinpixels': 'johndoe@withinpixels.com'
};

function MailAppSidebarHeader(props)
{
    const [selectedAccount, setSelectedCount] = useState('creapond');

    function handleAccountChange(ev)
    {
        setSelectedCount(ev.target.value);
    }

    return (
        <div className="flex flex-col justify-center h-full p-8">

            <div className="flex items-center flex-1">
                <Animate animation="transition.expandIn" delay={300}>
                    <Icon className="mr-16 text-32">mail</Icon>
                </Animate>
                <Animate animation="transition.slideLeftIn" delay={300}>
                    <span className="text-24">Mailbox</span>
                </Animate>
            </div>

            {/*<Animate animation="transition.slideUpIn" delay={300}>*/}
            {/*    <TextField*/}
            {/*        id="account-selection"*/}
            {/*        select*/}
            {/*        label={selectedAccount}*/}
            {/*        value={selectedAccount}*/}
            {/*        onChange={handleAccountChange}*/}
            {/*        placeholder="Select Account"*/}
            {/*        margin="normal"*/}
            {/*    >*/}
            {/*        {Object.keys(accounts).map((key, value) => (*/}
            {/*            <MenuItem key={key} value={key}>*/}
            {/*                {accounts[key]}*/}
            {/*            </MenuItem>*/}
            {/*        ))}*/}
            {/*    </TextField>*/}
            {/*</Animate>*/}
        </div>
    );
}

export default MailAppSidebarHeader;
