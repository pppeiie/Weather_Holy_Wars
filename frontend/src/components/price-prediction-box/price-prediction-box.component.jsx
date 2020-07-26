import React from 'react';

import PredictionForm from '../prediction-form/prediction-form.component';

import { PricePredictionBoxContainer } from './price-prediction-box.styles';

const PricePredictionBox = () => (
  <PricePredictionBoxContainer>
    <PredictionForm />
  </PricePredictionBoxContainer>
);

export default PricePredictionBox;
