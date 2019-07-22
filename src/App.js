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
    this.complementaryColor = this.complementaryColor.bind(this);
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
    const compColor = this.complementaryColor(colorsArray);
    colorsArray.push(compColor);
    this.setState({ colorPanel: colorsArray });
  }

  complementaryColor(hexVal) {
    // convert hex value to rgb

    console.log(hexVal + ' hexVal');
    hexVal = hexVal.toString().match(/[A-F0-9]{2}/g).map(value => (parseInt(value, 16)));

    let red = hexVal[0] / 255;
    let green = hexVal[1] / 255;
    let blue = hexVal[2] / 255;

    let max = Math.max(red, green, blue);
    let min = Math.min(red, green, blue);

    // convert rgb to hsl and find inverse

    let hue;
    let sat;
    let light = (max + min) / 2;

    if (max == min) {
      hue = 0;
      sat = 0;
    } else {
      let diff = max - min;
      sat = diff / (1 - Math.abs(2 * light - 1));
      switch (max) {
        case red:
          hue = (green - blue) / diff + (green < blue ? 6 : 0);
          break;
        case green:
          hue = (blue - red) / diff + 2;
          break;
        case blue:
          hue = (red - green) / diff + 4;
          break;
      }
    }

    hue = Math.round(hue * 60) + 180;
    if (hue > 360) {
      hue -= 360;
    }
    sat = Math.round(sat * 100);
    light = Math.round(light * 100);

    hexVal = [ hue, sat, light];
    console.log(hexVal + ' hsl');

    // convert hsl to rgb

    hue /= 360;
    sat /= 100;
    light /= 100;

    if (sat === 0) {
      red = green = blue = light;
    } else{
      let hsl2rgb = (x, y, z) => {
        if(z < 0) z += 1;
        if(z > 1) z -= 1;
        if(z < 1/6) return x + (y - x) * 6 * z;
        if(z < 1/2) return y;
        if(z < 2/3) return x + (y - x) * (2/3 - z) * 6;
        return x;
      }
      let y = light < 0.5 ? light * (1 + sat) : light + sat - light * sat;
      let x = 2 * light - y;
      red = hsl2rgb(x, y, hue + 1/3);
      green = hsl2rgb(x, y, hue);
      blue = hsl2rgb(x, y, hue - 1/3);
    }

    // convert rgb to hex color

    return hexVal = '#' + [red, green, blue].map(val => Math.round(val * 255).toString(16).padStart(2, 0)).join('').toUpperCase();
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
