import React, { Component } from 'react'
import Button from '@material-ui/core/Button';

export default class CloudinaryWidget extends Component {


    showWidget = (widget) => {
        widget.open()
    }

    render() {
        let widget =
            // window.cloudinary.createUploadWidget({
            window.cloudinary.applyUploadWidget(document.getElementById('opener'), {
                cloudName: 'onetouch',
                sources: ['local', 'camera'],
                cropping: true,
                uploadPreset: 'ml_default'
            }, (error, result) => {
                if (!error && result && result.event === "success") {
                    console.log('Done! Here is the image info: ', result.info);
                    this.props.onUploadImage(result.info.url, result.info.id);
                }
            }
            )
        return (
            <>
                <div className="p-col-6 ">
                    <Button label="Upload files" id="upload_widget" onClick={() => this.showWidget(widget)} className="cloudinary-button p-m-1" />
                    {/* <FileUpload name="demo" auto customUpload uploadHandler={this.myUploader} url="" mode="basic" /> */}
                </div>
            </>
        )
    }
}
