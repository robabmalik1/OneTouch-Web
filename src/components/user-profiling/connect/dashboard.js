import React, {useEffect, useState} from 'react';
import {AppBar, Avatar, Card, CardActions, CardContent, Grid, List, Toolbar, Typography} from '@material-ui/core';
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

function Dashboard(props)
{

    var username = "";
    var password = "";
    const dispatch = useDispatch();


    const localStore = new LocalStore();
    const [accType,setAccType]=useState("")

    const {auth,team,loading,error, accounts} = useSelector(state=> ({
        auth: state.auth,
        team: state.currTeam.CurrentTeam,
        loading: state.currTeam.processingTeams,
        error: state.currTeam.CurrentTeamFailed,
        accounts: state.attached_accounts,
    }),shallowEqual);
    const [insightDailogStatus, setInsightDailogStatus] = useState(false)




    return (
        <>
            {/*team-section */}
            <Grid item container className={"connect-background-img connect-main p-16"}   xl={12} lg={12} md={12} sm={12}>
                {/* <img src={logo} width={100}></img> */}

                <Grid item container className={"team-section p-16"} justify={"space-between"} direction="row" xl={12} lg={12} md={12}>
                {team && team["teamSocialAccountDetails"][0]["SocialAccount"].map((value, key) => {
                    return (
                        <>
                            <Grid item md={12} key={key} lg={3} style={{margin: 5}}>
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
                                                        pathname: "Feed/Timeline",
                                                        state: {
                                                            accountId: value["account_id"],
                                                            socialId: value["social_id"],
                                                            accountType: value["account_type"],
                                                            currTeam: localStore.getCurrTeam()
                                                        }

                                                    });
                                                }}>View Feeds</Button>
                                        <Button size="medium" variant="contained" color="primary">Remove
                                            Account</Button>
                                        <Button size="medium" variant="contained" color="primary">Lock this
                                            profile</Button>
                                        <Button size="medium" variant="contained" color="primary" onClick={()=> {setAccType(value["account_type"]);setInsightDailogStatus(true);}}>
                                            View Insights</Button>
                                    </CardActions>
                                </Card>

                            </Grid>
                        </>
                    )
                })}

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
