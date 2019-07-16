import React, { Component } from 'react';

import ColorCard from '../ColorCard/ColorCard';

import './ColorPalette.css';

export default class ColorPalette extends Component {
  constructor(props) {
    super(props);
    this.state = { colors: [] };
    this.applyColor = this.applyColor.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (this.props.baseColor !== prevProps.baseColor) {
      this.applyColor();
    }
  }

  applyColor() {
    const { baseColor } = this.props;
    const { colors } = this.state;
    colors.push(baseColor);
    this.setState({colors});
  }

  render() {
    // console.log(this.state.colors);
    const { colors } = this.state;
    return (
      <div className="palette">
        {colors.map((element, index) => <ColorCard color={element} key={index} />
        )}
      </div>
    )
  }
}
