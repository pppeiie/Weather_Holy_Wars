import React from 'react';

import { PredictingSelectionContainer } from './predicting-selection.styles';

const PredictingSelection = ({
  icon,
  title,
  width,
  height,
  textColor,
  isSelected
}) => (
  <PredictingSelectionContainer
    width={width}
    height={height}
    textColor={textColor}
    isSelected={isSelected}
  >
    {icon}
    <span>{title}</span>
  </PredictingSelectionContainer>
);

export default PredictingSelection;
