
import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import * as Actions from './store/actions';
import reducer from './store/reducers';
import withReducer from '../../redux/withReducer';
import {Button,Grid} from "@material-ui/core";
import {authorize} from "./store/actions/authActionCreators";

import Layout from "./layout/layout";


function MailApp(props)
{
    const dispatch = useDispatch();

    const isGapiLoaded = useSelector(state => state.mailApp.gapi.isGapiLoaded);
    const isAuthenticated = useSelector(state => state.mailApp.auth.isAuthenticated);


    useEffect(() => {
        dispatch(Actions.getFilters());
        dispatch(Actions.getFolders());
        // dispatch(Actions.getLabels());
        // if(isAuthenticated && isGapiLoaded){
        // receiveMessageList("INBOX","","","")
        // }
    }, [dispatch]);

    return (
        <>
            {isGapiLoaded &&
            <div>
                {isAuthenticated ?
                    <>

                    <Layout />
                    </>: <>
                        <div className='container outer'>
                            <div className='middle'>
                                <Grid container lg={2} sm={4}  >
                                    <div className='inner'>
                                        <Button
                                            onClick={dispatch(authorize())}
                                            className='btn-block btn-lg btn-social btn-google'
                                        >
                                            <i className='fa fa-google'/>
                                            Sign in with Google
                                        </Button>
                                    </div>
                                </Grid>
                            </div>
                        </div>
                    </>

                }
            </div>
            }

        </>
    )
}

export default withReducer('mailApp', reducer)(MailApp);

