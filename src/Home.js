import React, { Component } from 'react';

class Home extends Component {
    constructor(props) {
        super(props);
        
        let data = localStorage.getItem('recipies');

        this.state = {
            recipies: (data !== '') ? JSON.parse(data) : [],
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
                        <h1>Library Image Mini</h1>
                        {
                            (this.state.recipies.length !== 0) ? (<button className="btn btn-warning" type="button" onClick={this.clearAllData} >Clear All</button>) : null
                        }
                    </div>
                </div>

                <br/>

                <div className="row">
                    {
                        this.state.recipies.map((item, i) => {
                            return (
                                <div className="col-lg-4" key={i}>
                                    <div className="thumbnail">
                                        <a target="_blank" href={item.images} >
                                            <img className="img-responsive" src={item.images} alt="Generic" />
                                        </a>
                                    </div>
                                    <h2 className="text-center">{item.name}</h2>
                                    <div className="text-center">{item.description}</div>
                                    <div className="text-center">
                                        <ul className="list-group">
                                            {item.ingredients.map((tem, j) => {
                                                return (
                                                    <li className="list-group-item" key={i}>{tem.quantity} - {tem.ingredient}</li>
                                                );
                                            })}
                                        </ul>
                                    </div>
                                </div>
                            );
                        })
                    }
                </div>
            </div>
        );
    }
}

export default Home;