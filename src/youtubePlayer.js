import { loadJS } from './utils';

export default function(playerRef, props) {
  loadJS('https://www.youtube.com/iframe_api', 'youtubeAPI');
  return new Promise((resolve) => {
    let animationFrame = null;
    window.onYouTubeIframeAPIReady = () => {
      const player = new window.YT.Player(playerRef, {
        height: '390',
        width: '640',
        playerVars: {
          controls: 0,
          enablejsapi: 0,
          origin: 'http://localhost:3000'
        },
        videoId: props.src,
        events: {
          'onStateChange': (event) => {
            switch (event.data) {
              case window.YT.PlayerState.PLAYING:
                props.onPlay && props.onPlay();
                getTime();
                break;
              case window.YT.PlayerState.PAUSED:
                props.onPause && props.onPause();
                stopGettingTime();
                break;
              case window.YT.PlayerState.ENDED:
                props.onEnded && props.onEnded();
                stopGettingTime();
                break;
              case window.YT.PlayerState.CUED:
                props.onDurationChange && props.onDurationChange(player.getDuration());
                break;
              default:
                break;
            }
          }
        }
      });

      const getTime = () => {
        animationFrame = requestAnimationFrame(getTime);
        props.onTimeUpdate && props.onTimeUpdate(player.getCurrentTime());
      };

      const stopGettingTime = () => {
        cancelAnimationFrame(animationFrame);
      }

      resolve({
        play() {
          player.playVideo();
        },
        pause() {
          player.pauseVideo();
        },
        set currentTime(time) {
          player.seekTo(time);
          props.onTimeUpdate && props.onTimeUpdate(time);
          stopGettingTime();
        },
        get currentTime() {
          return player.getCurrentTime();
        }
      });
    }
  })
}