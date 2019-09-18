import React, { Component } from 'react';
import { hot } from 'react-hot-loader';

import { Button, ColorPalette } from './Components';
import * as colorMath from './utils/utils';

import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { colorPanel: [ '#000000' ] };
    this.handleClick = this.handleClick.bind(this);
    this.generateColors = this.generateColors.bind(this);
  }

  generateColors() {
    const hslArray = colorMath.generateInitColor();

    let colorsArray = [];

    colorsArray.push(colorMath.baseColorDark(hslArray));
    colorsArray.push(colorMath.baseColorLight(hslArray));
    colorsArray.push(colorMath.hsl2hex(hslArray));
    colorsArray.push(colorMath.compColorInverse(hslArray));
    colorsArray.push(colorMath.compColor(hslArray));

    this.setState({ colorPanel: colorsArray });
  }

  handleClick() {
    this.generateColors();
  }

  render() {
    return (
      <div className="container">
        <h1 className="title">a random color generator app</h1>
        <ColorPalette arrayOfColors={this.state.colorPanel} />
        <Button onClick={this.handleClick} />
      </div>
    );
  }
}

export default hot(module)(App);
