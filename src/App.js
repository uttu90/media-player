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
          src="https://adtima-video-te-vnso-zn-1.zadn.vn/2019/01/157784f2-9380-4b70-8492-bc34f6c8d80b.mp4"
          getPlayer={getPlayer}
          onCanPlay={() => { console.log('ready') }}
          onPlay={() => { console.log('playing') }}
          onTimeUpdate={(time) => {console.log(time)}}
        >
          <video width={480} height={360} />
        </PlayerWrapper>
        <button onClick={this.onPlay}>play</button>
        <button onClick={this.onPause}>pause</button>
        <button onClick={this.onSeek}>seek</button>
      </div>
    );
  }
}

export default App;
