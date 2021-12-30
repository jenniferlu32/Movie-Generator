import React from 'react';
import { connect } from 'react-redux'

import { getMovies, newMovie, changeRating, deleteMovie } from '../store';

//components
import Movies from './Movies';
import GenerateButton from './GenerateButton';

class Main extends React.Component {
  constructor() {
    super();
  };

  componentDidMount() {
    this.props.loadMovies();
  }

  render() {
    return (
      <div>
        <h1>Acme Movie Generator</h1>
        <GenerateButton newMovie={this.props.newMovie}/>
        <Movies
        movies={this.props.movies}
        changeRating={this.props.changeRating}
        deleteMovie={this.props.deleteMovie}
        />
      </div>
    )
  };
};

const mapStateToProps = (state) => {
  return {
    movies: state.movies
  };
};

const MapDispatchToProps = (dispatch) => {
  return {
    loadMovies: () => dispatch(getMovies()),
    newMovie: () => dispatch(newMovie()),
    changeRating: (selectedMovie, change) => dispatch(changeRating(selectedMovie, change)),
    deleteMovie: (movieId) => dispatch(deleteMovie(movieId))
  }
}

export default connect(mapStateToProps, MapDispatchToProps)(Main);
