import React, {useEffect, useRef} from 'react';

import {useDispatch} from "react-redux";
import FusePageCarded from "../../misc/carded/FusePageCarded";
import Dashboard from "./dashboard";
import Sidebar from "./sidebar";
import SidebarContent from "./sidebarContent";
import SideHeader from "./sideHeader";
import NewProfile from "./newProfile";


function SplitView(props){
    let {handle}=props;
    useEffect(()=>{

    },[])

    const pageLayout = useRef(null);

    return (
        <>
            <FusePageCarded
                classes={{
                    root   : "w-full",
                    content: "w-full h-full",
                    header : "items-center min-h-1 h-1 sm:h-1 sm:min-h-1 "
                }}

                contentToolbar={

                    <Sidebar/>

                }
                content={
                    handle==="Dashboard" ? (
                        <Dashboard {...props} />
                    ) : (
                    <NewProfile {...props}/>
                    )
                }
                leftSidebarHeader={
                    <SideHeader/>
                }
                leftSidebarContent={
                    <SidebarContent/>
                }
                ref={pageLayout}
                innerScroll
            />

        </>
    );
}

export default SplitView;