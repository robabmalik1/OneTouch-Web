import React, {useEffect, useState} from 'react';
import {
    useDispatch, useSelector
} from "react-redux";
import {Delete, Clear, Check, Send, Edit, Add, Autorenew} from '@material-ui/icons';

import {
    Card,
    Grid,
    // Typography,
    // AppBar,
    // Toolbar,
    Button,
    TextField,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    List,
    ListItem,
    // ListItemIcon,
    ListItemText,
    Divider,
    ListSubheader,
    // FormGroup,
    // FormControlLabel,
    // Checkbox,
    ListItemAvatar, Avatar, ListItemSecondaryAction, IconButton, Paper, AppBar, Toolbar, Typography
} from '@material-ui/core';
import {getTeamDetails} from "../../../redux/ducks/teams/getDetails/getTeamsOps";
import SnackBar from "../../misc/snackbar";

import {createNewTeam} from "../../../redux/ducks/teams/createTeam/createTeamOps";
import {currentTeam} from "../../../redux/ducks/teams/currentTeam/currentTeamOps";
import "../../../styles/css/teams.css";
import LocalStore from "../../../layers/config/localStore";
import axios from "axios";

function ManageTeams(){
    const [snackBarStatus, setSnackBarStatus] = useState("")
    const [severity,setSeverity] = useState(null)
    const [openEditTeam,setOpenEditTeam]=useState(false);
    const [invitations,setInvitations] = useState(null);

    const dispatch = useDispatch();
    const getTeam = useSelector(state => state.team.teamDetails);
    const getTeamError = useSelector(state => state.team.failedGetTeamsDetails);
    const getTeamloading = useSelector(state => state.team.processingTeams);

    const currTeam = useSelector(state => state.currTeam.CurrentTeam);
    const currTeamLoading = useSelector(state => state.currTeam.processingTeams);
    const localStore = new LocalStore();

    useEffect(()=>{
        getInvitations()
    },[])

    //API Calls
    const [invite,setInvite]=useState("");

    //Get Team Invitations
    const getInvitations =  ()=>{
        axios.get("http://localhost:5000/team/getTeamInvitations",{
            headers: {'x-access-token': localStore.getToken()}
        })
            .then((res)=>{
                if(res.data.code===200){
                    setSeverity("success");
                    setSnackBarStatus(res.data.message);
                    setInvitations(res.data.teamDetails)
                }
                else if(res.data.code===401){
                    setSeverity("error");
                    setSnackBarStatus(res.data.message);

                }
                else{
                    setSeverity("error")
                    setSnackBarStatus(res.data.error)
                }
                console.log(res.data)
            })
    }

//Invite To Team
    const sendInvite=()=>{
        if(invite.length>0) {
            axios.post("http://localhost:5000/team/invite?TeamId="+localStore.getCurrTeam()+"&Email="+invite+"&Permission=1",null,{
                headers: {'x-access-token': localStore.getToken()}
            })
                .then((res)=>{
                    console.log(res)
                    if(res.data.code===200){
                        setSeverity("success")
                        setSnackBarStatus(res.data.message)
                    }
                    else if(res.data.code===401){
                        setSeverity("error");
                        setSnackBarStatus(res.data.message);

                    }

                    else{

                        setSeverity("error");
                        setSnackBarStatus(res.data.error);

                    }
                })
        }
    }

    const deleteTeam=(teamId)=>{
        axios.delete("http://localhost:5000/team/delete?TeamId="+teamId,{
            headers: {'x-access-token': localStore.getToken()}
        })
            .then((res)=>{
                console.log(res)
                if(res.data.code===200){
                    setSeverity("success")
                    setSnackBarStatus(res.data.message)
                    dispatch(getTeamDetails());
                }
                else if(res.data.code===401){
                    setSeverity("error");
                    setSnackBarStatus(res.data.message);

                }
                else{

                    setSeverity("error");
                    setSnackBarStatus(res.data.error);

                }
            })
    }

    const editTeam=(teamId)=>{
        axios.post("http://localhost:5000/team/edit?TeamId="+teamId,
            {
                TeamInfo: {
                    name: editTeamName,
                    description: editDescription,
                    logoUrl: editLogo
                }
            }
            ,{
            headers: {'x-access-token': localStore.getToken()}
        })
            .then((res)=>{
                console.log(res)
                if(res.data.code===200){
                    setSeverity("success")
                    setSnackBarStatus(res.data.message)
                    dispatch(getTeamDetails());
                }
                else if(res.data.code===401){
                    setSeverity("error");
                    setSnackBarStatus(res.data.message);

                }
                else{

                    setSeverity("error");
                    setSnackBarStatus(res.data.error);

                }
                setOpenEditTeam(false);
            })

    }

    const acceptInvitation=(teamId)=>{
        axios.post("http://localhost:5000/team/acceptInvitation?TeamId="+teamId,
            null
            ,{
                headers: {'x-access-token': localStore.getToken()}
            })
            .then((res)=>{
                console.log(res)
                if(res.data.code===200){
                    setSeverity("success")
                    setSnackBarStatus("Team Joined")
                    dispatch(getTeamDetails());
                }
                else if(res.data.code===401){
                    setSeverity("error");
                    setSnackBarStatus(res.data.message);

                }
                else{

                    setSeverity("error");
                    setSnackBarStatus(res.data.error);

                }
                setOpenEditTeam(false);
            })

    }


    //API Calls End

    //UI

    const editTeamSet = (teamName,teamDescription,teamLogo,teamId) => {
        setEditTeamName(teamName);
        setEditDescription(teamDescription);
        setEditLogo(teamLogo);
        setEditTeamId(teamId);
        setOpenEditTeam(true)
    }

    const editTeamDialog = () =>{

        return(
            <>
                <Dialog open={openEditTeam} onClose={() => setOpenEditTeam(false)} component="form" >
                    <AppBar position="static">
                        <Toolbar >
                            <Typography variant="h5" color="inherit">
                                {/* {eventDialog.type === 'new' ? 'New Event' : 'Edit Event'} */}
                                {"Edit Team"}
                            </Typography>
                        </Toolbar>
                    </AppBar>
                    <DialogContent>
                        {/* className={classes.root} */}
                        <TextField
                            onChange={e=>setEditTeamName(e.target.value)}
                            margin="dense"
                            autoFocus
                            id="editteamname"
                            type="text"
                            label="Team Name"
                            value={editTeamName}
                            fullWidth
                        />

                        <TextField
                            onChange={e=>setEditDescription(e.target.value)}
                            margin="dense"
                            autoFocus
                            id="editteamdescription"
                            type="text"
                            label="Team Description"
                            value={editDescription}
                            fullWidth
                        />

                        <TextField
                            onChange={e=>setEditLogo(e.target.value)}
                            margin="dense"
                            autoFocus
                            id="editteamlogo"
                            type="text"
                            label="Team Logo"
                            value={editLogo}
                            fullWidth
                        />

                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setOpenEditTeam(false)} color="primary">
                            Cancel
                        </Button>
                        <Button type="submit" onClick={()=>editTeam(editTeamId)} color="primary">
                            Edit
                        </Button>
                    </DialogActions>
                </Dialog>
            </>
        )
    }

    const availableProfiles = () =>{
        return(
            <>
            <Grid item className={`root p-12`} xs={12} md={6} lg={4}>
                <Paper className={`card m-teams`}  style={{height: 300, overflowY: 'auto',overflowX: 'hidden',padding: '5%'}}>
                    {/*<Card className={`card m-teams`}  >*/}
                        <List subheader={
                            <ListSubheader component="h1" className="nested-list-subheader demo">
                                Teams
                                <IconButton className={"ml-88"} color={"secondary"} onClick={()=>createTeam()} edge="end" aria-label="delete">
                                    <Add fontSize="large"  />
                                </IconButton>
                            </ListSubheader>
                        }

                        >
                            {getTeam &&
                            getTeam["teamSocialAccountDetails"].map((value,key)=>{
                                return(
                                    value.map((team,SnackBar)=>{
                                        return(
                                            <>

                                                <Divider />
                                                <ListItem button id={team["team_id"]} onClick={()=>{
                                                    localStore.setCurrTeam(team["team_id"]);
                                                    dispatch(currentTeam(localStore.getCurrTeam()));
                                                }}>
                                                    <ListItemAvatar>
                                                        <Avatar src={team["team_logo"]} />
                                                    </ListItemAvatar>
                                                    <ListItemText
                                                        primary={team["team_name"]}
                                                        secondary={team["SocialAccount"].length + " Accounts"}
                                                    />
                                                    <ListItemSecondaryAction>
                                                        <IconButton onClick={()=>{deleteTeam(team["team_id"])}} edge="end" aria-label="delete">
                                                            < Delete fontSize="large" />
                                                        </IconButton>
                                                        <IconButton edge="end" aria-label="delete" onClick={()=>editTeamSet(team["team_name"],team["team_description"],team["team_logo"],team["team_id"])}>
                                                            < Edit fontSize="large" />
                                                        </IconButton>
                                                    </ListItemSecondaryAction>
                                                </ListItem>
                                                {editTeamDialog()}
                                            </>
                                        )
                                    })
                                )
                            })
                            }

                            {getTeamError &&
                                <h1>{JSON.stringify(getTeamError)}</h1>
                            }

                            {
                                getTeamloading &&
                                    <h1>Loading</h1>
                            }
                        </List>
                    {/*</Card>*/}
                </Paper>
                        </Grid>
            </>
        )
    }

    //Profiles Linked to Selected Team
    const profilesLinked = () =>{
        return(
            <>
                        <Grid item className={`root p-12`} xs={12} md={6} lg={4}>
                            <div className={`demo`}>
                                <Card className={`card`} style={{ width: '100%', padding: '5%' }} >
                                    <List subheader={
                                        <ListSubheader component="h1" className="nested-list-subheader">
                                            Profiles linked to {currTeam && currTeam['teamSocialAccountDetails'][0]['team_name']}
                                        </ListSubheader>
                                    }

                                    >
                                        {currTeam &&
                                        currTeam["teamSocialAccountDetails"][0]['SocialAccount'].map((profile,key)=>{
                                            return(
                                                        <>

                                                            <Divider />
                                                            <ListItem button id={profile["account_id"]} onClick={()=>{
                                                                alert("CLicked")
                                                            }}>
                                                                <ListItemAvatar>
                                                                    <Avatar src={profile["profile_pic_url"]} />
                                                                </ListItemAvatar>
                                                                <ListItemText
                                                                    primary={profile["first_name"] + " "+profile["last_name"]}
                                                                    // secondary={team["SocialAccount"].length + " Accounts"}
                                                                />
                                                                <ListItemSecondaryAction>
                                                                    <IconButton edge="end" aria-label="delete">
                                                                        < Delete fontSize="large" />
                                                                    </IconButton>
                                                                </ListItemSecondaryAction>
                                                            </ListItem>

                                                        </>

                                            )
                                        })
                                        }
                                    </List>
                                </Card>
                            </div>
                        </Grid>
            </>
        )
    }

    //Selected Team Admin
    const adminDetails = () =>{
        if (currTeam!=null){
            return(
                <Grid item className={`root p-12`} xs={12} md={6} lg={4}>
                    <div className={`demo`}>
                        <Card className={`card`} style={{ width: '100%', padding: '5%' }} >
                            <List subheader={
                                <ListSubheader component="h1" className="nested-list-subheader">
                                    Admin Details
                                </ListSubheader>
                            }
                            >
                                {
                                    (getTeam)?
                                        getTeam.memberProfileDetails.map((team,key)=>(
                                                        (currTeam.teamSocialAccountDetails[0].team_admin_id ===team[0].user_id
                                                            && getTeam.teamMembers[key][0].team_id===currTeam.teamSocialAccountDetails[0].team_id
                                                            // currTeam.teamSocialAccountDetails[0].team_id ===team[0].team_id
                                                        )?
                                                            <>
                                                                <Divider />
                                                                <ListItem>
                                                                    <ListItemAvatar>
                                                                    <Avatar src={team[0].profile_picture} />
                                                                    </ListItemAvatar>
                                                                    <ListItemText
                                                                    primary={team[0]["first_name"] + " "+team[0]["last_name"]}
                                                                    secondary={team[0].email}
                                                                />
                                                                </ListItem>
                                                            </>

                                                            :
                                                            <></>
                                        ))
                                        :
                                        <p>Not worked</p>
                                }
                            </List>
                        </Card>
                    </div>
                </Grid>
            );
        }
        // return(
        //     <>
        //         <Grid item className={`root p-12`} xs={12} md={6} lg={4}>
        //             <div className={`demo`}>
        //                 <Card className={`card`} style={{ width: '100%', padding: '5%' }} >
        //                     <List subheader={
        //                         <ListSubheader component="h1" className="nested-list-subheader">
        //                             Admin Details
        //                         </ListSubheader>
        //                     }
        //
        //                     >
        //                         {getTeam &&
        //                         getTeam["memberProfileDetails"].map((team,key)=>{
        //                             return(
        //                                 <>
        //                                     {currTeam &&
        //                                         if(currTeam['teamSocialAccountDetails'][0]['team_admin_id']===team['user_id']){
        //                                         const teamAdminId=team['user_id'];
        //                                         return(
        //                                         <>
        //
        //                                         <Divider />
        //                                         <ListItem >
        //                                         <ListItemAvatar>
        //                                         <Avatar src={team["profile_pic_url"]} />
        //                                         </ListItemAvatar>
        //                                         <ListItemText
        //                                         primary={team["first_name"] + " "+team["last_name"]}
        //                                         // secondary={team["SocialAccount"].length + " Accounts"}
        //                                         />
        //                                         </ListItem>
        //
        //                                         </>
        //
        //                                         )
        //                                     }
        //
        //                                     }
        //                                 </>
        //                             )
        //
        //                         }
        //                         )
        //                         }
        //                     </List>
        //                 </Card>
        //             </div>
        //         </Grid>
        //     </>
        // )
    }

    //Accepted Team Members
    const acceptedTeamMembers = () =>{
        if (currTeam!=null){
            return(
                <Grid item className={`root p-12`} xs={12} md={6} lg={4}>
                    <div className={`demo`}>
                        <Card className={`card`} style={{ width: '100%', padding: '5%' }} >
                            <List subheader={
                                <ListSubheader component="h1" className="nested-list-subheader">
                                    Team Members
                                </ListSubheader>
                            }
                            >

                        {
                            (getTeam)?
                                getTeam.memberProfileDetails.map(
                                    (team,key)=>(
                                    (
                                        currTeam.teamMembers[0].invitation_accepted
                                        &&
                                        getTeam.teamMembers[key][0].team_id===currTeam.teamSocialAccountDetails[0].team_id
                                    )?

                                        <>
                                            {getTeam.memberProfileDetails[key].map((member,key)=>{
                                                return(
                                                    <>
                                            <Divider />
                                            <ListItem>
                                                <ListItemAvatar>
                                                    <Avatar src={member.profile_picture} />
                                                </ListItemAvatar>
                                                <ListItemText
                                                    primary={member.first_name + " "+member.last_name}
                                                    secondary={member.email}
                                                />
                                            </ListItem>
                                                    </>
                                            )
                                            })
                                            }
                                        </>

                                        :
                                        <></>
                                ))
                                :
                                <p>Not worked</p>
                        }
                            </List>
                        </Card>
                    </div>
                </Grid>
            );
        }
        // return(
        //     <>
        //         <Grid item className={`root p-12`} xs={12} md={6} lg={4}>
        //             <div className={`demo`}>
        //                 <Card className={`card`} style={{ width: '100%', padding: '5%' }} >
        //                     <List subheader={
        //                         <ListSubheader component="h1" className="nested-list-subheader">
        //                             Admin Details
        //                         </ListSubheader>
        //                     }
        //
        //                     >
        //                         {getTeam &&
        //                         getTeam["memberProfileDetails"].map((team,key)=>{
        //                             return(
        //                                 <>
        //                                     {currTeam &&
        //                                         if(currTeam['teamSocialAccountDetails'][0]['team_admin_id']===team['user_id']){
        //                                         const teamAdminId=team['user_id'];
        //                                         return(
        //                                         <>
        //
        //                                         <Divider />
        //                                         <ListItem >
        //                                         <ListItemAvatar>
        //                                         <Avatar src={team["profile_pic_url"]} />
        //                                         </ListItemAvatar>
        //                                         <ListItemText
        //                                         primary={team["first_name"] + " "+team["last_name"]}
        //                                         // secondary={team["SocialAccount"].length + " Accounts"}
        //                                         />
        //                                         </ListItem>
        //
        //                                         </>
        //
        //                                         )
        //                                     }
        //
        //                                     }
        //                                 </>
        //                             )
        //
        //                         }
        //                         )
        //                         }
        //                     </List>
        //                 </Card>
        //             </div>
        //         </Grid>
        //     </>
        // )
    }


    const inviteToTeam = () => {
        return(
            <>
                <Grid item className={`root p-12`} xs={12} md={6} lg={4}>
                    <div className={`demo`}>
                        <Card className={`card`} style={{ width: '100%', padding: '5%' }} >
                            <List subheader={
                                <ListSubheader component="h1" style={{fontSize: "12px"}} className="nested-list-subheader">
                                    Invite a member
                                </ListSubheader>
                            }>
                                <ListItem>
                                <TextField
                                    onChange={e=>setInvite(e.target.value)}
                                    margin="dense"
                                    autoFocus
                                    value={invite}
                                    id="membername"
                                    type="text"
                                    label="Member Email"
                                    fullWidth

                                />
                                <Button variant={"contained"} color={"primary"} onClick={()=>{sendInvite()}} > <Send /> </Button>
                                </ListItem>
                                </List>

                        </Card>
                    </div>
                </Grid>
            </>
        )
    }

    //Current Invitations
    const currentInvitations = () => {
        return(
            <>
                <Grid item className={`root p-12`} xs={12} md={6} lg={4}>
                    <div className={`demo`}>
                        <Card className={`card`} style={{ width: '100%', padding: '5%' }} >
                            <List subheader={
                                <ListSubheader component="h1" style={{fontSize: "12px"}} className="nested-list-subheader">
                                    Team Invitations
                                    <IconButton className={"ml-88"} color={"secondary"} onClick={()=>{getInvitations()}} edge="end" aria-label="delete">
                                        <Autorenew fontSize="large"  />
                                    </IconButton>
                                </ListSubheader>
                            }
                            >

                                {
                                    (invitations)?
                                        invitations.map(
                                            (team,key)=>{
                                    return(
                                        <>
                                         <Divider />
                                        <ListItem >
                                         <ListItemAvatar>
                                         <Avatar src={team.team_logo} />
                                         </ListItemAvatar>
                                         <ListItemText
                                         primary={team.team_name}
                                         />
                                            <ListItemSecondaryAction>
                                                <IconButton edge="end" aria-label="delete">
                                                    <Clear fontSize="large" />
                                                </IconButton>
                                                <IconButton edge="end" onClick={()=>{acceptInvitation(team.team_id)}} aria-label="delete">
                                                    <Check fontSize="large" />
                                                </IconButton>
                                            </ListItemSecondaryAction>
                                        </ListItem>

                                        </>
                                        )
                                        }
                                        )
                                        :
                                        <>
                                            <h1>No Invitations</h1>
                                        </>
                                }

                            </List>
                        </Card>
                    </div>
                </Grid>
            </>
        )
    }

    //Create Team
        const [teamName,setTeamName] = useState("");
        const [description,setDescription] = useState("");
        const [logo,setLogo] = useState("");
    const [displayCard, setDisplayCard] = useState(false);
    //const data = useSelector(state => state.team);

    const [editTeamName,setEditTeamName] = useState("");
    const [editDescription,setEditDescription] = useState("");
    const [editLogo,setEditLogo] = useState("");
    const [editTeamId,setEditTeamId] = useState(0);

    const createTeam = ()=>{
        setDisplayCard(true);
    }

    const onSubmit = (e) => {
        e.preventDefault();
        alert("Clicked")
        const teamData = {
            TeamInfo : {
                name: teamName,
                description: description,
                logoUrl: logo
            }
        };
        dispatch(createNewTeam(teamData));

        setDisplayCard(false);
        setTeamName("");
        setLogo("");
        setDescription("");


    }

    return (
        <Grid container>

            <SnackBar error={snackBarStatus} severity={severity} clear={()=>setSnackBarStatus("")}/>

            <Grid item  className={`p-2 ml-24`} md={6} lg={3}>
            {availableProfiles()}
                {inviteToTeam()}
            </Grid>
            <Grid item  className={`p-12 ml-24`} md={6} lg={4}>
            {!currTeamLoading && profilesLinked()}
            {currTeamLoading && <h1>Loading</h1>}
                {currentInvitations()}
            </Grid>
            <Grid item  className={`p-12 ml-24`} md={6} lg={4}>
            {currTeam && adminDetails()}
                {currTeam && acceptedTeamMembers()}

            </Grid>
            <Dialog open={displayCard} onClose={() => setDisplayCard(false )} component="form" >
                <DialogTitle id="form-dialog-title">Create Team</DialogTitle>
                <DialogContent>
                    {/* className={classes.root} */}
                    <form id={"form1"} noValidate >
                    <TextField
                        onChange={e=>setTeamName(e.target.value)}
                        margin="dense"
                        autoFocus
                        value={teamName}
                        id="teamname"
                        type="text"
                        label="Team Name"
                        fullWidth
                    />

                    <TextField
                        onChange={e=>setDescription(e.target.value)}
                        id="description"
                        type="text"
                        value={description}
                        label="Description"
                        margin="dense"
                        fullWidth
                    />

                    <TextField
                        onChange={e=>setLogo(e.target.value)}
                        id="logo"
                        value={logo}
                        type="text"
                        label="Logo Url"
                        margin="dense"
                        fullWidth
                    />
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setDisplayCard(false)} color="primary">
                        Cancel
                    </Button>
                    <Button form={"form1"} onClick={e=>onSubmit(e)} color="primary">
                        Create
                    </Button>
                </DialogActions>
            </Dialog>
        </Grid>
    );
};

export default ManageTeams;
