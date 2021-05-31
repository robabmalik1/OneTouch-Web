import React, {useEffect, useState} from 'react';
import axios from "axios";
import LocalStore from "../../layers/config/localStore";
import {getHeader} from "../mail/messageMethods";
import Moment from "react-moment";
import {Card, CardActions, CardContent} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Animate from "../misc/animation/animate";
import ImageEditor from "../content-posting/image-editor/imageEditor";

const localStore = new LocalStore();


function ContentStudio(props) {
    const [drafts,setDrafts]=useState(null);
    const [media,setMedia]=useState([]);
    const [currPage,setCurrPage]=useState(1);
    const [openTab, setOpenTab] = React.useState(1);



    const getDrafts=()=>{
        axios.get(`http://localhost:5080/publish/getDraftedPosts?teamId=${localStore.getCurrTeam()}&pageId=${currPage}`,{headers: {
                'Content-Type': "application/json",
                'x-access-token': localStore.getToken(),
            }}).then((res)=>{
                setDrafts(res.data)
        })
    }


    const getMedia=()=>{
        axios.get(`http://localhost:5080/upload/getMediaDetails?teamId=${localStore.getCurrTeam()}&privacy=0&pageId=${currPage}`,{headers: {
                'Content-Type': "application/json",
                'x-access-token': localStore.getToken(),
            }})
            .then((res)=>{

                setMedia([...media,...res.data.data])
                console.log(media)
                setCurrPage(currPage+1)

            })
    }

    useEffect(()=>{
        if(!drafts || !media){
        getDrafts();
        getMedia();
        }

    })

    const deleteMedia=(id)=>{
        axios.delete(`http://localhost:5080/upload/deleteMedia?isForceDelete=1&mediaId=${id}`,{headers: {
                'Content-Type': "application/json",
                'x-access-token': localStore.getToken(),
            }})
            .then((res)=>{
                console.log(res)
                // window.location.reload(false);
            })
    }

    const goToPost =(path)=>{
        props.history.push({pathname: "/Publish",state: {
            media_path: path,
        }
        }
        )
    }



    return (
        <div>
            {/*Tabs start*/}
            <div className="flex flex-wrap">
                <div className="w-full">
                    <ul
                        className="flex mb-0 list-none flex-wrap pt-3 pb-4 flex-row"
                        role="tablist"
                    >
                        <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
                            <a
                                className={
                                    "text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal no-underline " +
                                    (openTab === 1
                                        ? "text-white bg-blue-light"
                                        : "text-blue-light bg-white")
                                }
                                onClick={e => {
                                    e.preventDefault();
                                    setOpenTab(1);

                                }}
                                data-toggle="tab"
                                href="#link1"
                                role="tablist"
                            >
                                Drafts
                            </a>
                        </li>
                        <li className="-mb-px mr-2 last:mr-0 flex-auto text-center ">
                            <a
                                className={
                                    "text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal no-underline " +
                                    (openTab === 2
                                        ? "text-white bg-blue-light"
                                        : "text-blue-light bg-white")
                                }
                                onClick={e => {
                                    e.preventDefault();
                                    setOpenTab(2);
                                }}
                                data-toggle="tab"
                                href="#link2"
                                role="tablist"
                            >
                                Media
                            </a>
                        </li>
                        <li className="-mb-px mr-2 last:mr-0 flex-auto text-center ">
                            <a
                                className={
                                    "text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal no-underline " +
                                    (openTab === 3
                                        ? "text-white bg-blue-light"
                                        : "text-blue-light bg-white")
                                }
                                onClick={e => {
                                    e.preventDefault();
                                    setOpenTab(3);
                                }}
                                data-toggle="tab"
                                href="#link2"
                                role="tablist"
                            >
                                Image Editor
                            </a>
                        </li>

                    </ul>
                    <div className="relative  flex flex-col min-w-0 break-words bg-white w-11/12 mt-32 ml-64 mb-6 rounded ">
                        <div className="px-4 py-5 flex-auto ">
                            <div className="tab-content tab-space ">
                                <div className={openTab === 1 ? "block" : "hidden"} id="link1">
                                    <Grid container  spacing={2}>
                                        {drafts && drafts ?
                                        <>
                                            {drafts.data.map((draft,index)=>{
                                                return(
                                                    <>

                                                        {/*<Grid item lg={3} xl={3}>*/}
                                                            <Grid className={"bg-blue mr-2 rounded shadow-lg text-white"} item lg={3} xl={3}>
                                                                <img  height={"230"} className={"w-full"} src={"http://localhost:5080"+draft.mediaUrl[0]} />
                                                                <h6> Added:  {<Moment locale={'ru'}  fromNow date={draft.createdDate}/>}</h6>
                                                                <Button className={"text-blue bg-white hover:text-white"} onClick={()=>{deleteMedia(draft._id)}}>Delete</Button>
                                                                <Button className={"text-blue bg-white hover:text-white ml-1"} onClick={()=>{goToPost("http://localhost:5080"+draft.mediaUrl[0])}}>Post</Button>
                                                            </Grid>
                                                            {/*<Card>*/}
                                                            {/*    <CardContent>*/}
                                                            {/*        <img  height={"250"} className={"w-full"} src={"http://localhost:5080"+draft.mediaUrl[0]} />*/}
                                                            {/*        <h4>Description:  {draft.description} </h4>*/}
                                                            {/*        <h4>Added: {<Moment locale={'ru'} fromNow date={draft.createdDate}/>}</h4>*/}
                                                            {/*    </CardContent>*/}
                                                            {/*    <CardActions>*/}
                                                            {/*        <Button variant={"outlined"} onClick={()=>{alert(draft.mediaUrl[0])}}>Post</Button>*/}
                                                            {/*        <Button variant={"outlined"} onClick={()=>{deleteMedia(draft._id)}}>Delete</Button>*/}
                                                            {/*    </CardActions>*/}
                                                            {/*</Card>*/}
                                                        {/*</Grid>*/}

                                                    </>
                                                )
                                            })
                                            }


                                        </>
:
                                            <h1>No Drafts</h1>

                                        }

                                    </Grid>
                                </div>
                                <div className={openTab === 2 ? "block" : "hidden"} id="link2">
                                    <Grid container spacing={2} style={{marginLeft: "20px"}}>
                                        {media &&
                                        media.map((med,ind)=>{
                                            return(
                                                <>
                                                    <Grid className={"bg-grey mr-2 rounded shadow-lg text-white"} item lg={3} xl={3}>
                                                        <img  height={"230"} className={"w-full rounded"} src={"http://localhost:5080"+med.media_url} />
                                                        <h6> Added:  {<Moment  locale={'ru'} fromNow date={med.created_date}/>}</h6>
                                                        <Button className={"text-blue bg-white hover:text-white"} onClick={()=>{deleteMedia(med.id)}}>Delete</Button>
                                                        <Button className={"text-blue bg-white hover:text-white ml-1"} onClick={()=>{goToPost("http://localhost:5080"+med.media_url)}}>Post</Button>
                                                    </Grid>

                                                </>
                                            )
                                        })
                                        }

                                    </Grid>
                                    <div className={"grid justify-items-center"}>
                                    <Button  style={{border: "1px solid"}} className={"bg-blue text-white m-16 hover:bg-white hover:text-blue border hover:border-black "} onClick={()=>{
                                        // setCurrPage(currPage+1);
                                        getMedia();
                                    }} >Load More</Button>
                                    </div>
                                </div>
                                <div className={openTab === 3 ? "block" : "hidden"} id="link2">
                                    <Grid container spacing={2} style={{marginLeft: "20px"}}>
                                        <ImageEditor />

                                    </Grid>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/*Tabs end*/}
            </div>

    );
}

export default ContentStudio;