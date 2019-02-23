import React, { Fragment } from 'react';

export default function PlayerControl(props) {
  return (
    <Fragment>
      <button onClick={props.play}>Play</button>
      <button onClick={props.pause}>Pause</button>
      <button onClick={() => console.log(props.getTime())}>Time</button>
      <button onClick={() => props.setTime(10)}>Seek</button>
      <span>{props.currentTime.toFixed(2)}</span>
    </Fragment>
  )
}