import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory'

import App from './App';
import Home from './Home';
import Upload from './Upload';
import Footer from './Footer';

const history = createBrowserHistory();

ReactDOM.render(
  <Router>
    <div>
      <App />
      <Route exact path="/" component={Home} />
      <Route path="/upload" component={Upload} history={history} />
      <Footer />
    </div>
  </Router>
  ,
  document.getElementById('root')
);
