import React, {useEffect, useState} from 'react';

import axios from "axios";
import LocalStore from "../../../layers/config/localStore";
import {useLocation
} from "react-router-dom";

import {useDispatch, useSelector} from "react-redux";
import {addSocialAccount} from "../../../redux/ducks/auth/connections/connectionOps";
import Checkbox from '@material-ui/core/Checkbox';
import {getTeamDetails} from "../../../redux/ducks/teams/getDetails/getTeamsOps";

const localStore = new LocalStore()

function useQuery() {
    return new URLSearchParams(useLocation().search);
}



function PlatformRedirect(props) {
    const currNet=localStore.getCurrNetwork();
    const dispatch = useDispatch();
    let query = useQuery();
    const code=query.get("code");
    const state=query.get("state");
    const oauth_verifier=query.get("oauth_verifier");
    const [pages,setPages]=useState(null);
    const [instaB,setInstaB]=useState(null);


    useEffect(()=>{
        if(!code && !oauth_verifier){
            alert("Error");
            console.log("oauth",oauth_verifier)
            props.history.push("/Connect/Dashboard");
        }
        else{
            if(currNet==="Facebook"){
                dispatch(addSocialAccount(code,state));
                localStore.removeCurrNetwork();
                props.history.push("/Connect/Dashboard");
            }
            else if(currNet==="FacebookPage"){
                getFbPages(code);
                localStore.removeCurrNetwork();
            }
            else if(currNet==="InstagramBusiness"){
                getInstaB(code);
                localStore.removeCurrNetwork();
            }
            else if(currNet==="Twitter"){
                dispatch(addSocialAccount(oauth_verifier,localStore.getTwitterState()));
                localStore.removeTwitterState();
                localStore.removeCurrNetwork();
                props.history.push("/Connect/Dashboard");
            }
            else if(currNet==="Youtube"){
                getYoutubePages(code);
            }
            else if(currNet==="LinkedIn"){
                dispatch(addSocialAccount(code,state));
                localStore.removeCurrNetwork();
                props.history.push("/Connect/Dashboard");
            }

        }

    })


    const getFbPages = async (code)=>{
        await axios.get("http://localhost:5000/profile/getOwnFacebookpages?code="+code,{
            headers: {'x-access-token': localStore.getToken()}
        })
            .then((res)=>{
                console.log(res)
                setPages(res.data.pages);
                res.data.pages.map((pg,ind)=>{
                    addBulkAccounts([
                        {
                            "account_type" :"2",
                            "user_name" : pg.pageName,
                            "first_name" : pg.pageName,
                            "last_name": "",
                            "email": "",
                            "social_id" :pg.pageId,
                            "profile_pic_url" : pg.profilePicture,
                            "cover_pic_url": pg.profilePicture,
                            "access_token": pg.accessToken,
                            "refresh_token": pg.accessToken,
                            "friendship_counts": pg.fanCount,
                            "info" : ""
                        }

                    ])
                })

            })
    }

    const getInstaB = async (code)=>{
        await axios.get("http://localhost:5000/profile/getInstaBusinessAccount?code="+code,{
            headers: {'x-access-token': localStore.getToken()}
        })
            .then((res)=>{
                console.log(res)
                setInstaB(res.data.pages);
                res.data.pages.map((pg,ind)=>{
                    addBulkAccounts([
                        {
                            "account_type" :"12",
                            "user_name" : pg.userName,
                            "first_name" : pg.userName,
                            "last_name": "",
                            "email": "",
                            "social_id" :pg.social_id,
                            "profile_pic_url" : pg.profile_pic,
                            "cover_pic_url": pg.profile_pic,
                            "access_token": pg.accessToken,
                            "refresh_token": pg.accessToken,
                            "friendship_counts": pg.fanCount,
                            "info" : ""
                        }

                    ])
                })
            })
    }

    const addBulkAccounts = async (data)=>{
        console.log("arr",data);
        await axios.post("http://localhost:5000/team/addBulkSocialProfiles?TeamId="+localStore.getCurrTeam(),data,{
            headers: {'x-access-token': localStore.getToken()}
        })
            .then((res)=>{
                console.log("bulk",res)
                dispatch(getTeamDetails())
                props.history.push("/Connect/Dashboard");
            })
    }

    const getYoutubePages = async (code)=>{
        await axios.get("http://localhost:5000/profile/getYoutubeChannels?code="+code,{
            headers: {'x-access-token': localStore.getToken()}
        })
            .then((res)=>{
                console.log(res)
                if(res.data.code !==400){
                // localStorage.setItem("YoutubeChannels",JSON.stringify(res.data.channels));

                res.data.channels.map((channel,ind)=>{
                    addBulkAccounts([
                        {
                            "account_type" :"9",
                            "user_name" : channel.channelName,
                            "first_name" : channel.channelName,
                            "last_name": "",
                            "email": "",
                            "social_id" :channel.channelId,
                            "profile_pic_url" : channel.channelImage,
                            "cover_pic_url": channel.channelImage,
                            "access_token": channel.accessToken,
                            "refresh_token": channel.accessToken,
                            "friendship_counts": channel.friendshipCount.subscriberCount,
                            "info" : channel.friendshipCount.viewCount
                        }

                    ])
                })
                }
                else{
                    alert("Something went wrong")
                }



            })
    }



    const failedConn = useSelector(state => state.connection.failedConnection);
    // const successConn = useSelector(state => state.connection.platform);


    return (
        <>




            {instaB &&
            <>
                    {/*<img height={200} width={200} src={instaB[0].profile_pic} />*/}
                    {JSON.stringify(instaB)}
                </>
            }

            {
                pages && JSON.stringify(pages)
            }
            <Checkbox
                defaultChecked
                color="primary"
                inputProps={{ 'aria-label': 'secondary checkbox' }}
            />
        <div>{failedConn &&
        <>
        <h1>Account Already Added</h1>
        </>
        }</div>
        </>
    );
}

export default PlatformRedirect;