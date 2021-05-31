import React, {useState} from 'react';
import {AppBar, Card, CardActions, CardContent, Grid, Toolbar, Typography} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import {loginCardsData} from "../auth/login/loginCardsData";
import {shallowEqual, useDispatch, useSelector} from "react-redux";
import axios from "axios";
import {setSocialAccount} from "../../../redux/ducks/auth/connections/connectionOps";

import FacebookInsight from "./insights/facebook_insights"
import InsightsModel from "./insights";

import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import LocalStore from "../../../layers/config/localStore";
import {loginInstagram} from "../../../redux/ducks/auth/login/loginOps";
const localStore = new LocalStore();

function NewProfile(props) {
    const [displayModal,setDisplayModal] = useState(false);
    const [insightDailogStatus, setInsightDailogStatus] = useState(false)
    const [accType,setAccType]=useState("")
    var username = "";
    var password = "";
    const dispatch = useDispatch();
//Redux Selector
    const {auth,team,loading,error, accounts} = useSelector(state=> ({
        auth: state.auth,
        team: state.currTeam.CurrentTeam,
        loading: state.currTeam.processingTeams,
        error: state.currTeam.CurrentTeamFailed,
        accounts: state.attached_accounts,
    }),shallowEqual);
    //Redux End



    const socialPlatformUrl = async (network) => {
        await axios.get(`${process.env.REACT_APP_USER_API_URL_HEROKU}/team/getProfileRedirectUrl?teamId=` + localStore.getCurrTeam() + "&network=" + network, {
            headers: {'x-access-token': localStore.getToken()}
        })
            .then((res) => {
                dispatch(setSocialAccount(network));
                console.log(res)
                if (network !== "Twitter") {
                    window.location.assign(res.data.navigateUrl);
                } else {
                    localStore.setTwitterState(res.data.state);
                    window.location.assign(res.data.redirectUrl);
                }
            })

    }

    const handleCallback = (param) => {
        switch (param) {
            case "IGB":
                setDisplayModal(true)
                break;
            case "Facebook":
            case "FacebookPage":
            case "InstagramBusiness":
            case "Twitter":
            case "Youtube":
            case "LinkedIn":
                socialPlatformUrl(param);
                break
            default:
                break
        }
    }

    const onChange = e => {
        // e.preventDefault();
        //setState({ [e.target.id]: e.target.value });
        if (e.target.id === "username") {
            username = e.target.value
        } else {
            password = e.target.value
        }
    };

    const onSubmit = e => {
        e.preventDefault();

        if (username === "" && password === "") {
            alert("Empty Fields")
            return;
        }

        const userData = {
            email: username,
            password: password,
            userId: auth.user._id,
        };

        dispatch(loginInstagram(userData)); // since we handle the redirect within our component, we don't need to pass in props.history as a parameter
        props.history.push("/publish");
    };

    const BeforeLogin = () => {
        return (
            <>
                <Dialog open={displayModal} onClose={() => setDisplayModal(false)} component="form">
                    <AppBar position="static">
                        <Toolbar>
                            <Typography variant="h5" color="inherit">
                                {/* {eventDialog.type === 'new' ? 'New Event' : 'Edit Event'} */}
                                {"Instagram Basic Login"}
                            </Typography>
                        </Toolbar>
                    </AppBar>
                    <Typography variant="subtitle1" className="p-4">
                        {"Basic Instagram requires username and password to be able to post."}
                    </Typography>
                    <DialogContent>
                        {/* className={classes.root} */}
                        <TextField
                            onChange={onChange}
                            margin="dense"
                            autoFocus
                            id="username"
                            type="username"
                            label="Username"
                            fullWidth
                        />

                        <TextField
                            onChange={onChange}
                            id="password"
                            type="password"
                            label="Password"
                            margin="dense"
                            fullWidth
                        />

                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setDisplayModal(false)} color="primary">
                            Cancel
                        </Button>
                        <Button type="submit" onClick={onSubmit} color="primary">
                            Login
                        </Button>
                    </DialogActions>
                </Dialog>

                <Grid container className={"connect-background-img connect-main"}>
                    <Grid item container className={"team-section"}  xl={12} lg={12} md={12}>

                            <Grid item container justify={"space-between"}>
                                {loginCardsData.map(
                                    (item, index) => {
                                        return (
                                            //setState(
                                            <Grid item container key={index} xl={4} lg={4} md={4}
                                                  onClick={() => handleCallback(item.state)} style={{padding: '2%'}}>
                                                <Card className={`${item.cName} `}
                                                      style={{width: '100%', padding: '15%'}}>
                                                    <Grid item container justify="center" md={12} lg={12}>
                                                        <Grid item md={12} lg={12}>
                                                            {item.icon}
                                                        </Grid>
                                                        <span
                                                            className={`${item.spanClass} ${accounts.instagram_basic.connected && item.spanClass.includes("Basic") ? "test" : ""}`}></span>
                                                        <p className="p-text-center">{item.title} </p>
                                                    </Grid>
                                                </Card>
                                            </Grid>
                                        )
                                    }
                                )}
                            </Grid>
                            {/*{props.accountAdded &&*/}
                            {/*props.accountAdded['teamSocialAccountDetails'].map((value,key)=>{*/}
                            {/*    return(*/}
                            {/*    value.map((team,index)=>{*/}
                            {/*        if(team['team_id']===team['teamSocialAccountDetails'][0]['team_id']){*/}

                            {/*            return(  <>*/}
                            {/*                    {!team['SocialAccount'].length==0?*/}
                            {/*                        <>*/}
                            {/*                            {team['SocialAccount'].map((account,ind)=>{*/}
                            {/*                                return(*/}
                            {/*                                    <>*/}
                            {/*                                        <Grid item  className={`p-12 ml-24`} md={12} lg={5}>*/}
                            {/*                                        <Card className={`card`} style={{ width: '100%', padding: '5%' }} >*/}
                            {/*                                {JSON.stringify(account)}*/}
                            {/*                                            <CardContent>*/}
                            {/*                                                <Typography className={`card-title`} color="textSecondary" gutterBottom>*/}
                            {/*                                                    {account["profileDetails"]["account_id"]==1 &&*/}
                            {/*                                                    "Facebook"*/}
                            {/*                                                    }*/}
                            {/*                                                </Typography>*/}
                            {/*                                                <h2 className={`-mt-3`} >{team['teamSocialAccountDetails'][0]['team_name']}</h2>*/}

                            {/*                                                <Typography className={`card-title`} color="textSecondary" gutterBottom>*/}
                            {/*                                                    Total Accounts Added*/}
                            {/*                                                </Typography>*/}
                            {/*                                                <h2 className={`-mt-3`}>{props.accountAdded['socialAccounts'].length}</h2>*/}

                            {/*                                            </CardContent>*/}
                            {/*                                            <CardActions>*/}
                            {/*                                                <Button size="medium" variant="contained" color="primary" >Change Team</Button>*/}
                            {/*                                            </CardActions>*/}
                            {/*                                        </Card>*/}
                            {/*                                        </Grid>*/}
                            {/*                                    </>*/}
                            {/*                                )*/}
                            {/*                            })}*/}

                            {/*                        </>*/}
                            {/*                        :*/}
                            {/*                        <h1>No Social Accounts Added</h1>*/}
                            {/*                    }*/}
                            {/*                </>*/}
                            {/*            )*/}
                            {/*        }*/}
                            {/*    }))*/}
                            {/*})*/}
                            {/*}*/}


                        }

                        {loading &&
                        <h1>Loading</h1>
                        }
                        {error &&
                        <h1>{error.error || error.message}</h1>
                        }

                        {/*<img src={connectSVG} style={{ width: '100%' }}></img>*/}
                    </Grid>

                    {/*    Connect to Social Media Accounts*/}

                </Grid>
            </>
        )
    };


    return (
        <>
        <BeforeLogin />
        </>
    );
}

export default NewProfile;