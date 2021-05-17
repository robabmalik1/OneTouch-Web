/* global gapi */
import React, {useEffect, useRef} from 'react';
import FusePageCarded from "../../misc/carded/FusePageCarded";
import MailAppHeader from "../MailAppHeader";
import MailToolbar from "../mail/MailToolbar";
import MailsToolbar from "../mails/MailsToolbar";
import MailDetails from "../mail/MailDetails";
import MailList from "../mails/MailList";
import MailAppSidebarHeader from "../MailAppSidebarHeader";
import MailAppSidebarContent from "../MailAppSidebarContent";
import {
    fetchMessageListRequest,
    fetchMessageListSuccess,
    getMessageListRequest,
    getMessageListSuccess
} from "../store/constants";
import {getHeader} from "../messageMethods";
import {useDispatch} from "react-redux";
import {getMessageList} from "../store/actions/messageListActionCreators";
import {useParams} from "react-router-dom";


function Layout(props){
    const dispatch = useDispatch();
    let {handle}=useParams();
    if(!handle){
        handle="INBOX";
    }
    dispatch(getMessageList(handle.toUpperCase()));
    useEffect(()=>{

    },[])

    const pageLayout = useRef(null);

    return (
        <>
            <FusePageCarded
                classes={{
                    root   : "w-full",
                    content: "flex flex-col",
                    header : "items-center min-h-72 h-72 sm:h-136 sm:min-h-136"
                }}
                header={
                    <MailAppHeader pageLayout={pageLayout}/>
                }
                contentToolbar={
                    // props.match.params.mailId ? (
                    //     <MailToolbar/>
                    // ) : (
                        <MailsToolbar/>
                    // )
                }
                content={
                    // props.match.params.mailId ? (
                    //     <MailDetails/>
                    // ) : (
                        <MailList/>
                    // )
                }
                leftSidebarHeader={
                    <MailAppSidebarHeader/>
                }
                leftSidebarContent={
                    <MailAppSidebarContent/>
                }
                ref={pageLayout}
                innerScroll
            />
        </>
    );
}

export default Layout;