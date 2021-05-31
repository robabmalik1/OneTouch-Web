import React, { useEffect, useState} from "react";
import {useSelector, shallowEqual, useDispatch} from "react-redux";
import {TextField, Button, Grid, Typography, Paper, withStyles} from '@material-ui/core';
import {loginUser, getOTP, forgPassword, socialLog, resetOTP} from "../../../../redux/ducks/auth/login/loginOps";
// import { resetLoginError } from "../../../../redux/ducks/auth/login/loginDuck";
import { resetRegisterError } from "../../../../redux/ducks/auth/register/registerDuck";

import headerImg from "../../../../assets/images/logos/top.png"

//css
import "../../../../styles/css/login.css";

import LocalStore from "../../../../layers/config/localStore";
import FacebookIcon from "@material-ui/icons/Facebook";
import SnackBar from "../../../misc/snackbar";
import Google from "../social/google";

const useStyles = theme => {
    return ({
        root: {
            '& form': {
                display: 'flex',
                flexDirection: 'column',
            },
            '& .MuiTextField-root, & .MuiButton-root': {
                margin: theme.spacing(1),
            },

        },
        title: {
            fontSize: 34,
            textAlign: 'center',
        },
        pos: {
            marginBottom: 12,
        },
        image: {
            display: 'flex',
        },
        form: {
            display: 'flex',
            flexDirection: 'column',
        },
        resize: {
            fontSize: 20
        }
    })
}


function Btn(props){
    return(
        <Button
            color="primary"
            variant="contained"
            fullWidth
            style={{marginTop: props.margin}}
            size="medium"
            onClick={props.onClick}
        >

            <Typography variant={"h5"} style={{color: 'white'}}>
            {props.children}
            </Typography>
        </Button>
    )
}

function Login(props) {
        const [user,setUser]=useInput({type: "text",label: "Email or Username",id: "username"});
        const [password,setPassword]=useInput({type: "password",label: "Password",id: "password"});
        const [otp,setOtp]=useInput({type: "text",label: "Enter OTP",id: "otp"});
        const [forgot,setForgot]=useInput({type: "email",label: "Email",id: "forgotemail"});
        // const [error,setError]=useState("");
        // const [loading,setLoading]=useState(false);
        const [addClass,setAddClass]=useState(true);
        const [forgotP,setForgotP]=useState(false);
        const [buttonText,setButtonText]=useState("Register");
        const localStore = new LocalStore();




        const dispatch = useDispatch();
        //"Email or Username"
        function useInput({ type,label,id  }) {
        const [value, setValue] = useState("");
        const input =  <TextField required label={label} fullWidth
                                  id={id}
                                  // InputProps={{classes: {input:{ fontSize: 20}}}}
                                  // InputLabelProps={{style: {fontSize: "15px"}}}
                                  type={type}
                                  value={value}
                                  onChange={e => setValue(e.target.value)}
                        />
        return [value, input];
        }

        const Otp = e => {
        e.preventDefault();

        const userData = {
            user: user,
            password: password
        };

        dispatch(getOTP(userData)); // since we handle the redirect within our component, we don't need to pass in this.props.history as a parameter

    };

    const onSubmitFP = e => {
        // e.preventDefault();
        const email = forgot;
        dispatch(forgPassword(email));
    };

    const onSubmitOTP = e => {
        // e.preventDefault();

        const userData = {
            email: localStore.getCurrEmail(),
            emailtoken: otp
        };

        dispatch(loginUser(userData)); // since we handle the redirect within our component, we don't need to pass in this.props.history as a parameter
    };

    const toggle = () => {
        setButtonText("");
        setAddClass(!addClass);
    }

    //Redux Selector
    //redLoading,
    const {redUser,redError,redOTP, redMessage} = useSelector(state=> ({
        redUser: state.auth.user,
        redError: state.auth.failedLogin,
        // redLoading: state.auth.processingLogin,
        redOTP: state.auth.otp,
        redMessage: state.auth.message,

    }),shallowEqual);
    //Redux End

    const { classes } = props;
    let rightClass = [""];
    if (addClass) {
        rightClass.push('right-side right');
    }
    else {
        rightClass.push('right-side left');
        setTimeout(() => { props.history.push("/Register"); }, 500);
        dispatch(resetRegisterError());

    }


    useEffect(()=>{
                setButtonText("Register");
                if (redUser) {
                    props.history.push("/Connect/Dashboard");
                }
        },[redUser]);

        if (addClass) {
            rightClass.push('right-side right');
        }
        else {
            rightClass.push('right-side left');
            setTimeout(() => { props.history.push("/Register"); }, 500);
            dispatch(resetRegisterError());

    }

    return (
        <>
            <Grid container className={`background-img login-grid ${classes.root}`} justify="center" alignItems="center" style={{ height: '100%' }} direction="row" >
                <div style={{ alignSelf: 'center' }}>
                    <Grid item container className="login-card" >
                        <Paper className={"main-paper"}>
                            <Grid item container justify="center">
                                <Grid item style={{margin: '5%'}} >
                                    <img src={headerImg} width={"90%"} alt={"Header"} height={"100vh"} />

                                </Grid>
                                <Grid item>
                                    {/*Get OTP*/}
                                    {!redOTP && !forgotP &&
                                        <>
                                    <Typography className={`title`} variant={"h3"} align={"center"} color="textPrimary" gutterBottom>
                                        Login
                                    </Typography>
                                    <form className={"login-form"} autoComplete="on"  >
                                        {setUser}
                                        {setPassword}
                                        <Btn margin={"10%"} onClick={Otp} >  Login </Btn>
                                        <Btn type={"button"} margin={"2%"} onClick={()=>{setForgotP(true)}}>
                                                Forgot Password
                                        </Btn>

                                        <Button
                                            color="primary"
                                            variant="outlined"
                                            onClick={()=>{ dispatch(socialLog("facebook"))}}
                                            // disabled={renderProps.disabled}
                                            fullWidth
                                            startIcon={
                                                <FacebookIcon />
                                            }
                                        >
                                            <span >Login with Facebook</span>
                                        </Button>

                                        <Button
                                            color="primary"
                                            variant="outlined"
                                            onClick={()=>{ dispatch(socialLog("Google"))}}
                                            // disabled={renderProps.disabled}
                                            fullWidth
                                            startIcon={
                                                <svg width="18" height="18" xmlns="http://www.w3.org/2000/svg"><g fill="#000" fillRule="evenodd"><path d="M9 3.48c1.69 0 2.83.73 3.48 1.34l2.54-2.48C13.46.89 11.43 0 9 0 5.48 0 2.44 2.02.96 4.96l2.91 2.26C4.6 5.05 6.62 3.48 9 3.48z" fill="#EA4335"></path><path d="M17.64 9.2c0-.74-.06-1.28-.19-1.84H9v3.34h4.96c-.1.83-.64 2.08-1.84 2.92l2.84 2.2c1.7-1.57 2.68-3.88 2.68-6.62z" fill="#4285F4"></path><path d="M3.88 10.78A5.54 5.54 0 0 1 3.58 9c0-.62.11-1.22.29-1.78L.96 4.96A9.008 9.008 0 0 0 0 9c0 1.45.35 2.82.96 4.04l2.92-2.26z" fill="#FBBC05"></path><path d="M9 18c2.43 0 4.47-.8 5.96-2.18l-2.84-2.2c-.76.53-1.78.9-3.12.9-2.38 0-4.4-1.57-5.12-3.74L.97 13.04C2.45 15.98 5.48 18 9 18z" fill="#34A853"></path><path fill="none" d="M0 0h18v18H0z"></path></g></svg>
                                            }
                                        >
                                            <span >Login with Google</span>
                                        </Button>
                                    </form>
                                        </>
                                    }


                                    {/*Submit OTP*/}

                                    {redOTP && !forgotP &&
                                    <>
                                        <h1 style={{textAlign: 'center'}}>OTP SENT</h1>
                                        <form className={"login-form"} autoComplete="on" >
                                            {setOtp}
                                            <Btn margin={"10%"} onClick={onSubmitOTP}>
                                                Submit OTP
                                            </Btn>

                                            <Btn margin={"2%"}  onClick={()=>dispatch(resetOTP())}>
                                                Cancel
                                            </Btn>

                                        </form>
                                    </>
                                    }

                                    {/*Forgot Password*/}
                                    {forgotP &&
                                    <>
                                        <h1 style={{textAlign: 'center'}}>Forgot Password</h1>
                                        <form className={"login-form"} autoComplete="on"  >
                                            {setForgot}

                                            <Btn margin={"10%"} onClick={onSubmitFP} >
                                                Submit
                                            </Btn>

                                            <Btn margin={"2%"} onClick={()=>{setForgotP(false)}}>
                                                Cancel
                                            </Btn>
                                        </form>
                                    </>
                                    }
                                </Grid>
                            </Grid>
                        </Paper>

                        <Grid item container justify="center" direction="column" className={rightClass.join(' ')} onClick={()=>toggle()}>
                            <div className="text">
                                <Typography>
                                    {buttonText}
                                </Typography>
                            </div>

                        </Grid>

                    </Grid>

                </div>

            </Grid>

            { redError && <SnackBar severity={"error"} error={redError} /> }
            { redMessage && <SnackBar severity={"success"} error={redMessage} /> }
        </>
    );
}

export default withStyles(useStyles)(Login);


