import React, { useEffect, useState} from "react";
import {useSelector, shallowEqual, useDispatch} from "react-redux";
import {TextField, Button, Grid, Typography, Paper, withStyles} from '@material-ui/core';
import {  loginUser,getOTP,forgPassword,socialLog } from "../../../../redux/ducks/auth/login/loginOps";
import { resetLoginError } from "../../../../redux/ducks/auth/login/loginDuck";
import { resetRegisterError } from "../../../../redux/ducks/auth/register/registerDuck";

import headerImg from "../../../../assets/images/logos/top.png"

//css
import "../../../../styles/css/login.css";

import LocalStore from "../../../../layers/config/localStore";
import FacebookIcon from "@material-ui/icons/Facebook";
import SnackBar from "../../../misc/snackbar";

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
            type={props.type}
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
        e.preventDefault();
        const email = forgot;
        dispatch(forgPassword(email));
    };

    const onSubmitOTP = e => {
        e.preventDefault();

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
        redMessage: state.auth.message
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
                                    <form className={"login-form"} autoComplete="on"  onSubmit={Otp}>
                                        {setUser}
                                        {setPassword}
                                        <Btn margin={"10%"} type={"submit"}>  Login </Btn>
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

                                            <Btn margin={"2%"}  onClick={()=>dispatch(resetLoginError)}>
                                                Cancel
                                            </Btn>

                                        </form>
                                    </>
                                    }

                                    {/*Forgot Password*/}
                                    {forgotP &&
                                    <>
                                        <h1 style={{textAlign: 'center'}}>Forgot Password</h1>
                                        <form className={"login-form"} autoComplete="on"  onSubmit={onSubmitFP}>
                                            {setForgot}

                                            <Btn margin={"10%"} type={"submit"}>
                                                Submit
                                            </Btn>

                                            <Btn margin={"2%"} type={"submit"} onClick={()=>{setForgotP(false)}}>
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

            { redError && <SnackBar severity={"error"} error={redError.error} /> }
            { redMessage && <SnackBar severity={"success"} error={redMessage.message} /> }
        </>
    );
}

export default withStyles(useStyles)(Login);


