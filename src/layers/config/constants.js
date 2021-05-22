const CONSTANTS = {
    ENV_VARIABLES: {
        DEV: "DEV",
        STAGE: "STAGE",
        PROD: "PROD"
    },
    API_URL: {
        REGISTER_USER: "/user/register",
        LOGIN: "/user/login",
        OTP: "/user/twoStepLoginValidate",
        FORGOT: "/user/forgotPassword",
        RESET: "/user/resetPassword",
        SOCIAL: "/user/Sociallogin",
        ADD_SOCIAL_PROFILE: "/team/addSocialProfile",
        GET_USER_DETAILS: "/authorized/getUserInfo",
        GET_POST_SCHEDULED_DETAILS:'schedule/getScheduleDetails',
        ATTACHED_ACCOUNTS: "api/social/attached",
        UPLOAD_LOCAL_IMAGES: "upload/media",
        POST_GENERAL:'publish/publishPosts',
        POST_SCHEDULE:'schedule/create',
        INSTA: "/api/social/instagram/basic",
        POST_BASIC_INSTA: "api/socials/instagram/schedule_post",
        INSTAGRAM_MEDIA: "api/social/instagram/basic/media",
        DEL_IG_BASIC_MEDIA: "api/social/instagram/basic/delete",


    },
    TEAMS_URL: {
        TEAM_DETAILS: "/team/getDetails",
        TEAM_DETAILS_BY_ID: "/team/getTeamDetails",
        CREATE_TEAM: "/team/create",
    },
    INSIGHTS:{
        FACEBOOK_PAGE: "insights/getFacebookPageInsights"
    },
    FEEDS_URL: {
        FB_FEEDS: "/feeds/getFacebookFeeds",
        RECENT_FB_FEEDS: "/feeds/getRecentFbFeeds?accountId=1&teamId=1&pageId=1",
    },
    PUBLISH_FIELDS: {
        SELECTED_PROFILES: "SELECTED_PROFILE",
    }
}

export default CONSTANTS;