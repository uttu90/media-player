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
  }

  componentDidMount() {
    const playerChildType = React.Children.only(this.props.children).type;

    // Incase the child is video or audio, just provides media src
    if (MEDIA_TYPES.includes(playerChildType)) {
      this.play = function() { 
        this.playerRef.current.play()
      };
      this.pause = function() {
        this.playerRef.current.pause()
      };
      this.seekTo = function(time) {
        this.playerRef.current.currentTime = time;
      };
      this.playerRef.current.ontimeupdate = () => {
        this.props.onTimeUpdate(this.playerRef.current.currentTime);
      }
      return this.playerRef.current.src = this.props.src;  
    };
    
    // Else we should finding the element
    this.props.getPlayer(this.playerRef.current, this.props)
      .then(player => {
        this.play = function() {
          player.play()
        };
        this.pause = function() {
          player.pause()
        };
        this.seekTo = function(time) {
          player.setTime(time);
        }
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