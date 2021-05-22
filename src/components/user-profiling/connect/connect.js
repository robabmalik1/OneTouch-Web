import React, {useEffect, useState} from "react";
import { shallowEqual, useDispatch, useSelector} from "react-redux";
import {Card, Grid, Typography, AppBar, Toolbar, CardContent, CardActions, Avatar} from '@material-ui/core';
import { loginCardsData } from "../auth/login/loginCardsData";
import { loginInstagram } from "../../../redux/ducks/auth/login/loginOps";

// Instagram Login Dialog

import "../../../styles/css/connect.css"
import LocalStore from "../../../layers/config/localStore";
import SplitView from "./splitView";
import {useParams} from "react-router-dom";


export default function Connect(props) {
    // const [errors, setErrors] = useState({});
    // const [addClass, setAddClass] = useState(true);
    // const [loading,setLoading]=useState(null);
    // const [buttonText, setButtonText] = useState("Register");


    // const onLogoutClick = e => {
    //     e.preventDefault();
    //     dispatch(logoutUser());
    // };
    let {handle}=useParams();
    if(!handle){
        handle="Dashboard";
    }









    // const { user } = props.auth;
    // const { errors } = state;


    const IgDialog = () => {
        return (
            <div className="w-full">
                {/* onChange={onChange} */}

            </div>
        )
    }

    const InsightDailog = () =>{

    }
    

    return (
        <>
            <SplitView handle={handle} {...props} />
            <IgDialog/>
            {/*<BeforeLogin/>*/}
        </>
    );



}