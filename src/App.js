import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
import './App.css';

import { Button } from './Button';

class App extends Component {
  constructor(props) {
  	super(props);
    this.state = { color: [256, 256, 256] };
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    this.applyColor();
  }

  componentDidUpdate(prevProps, prevState) {
    this.applyColor();
  }

  formatColor(ary) {
    return 'rgb(' + ary.join(', ') + ')';
  }

  isLight() {
    const rgb = this.state.color;
    return rgb.reduce((a,b) => a+b) < 127 * 3;
  }

  applyColor() {
    const color = this.formatColor(this.state.color);
    document.body.style.backgroundColor = color;
  }

  chooseColor() {
    const random = [];
    for (let i = 0; i < 3; i++) {
      random.push(Math.floor(Math.random()*256));
    }
    return random;
  }

  handleClick() {
    this.setState({
      color: this.chooseColor()
    });
  }

  render() {
    return (
      <div>
        <h1 className={this.isLight() ? 'white' : 'black'}>a random color generator app
        </h1>
        <Button light={this.isLight()} onClick={this.handleClick} />
      </div>
    );
  }
}

export default hot(module)(App);
