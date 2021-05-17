import React, { Component } from 'react'
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import Skeleton from "react-loading-skeleton";
// import { ScrollPanel } from '@material-ui/core';
export default class Preview extends Component {

    // constructor(props) {
    //     super(props);
    // }


    render() {
        const { selectedAccounts, imageUrl, imageAlt } = this.props;
        return (
            <>
                {/* <ScrollPanel style={{ width: '100%', height: '100%' }}> */}
                <p>Preview</p>
                <Grid container justify="center" >
                    <Grid item container justify="center">
                        <Card className="w-full" style={{ width: '38.2%' }}>

                            <Grid item className="ml-4">
                                <Skeleton circle={true} height={50} width={50} />
                            </Grid>
                            <Grid item>
                                {(!selectedAccounts || selectedAccounts.length === 0) && <Skeleton className="ml-3 mt-2" height={15} width={`30%`} />}
                                <h4 className="card-title">
                                    {selectedAccounts.map(
                                        (item, index) => {
                                            return (
                                                item.name
                                            )
                                        }
                                    )}

                                    {/* {this.state.selectedAccounts} */}
                                </h4>
                            </Grid>

                            <hr style={{ color: 'lightgray' }} />
                            <Grid item>
                                {!imageUrl && <Skeleton className="ml-4" height={260} width={350} />}
                            </Grid>
                            {imageUrl && (
                                <>
                                    <img src={imageUrl} style={{ width: '280px', height: 'auto' }} alt={imageAlt} className="displayed-image" />
                                </>
                            )}
                            <hr />
                            <Grid item className="ml-2">
                                <p className="card-channel">
                                    {(!selectedAccounts || selectedAccounts.length === 0) && <Skeleton height={15} width={`30%`} />}
                                </p>
                            </Grid>
                            <div className="card-metrics ml-2" >
                                {<Skeleton height={15} width={`50%`} />}
                                <h4 className="card-title">
                                    {selectedAccounts.map(
                                        (item, index) => {
                                            return (
                                                item.name
                                            )
                                        }
                                    )}
                                </h4>
                            </div>

                        </Card>
                    </Grid>
                </Grid>
                {/* </ScrollPanel> */}
            </>
        )
    }
}
