import React, { Component } from 'react'
import { connect } from 'react-redux'
import InstagramGrid from './InstagramGrid'

export class InstaFeed extends Component {

    constructor() {
        super();
        this.state = {
        }

    }



    render() {
        return (

            <>
                {/* {this.props.media.map((item, index) => { */}

                <InstagramGrid imagesArray={this.props.media} />

                {/* // <div key={index} className="p-col-12 p-lg-4"> */}
                {/* //     <div style={{ minHeight: '300px' }}> */}
                {/* //         <img src={item.node.display_url} width="100%" style={{ maxHeight: '300px', objectFit: 'cover' }} /> */}
                {/* //     </div> */}
                {/* // </div> */}

                {/* })} */}
            </ >
        )
    }
}

const mapStateToProps = (state) => ({
    media: state.ig_basic_media.ig_basic_media.edge_owner_to_timeline_media.edges
})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(InstaFeed)
