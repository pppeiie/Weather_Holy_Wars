import React, { useState } from 'react';

import PredictingSelection from '../predicting-selection/predicting-selection.component';

import {
  RadioGroup,
  Radio,
  FormControlLabel,
  TextField,
  Fab,
  InputAdornment
} from '@material-ui/core';

import {
  TrendingUp,
  TrendingDown,
  Reorder,
  Navigation
} from '@material-ui/icons';

import {
  PredictionFormContainer,
  SelectionLabel,
  StakeInputAndSubmitButton
} from './prediction-form.styles';

const PredictionForm = () => {
  const [prediction, setPrediction] = useState('');
  const [stake, setStake] = useState(1);

  const [isSelected, setIsSelected] = useState({
    up: false,
    down: false,
    unchanged: false
  });

  const { up, down, unchanged } = isSelected;

  const handlePredictionChange = event => {
    const { value } = event.target;

    setPrediction(value);

    setIsSelected({
      ...Object.keys(isSelected).reduce(
        (reduced, key) =>
          key === value
            ? { ...reduced, [key]: true }
            : { ...reduced, [key]: false },
        {}
      )
    });
  };

  const handleStakeChange = event => {
    const { value } = event.target;

    setStake(value);
  };

  const handleSubmit = event => {
    event.preventDefault();

    alert('Thank you. Please wait for the result.');
  };

  return (
    <PredictionFormContainer>
      <form onSubmit={handleSubmit}>
        <SelectionLabel>I think the price in next hour will</SelectionLabel>
        <RadioGroup value={prediction} onChange={handlePredictionChange}>
          <FormControlLabel
            value='up'
            control={<Radio color='primary' size='small' />}
            label={
              <PredictingSelection
                icon={<TrendingUp color='primary' />}
                title='Go up'
                textColor='cornflowerblue'
                isSelected={up}
              />
            }
            style={{ margin: 10 }}
          />
          <FormControlLabel
            value='down'
            control={<Radio color='primary' size='small' />}
            label={
              <PredictingSelection
                icon={<TrendingDown color='secondary' />}
                title='Go down'
                textColor='red'
                isSelected={down}
              />
            }
            style={{ margin: 10 }}
          />
          <FormControlLabel
            value='unchanged'
            control={<Radio color='primary' size='small' />}
            label={
              <PredictingSelection
                icon={<Reorder style={{ color: 'darkorange' }} />}
                title='Unchanged'
                textColor='darkorange'
                isSelected={unchanged}
              />
            }
            style={{ margin: 10 }}
          />
        </RadioGroup>
        <SelectionLabel>I want to bet</SelectionLabel>
        <StakeInputAndSubmitButton>
          <TextField
            name='stake'
            type='number'
            min='0'
            value={stake}
            onChange={handleStakeChange}
            label='Stake'
            margin='dense'
            size='medium'
            InputProps={{
              inputProps: { min: 0, max: 10, step: 0.01 },
              endAdornment: <InputAdornment position='end'>ETH</InputAdornment>
            }}
            style={{ width: '50%' }}
          />
          <Fab color='primary' variant='extended' type='submit'>
            <Navigation />
            Submit
          </Fab>
        </StakeInputAndSubmitButton>
      </form>
    </PredictionFormContainer>
  );
};

export default PredictionForm;
