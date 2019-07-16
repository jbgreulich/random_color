import React, { Component } from 'react';

import './ColorCard.css';

export default class ColorCard extends Component {
  render() {
    const { color } = this.props;

    return (
      <div className="colorCard">
        <div style={{
          backgroundColor: color,
          height: 150,
          width: 100
        }}>
        </div>
        <div className="colorLabel">
          <p>{color}</p>
        </div>
      </div>
    )
  }
}
