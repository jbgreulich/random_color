import React, { Component } from 'react';

import './Button.css';

export default class Button extends Component {
  render() {
    const { onClick } = this.props;
    return (
      <button className="button"
        onClick={onClick}>
        surprise me
      </button>
    );
  }
}
