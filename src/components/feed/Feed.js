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
import gl from "../../assets/img/team-2-800x800.jpg";



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
    const [youtube,setYoutube]=useState(null);
    const [tweets,setTweets]=useState(null);
    const currTeam = useSelector(state => state.currTeam.CurrentTeam);
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
            case 9:
                getytFeeds();
                break;
            case 12:
                getInstaBusinessFeeds();
                break;
            default:
                break;

        }
    },[])

    const getytFeeds =()=>{
        //getRecentFbFeeds
        axios.get(`http://localhost:5050/feeds/getYoutubeFeeds?accountId=${props.location.state.accountId}&teamId=${props.location.state.currTeam}&pageId=1&socialAccountId=${props.location.state.socialId}`,{
            headers: {'x-access-token': localStore.getToken()}
        })
            .then((res)=>{
                if(res.data.code===200){
                    console.log(res)
                    setYoutube(res.data);
                    setSeverity("success");
                    setSnackBarStatus("Youtube Feed Fetched Successfully");

                    console.log(youtube)
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


    const getFacebookFeeds =()=>{
        //
        //getFacebookFeeds
        axios.get(`http://localhost:5050/feeds/getRecentFbFeeds?accountId=${props.location.state.accountId}&teamId=${props.location.state.currTeam}&pageId=1&socialAccountId=${props.location.state.socialId}`,{
            headers: {'x-access-token': localStore.getToken()}
        })
            .then((res)=>{
                if(res.data.code===200){
                    setFeeds(res.data);
                    setSeverity("success");
                    setSnackBarStatus("Facebook Feed Fetched Successfully");

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
                    setSnackBarStatus("Instagram Feed Fetched Successfully");
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
                    setSnackBarStatus("Tweets Fetched Successfully");

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
                <main className="profile-page">
                    <section className="relative block h-500-px">
                        <div
                            className="absolute top-0 w-full h-full bg-center bg-cover"
                            style={{
                                backgroundImage:
                                    "url('https://images.unsplash.com/photo-1499336315816-097655dcfbda?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2710&q=80')",
                            }}
                        >
            <span
                id="blackOverlay"
                className="w-full h-full absolute opacity-50 bag-black"
            ></span>
                        </div>
                        <div
                            className="top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden h-70-px"
                            style={{ transform: "translateZ(0)" }}
                        >
                            <svg
                                className="absolute bottom-0 overflow-hidden"
                                xmlns="http://www.w3.org/2000/svg"
                                preserveAspectRatio="none"
                                version="1.1"
                                viewBox="0 0 2560 100"
                                x="0"
                                y="0"
                            >
                                <polygon
                                    className="text-blueGray-200 fill-current"
                                    points="2560 0 2560 100 0 100"
                                ></polygon>
                            </svg>
                        </div>
                    </section>
                    <section className="relative paddingy-16 bg-blueGray-200">
                        <div className="container-new mx-auto paddingx-4">
                            <div className="relative flex flex-col min-w-0 break-words bg-white w-full magb-6 shadow-xl rounded-lg -magt-64">
                                <div className="paddingx-6">
                                    <div className="flex flex-wrap justify-center">
                                        <div className="w-full lg:w-4/12 paddingx-4 lg:order-1">
                                            <div className="flex justify-center py-4 lg:pt-4 pt-8">
                                                <div className="mr-4 p-3 text-center">
                        <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">

                        </span>
                                                    <span className="text-sm text-blueGray-400">

                        </span>
                                                </div>
                                                <div className="mr-4 p-3 text-center">
                        <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">

                        </span>
                                                    <span className="text-sm text-blueGray-400">

                        </span>
                                                </div>
                                                <div className="lg:mr-4 p-3 text-center">
                        <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">

                        </span>
                                                    <span className="text-sm text-blueGray-400">

                        </span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="w-full lg:w-3/12 paddingx-4 lg:order-2 flex justify-center">
                                            <div className="relative">
                                                <img
                                                    alt="..."
                                                    src={props.location.state.dp || "https://www.google.com/url?sa=i&url=https%3A%2F%2Fdenovo-us.com%2Fabout-us%2Fmale-generic-photo-01%2F&psig=AOvVaw39BpTOZ5sKHCG6F2gyNp5U&ust=1622241674794000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCOi11af36vACFQAAAAAdAAAAABAD"}

                                                    className="shadow-xl rounded-full h-auto align-middle border-none absolute -mag-16 -magl-20 lg:-magl-16 max-w-150-px"
                                                />
                                            </div>
                                        </div>
                                        <div className="w-full lg:w-4/12 paddingx-4 lg:order-3 lg:text-right lg:self-center">
                                            <div className="pady-6 padx-3 magt-32 sm:magt-0">

                                            </div>
                                        </div>

                                    </div>
                                    <div className="text-center mt-12">
                                        <h3 className="text4-4xl font-semibold leading-normal mb-2 text-blueGray-700 ml-72">
                                            {props.location.state.name || ""}
                                        </h3>

                                    </div>
                                    <div className="mt-10 py-10 border-t border-blueGray-200 text-center ">
                                        <div className="flex flex-wrap justify-between">
                                            <div className="w-full justify-between paddingx-4">



                                                <SnackBar error={snackBarStatus} severity={severity} clear={()=>setSnackBarStatus("")}/>
                                                <Grid container justify="center" spacing={2}>
                                                    {/*<Grid item container xl={10} lg={3} >*/}
                                                    {/*    {profilesLinked()}*/}
                                                    {/*</Grid>*/}
                                                    <Grid item container xl={12} lg={12} >
                                                        {/*<h1>Feeds</h1>*/}

                                                        {feeds &&
                                                        <>
                                                            {feeds.posts.map((item,index)=>{
                                                                    return(
                                                                        <>

                                                                            {/*item.postType==="status" ||*/}
                                                                            {(item.postType==="photo" ||  item.postType==="cover_photo" || !item.postType )?
                                                                                <Grid className={"m-1 ml-76"} item lg={3} xl={3}>
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
                                                                                                                    <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-lg font-semibold text-gray-700 mr-2">{item.description || item.captions}</span>
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

                                                                            {item.postType==="status" && item.description &&
                                                                            <>
                                                                                <div className="px-6 py-4">
                                                                                    <div className="font-bold text-purple-500 text-xl mb-2">
                                                                                        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-lg font-semibold text-gray-700 mr-2">{item.description || item.captions}</span>
                                                                                    </div>
                                                                                </div>
                                                                            </>

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


                                                        {youtube &&
                                                        youtube.posts.map((vid,ind)=>{
                                                                return(
                                                                    <>
                                                                        <Grid lg={6} xl={6}>
                                                                            <h4>{vid.title}</h4>
                                                                            <iframe className="embed-responsive-item" src={vid.embed_url}
                                                                                    allowFullScreen></iframe>
                                                                        </Grid>
                                                                    </>
                                                                )
                                                            }
                                                        )
                                                        }

                                                        {!feeds && !tweets && !youtube &&
                                                        <Grid container justify="center" alignItems="center">
                                                            <Spinner />
                                                        </Grid>
                                                        }

                                                    </Grid>
                                                </Grid>
                                            {/*    End*/}











                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </main>


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
