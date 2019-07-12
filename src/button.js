import React, { Component } from 'react';

export class Button extends Component {
  render() {
    return (
      <button
        className={this.props.light ? 'light-button' : 'dark-button'}
        onClick={this.props.onClick}>
        surprise me
      </button>
    );
  }
}
