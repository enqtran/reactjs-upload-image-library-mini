import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import request from 'superagent';
import Ingredient from './Ingredient';
import IngredientList from './IngredientList';

const CLOUDINARY_UPLOAD_PRESET = 'lnmbsj4r';
const CLOUDINARY_UPLOAD_URL = 'https://api.cloudinary.com/v1_1/enqtran/upload';

class Upload extends Component {
    constructor(props) {
        super(props);
        let data = localStorage.getItem('recipies');

        this.state = {
            recipies: (data !== '' && data !== null) ? JSON.parse(data) : [],
            newRecipie: {
                name: 'New Recipie',
                description: 'Description',
                ingredients: []
            },
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
    }

    upLoadImage() {
        if (this.state.uploadedFileCloudinaryUrl !== '' && this.name.value !== '' && this.description.value !== '') {
            let newRecipie = this.state.newRecipie;
            newRecipie.name = this.name.value;
            newRecipie.description = this.description.value;
            newRecipie.images = this.state.uploadedFileCloudinaryUrl;
            this.setState({ newRecipie });

            let recipies = this.state.recipies;
            recipies.push(newRecipie);

            this.setState({ recipies });
            localStorage.setItem('recipies', JSON.stringify(recipies));
            this.props.history.push('/');
        } else {
            alert('Missing content & image !');
        }
    }

    addIngredient(quantity, ingredient) {
        let newRecipie = this.state.newRecipie;
        newRecipie.ingredients.push({ quantity, ingredient });
        this.setState({ newRecipie });
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <h1>Upload</h1>
                        <form>
                            <div className="form-group">
                                <div className="row">
                                    <div className="col-md-4">
                                        {(this.state.uploaded === false) ? (<Dropzone
                                            multiple={false}
                                            accept="image/*"
                                            onDrop={this.onImageDrop}>
                                            <p className="text-center">Drop an image or click to select a file to upload.</p>
                                        </Dropzone>) : (<div>Uploading...</div>)}

                                    </div>
                                    <div className="col-md-8">
                                        <div >
                                            {this.state.uploadedFileCloudinaryUrl === '' ? null :
                                                <div>
                                                    <p>{this.state.uploadedFile.name}</p>
                                                    <img className="img-responsive" src={this.state.uploadedFileCloudinaryUrl} alt={this.state.uploadedFile.name} />
                                                </div>}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="clearfix"></div>

                            <div className="form-group">
                                <label htmlFor="name">Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="name"
                                    placeholder="Name"
                                    ref={(input) => { this.name = input }}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="description">Description</label>
                                <textarea
                                    className="form-control"
                                    id="description"
                                    placeholder="Enter a brief description"
                                    ref={(input) => { this.description = input }}
                                />
                            </div>

                            <Ingredient addIngredient={(quantity, ingredient) => { this.addIngredient(quantity, ingredient) }} />

                            <IngredientList recipie={this.state.newRecipie} />

                            <button type="button" onClick={this.upLoadImage} className="btn btn-primary">Upload</button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default Upload;
