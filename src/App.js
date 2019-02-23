import React, { Component } from 'react';
import VideoWrapper from './VideoWrapper';
import PlayerWrapper from './PlayerWrapper';
import PlayerControl from './PlayerControl';
import getPlayer from './youtubePlayer';

class App extends Component {

  render() {
    return (
      <div className="App">
        <VideoWrapper getPlayer={getPlayer}>
          <div>Youtube player demo</div>
          <PlayerWrapper
            src="9_pIaI93YGY"
          >
            <div />
          </PlayerWrapper>
          <br />
          <PlayerControl playerProps={['currentTime', 'play', 'pause', 'getTime', 'setTime']} />
        </VideoWrapper>
      </div>
    );
  }
}

export default App;
