import styled from 'styled-components';

export const CountdownTimerContainer = styled.div`
  height: 22%;
`;

export const CustomTimer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const TimerValue = styled.span`
  font-size: 4em;
  font-weight: lighter;
  color: ${({ hurry }) => (hurry ? 'red' : 'black')};
`;

export const TimerDescription = styled.div`
  width: 9.5em;
  text-transform: uppercase;
  color: darkslategray;
  font-weight: lighter;
  display: flex;
  justify-content: space-between;
`;

export const TimesUpText = styled.span`
  font-size: 3em;
  font-weight: lighter;
`;

export const RemainingTimeText = styled.span`
  font-size: 1.3em;
  color: cornflowerblue;
`;
