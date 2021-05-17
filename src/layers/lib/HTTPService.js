import axios from "axios";
import {envConfig} from "../config/envConfig";

export const HTTP = axios.create({
    baseURL: envConfig.API_URL,
    timeout: 60000,
});

HTTP.interceptors.request.use(
    (config)=>{
        return config
    },
    (error)=>{
        console.log(error)
    }
)

export const HTTP_FEEDS = axios.create({
    baseURL: envConfig.FEEDS_API_URL,
    timeout: 60000,
});

HTTP_FEEDS.interceptors.request.use(
    (config)=>{
        return config
    },
    (error)=>{
        console.log(error)
    }
)

export const HTTP_PUBLISH = axios.create({
    baseURL: envConfig.PUBLISH_API_URL,
    timeout: 60000,
});

HTTP_PUBLISH.interceptors.request.use(
    (config)=>{
        //config.headers.common['x-access-token'] = localStore.getToken()
        return config
    },
    (error)=>{
        console.log(error)
    }
)