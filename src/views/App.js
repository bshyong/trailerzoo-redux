/*global __CLIENT__*/
import React from 'react';
import {Link} from 'react-router';
import {load} from '../actions/infoActions';
import InfoBar from '../components/InfoBar';
if (__CLIENT__) {
  require('../styles/application.css')
}

export default class App {
  render() {
    return (
      <div className="container p2">
        <div>
          <h1>TrailerZoo</h1>
        </div>
        <nav className="navbar navbar-default">
          <div>
            <ul>
              <li className="inline-block px1"><Link to="/">Home</Link></li>
              <li className="inline-block px1"><Link to="/sign-up">Sign Up</Link></li>
              <li className="inline-block px1"><Link to="/login">Login</Link></li>
            </ul>
          </div>
        </nav>
        <InfoBar/>
        <div className="app-content">
          {this.props.children}
        </div>
      </div>
    );
  }

  static fetchData(dispatch) {
    return dispatch(load());
  }
}
