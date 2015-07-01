/*global __CLIENT__*/
import React from 'react';
import {Link} from 'react-router';
import {load} from '../actions/infoActions';
import {loadAll} from '../actions/movieActions';
import InfoBar from '../components/InfoBar';
if (__CLIENT__) {
  require('../styles/application.css')
}

export default class App {
  render() {
    return (
      <div className="container">
        {this.renderHeader()}
        <div className="p2">
          {this.props.children}
        </div>
      </div>
    );
  }

  renderHeader() {
    return <div className="flex flex-center border-bottom">
      <div className="flex-auto">
        <Link to="/" className="button py2 button-transparent">
          TrailerZoo
        </Link>
      </div>
      <div>
        <form>
          <input id="search" type="text" className="field-light" />
          <button className="button">Search</button>
        </form>
      </div>
    </div>
  }

  // needed so server can fetch necessary data during server-side render
  static fetchData(dispatch) {
    return dispatch(loadAll())
  }
}
