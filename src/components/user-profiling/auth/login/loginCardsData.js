import React from 'react'
import { Instagram, Twitter, YouTube, LinkedIn } from '@material-ui/icons';
import FacebookIcon from '@material-ui/icons/Facebook';
export const loginCardsData = [
    {
        title: "Facebook",
        icon: <FacebookIcon fontSize="large" />,
        cName: "social-card ",
        spanClass: "common-gradient facebook",
        state: "Facebook"
    },
    {
        title: "Facebook Page",
        icon: <FacebookIcon fontSize="large" />,
        cName: "social-card ",
        spanClass: "common-gradient facebook",
        state: "FacebookPage"
    },
    {
        title: "Instagram",
        icon: <Instagram fontSize="large" />,
        cName: "social-card ",
        spanClass: "common-gradient instagramBusiness",
        state: "InstagramBusiness"
    },
    {
        title: "Twitter",
        icon: <Twitter fontSize="large" />,
        cName: "social-card ",
        spanClass: "common-gradient twitter",
        state: "Twitter"
    },
    {
        title: "Youtube",
        icon: <YouTube fontSize="large" />,
        cName: "social-card ",
        spanClass: "common-gradient youtube",
        state: "Youtube"
    },
    {
        title: "LinkedIn",
        icon: <LinkedIn fontSize="large" />,
        cName: "social-card ",
        spanClass: "common-gradient linkedin",
        state: "LinkedIn"
    },
]