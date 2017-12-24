import React, { Component } from 'react';

class Countdown extends Component {

  constructor(props) {
    super(props);
    this.state = {
      time: 100
    }
    this.setCountDown = this.setCountDown.bind(this);
  }

  componentDidMount() {
    setInterval(this.setCountDown, 100);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ time: 0 });
  }

  setCountDown() {
    const interval = 10000 / this.props.rate;
    let time = this.state.time;
    time += interval;
    this.setState({ time: time });
  }

  render() {
    return(
      <div
        className="progress"
        style={{ width: `${this.state.time}%` }}>
      </div>
    )
  }
}

export default Countdown;
