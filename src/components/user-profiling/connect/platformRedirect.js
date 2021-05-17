import React, {useEffect, useState} from 'react';

import axios from "axios";
import LocalStore from "../../../layers/config/localStore";
import {useLocation
} from "react-router-dom";

import {useDispatch, useSelector} from "react-redux";
import {addSocialAccount} from "../../../redux/ducks/auth/connections/connectionOps";
import Checkbox from '@material-ui/core/Checkbox';

const localStore = new LocalStore()

function useQuery() {
    return new URLSearchParams(useLocation().search);
}



function PlatformRedirect(props) {
    const currNet=localStore.getCurrNetwork();
    const dispatch = useDispatch();
    let query = useQuery();
    var code=query.get("code");
    var state=query.get("state");
    const oauth_verifier=query.get("oauth_verifier");
    useEffect(()=>{
        if(!code && !oauth_verifier){
            alert("Error");
            console.log("oauth",oauth_verifier)
            props.history.push("/Connect");
        }
        else{
            if(currNet==="Facebook"){
                dispatch(addSocialAccount(code,state));
                localStore.removeCurrNetwork();
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
            }
            else if(currNet==="Youtube"){
                getYoutubePages(code);
            }
            else if(currNet==="LinkedIn"){
                dispatch(addSocialAccount(code,state));
                localStore.removeCurrNetwork();
            }

        }

    })


    const [pages,setPages]=useState(null);
    const [instaB,setInstaB]=useState(null);
    const [ytPages,setYTPages]=useState(null);

    const getFbPages = async (code)=>{
        await axios.get("http://localhost:5000/profile/getOwnFacebookpages?code="+code,{
            headers: {'x-access-token': localStore.getToken()}
        })
            .then((res)=>{
                console.log(res)
                setPages(res.data.pages);
            })
    }

    const getInstaB = async (code)=>{
        await axios.get("http://localhost:5000/profile/getInstaBusinessAccount?code="+code,{
            headers: {'x-access-token': localStore.getToken()}
        })
            .then((res)=>{
                console.log(res)
                setInstaB(res.data.pages);
            })
    }

    const addBulkAccounts = async (data)=>{
        console.log("arr",data);
        await axios.post("http://localhost:5000/team/addBulkSocialProfiles?TeamId="+localStore.getCurrTeam(),data,{
            headers: {'x-access-token': localStore.getToken()}
        })
            .then((res)=>{
                console.log("bulk",res)
            })
    }

    const getYoutubePages = async (code)=>{
        await axios.get("http://localhost:5000/profile/getYoutubeChannels?code="+code,{
            headers: {'x-access-token': localStore.getToken()}
        })
            .then((res)=>{
                console.log(res)
                if(res.data.code !==400){
                localStorage.setItem("YoutubeChannels",JSON.stringify(res.data.channels));
                }
                const channels = res.data.channels;
                setYTPages(channels);
                let arr=[];

                channels.map((item,index)=>{
                    let obj={
                        "account_type":9,
                        "user_name" : item.channelName,
                        "first_name" : item.channelName,
                        "last_name" : item.channelName,
                        "email" : "",
                        "social_id" : item.channelId,
                        "profile_pic_url" : item.channelImage,
                        "cover_pic_url" : item.channelImage,
                        "access_token" : item.accessToken,
                        "refresh_token" : item.refreshToken,
                        "friendship_counts" : (item.friendshipCount).subscriberCount,
                        "info" : (item.info).publishedDate
                    }
                    arr.push(obj)
                }
                )
                console.log(arr);


                addBulkAccounts(arr);


            })
    }



    const failedConn = useSelector(state => state.connection.failedConnection);
    // const successConn = useSelector(state => state.connection.platform);


    return (
        <>
            {ytPages&&
                JSON.stringify(ytPages)
            // pages.map((page,index)=>{
            //     return (
            //         <>
            //             <h1>Select Pages to add</h1>
            //         {JSON.stringify(page.pageName)}
            //         </>
            //     )
            // })
            }



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