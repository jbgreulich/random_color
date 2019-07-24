import React, { Component } from 'react';
import { hot } from 'react-hot-loader';

import { Button, ColorPalette } from './components';

import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { colorPanel: [ '#000000' ] };
    this.handleClick = this.handleClick.bind(this);
    this.generateColors = this.generateColors.bind(this);
    this.hsl2hsv = this.hsl2hsv.bind(this);
    this.hsl2hex = this.hsl2hex.bind(this);
    this.compColor = this.compColor.bind(this);
    this.compColorInverse = this.compColorInverse.bind(this);
    this.baseColorDark = this.baseColorDark.bind(this);
    this.baseColorLight = this.baseColorLight.bind(this);
  }

  generateColors() {
    // create hsl value
    let hslArray = [];
    hslArray.push(Math.floor(Math.random()*360));
    for (let i = 0; i < 2; i++) {
      hslArray.push( parseFloat( Math.random().toFixed(4) ) );
    }

    // create color array
    let colorsArray = [];

    colorsArray.push(this.baseColorDark(hslArray));
    colorsArray.push(this.baseColorLight(hslArray));
    colorsArray.push(this.hsl2hex(hslArray));
    colorsArray.push(this.compColorInverse(hslArray));
    colorsArray.push(this.compColor(hslArray));

    this.setState({ colorPanel: colorsArray });
  }

  hsl2hsv(hue, sat, light) {
    const val = light + (sat * Math.min(light , 1 - light));
    const saturation = val ? 2 - ((2 * light) / val) : 0;

    return [hue, saturation, val];
  }

  hsv2hsl(hue, sat, val) {
    const light = val - val * sat / 2;
    const m = Math.min(light, 1 - light);
    const saturation = m ? (val - light) / m : 0

    return [hue, saturation, light];
  }

  hsl2hex(hslVal) {
    let hue = hslVal[0];
    let sat = hslVal[1];
    let light = hslVal[2];

    hue /= 360;

    let red, green, blue;

    if (sat === 0) {
      red = green = blue = light;
    } else {
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
    return hslVal = '#' + [red, green, blue].map(val => Math.round(val * 255).toString(16).padStart(2, 0)).join('').toUpperCase();
  }

  compColor(baseVal) {
    let hue = baseVal[0];
    const sat = baseVal[1];
    const light = baseVal[2];

    hue = (hue + 180) % 360;

    return this.hsl2hex([hue, sat, light]);
  }

  compColorInverse(baseVal) {
    let hue = baseVal[0];
    let sat = baseVal[1];
    let light = baseVal[2];

    hue = (hue + 180) % 360;

    const hsvArray = this.hsl2hsv(hue, sat, light);

    let value = hsvArray[2];

    sat = Math.min(1, hsvArray[1] + .2);

    if (value >= .5) {
      value = Math.max(0, value - .3);
    } else {
      value = Math.min(1, value + .3);
    }

    const hslArray = this.hsv2hsl(hue, sat, value);
    
    return this.hsl2hex([hslArray[0], hslArray[1], hslArray[2]]);
  }

  baseColorDark(baseVal) {
    let hue = baseVal[0];
    let sat = baseVal[1];
    let light = baseVal[2];

    const hsvArray = this.hsl2hsv(hue, sat, light);

    sat = Math.min(1, hsvArray[1] + .1);
    let v = hsvArray[2];
    console.log(v, 'v');
    let value;

    if (v >= .5) {
      value = Math.max(0, v - .3);
    } else {
      value = Math.min(1, v + .3);
    }

    const hslArray = this.hsv2hsl(hue, sat, value);

    return this.hsl2hex([hslArray[0], hslArray[1], hslArray[2]]);
  }

  baseColorLight(baseVal) {
    let hue = baseVal[0];
    let sat = baseVal[1];
    let light = baseVal[2];

    const hsvArray = this.hsl2hsv(hue, sat, light);

    sat = Math.max(0, hsvArray[1] - .1);
    let value = 1;

    const hslArray = this.hsv2hsl(hue, sat, value);

    return this.hsl2hex([hslArray[0], hslArray[1], hslArray[2]]);
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
