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
    this.state = { initialColor: '#ffffff' };
    this.handleClick = this.handleClick.bind(this);
    this.generateRandColor = this.generateRandColor.bind(this);
  }

  generateRandColor() {
    let colorArray = [];
    let colorString;
    for (let i=0; i<6; i++) {
      colorArray.push(randomHexVal());
    }
    colorString = `#${colorArray.join('')}`;
    this.setState({ initialColor: colorString });
  }

  handleClick() {
    this.generateRandColor();
  }

  render() {
    const { initialColor } = this.state;
    return (
      <div className="container">
        <h1 className="title">a random color generator app</h1>
        <ColorPalette baseColor={initialColor} />
        <Button onClick={this.handleClick} />
      </div>
    );
  }
}

export default hot(module)(App);
