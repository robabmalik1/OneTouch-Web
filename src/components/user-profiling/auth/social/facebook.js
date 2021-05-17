import React from 'react'
import { connect } from 'react-redux'
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import FacebookIcon from '@material-ui/icons/Facebook';

// import axios from 'axios';
import { Button } from '@material-ui/core';
// Alerts
// import Snackbar from '@material-ui/core/Snackbar';
// import Alert from '@material-ui/lab/Alert';

const Facebook = ({ informParent = f => f, clientId, apiUrl }) => {

    // const sendFacebookToken = (userID, accessToken) => {
    //     axios
    //         .post(`${process.env.REACT_APP_API_URL}/user/facebook-login`, {
    //             userID,
    //             accessToken
    //         })
    //         .then(res => {
    //             console.log(res.data);
    //             informParent(res);
    //         })
    //         .catch(error => {
    //             console.log('FACEBOOK SIGNIN ERROR', error.response);
    //         });
    //
    //
    // };

    // const responseFacebook = response => {
    //     sendFacebookToken(response.userID, response.accessToken)
    // };

    return (
        <FacebookLogin
            appId={`${process.env.REACT_APP_FACEBOOK_CLIENT}`}
            autoLoad={false}
            callback={"http://localhost:5000/user/auth/facebook/callback"}
            onSuccess={"http://localhost:5000/user/auth/facebook/callback"}
            fields="name,email,picture"
            cookiePolicy={'single_host_origin'}
            response
            render={renderProps => (
                <Button
                    color="primary"
                    variant="outlined"
                    onClick={renderProps.onClick}
                    disabled={renderProps.disabled}
                    fullWidth
                    startIcon={
                        <FacebookIcon />
                    }
                >
                    <span >Login with Facebook</span>
                </Button>
            )}

        />
    );
};


const mapStateToProps = (state) => ({

})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(Facebook)
