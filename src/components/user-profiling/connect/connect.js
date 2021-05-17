import React, { useState} from "react";
import { shallowEqual, useDispatch, useSelector} from "react-redux";
import {Card, Grid, Typography, AppBar, Toolbar, CardContent, CardActions, Avatar} from '@material-ui/core';
import { loginCardsData } from "../auth/login/loginCardsData";
import { loginInstagram } from "../../../redux/ducks/auth/login/loginOps";

// Instagram Login Dialog
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import "../../../styles/css/connect.css"
import LocalStore from "../../../layers/config/localStore";
import axios from "axios";
import {setSocialAccount} from "../../../redux/ducks/auth/connections/connectionOps";
const localStore = new LocalStore();

export default function Connect(props) {
    // const [errors, setErrors] = useState({});
    // const [addClass, setAddClass] = useState(true);
    // const [loading,setLoading]=useState(null);
    // const [buttonText, setButtonText] = useState("Register");
    const [displayModal,setDisplayModal] = useState(false);
    var username = "";
    var password = "";
    const dispatch = useDispatch();

    // const onLogoutClick = e => {
    //     e.preventDefault();
    //     dispatch(logoutUser());
    // };



//Redux Selector
    const {auth,team,loading,error, accounts} = useSelector(state=> ({
        auth: state.auth,
        team: state.currTeam.CurrentTeam,
        loading: state.currTeam.processingTeams,
        error: state.currTeam.CurrentTeamFailed,
        accounts: state.attached_accounts,
    }),shallowEqual);
    //Redux End

    const onChange = e => {
        // e.preventDefault();
        //setState({ [e.target.id]: e.target.value });
        if (e.target.id === "username") {
            username = e.target.value
        } else {
            password = e.target.value
        }
    };

    const socialPlatformUrl = async (network) => {
        await axios.get("http://localhost:5000/team/getProfileRedirectUrl?teamId=" + localStore.getCurrTeam() + "&network=" + network, {
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


    // const { user } = props.auth;
    // const { errors } = state;


    const IgDialog = () => {
        return (
            <div className="w-full">
                {/* onChange={onChange} */}

            </div>
        )
    }

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


                <Grid container className={"connect-background-img connect-main "}>
                    <Grid item container className={"team-section"} direction="row" xl={6} lg={6} md={6}>
                        {team &&
                        <>
                            <Grid item className={`p-12 ml-24`} md={12} lg={12}>
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


                            </Grid>
                            <Grid item lg={12} align="center">
                                <Typography variant="h4" color="secondary">
                                    Add Your Profiles
                                </Typography>
                            </Grid>
                            <Grid item container>
                                {loginCardsData.map(
                                    (item, index) => {
                                        return (
                                            //setState(
                                            <Grid item container key={index} xl={4} lg={4} md={4}
                                                  onClick={() => handleCallback(item.state)} style={{padding: '2%'}}>
                                                <Card className={`${item.cName} `}
                                                      style={{width: '100%', padding: '5%'}}>
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


                        </>
                        }

                        {loading &&
                        <h1>Loading</h1>
                        }
                        {error &&
                        <h1>{error.error || error.message}</h1>
                        }

                        {/*<img src={connectSVG} style={{ width: '100%' }}></img>*/}
                    </Grid>
                    <Grid item container className={"team-section"} xl={6} lg={6} md={6} sm={12}>
                        {/* <img src={logo} width={100}></img> */}


                        {team && team["teamSocialAccountDetails"][0]["SocialAccount"].map((value, key) => {
                            return (
                                <>
                                    <Grid item md={12} key={key} lg={5} style={{margin: 5}}>
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
                                            </CardActions>
                                        </Card>
                                    </Grid>
                                </>
                            )
                        })}
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

                    {/*    Connect to Social Media Accounts*/}

                </Grid>
            </>
        )
    };

    return (
        <>
            <IgDialog/>
            <BeforeLogin/>

        </>
    );



}