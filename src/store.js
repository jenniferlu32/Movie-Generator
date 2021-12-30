import axios from 'axios';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
const faker = require('faker');

//action constants
const GET_MOVIES = 'GET_MOVIES';
const NEW_MOVIE = 'NEW_MOVIE';
const CHANGE_RATING = 'CHANGE_RATING';
const DELETE_MOVIE = 'DELETE_MOVIE';

//action creators
const _getMovies = (movies) => {
  return {
    type: GET_MOVIES,
    payload: movies
  };
};

const _newMovie = (newMovie) => {
  return {
    type: NEW_MOVIE,
    payload: newMovie
  };
};

const _changeRating = (updatedMovie) => {
  return {
    type: CHANGE_RATING,
    payload: updatedMovie
  };
};

const _deleteMovie = (movieId) => {
  return {
    type: DELETE_MOVIE,
    payload: movieId
  };
};

//thunks
const getMovies = () => {
  return async(dispatch) => {
    try {
      const movies = (await axios.get('/api')).data;
      dispatch(_getMovies(movies));
    } catch(err) {
      console.log(err);
    };
  };
};

const newMovie = () => {
  return async(dispatch) => {
    const movie = {
      title: faker.company.catchPhrase()
    };
    await axios.post('/api', movie);
    dispatch(_newMovie(movie));
  };
};

const changeRating = (selectedMovie, change) => {
  return async(dispatch) => {
    try {
      const movie = change > 0 ?
      {...selectedMovie, numOfStars: selectedMovie.numOfStars < 5 ? selectedMovie.numOfStars+1 : 5} :
      {...selectedMovie, numOfStars: selectedMovie.numOfStars > 1 ? selectedMovie.numOfStars-1 : 1};
      const updatedMovie = (await axios.put(`api/${movie.id}`, movie)).data;
      dispatch(_changeRating(updatedMovie));
    } catch(err) {
      console.log(err);
    }
  };
};

const deleteMovie = (movieId) => {
  return async(dispatch) => {
    await axios.delete(`/api/${movieId}`);
    dispatch(_deleteMovie(movieId));
  };
};

//reducer
const reducer = (state=[], action) => {
  if (action.type === GET_MOVIES) {
    return { movies: action.payload }
  } else if (action.type === NEW_MOVIE) {
    return { movies: [...state.movies, action.payload] }
  } else if (action.type === CHANGE_RATING) {
    let movies = state.movies.reduce((acc, movie) => {
      if (movie.id === action.payload.id) {
        acc.push(action.payload);
      } else {
        acc.push(movie);
      };
      return acc;
    }, []);
    return { movies };
  } else if (action.type === DELETE_MOVIE) {
    let movies = state.movies.filter(movie => movie.id !== action.payload);
    return { movies }
  } else {
    return state
  };
};

//store
const store = createStore(reducer, applyMiddleware(thunk));

export default store;
export { getMovies, newMovie, changeRating, deleteMovie };
