import React from 'react';

import CountdownTimer from '../countdown-timer/countdown-timer.component';
import PredictionForm from '../prediction-form/prediction-form.component';

import { PricePredictionBoxContainer } from './price-prediction-box.styles';

const PricePredictionBox = () => (
  <PricePredictionBoxContainer>
    <CountdownTimer />
    <PredictionForm />
  </PricePredictionBoxContainer>
);

export default PricePredictionBox;
