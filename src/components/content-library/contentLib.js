import React, { Component } from 'react'
import UnsplashLib from "./unsplash/unsplashLib";
import { Button, Dialog } from '@material-ui/core';

export default class ContentLib extends Component {
    constructor() {
        super();
        this.state = {
            openContentLib: false,
        }
    }

    render() {
        return (
            <div>
                <Button className="cloudinary-button p-m-1" type="button" label="Basic" onClick={(e) => this.setState({ openContentLib: true })} />
                <Dialog open={this.state.openContentLib} onClose={() => this.setState({ openContentLib: false })}>
                    <UnsplashLib />
                </Dialog>
            </div>
        )
    }
}
