import React, { Component } from 'react';

class Home extends Component {
    constructor(props) {
        super(props);

        let data = localStorage.getItem('recipies');

        this.state = {
            recipies: (data !== '' && data !== null) ? JSON.parse(data) : [],
        };
        this.clearAllData = this.clearAllData.bind(this);
    }

    clearAllData() {
        localStorage.setItem('recipies', []);
        this.setState({ recipies: [] });
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <h1 className="text-center">ENQTRAN IMAGE MANAGER FREE</h1>
                    </div>
                </div>
                <br />
                <div className="row">
                    {
                        (this.state.recipies !== null && this.state.recipies !== '') ?
                            this.state.recipies.map((item, i) => {
                                let Background = item.images;

                                return (
                                    <div className="col-md-4 col-lg-4 col-sm-4 col-xs-12" key={i}>
                                        <div className="item-image">
                                            <a target="_blank" href={item.images} >
                                                <div className="thumbnailss" style={{ backgroundImage: `url(${Background})` }}>
                                                    {/*<img className="img-responsive" src={item.images} alt="Generic" />*/}
                                                </div>
                                            </a>
                                            <div className="input-group">
                                                <input type="text" className="form-control" value={item.images} readOnly />
                                                <span className="input-group-btn">
                                                    <button 
                                                    className="btn btn-success copyclipboard" 
                                                    type="button" 
                                                    data-clipboard-text={item.images} 
                                                    >Copie</button>
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })
                            : null
                    }
                </div>
            </div>
        );
    }
}

export default Home;