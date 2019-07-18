import React, { Component } from 'react';
import { hot } from 'react-hot-loader';

import { Button, ColorPalette } from './components';

import './App.css';

const hexValues = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F'];

function randomHexVal() {
  const index = Math.floor(Math.random() * 16);
  return hexValues[index];
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { colorPanel: [ '#000000' ] };
    this.handleClick = this.handleClick.bind(this);
    this.generateColors = this.generateColors.bind(this);
  }

  generateColors() {
    // create hex value
    let hexArray = [];
    let colorString;

    for (let i=0; i<6; i++) {
      hexArray.push(randomHexVal());
    }
    colorString = `#${hexArray.join('')}`;

    // create base color array
    let colorsArray = [];

    colorsArray.push(colorString);
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
