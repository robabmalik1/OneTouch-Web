/* global gapi */
import {updateSigninStatus} from './authActionCreators'

const GAPI_LOAD_REQUEST = 'GAPI_LOAD_REQUEST';
const GAPI_LOAD_SUCCESS = 'GAPI_LOAD_SUCCESS';

const gapiLoadRequest = () => ({type: GAPI_LOAD_REQUEST});
const gapiLoadSuccess = () => ({type: GAPI_LOAD_SUCCESS});

export const loadGapi = () => dispatch => {
  dispatch(gapiLoadRequest());
  gapi.load('client:auth2', () => {
    gapi.client.init({
      discoveryDocs: ["https://www.googleapis.com/discovery/v1/apis/gmail/v1/rest"],
      clientId: "709034384818-vukulhbqkdteoehtj9rqkgg0d4tdl4kq.apps.googleusercontent.com",
      scope: 'https://mail.google.com/'

    }).then(() => {
      console.log("Done");
      dispatch(gapiLoadSuccess());
      gapi.auth2.getAuthInstance().isSignedIn.listen((status) => dispatch(updateSigninStatus(status)));
      dispatch(updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get()));
    });
  });
};