import React from 'react';
import { newMovie } from '../store';

export default class GenerateButton extends React.Component {
  constructor() {
    super();
  };

  async newMovie() {
    await this.props.newMovie();
  }

  render() {
    return (
      <div>
        <button onClick={() => this.newMovie()}>Generate Movie</button>
      </div>
    )
  };
};
