/*global __CLIENT__*/
import React, {PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'redux/react';
import * as movieActions from '../actions/movieActions';

class MoviesPage {
  static propTypes = {
    movies: PropTypes.array,
    loadAll: PropTypes.func.isRequired,
    pageInfo: PropTypes.object
  }

  render() {
    const { movies, dispatch } = this.props
    return (
      <div className="p2">
        {movies.map(m => this.renderMovie(m))}
      </div>
    );
  }

  renderMovie(movie) {
    return <div className="flex p2" key={movie.id}>
      <div className="flex-none"
        style={{minHeight: '33vh',
        minWidth: '22vh',
        background: `url(${movie.thumbnailUrl}) no-repeat center`,
        backgroundSize: 'cover'}}>
      </div>
      <div className="flex-auto px2">
        <h4>{movie.title}</h4>
        <p>
          <a href={movie.videoUrl}>{movie.videoUrl}</a>
        </p>
        <p>
          {movie.publishedAt}
        </p>
      </div>
    </div>
  }
}

@connect(state => ({
  movies: state.movies.movies,
  pageInfo: state.movies.pageInfo
}))
export default class MoviesPageContainer {
  static propTypes = {
    movies: PropTypes.array.isRequired,
    dispatch: PropTypes.func.isRequired
  }

  render() {
    const { movies, dispatch } = this.props;
    return <MoviesPage {...this.props} {...bindActionCreators(movieActions, dispatch)}/>;
  }
}
