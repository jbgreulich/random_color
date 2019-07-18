import React, { Component } from 'react';

import ColorCard from '../ColorCard/ColorCard';

import './ColorPalette.css';

export default class ColorPalette extends Component {
  render() {
    const { arrayOfColors } = this.props;
    return (
      <div className="palette">
        {arrayOfColors.map((element, index) => <ColorCard color={element} key={index} />
        )}
      </div>
    )
  }
}
