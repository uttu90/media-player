import React, { Component } from 'react';
import PlayerWrapper from './PlayerWrapper';
import getPlayer from './youtubePlayer';

class App extends Component {

  onPlay = () => {
    this.refs.player.play();
  }

  onPause = () => {
    this.refs.player.pause();
  }

  onSeek = () => {
    this.refs.player.currentTime = 10;
  }

  render() {
    return (
      <div className="App">
        <PlayerWrapper
          ref="player"
          src="lb_3P0evc60"
          getPlayer={getPlayer}
          onCanPlay={() => { console.log('ready') }}
          onPlay={() => { console.log('playing') }}
          onTimeUpdate={(time) => {console.log(time)}}
        >
          <div />
        </PlayerWrapper>
        <button onClick={this.onPlay}>play</button>
        <button onClick={this.onPause}>pause</button>
        <button onClick={this.onSeek}>seek</button>
      </div>
    );
  }
}

export default App;
