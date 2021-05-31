import React, { Component } from 'react'
import { connect } from 'react-redux'
import Unsplash, { toJson } from 'unsplash-js';
import {Button, Card, TextField, Grid, Paper, Hidden, IconButton, Icon, Input} from '@material-ui/core';
import Spin from '../../misc/progress-spinner/Spin';
import * as Actions from "../../mail/store/actions";
const unsplash = new Unsplash({ accessKey: process.env.REACT_APP_UNSPLASH_ACCESS_KEY });

class UnsplashLib extends Component {
    constructor() {
        super();
        this.state = {
            query: '',
            loading: '',
            photos: [],
        }
    }

    searchPhotos = async (e) => {
        e.preventDefault();
        this.setState({ loading: true })
        // orientation: "portrait", color: "green"
        unsplash.search.photos(this.state.query, 1, 20, {})
            .then(toJson)
            .then(json => {
                this.setState({ photos: json.results });
                setTimeout(() => { this.setState({ loading: false }) }, 3000);
            });

    }

    handlePostNow = url => {
        this.props.onImageClick(url.currentTarget.dataset.src, url.currentTarget.dataset.alt);
    }

    render() {
        return (
            <>
                <div className="flex flex-1">
                    <Paper className="bg-lightBlue-600 flex items-center w-full h-36 sm:h-56 p-8 pl-4 md:pl-16 rounded-8 " elevation={1}>

                        <Icon color="action">search</Icon>

                        <Input
                            placeholder="Search"
                            className="pl-16"
                            disableUnderline
                            fullWidth
                            value={this.state.query}
                            inputProps={{
                                'aria-label': 'Search'
                            }}
                            onChange={ev => alert(ev)}
                        />
                    </Paper>
                </div>


                <div className="testBackground " >
                    <Card style={{ margin: '1em' }}>

                        {/* <Tab className="Tab-custom" style={{ height: '100vh', overflow: 'hidden' }}> */}
                        {/* <TabPanel header="Unsplash" leftIcon="pi pi-calendar"> */}
                        <div >
                            <form onSubmit={this.searchPhotos}>
                                <span className="p-input-icon-left">
                                    <i className="pi pi-search" />
                                    <TextField fullWidth size="medium" style={{ fontSize: '240px' }} value={this.state.query} onChange={(e) => this.setState({ query: e.target.value })} placeholder="Search" />
                                </span>
                                <Button label="Search" type="submit" />
                            </form>
                        </div>
                        {this.state.loading &&
                            <Grid container justify="center" alignItems="center" style={{ height: '100vh' }}>
                                <Spin />
                            </Grid>
                        }
                        {!this.state.loading &&
                            <div className="contain">
                                <div className="card-list">
                                    {
                                        this.state.photos.map((pic, index) =>
                                            <>
                                                <div className="card-unsplash " key={index} >
                                                    <img
                                                        className="card--image"
                                                        alt={pic.alt_description}
                                                        src={pic.urls.small}
                                                        data-src={pic.urls.small}
                                                        data-alt={pic.alt_description}
                                                        width="30%"
                                                        height="30%"
                                                        onClick={this.handlePostNow}
                                                    />
                                                </div>

                                            </>
                                        )
                                    }



                                </div>
                            </div>
                        }
                        {/* </TabPanel> */}

                        {/* </Tab> */}

                    </Card>
                </div>

            </>
        )
    }
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(UnsplashLib)
