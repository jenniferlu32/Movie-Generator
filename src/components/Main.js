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
    const { movies, newMovie, changeRating, deleteMovie } = this.props;
    const numOfMovies = movies && movies.length;
    const sumOfRatings = movies && movies.reduce((acc, movie) => {
      acc += movie.numOfStars;
      return acc;
    }, 0);
    const ratingAvg = Math.round((sumOfRatings/numOfMovies)*100)/100;
    return (
      <div>
        <h1>Acme Movie Generator ({numOfMovies})</h1>
        <p>The average movie rating is {ratingAvg}</p>
        <GenerateButton newMovie={newMovie}/>
        <Movies
        movies={movies}
        changeRating={changeRating}
        deleteMovie={deleteMovie}
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
