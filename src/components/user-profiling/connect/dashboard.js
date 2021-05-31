import React, {useEffect, useState} from 'react';
import {
    AppBar,
    Avatar,
    Card,
    CardActions,
    CardContent, DialogContentText,
    DialogTitle,
    Grid,
    List,
    Toolbar,
    Typography
} from '@material-ui/core';
import Animate from '../../misc/animation/animate';
import AnimateGroup from '../../misc/animateGroup/animateGroup';
import FuseUtils from '../../misc/FuseUtils';
import {withRouter} from 'react-router-dom';
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import TextField from "@material-ui/core/TextField";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import {shallowEqual, useDispatch, useSelector} from "react-redux";
import {loginInstagram} from "../../../redux/ducks/auth/login/loginOps";
import LocalStore from "../../../layers/config/localStore";
import InsightsModel from "./insights";
import axios from "axios";
import {getTeamDetails} from "../../../redux/ducks/teams/getDetails/getTeamsOps";

function Dashboard(props)
{

    var username = "";
    var password = "";
    const dispatch = useDispatch();
    const [open,setOpen]=useState(false);

    const localStore = new LocalStore();
    const [accType,setAccType]=useState("")
    const [id,setId]=useState(null);
    const {auth,team,loading,error, accounts} = useSelector(state=> ({
        auth: state.auth,
        team: state.currTeam.CurrentTeam,
        loading: state.currTeam.processingTeams,
        error: state.currTeam.CurrentTeamFailed,
        accounts: state.attached_accounts,
    }),shallowEqual);
    const [insightDailogStatus, setInsightDailogStatus] = useState(false)


    const delAccount = (accountId)=>{
        // setOpen(true)
        axios.delete(`${process.env.REACT_APP_USER_API_URL_HEROKU}/team/deleteSocialProfile?TeamId=`+localStore.getCurrTeam()+"&AccountId="+accountId,{
            headers: {'x-access-token': localStore.getToken()}
        })
            .then((res)=>{
                console.log(res)
                dispatch(getTeamDetails())
                setId(null);
                setOpen(false);
            })



    }

    return (
        <>
            <Grid item className={`p-12 ml-24`} md={12} lg={12}>
            {/*team-section */}
            <Grid item container className={"connect-background-img connect-main p-16"} alignItems={"flex-start"}  xl={12} lg={12} md={12} sm={12}>
                {/* <img src={logo} width={100}></img> */}
                {team &&
                <>
                    <Card className={`card`} style={{width: '235px', padding: '2%'}}>
                        <CardContent>
                            <Typography className={`card-title`} color="textSecondary" gutterBottom>
                                Team
                            </Typography>
                            <h2 className={`-mt-3`}>{team['teamSocialAccountDetails'][0]['team_name']}</h2>

                            <Typography className={`card-title`} color="textSecondary" gutterBottom>
                                Total Accounts Added
                            </Typography>
                            <h2 className={`-mt-3`}>{team['teamSocialAccountDetails'][0]['SocialAccount'].length}</h2>

                        </CardContent>
                        <CardActions>
                            <Button size="medium" onClick={() => {
                                props.history.push("/Teams/Details")
                            }} variant="contained" color="primary">Manage Teams</Button>
                        </CardActions>
                    </Card>

                </>
                }
            </Grid>
                <Grid item container spacing={2} className={"team-section "} justify={"center"} alignItems={"center"} direction="row" xl={12} lg={12} md={12}>
                {team && team["teamSocialAccountDetails"][0]["SocialAccount"].map((value, key) => {
                    return (
                        <>
                            <Grid item md={12} key={key} lg={4} >
                                <Card className={`card`} style={{width: '100%'}}>
                                    <CardContent>
                                        <Avatar src={value["profile_pic_url"]}/>
                                        <Typography className={`card-title`} color="textSecondary" gutterBottom>
                                            {value["account_type"] === 1 && "Facebook"}
                                            {value["account_type"] === 2 && "Facebook Page"}
                                            {value["account_type"] === 3 && "Facebook Group"}
                                            {value["account_type"] === 4 && "Twitter"}
                                            {value["account_type"] === 6 && "LinkedIn"}
                                            {value["account_type"] === 9 && "Youtube"}
                                            {value["account_type"] === 12 && "Instagram Business"}

                                        </Typography>
                                        <h2 className={`-mt-3`}>{value['first_name'] + " " + value['last_name']}</h2>

                                        {/*<Typography className={`card-title`} color="textSecondary" gutterBottom>*/}
                                        {/*    Email*/}
                                        {/*</Typography>*/}
                                        {/*<h2 className={`-mt-3`}>{value['email']}</h2>*/}

                                    </CardContent>
                                    <CardActions>
                                        <Button size="medium" variant="contained" color="primary"
                                                onClick={() => {
                                                    // {
                                                    //     (value["account_id"] === 1 || value["account_id"]===2 || value["account_id"]===3 ) &&
                                                    //     props.getFacebookFeeds(localStore.getCurrTeam(), value["social_id"], value["account_type"]);
                                                    // }
                                                    // {
                                                    //     (value["account_id"] === 12 ) &&
                                                    //     getInstagramBusinessFeeds(localStore.getCurrTeam(), value["social_id"]);
                                                    // }

                                                    // <Feed accountId={value["account_id"]} socialId={value["social_id"]} accountType={value["account_type"]}  currTeam={localStore.getCurrTeam()} />
                                                    props.history.push({
                                                        pathname: "/Feed/Timeline",
                                                        state: {
                                                            accountId: value["account_id"],
                                                            socialId: value["social_id"],
                                                            accountType: value["account_type"],
                                                            currTeam: localStore.getCurrTeam(),
                                                            dp: value["profile_pic_url"],
                                                            name: value["first_name"]+" "+value["last_name"]
                                                        }

                                                    });
                                                }}>View Feeds</Button>
                                        <Button size="medium" variant="contained" onClick={()=>{setId(value["account_id"]);setOpen(true);}} color="primary">Remove
                                            Account</Button>
                                        {!value.join_table_teams_social_accounts.is_account_locked &&
                                        <Button size="medium" variant="contained" color="primary">Lock
                                            profile</Button>
                                        }
                                        {value.join_table_teams_social_accounts.is_account_locked &&
                                        <Button size="medium" variant="contained" color="primary">Unlock
                                            profile</Button>
                                        }
                                        <Button size="medium" variant="contained" color="primary" onClick={()=> {setAccType(value["account_type"]);setInsightDailogStatus(true);}}>
                                            View Insights</Button>
                                    </CardActions>
                                </Card>

                            </Grid>


                            <Dialog
                                open={open}
                                onClose={()=>setOpen(false)}
                                aria-labelledby="responsive-dialog-title"
                            >
                                <DialogTitle id="responsive-dialog-title">{"Remove Account?"}</DialogTitle>

                                <DialogActions>
                                    <Button autoFocus onClick={()=>setOpen(false)} color="primary">
                                        Cancel
                                    </Button>
                                    <Button onClick={()=>{
                                        delAccount(id);
                                    }} color="primary" autoFocus>
                                        Confirm
                                    </Button>
                                </DialogActions>
                            </Dialog>


                        </>
                    )

                })}
                    {team && team["teamSocialAccountDetails"][0]["SocialAccount"].length==0?
                        <>
                        <h1 className={"h-screen"}>No Accounts Added</h1>
                        </>:<></>

                    }

                </Grid>
                {/* {
                                        switch (item) {
                                            case 1:
                                                // do something
                                                break;
                                            case 2:
                                                // do something
                                                break;
                                            case 3:
                                                // do something
                                                break;
                                        }
                                    }); */}


                {/*<Grid item container justify="center">*/}
                {/*    <Grid item>*/}
                {/*        <Button>Connect</Button>*/}
                {/*    </Grid>*/}
                {/*</Grid>*/}


                {/*<div className="p-sm-12 p-md-12 p-lg-12 p-grid p-justify-center">*/}
                {/*    */}
                {/*</div>*/}
            </Grid>
            <InsightsModel status={insightDailogStatus} closeInsightModal={setInsightDailogStatus} account_type={accType} />

            {/*<List className="p-0">*/}
            {/*    <AnimateGroup*/}
            {/*        enter={{*/}
            {/*            animation: "transition.slideUpBigIn"*/}
            {/*        }}*/}
            {/*    >*/}

            {/*    </AnimateGroup>*/}
            {/*</List>*/}
        </>
    );
}

export default withRouter(Dashboard);
