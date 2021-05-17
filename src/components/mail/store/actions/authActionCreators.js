/* global gapi */

export const AUTHORIZED = 'AUTHORIZED';
export const UNAUTHORIZED = 'UNAUTHORIZED';


export const authorized = () => ({type: AUTHORIZED});
export const unauthorized = () => ({type: UNAUTHORIZED});

export const authorize = () => dispatch => {
  gapi.auth2.getAuthInstance().signIn();
};

export const unauthorize = () => dispatch => {
  gapi.auth2.getAuthInstance().signOut();
};

export const updateSigninStatus = (isSignedIn) => dispatch => {
  if (isSignedIn) {
    dispatch(authorized());
  } else {
    dispatch(unauthorized());
  }
};