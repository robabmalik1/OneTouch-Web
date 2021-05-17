import { HTTP } from "../lib/HTTPService";

import CONSTANTS from "../config/constants";
import LocalStore from "../config/localStore";

const LOGIN = CONSTANTS.API_URL.LOGIN
const REGISTER_USER = CONSTANTS.API_URL.REGISTER_USER
const OTP = CONSTANTS.API_URL.OTP
const FORGOT = CONSTANTS.API_URL.FORGOT
const SOCIAL = CONSTANTS.API_URL.SOCIAL
const RESET = CONSTANTS.API_URL.RESET
const INSTA = CONSTANTS.API_URL.INSTA
const ATTACHED_ACCOUNTS = CONSTANTS.API_URL.ATTACHED_ACCOUNTS
const GET_USER_DETAILS = CONSTANTS.API_URL.GET_USER_DETAILS

const localStore = new LocalStore();

export default class AuthService {
    logIn(loginDataModel) {
        return HTTP.post(LOGIN, loginDataModel, {
            headers: {
                'Content-Type': "application/json"
            }
        })
    }

    signUp(registerUserModel) {
        return HTTP.put(REGISTER_USER, registerUserModel, {
            headers: {
                contentType: "application/json"
            }
        })
    }

    validateOTP(otp){
        return HTTP.post(OTP+"?email="+otp.email+"&emailtoken="+otp.emailtoken,null , {
            headers: {
                contentType: "application/json"
            }
        })
    }

    forgotPassword(email){
        return HTTP.get(FORGOT+"?email="+email, {
            headers: {
                contentType: "application/json"
            }
        })

    }

    resetPassword(email,newPass){
        return HTTP.post(RESET+"?email="+email+"&newPassword="+newPass,null ,{
            headers: {
                contentType: "application/json"
            }
        })}

    socialLogin(network){
        return HTTP.get(SOCIAL+"?network="+network ,{
            headers: {
                contentType: "application/json"
            }
        })}


        loginBasicInsta(instaBasicDataModel) {
        return HTTP.post(INSTA, instaBasicDataModel, {
            headers: {
                'Content-Type': "application/json"
            }
        })
    }

    getAttachedAccounts() {
        return HTTP.get(ATTACHED_ACCOUNTS, {
            headers: {
                'Content-Type': "application/json"
            }
        })
    }

    getUserDetails(){
        return HTTP.get(GET_USER_DETAILS, {
            headers: {
                'Content-Type': "application/json",
                'x-access-token': localStore.getToken()
            }
        })
    }

}
