import React from "react";
import './styles.css';
import { Button, Dialog, Card, Grid } from "@material-ui/core";
import { delCurrMedia } from "../../../redux/ducks/igMedia/igMediaOps";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import Slide from '@material-ui/core/Slide';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />;
});

class InstagramGrid extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            classNameSuffix: "",
            modalImgIndex: -1,
            images: this.props.imagesArray || [
                "http://via.placeholder.com/100",
                "http://via.placeholder.com/150",
                "http://via.placeholder.com/200",
                "http://via.placeholder.com/250",
                "http://via.placeholder.com/300",
                "http://via.placeholder.com/350"
            ],
            openImageDialog: false,
        };
        console.log(this.state.images);
        this.handleModalClose = this.handleModalClose.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
        this.handleNextImg = this.handleNextImg.bind(this);
        this.handlePrevImg = this.handlePrevImg.bind(this);
        this.deleteCurrentImg = this.deleteCurrentImg.bind(this);
    }

    handleNextImg() {
        this.setState({
            modalImgIndex: (this.state.modalImgIndex + 1) % this.state.images.length
        });
    }

    handlePrevImg() {
        this.setState({
            modalImgIndex:
                (this.state.modalImgIndex - 1 + this.state.images.length) %
                this.state.images.length
        });
    }

    deleteCurrentImg() {
        const currId = this.state.images[this.state.modalImgIndex].node.id
        this.props.delCurrMedia(currId);
    }

    handleKeyPress(e) {
        switch (e.keyCode) {
            case 27:
                // ESC key
                this.handleModalClose();
                break;
            case 39:
                // right arrow
                this.handleNextImg();
                break;
            case 37:
                // left arrow
                this.handlePrevImg();
                break;
            default:
                break;
        }
    }

    componentDidMount() {
        document.addEventListener("keydown", this.handleKeyPress, false);
    }

    componentWillUnmount() {
        document.removeEventListener("keydown", this.handleKeyPress, false);
    }

    renderModal() {
        if (this.state.modalImgIndex > -1) {
            return (
                <>
                    <Dialog fullScreen className="overflow-y-hidden" open={this.state.openImageDialog} onClose={this.handleModalClose} TransitionComponent={Transition} >
                        {/* <div className={`instagram-modal-viewport ${this.state.classNameSuffix}`}
                    > */}
                        <div
                            className="modal-close-bar-container"
                            onClick={this.handleModalClose}
                        >
                            <div className="close-bar-left"></div>
                            <div className="close-bar-right"></div>
                        </div>

                        <Grid container className="ml-36">
                            {/* modal-image-container */}
                            <Grid item xl={4} lg={4} md={12} >
                                <img
                                    src={this.state.images[this.state.modalImgIndex].node.display_url}
                                    alt="Img"
                                    mediaId={this.state.images[this.state.modalImgIndex].node.id}
                                    className="modal-image"
                                />
                            </Grid>
                            <Grid item xl={2} lg={4} md={12} className="ml-12" >
                                <h1>Likes:  {this.state.images[this.state.modalImgIndex].node.edge_media_preview_like.count}</h1>
                            </Grid>
                            <Grid item xl={2} lg={3} md={12}>
                                <h1>Comments: {this.state.images[this.state.modalImgIndex].node.edge_media_to_comment.count}</h1>
                            </Grid>
                            <Grid item xl={2} lg={2} md={6} className="mt-32">
                                <Button onClick={() => this.deleteCurrentImg()} variant="contained">Delete</Button>
                            </Grid>
                        </Grid>


                        <div
                            onClick={this.handlePrevImg}
                            className="modal-image-nav-container prev"
                        >
                            {"<"}

                        </div>

                        {/* </div> */}
                        <div
                            onClick={this.handleNextImg}
                            className="modal-image-nav-container next"
                        >
                            {">"}
                        </div>
                    </Dialog>

                </>
            );
        }
    }

    handleModalClose() {
        this.setState({ openImageDialog: false })
    }

    handleImgClick(imgIndex) {
        this.setState({
            modalImgIndex: imgIndex,
            classNameSuffix: "",
            openImageDialog: true,
        });
    }

    render() {
        return (
            <div className="insta-grid-parent-wrapper">
                {this.renderModal()}
                <section className="insta-grid-wrapper">
                    <div className="insta-grid">
                        <div class="flex flex-wrap justify-center">
                            {this.state.images.length > 0 && this.state.images.map((image, i) => {
                                return (
                                    <>
                                        <Card className="p-2">

                                            <div
                                                key={i}
                                                className="insta-grid-pic-viewport"
                                                onClick={() => this.handleImgClick(i)}
                                            >
                                                <img
                                                    src={image.node.display_url}
                                                    alt="Img"
                                                    className="insta-grid-pic-viewport-img"
                                                />
                                            </div>
                                        </Card>
                                    </>
                                );
                            })}
                        </div>
                    </div>
                </section>
            </div>
        );
    }
}

InstagramGrid.propTypes = {
    delCurrMedia: PropTypes.func.isRequired,
};
const mapStateToProps = state => ({

});
export default connect(
    mapStateToProps,
    { delCurrMedia }
)(InstagramGrid)