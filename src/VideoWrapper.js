import React, { Component, Fragment } from 'react';

class VideoWrapper extends Component {
  state = {
    currentTime: 0
  }

  player = React.createRef()

  onTimeUpdate = (time) => this.setState({
    currentTime: time
  })

  play = () => {
    this.player.current.play();
  }

  pause = () => {
    this.player.current.pause();
  }

  getTime = () => {
    return this.player.current.currentTime;
  }

  setTime = (time) => {
    this.player.current.currentTime = time;
  }

  getProps = (playerProps = []) => (
    playerProps.includes('currentTime') ? {
      ...playerProps.reduce((acc, prop) => ({...acc, [prop]: this[prop]}), {}),
      currentTime: this.state.currentTime
    } : playerProps.reduce((acc, prop) => ({ ...acc, [prop]: this[prop]}), {})
  )

  render() {
    return (
      <Fragment>
        {
          React.Children.map(this.props.children, child => (
            child.type.displayName === 'PlayerWrapper' ? (
              React.cloneElement(child, {
                ref: this.player,
                onTimeUpdate: this.onTimeUpdate,      
                getPlayer: this.props.getPlayer
              })
            ) : React.cloneElement(child, {
              ...this.getProps(child.props.playerProps)
            })
          ))
        }
      </Fragment>
    );
  }
}

export default VideoWrapper;