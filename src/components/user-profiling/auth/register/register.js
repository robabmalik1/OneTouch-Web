import React, { Component } from "react";
import { TextField, Button, Grid } from '@material-ui/core';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withStyles } from '@material-ui/styles';
import { registerUser } from "../../../../redux/ducks/auth/register/registerOps";
import loginImg from '../../../../assets/login.svg';
import Typography from '@material-ui/core/Typography';
import Alert from '@material-ui/lab/Alert';
import Paper from '@material-ui/core/Paper';
import Snackbar from '@material-ui/core/Snackbar';
import { withRouter } from "react-router-dom";
// import classnames from "classnames";

//css
import "../../../../styles/css/register.css";

//TODO Change to functional
export class Register extends Component {
    constructor() {
        super();
        this.state = {
            firstname: '',
            lastname: '',
            password: '',
            username: '',
            email: '',
            password2: '',
            dob: '',
            addClass: true,
            error: null,
            message: null,
            loading: null,
            buttonText: "Login"
        };


    }

    componentDidMount() {

        this.setState({ buttonText: "Login" })
        // If logged in and user navigates to Register page, should redirect them to dashboard
        if (this.props.user) {
            this.props.history.push("/Connect/Dashboard");
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.error) {
            this.setState({
                error: nextProps.error,
                loading: null
            });
        }
        else if(nextProps.message){
            this.setState({
                message: nextProps.message,
                loading: null
            })
        }
        else if(nextProps.loading){
            this.setState(
                {
                    loading: nextProps.loading
                }
            )
        }
        else{
            this.setState(
                {error: null}
            )
        }
    }

    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
    };

    onSubmit = e => {
        e.preventDefault();

        if(this.state.password===this.state.password2){
        const newUser = {
            user: {
                    email: this.state.email,
                    password: this.state.password,
                    userName: this.state.username,
                    firstName: this.state.firstname,
                    lastName: this.state.lastname,
                    dateOfBirth: this.state.dob,
                    profilePicture: "http://st2.depositphotos.com/1502311/12020/v/600/depositphotos_120206862-stock-illustration-profile-picture-vector.jpg",
                    phoneCode: 0,
                    phoneNo: 0,
                    country: "Pakistan",
                    timeZone: "+5:30",
                    aboutMe: "Default"

            }
        };

        this.props.registerUser(newUser, this.props.history);
        console.log(newUser);
        }else{
            alert("Passwords don't match")
        }

    };

    toggle() {
        this.setState({ buttonText: "" })
        this.setState({ addClass: !this.state.addClass });
    }

    toggleAlert = () => {
        this.setState({error: null})
    }

    toggleSuccess = () => {
        this.setState({message: null})
    }
    render() {
        const { error,message,loading } = this.state;
        const { classes } = this.props;
        let rightClass = [""];
        if (this.state.addClass) {
            rightClass.push('right-side left');
        }
        else {
            rightClass.push('right-side right');
            setTimeout(() => { this.props.history.push("/Login"); }, 500);

        }
        return (
            <>
                <Grid container className={`${classes.root} background-img register-grid`} justify="center" alignItems="center" direction="row" >
                    {/*style={{ alignSelf: 'center' }}*/}
                    <div>
                        <Grid item container className="register-card">
                            <Paper className={`main-paper`}>
                                <Grid item spacing={1} container justify="center">
                                    <Grid item >
                                        <Typography className={`register-title`} variant={"h4"} color="textPrimary">
                                            Create an account
                                    </Typography>

                                    </Grid>
                                    <Grid item className="register-content">
                                        <div className="image">
                                            <img alt="Login" src={loginImg} />
                                        </div>
                                    </Grid>
                                    <Grid item >
                                        <form className={`register-form`} autoComplete="off" onChange={this.onChange} onSubmit={this.onSubmit}>

                                            <TextField
                                                value={this.state.firstname}
                                                fullWidth
                                                id="firstname"
                                                type="text"
                                                label="First Name"
                                                size="small"
                                            />

                                            <TextField
                                                value={this.state.lastname}
                                                fullWidth
                                                id="lastname"
                                                type="text"
                                                label="Last Name"
                                                size="small"
                                            />

                                            <TextField
                                                onChange={this.onChange}
                                                value={this.state.username}
                                                fullWidth
                                                id="username"
                                                type="text"
                                                label="Username"
                                            />

                                            <TextField required
                                                id="email"
                                                label="Email"
                                                fullWidth
                                                type="email"
                                                value={this.state.email}

                                            />
                                            <TextField required
                                                       id="dob"
                                                       label="Date of birth"
                                                       fullWidth
                                                       type="text"
                                                       value={this.state.dob}
                                                       onFocus={(e) => e.target.type = 'date'}
                                                       onBlur={(e) => e.target.type = 'text'}
                                            />

                                            <TextField
                                                id="password"
                                                required
                                                type="password"
                                                fullWidth
                                                value={this.state.password}
                                                label="Password"
                                            />

                                            <TextField
                                                id="password2"
                                                required
                                                type="password"
                                                fullWidth
                                                value={this.state.password2}
                                                label="Confirm Password"
                                            />

                                            {error &&
                                                <Snackbar
                                                    anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                                                    open={true}
                                                    onClose={this.toggleAlert}
                                                    autoHideDuration={6000}

                                                >
                                                    <Alert
                                                        severity="error"
                                                        onClose={this.toggleAlert}
                                                    >
                                                        {error}
                                                        </Alert>
                                                </Snackbar>

                                            }

                                            {message &&
                                            <Snackbar
                                                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                                                open={true}
                                                onClose={this.toggleSuccess}
                                                autoHideDuration={6000}

                                            >
                                                <Alert
                                                    severity="success"
                                                    onClose={this.toggleSuccess}
                                                >
                                                    {message}
                                                </Alert>
                                            </Snackbar>

                                            }
                                            {!loading?
                                                <Button
                                                    color="primary"
                                                    type="submit"
                                                    variant="contained"
                                                    fullWidth
                                                    size="small"
                                                >
                                                    <Typography style={{color: 'white'}}>
                                                    Register
                                                    </Typography>
                                                </Button>
                                                :
                                                <h4>Loading</h4>
                                            }
                                        </form>
                                    </Grid>
                                </Grid>
                            </Paper>

                            <Grid item container justify="center" direction="column" className={rightClass.join(' ')} onClick={this.toggle.bind(this)}>
                                <div className="text">
                                    <Typography>

                                        {this.state.buttonText}

                                    </Typography>
                                </div>

                            </Grid>

                        </Grid>

                    </div>

                </Grid>
            </>
        );
    }
}

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
        bullet: {
            display: 'inline-block',
            margin: '0 2px',
            transform: 'scale(0.8)',
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

    })
}


Register.propTypes = {
    registerUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
    message: state.register.registerMessage,
    error: state.register.failedRegister,
    loading: state.register.processingRegister,
    user: state.auth.user
});

const mapDispatchToProps = {
    registerUser
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(withStyles(useStyles)(Register)));