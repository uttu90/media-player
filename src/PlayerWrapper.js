import React, { Component } from 'react';
import { func, string } from 'prop-types';

const MEDIA_TYPES = ['audio', 'video'];

class MediaWrapper extends Component {

  static propTypes = {
    src: string.isRequired,
    getMedia: func
  }

  constructor(props) {
    super(props);

    this.playerRef = React.createRef();
    this.player = null;
  }

  play = () => {
    this.player.play();
  }

  pause = () => {
    this.player.pause();
  }

  set currentTime(time) {
    this.player.currentTime = time;
  }

  get currentTime() {
    return this.player.currentTime;
  }

  get duration() {
    return this.player.duration;
  }

  componentDidMount() {
    const playerChildType = React.Children.only(this.props.children).type;

    // Incase the child is video or audio, just provides media src
    if (MEDIA_TYPES.includes(playerChildType)) {
      this.playerRef.current.ontimeupdate = () => {
        this.props.onTimeUpdate(this.playerRef.current.currentTime);
      }
      return this.playerRef.current.src = this.props.src;
    };

    // Else we should finding the element
    this.props.getPlayer(this.playerRef.current, this.props)
      .then(player => {
        this.player = player;
      });
  }

  render() {
    const { src, getPlayer, onTimeUpdate, ...remainProps } = this.props;
    const playerChild = React.Children.only(this.props.children);

    return React.cloneElement(playerChild, {
      ref: this.playerRef,
      ...remainProps
    })
  }
}

export default MediaWrapper;
