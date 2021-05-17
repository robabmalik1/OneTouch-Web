const ACCESS_TOKEN = "ACCESS_TOKEN";
const USER = "USER";
const USER_NAME = "USER_NAME";
const CLIENT_ID = "CLIENT_ID";
const USER_ID = "USER_ID";
const REFRESH_TOKEN = "REFRESH_TOKEN";
const CURR_TEAM_ID = "CURR_TEAM_ID";
const CURR_EMAIL = "CURR_EMAIL";
const CURR_Network = "CURR_Network";
const TWITTER_STATE = "TWITTER_STATE"
export default class LocalStore {

    setToken(tokenValue) {
        localStorage.setItem(ACCESS_TOKEN, tokenValue);
    }



    setRefreshToken(refreshTokenValue){
        localStorage.setItem(REFRESH_TOKEN, refreshTokenValue)
    }

    getToken() {
        return localStorage.getItem(ACCESS_TOKEN);
    }

    //User

    setUser(userValue) {
        localStorage.setItem(USER, userValue);
    }

    getUser() {
        return localStorage.getItem(USER);
    }
    removeUser(){
        localStorage.removeItem(USER)
    }

    setUserName(userName) {
        localStorage.setItem(USER_NAME, userName);
    }

    getUserName() {
        return localStorage.getItem(USER_NAME);
    }

    setClientId(clientId) {
        localStorage.setItem(CLIENT_ID, clientId.toString().trim());
    }

    getClientId() {
        return localStorage.getItem(CLIENT_ID.trim());
    }

    setUserId(userId) {
        localStorage.setItem(USER_ID, userId);
    }

    getUserId() {
        return localStorage.getItem(USER_ID);
    }

    removeUserId(){
        localStorage.removeItem(USER_ID);
    }

    removeToken(){
        localStorage.removeItem(ACCESS_TOKEN)
    }

//    Current Team
        setCurrTeam(teamId){
            localStorage.setItem(CURR_TEAM_ID,teamId);
        }

        getCurrTeam(){
        return localStorage.getItem(CURR_TEAM_ID);
        }

    removeCurrTeam(){
        localStorage.removeItem(CURR_TEAM_ID);
    }

//    Current Email

    setCurrEmail(email){
        localStorage.setItem(CURR_EMAIL,email);
    }

    getCurrEmail(){
        return localStorage.getItem(CURR_EMAIL);
    }

    removeCurrEmail(){
        localStorage.removeItem(CURR_EMAIL);
    }


//    set selected network
    setCurrNetwork(network){
        localStorage.setItem(CURR_Network,network);
    }

    getCurrNetwork(){
        return localStorage.getItem(CURR_Network);
    }

    removeCurrNetwork(){
        localStorage.removeItem(CURR_Network);
    }

//    Twitter
    setTwitterState(state){
        localStorage.setItem(TWITTER_STATE,state);
    }

    getTwitterState(){
        return localStorage.getItem(TWITTER_STATE);
    }

    removeTwitterState(){
        localStorage.removeItem(TWITTER_STATE);
    }
}
