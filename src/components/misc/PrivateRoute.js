import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import Layout from "./layout/layout";
import {AppBar, Toolbar, Typography} from "@material-ui/core";

const PrivateRoute = ({ component: Component, user, ...rest }) => (
    <Route
        {...rest}
        render={props =>
            user ? (
                <>

                    <Layout {...props}>
                        <AppBar position="static">
                            <Toolbar >
                                <Typography variant="h5" color="inherit">
                                    {"OneTouch"}
                                </Typography>
                            </Toolbar>
                        </AppBar>
                        <Component {...props}/>
                    </Layout>
                </>
            ) : (
                    <Redirect to="/Login" />
                )
        }
    />
);

const mapStateToProps = state => ({
    user: state.auth.user
});
export default connect(mapStateToProps)(PrivateRoute);