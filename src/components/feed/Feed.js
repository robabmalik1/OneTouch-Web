import React, {useEffect, useState} from 'react';
import {
    useSelector
} from "react-redux";

// import InstaFeed from "./InstaFeed";
// import { getAllMedia } from "../../redux/ducks/igMedia/igMediaOps";
import {
    Avatar,
    Card,
    CircularProgress,
    Divider,
    Grid,
    List,
    ListItem,
    ListItemAvatar, ListItemSecondaryAction,
    ListItemText
} from '@material-ui/core';


import { makeStyles } from '@material-ui/core/styles';
//Image Grid
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
// import GridListTileBar from '@material-ui/core/GridListTileBar';
import ListSubheader from '@material-ui/core/ListSubheader';
import IconButton from '@material-ui/core/IconButton';
// import InfoIcon from '@material-ui/icons/Info';
import axios from "axios";
import SnackBar from "../misc/snackbar";
import LocalStore from "../../layers/config/localStore";



const Spinner = () => {
    return (<>
        <div className="p-grid p-col-12 p-align-center p-justify-center" style={{ height: '100vh' }}>
            <CircularProgress />
        </div>
    </>)
}

// const feedBar = [{ title: "Posts", path: "/live", cName: "" }, { title: "Timeline", path: "/live", cName: "" }]

export default function Feed(props){
    const classes = useStyles();
    // const dispatch = useDispatch();
    const [snackBarStatus, setSnackBarStatus] = useState("")
    const [severity,setSeverity] = useState(null)
    const [feeds,setFeeds]=useState(null);
    const [tweets,setTweets]=useState(null);
    // const getFeeds = useSelector(state => state.fbFeeds.feeds);
    // const loadingFeeds = useSelector(state => state.fbFeeds.processingFeeds);
    const currTeam = useSelector(state => state.currTeam.CurrentTeam);
    // const currTeamLoading = useSelector(state => state.currTeam.processingTeams);
    const localStore = new LocalStore();


    useEffect(()=>{
        switch (props.location.state.accountType) {
            case 1:
            case 2:
            case 3:
                getFacebookFeeds();
                break;
            case 4:
                getTweets();
                break;
            case 12:
                getInstaBusinessFeeds();
                break;
            default:
                break;

        }
    },[])

    const getFacebookFeeds =()=>{
        //getRecentFbFeeds
        axios.get(`http://localhost:5050/feeds/getFacebookFeeds?accountId=${props.location.state.accountId}&teamId=${props.location.state.currTeam}&pageId=1&socialAccountId=${props.location.state.socialId}`,{
            headers: {'x-access-token': localStore.getToken()}
        })
            .then((res)=>{
                if(res.data.code===200){
                    setFeeds(res.data);
                    setSeverity("success");
                    setSnackBarStatus(res.data.message);

                    console.log(feeds)
                    // setInvitations(res.data.teamDetails)
                }
                else if(res.data.code===401){
                    setSeverity("error");
                    setSnackBarStatus(res.data.message);

                }
                else{
                    setSeverity("error")
                    setSnackBarStatus(res.data.error)
                }
    })
    }



    const getInstaBusinessFeeds =()=>{
        axios.get(`http://localhost:5050/feeds/getRecentInstagramBusinessFeeds?accountId=${props.location.state.accountId}&teamId=${props.location.state.currTeam}&pageId=1&socialAccountId=${props.location.state.socialId}`,{
            headers: {'x-access-token': localStore.getToken()}
        })
            .then((res)=>{
                if(res.data.code===200){
                    setSeverity("success");
                    setSnackBarStatus(res.data.message);
                    setFeeds(res.data);
                    console.log(feeds)
                    // setInvitations(res.data.teamDetails)
                }
                else if(res.data.code===401){
                    setSeverity("error");
                    setSnackBarStatus(res.data.message);

                }
                else{
                    setSeverity("error")
                    setSnackBarStatus(res.data.error || res.data.message)
                }
            })
    }
    const getTweets =()=>{
        //getRecentTweets
        axios.get(`http://localhost:5050/feeds/getTweets?accountId=${props.location.state.accountId}&teamId=${props.location.state.currTeam}&pageId=1&socialAccountId=${props.location.state.socialId}`,{
            headers: {'x-access-token': localStore.getToken()}
        })
            .then((res)=>{
                if(res.data.code===200){
                    setTweets(res.data);
                    setSeverity("success");
                    setSnackBarStatus(res.data.message);

                    console.log(feeds)
                    // setInvitations(res.data.teamDetails)
                }
                else if(res.data.code===401){
                    setSeverity("error");
                    setSnackBarStatus(res.data.message);

                }
                else{
                    setSeverity("error")
                    setSnackBarStatus(res.data.error)
                }
            })
    }


    // const profilesLinked = () =>{
    //
    // //Profiles Linked to Selected Team
    //     return(
    //         <>
    //             <Grid item className={`root p-12`} xs={12} md={6} lg={2}>
    //                 <div className={`demo`}>
    //                     <Card className={`card`} style={{ width: '100%', padding: '5%' }} >
    //                         <List subheader={
    //                             <ListSubheader component="h1" className="nested-list-subheader">
    //                                 Profiles linked to {currTeam && currTeam['teamSocialAccountDetails'][0]['team_name']}
    //                             </ListSubheader>
    //                         }
    //
    //                         >
    //                             {currTeam &&
    //                             currTeam["teamSocialAccountDetails"][0]['SocialAccount'].map((profile,key)=>{
    //                                 return(
    //                                     <>
    //
    //                                         <Divider />
    //                                         <ListItem button id={profile["account_id"]} onClick={()=>{
    //                                             alert("CLicked")
    //                                         }}>
    //                                             <ListItemAvatar>
    //                                                 <Avatar src={profile["profile_pic_url"]} />
    //                                             </ListItemAvatar>
    //                                             <ListItemText
    //                                                 primary={profile["first_name"] + " "+profile["last_name"]}
    //                                                 // secondary={team["SocialAccount"].length + " Accounts"}
    //                                             />
    //                                             <ListItemSecondaryAction>
    //                                                 <IconButton edge="end" aria-label="delete">
    //                                                     {/*<DeleteIcon />*/}
    //                                                     Del
    //                                                 </IconButton>
    //                                             </ListItemSecondaryAction>
    //                                         </ListItem>
    //
    //                                     </>
    //
    //                                 )
    //                             })
    //                             }
    //                         </List>
    //                     </Card>
    //                 </div>
    //             </Grid>
    //         </>
    //     )
    // }
    //


    return (
            <>
                {/* <Sidebar
                            visible={true}
                            onHide={() => { }}
                            style={{ width: '15rem', backgroundColor: `lightskyblue`, marginLeft: '3rem' }}
                            closeOnEscape={false}
                            showCloseIcon={false}
                        >
                            {feedBar.map((item, index) => {
                                return (
                                    <Link key={item.title} to={item.path}>
                                        <div >
                                            <button id={item.title} style={{ width: '100%' }} className={`${item.cName} p-mb-4`} >
                                                {item.title}
                                            </button>
                                        </div>
                                    </Link>
                                )
                            })}
                        </Sidebar> */}
                <SnackBar error={snackBarStatus} severity={severity} clear={()=>setSnackBarStatus("")}/>
                <Grid container justify="center" spacing={6}>
                    {/*<Grid item container xl={10} lg={3} >*/}
                    {/*    {profilesLinked()}*/}
                    {/*</Grid>*/}
                    <Grid item container xl={10} lg={10} >
                        {/*<h1>Feeds</h1>*/}

                            {feeds &&
                                <>
                                        {feeds.posts.map((item,index)=>{
                                         return(
                                           <>

                                               {/*item.postType==="status" ||*/}
                                               {(item.postType==="photo" ||  item.postType==="cover_photo" || !item.postType )?
                                                   <Grid className={"m-16"} item lg={6} xl={3}>
                                                   <div className={classes.root}>
                                                   {/*<GridList cellHeight={700} className={classes.gridList} cols={1}>*/}
                                                       {/*<GridListTile key="Subheader" cols={2} style={{ height: 'auto' }}>*/}
                                                           {/*<ListSubheader component="div">December</ListSubheader>*/}
                                                       {/*</GridListTile>*/}
                                                       {item.mediaUrls.map((im,ind)=>{
                                                           return(
                                                               <>
                                                                   <div key={ind} className="max-w-sm rounded overflow-hidden shadow-lg">
                                                                       <img className="w-full" src={im} alt="Display" />
                                                                       <div className="px-6 py-4">
                                                                           <div className="font-bold text-purple-500 text-xl mb-2">
                                                                               <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">{item.description || item.captions}</span>
                                                                           </div>
                                                                       </div>
                                                                       {/*<div className="px-6 py-4">*/}
                                                                       {/*    <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">#Software Engineer</span>*/}
                                                                       {/*    <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">#Writter</span>*/}
                                                                       {/*    <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mt-2 ml-20">#Public Speaker</span>*/}
                                                                       {/*</div>*/}
                                                                   </div>

                                                           {/*        */}
                                                           {/*<GridListTile key={item.id} cols={ 1}>*/}
                                                           {/*    <img src={im} alt={item.description} width={"100%"} />*/}

                                                           {/*</GridListTile>*/}
                                                           {/*        <h6>{item.description || item.captions}</h6>*/}
                                                               </>
                                                           );
                                                       }
                                                       )
                                                       }

                                                           {/*<GridListTile key={index}>*/}
                                                               {/*<img src={item.mediaUrls[0]} alt={item.description} width={"100%"} />*/}
                                                           {/*    <GridListTileBar*/}
                                                           {/*        title={item.description}*/}
                                                           {/*        // subtitle={<span>by: {tile.author}</span>}*/}
                                                           {/*        actionIcon={*/}
                                                           {/*            <IconButton aria-label={`info about ${item.description}`} className={classes.icon}>*/}
                                                           {/*                <InfoIcon />*/}
                                                           {/*            </IconButton>*/}
                                                           {/*        }*/}
                                                           {/*    />*/}
                                                           {/*</GridListTile>*/}
                                                   {/*</GridList>*/}
                                                   </div>

                                                   {/*<div>*/}
                                                   {/*<img src={item.mediaUrls[0]} alt={"fb"} />*/}
                                                   {/*</div>*/}
                                                   </Grid>
                                                       :
                                                   <></>
                                               }


                                               {(item.postType==="video" && item.mediaUrls[0] !== null )?
                                                   <>
                                                       <div>
                                                       <video width="800" height="700" controls  >
                                                           <source src={item.mediaUrls[0]} type="video/mp4" />

                                                       </video>
                                                       </div>
                                                   </>:
                                                   <></>
                                               }

                                           </>
                                         );
                                        }
                                        )
                                        }
                                </>
                            }

                        {tweets &&
                        <>
                            {tweets.posts.map((tweet, index) => {
                                return (
                                    <figure className="md:flex bg-gray-100 rounded-xl p-8 md:p-0">
                                        {tweet.mediaUrls[0] &&
                                        <img
                                            className="w-32 h-32 md:w-full md:h-auto md:rounded-none rounded-full mx-auto"
                                            src={tweet.mediaUrls[0]} alt="" width="484" height="612" />
                                        }

                                            <div className="pt-6 md:p-8 text-center md:text-left space-y-4">
                                                <blockquote>
                                                    <p className="text-lg font-semibold">
                                                        {tweet.descritpion}
                                                    </p>
                                                </blockquote>
                                                <figcaption className="font-medium">
                                                    <div className="text-cyan-600">
                                                        {tweet.postedAccountScreenName}
                                                    </div>
                                                    <div className="text-gray-500">
                                                        Mentions: {tweet.mentions}
                                                    </div>
                                                    <div className="text-gray-500">
                                                        Favourite COunt: {tweet.favoriteCount}
                                                    </div>
                                                    <div className="text-gray-500">
                                                        Retweets: {tweet.retweetCount}
                                                    </div>
                                                </figcaption>
                                            </div>
                                    </figure>
                                )
                            })
                            }
                        </>
                        }

                            {tweets &&
                            JSON.stringify(tweets)}

                        {!feeds && !tweets &&
                        <Grid container justify="center" alignItems="center">
                            <Spinner />
                        </Grid>
                        }

                        </Grid>
                    </Grid>
            </>
        )
}

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        backgroundColor: theme.palette.background.paper,
    },
    gridList: {
        width: 800,
        height: 800,
    },
    icon: {
        color: 'rgba(255, 255, 255, 0.54)',
    },
}));