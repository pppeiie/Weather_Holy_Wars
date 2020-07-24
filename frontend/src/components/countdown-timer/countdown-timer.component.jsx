import React from 'react';

import Countdown from 'react-countdown';

import {
  CountdownTimerContainer,
  CustomTimer,
  TimesUpText,
  RemainingTimeText,
  TimerValue,
  TimerDescription
} from './countdown-timer.styles';

const renderer = ({ minutes, seconds, completed }) =>
  completed ? (
    <TimesUpText>Times up !</TimesUpText>
  ) : (
    <CustomTimer>
      <RemainingTimeText>Remaining time to bet</RemainingTimeText>
      <TimerValue hurry={minutes === 0 && seconds < 10}>
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

const CountdownTimer = () => {
  return (
    <CountdownTimerContainer>
      <Countdown date={Date.now() + 15000} renderer={renderer} />
    </CountdownTimerContainer>
  );
};

export default CountdownTimer;
