import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import request from 'superagent';

const CLOUDINARY_UPLOAD_PRESET = 'lnmbsj4r';
const CLOUDINARY_UPLOAD_URL = 'https://api.cloudinary.com/v1_1/enqtran/upload';

class Upload extends Component {
    constructor(props) {
        super(props);
        let data = localStorage.getItem('recipies');

        this.state = {
            recipies: (data !== '' && data !== null) ? JSON.parse(data) : [],
            newRecipie: {},
            uploadedFileCloudinaryUrl: '',
            uploaded: false
        };

        this.upLoadImage = this.upLoadImage.bind(this);
        this.onImageDrop = this.onImageDrop.bind(this);
    }

    onImageDrop(files) {
        this.setState({
            uploadedFile: files[0],
            uploaded: true,
        });

        this.handleImageUpload(files[0]);
    }

    handleImageUpload(file) {
        if (file !== undefined) {
            let upload = request.post(CLOUDINARY_UPLOAD_URL)
                .field('upload_preset', CLOUDINARY_UPLOAD_PRESET)
                .field('file', file);

            upload.end((err, response) => {
                if (err) {
                    console.error(err);
                }

                if (response.body.secure_url !== '') {
                    this.setState({
                        uploadedFileCloudinaryUrl: response.body.secure_url,
                        uploaded: false,
                    });
                }
            });
        } else {
            this.setState({
                uploaded: false,
            });
            alert('File not is image');
        }
    }

    upLoadImage() {
        if (this.state.uploadedFileCloudinaryUrl !== '') {
            let newRecipie = this.state.newRecipie;
            newRecipie.images = this.state.uploadedFileCloudinaryUrl;
            this.setState({ newRecipie });

            let recipies = this.state.recipies;
            recipies.unshift(newRecipie);

            this.setState({ recipies });
            localStorage.setItem('recipies', JSON.stringify(recipies));
            this.props.history.push('/');
        } else {
            alert('Missing image !');
        }
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <h1>UPLOAD IMAGE</h1>
                        <form>
                            <div className="form-group">
                                <div className="row">
                                    <div className="col-md-6">
                                        {
                                            (this.state.uploaded === false) ? (<Dropzone
                                                className="upload-from"
                                                multiple={false}
                                                accept="image/*"
                                                onDrop={this.onImageDrop}>
                                                <p className="text-center">Drop an image or click to select a file to upload.</p>
                                            </Dropzone>)
                                                : (<div className="upload-from text-center"><img src="loading.gif" alt="loading" /></div>)
                                        }

                                    </div>
                                    <div className="col-md-6">
                                        <div >
                                            {this.state.uploadedFileCloudinaryUrl === '' ? null :
                                                <div>
                                                    <img className="img-responsive full-img" src={this.state.uploadedFileCloudinaryUrl} alt={this.state.uploadedFile.name} />
                                                    <p>Image name: {this.state.uploadedFile.name}</p>
                                                </div>
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="clearfix"></div>

                            <button type="button" onClick={this.upLoadImage} className="btn btn-primary btn-lg">Upload</button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default Upload;
