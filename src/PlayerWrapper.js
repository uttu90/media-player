import React, { Component } from 'react';
import { func, string } from 'prop-types';

const MEDIA_TYPES = ['audio', 'video'];

class PlayerWrapper extends Component {

  static propTypes = {
    src: string.isRequired,
    getMedia: func
  }

  static displayName = 'PlayerWrapper'

  constructor(props) {
    super(props);

    this.playerRef = React.createRef();
  }

  play = () => {
    this.player.play();
  }

  pause = () => {
    this.player.pause();
  }

  get currentTime() {
    return this.player.currentTime;
  }

  set currentTime(time) {
    this.player.currentTime = time;
  }

  componentDidMount() {
    const playerChildType = React.Children.only(this.props.children).type;

    // Incase the child is video or audio, just provides media src
    if (MEDIA_TYPES.includes(playerChildType)) {
      this.player = this.playerRef.current;
    };
    
    // Else we should finding the element
    this.props.getPlayer(this.playerRef.current, this.props)
      .then(player => this.player = player);
  }

  render() {
    const { src, getPlayer, onTimeUpdate, ...remainProps } = this.props;
    const playerChild = React.Children.only(this.props.children);

    return React.cloneElement(playerChild, {
        ref: this.playerRef,
        ...remainProps,
      },
      null
    )
  }
}

export default PlayerWrapper;