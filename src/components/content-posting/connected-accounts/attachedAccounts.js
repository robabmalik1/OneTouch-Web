import React, {useState} from 'react'
// import PropTypes from "prop-types";
import {useSelector} from "react-redux";
// import { actions } from "../../../redux/ducks/attachedAccounts/attachedAccountsDuck";
import "../../../styles/css/account.css";
import {
    Card,
    AppBar,
    Toolbar,
    Typography,
    CardContent,
    // Grid,
    // List,
    Divider,
    ListItem,
    ListItemAvatar, Avatar, ListItemText, ListItemSecondaryAction, ListItemIcon
} from '@material-ui/core';

// import { allAttachedAccounts } from "../../../layers/utils/attachedAccounts";
import Checkbox from '@material-ui/core/Checkbox';
// import FormGroup from '@material-ui/core/FormGroup';
// import FormControlLabel from '@material-ui/core/FormControlLabel';
// import FormControl from '@material-ui/core/FormControl';
// import { Instagram } from '@material-ui/icons';
// import ListSubheader from "@material-ui/core/ListSubheader";
// import IconButton from "@material-ui/core/IconButton";
const accounts =[

]

Array.prototype.remove = function() {
    var what, a = arguments, L = a.length, ax;
    while (L && this.length) {
        what = a[--L];
        while ((ax = this.indexOf(what)) !== -1) {
            this.splice(ax, 1);
        }
    }
    return this;
};
const Accounts = []

export default function AttachedAccounts(props){


    const handleToggle = (value, status) =>{
        console.log("STATUS: ",status);
        console.log("VALUE: ",value);
        if(status){
            // for(let index =0; index < Accounts.length; index++){
            //     if(Accounts[index].value == value){
            //         Accounts[index].selected = true
            let temp = Accounts.indexOf(value.toString());
            console.log(temp)
            if(temp==-1){
                Accounts.push(value.toString());
            }

            // Accounts.push(value);
                // }
            // }
        }
        else{
            let temp = Accounts.indexOf(value.toString());
            console.log(temp)
            if(temp!=-1){
                // Accounts[temp]="";
                Accounts.remove(value.toString());
                // Accounts.push(value);
            }
            // for(let index =0; index < Accounts.length; index++){
            //     if(Accounts[index].value == value  ){
            //         // Accounts[index].selected = false
            //         Accounts.remove(value)
            //     }
            // }
        }
        console.log(Accounts)
        props.onSelectAccount(Accounts)
        // return Accounts;

    }

    const [selectedAccount,setSelectedAccount]=useState('');

    const currTeam = useSelector(state => state.currTeam.CurrentTeam);
    const loading = useSelector(state => state.currTeam.processingTeams);
    const error = useSelector(state => state.currTeam.CurrentTeamFailed);

        return (
            <>
                {/*{profilesLinked()}*/}
                <Card className="w-full max-h-screen h-4/5 mt-24">
                    <AppBar position="static" elevation={0}>
                        <Toolbar className="pl-16 pr-8">
                            <Typography variant="title" color="inherit" className="flex-1">
                                Select Social Profiles
                                </Typography>

                        </Toolbar>
                    </AppBar>
                    <CardContent className="p-2">
                        {currTeam &&
                        currTeam["teamSocialAccountDetails"][0]['SocialAccount'].map((profile,key)=>{
                            return(
                                <>

                                    <Divider />
                                    <ListItem id={profile["account_id"]} onClick={()=>{
                                    }}>
                                        <ListItemIcon className={`list-root`}>
                                            <Checkbox
                                                edge="start"
                                                onChange={(e)=>handleToggle(profile["account_id"], e.target.checked)}
                                                tabIndex={-1}
                                                // checked={}
                                                value={profile["account_id"]}
                                                key={key}
                                                // disableRipple
                                                // inputProps={{ 'aria-labelledby': labelId }}
                                            />
                                        </ListItemIcon>
                                        <ListItemAvatar>
                                            <Avatar src={profile["profile_pic_url"]} />
                                        </ListItemAvatar>
                                        <ListItemText
                                            primary={profile["first_name"] + " "+profile["last_name"]}
                                            // secondary={team["SocialAccount"].length + " Accounts"}
                                        />
                                    </ListItem>

                                </>

                            )
                        })
                        }

                        {/*<FormControl component="fieldset">*/}
                        {/*    <FormGroup aria-label="position" row>*/}
                        {/*        {currTeam && (currTeam.map((account, index) => (*/}
                        {/*            <FormControlLabel*/}
                        {/*                key={index}*/}
                        {/*                value={account.name}*/}
                        {/*                className="p-12"*/}
                        {/*                control={<Checkbox color="primary" value={account.name} onChange={this.handleAccountChange} checked={this.state.selectedCategories.some((item) => item.key === account.key)} checkedIcon={<Instagram />} />}*/}
                        {/*                label={<Typography className="inline font-large" variant="h5" color="primary">*/}
                        {/*                    {account.name}*/}
                        {/*                </Typography>}*/}
                        {/*                labelPlacement="end"*/}
                        {/*            />*/}
                        {/*        )))}*/}
                        {/*    </FormGroup>*/}
                        {/*</FormControl>*/}

                    </CardContent>
                </Card >

            </>
        )
}

