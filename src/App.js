import React, { Component } from 'react';
import {
  NavLink
} from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <div className="wapper">
        <div className="navbar-wrapper">
          <div className="container-fliud">
            <nav className="navbar navbar-inverse navbar-static-top">
              <div className="container">

                <div className="navbar-header">
                  <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
                    <span className="sr-only">Toggle navigation</span>
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                  </button>
                  <a className="navbar-brand" href="/">Love Girl</a>
                </div>

                <div id="navbar" className="navbar-collapse collapse">
                  <ul className="nav navbar-nav">
                    <li><NavLink exact activeClassName="active" to="/">Home</NavLink></li>
                    <li><NavLink activeClassName="active" to="/upload">Upload</NavLink></li>
                  </ul>
                </div>

              </div>
            </nav>
          </div>
        </div>
      </div>

    );
  }
}

export default App;
