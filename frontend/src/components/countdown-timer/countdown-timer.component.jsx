import React from 'react';

import Countdown from 'react-countdown';

import ReadyAnnouncement from '../ready-announcement/ready-announcement.component';

import {
  CountdownTimerContainer,
  CustomTimer,
  RemainingTimeText,
  TimerValue,
  TimerDescription
} from './countdown-timer.styles';

const renderer = ({ minutes, seconds, completed, props: { transactionIndex } }) =>
  completed ? (
    <ReadyAnnouncement transactionIndex={transactionIndex} />
  ) : (
    <CustomTimer>
      <RemainingTimeText>Result is available in</RemainingTimeText>
      <TimerValue hurry={minutes === 0 && seconds < 11}>
        {minutes < 10 ? 0 : null}
        {minutes}:{seconds < 10 ? 0 : null}
        {seconds}
      </TimerValue>
      <TimerDescription>
        <span>MINUTES</span>
        <span>SECONDS</span>
      </TimerDescription>
    </CustomTimer>
  );

const CountdownTimer = ({ remainingTime, transactionIndex }) => (
  <CountdownTimerContainer>
    <Countdown
      date={Date.now() + remainingTime}
      renderer={renderer}
      transactionIndex={transactionIndex}
    />
  </CountdownTimerContainer>
);

export default CountdownTimer;
