import React from 'react';

export default class Movies extends React.Component {
  constructor() {
    super();
  };

  render() {
    const { movies } = this.props;
    return (
      <div>
        <ul>
        {
          movies && movies.sort((movie1, movie2) => movie1.title.localeCompare(movie2.title) )
          .map(movie => {
            return ([
              <li key={movie.id+'title'}>{movie.title} ({movie.numOfStars})</li>,
              <button key={movie.id+'+'} onClick={() => this.props.changeRating(movie, 1)}>+</button>,
              <button key={movie.id+'-'} onClick={() => this.props.changeRating(movie, -1)}>-</button>,
              <button key={movie.id+'x'} onClick={() => this.props.deleteMovie(movie.id)}>x</button>
            ])
          })
        }
        </ul>
      </div>
    );
  };
};
