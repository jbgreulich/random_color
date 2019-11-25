import React, { Component } from 'react';

import './ColorCard.css';

export default class ColorCard extends Component {
  render() {
    const { color } = this.props;

    return (
      <div className="colorCard">
        <div className="colorContainer" style={{
          backgroundColor: color
        }}>
        </div>
        <div className="colorLabel">
          <p>{color}</p>
        </div>
      </div>
    )
  }
}
