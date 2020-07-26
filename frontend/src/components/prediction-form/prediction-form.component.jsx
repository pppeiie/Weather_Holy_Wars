import React, { useState } from 'react';

import PredictingSelection from '../predicting-selection/predicting-selection.component';
import SubmittedAnnouncement from '../submitted-announcement/submitted-announcement.component';

import {
  RadioGroup,
  Radio,
  FormControlLabel,
  TextField,
  Fab,
  InputAdornment,
  Button,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Divider,
  Snackbar,
  SvgIcon
} from '@material-ui/core';

import {
  TrendingUp,
  TrendingDown,
  Reorder,
  Navigation,
  Close
} from '@material-ui/icons';

import { ReactComponent as EthereumIcon } from '../../assets/icons/ethereum-icon.svg';

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

  const [isDialogOpened, setIsDialogOpened] = useState(false);
  const [isSnackbarOpened, setIsSnackbarOpened] = useState(false);
  const [isAnnouncementShowed, setIsAnnouncementShowed] = useState(false);

  const { up, down, unchanged } = isSelected;

  const getPrediction = prediction => {
    switch (prediction) {
      case 'up':
        return 'GO UP';

      case 'down':
        return 'GO DOWN';

      case 'unchanged':
        return 'BE UNCHANGED';

      default:
        break;
    }
  };

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

    setIsDialogOpened(true);
  };

  const handleConfirm = () => {
    setIsSnackbarOpened(true);
  };

  return (
    <PredictionFormContainer>
      {isAnnouncementShowed ? (
        <SubmittedAnnouncement
          handleClick={() => setIsAnnouncementShowed(false)}
        />
      ) : (
        <form onSubmit={handleSubmit}>
          <SelectionLabel>
            I think the BTC price after 1 hour will
          </SelectionLabel>
          <RadioGroup value={prediction} onChange={handlePredictionChange}>
            <FormControlLabel
              value='up'
              control={<Radio color='primary' size='small' required />}
              label={
                <PredictingSelection
                  icon={<TrendingUp color='primary' />}
                  title='Go up'
                  width='145px'
                  textColor='cornflowerblue'
                  isSelected={up}
                />
              }
              style={{ margin: 10 }}
            />
            <FormControlLabel
              value='down'
              control={<Radio color='primary' size='small' required />}
              label={
                <PredictingSelection
                  icon={<TrendingDown color='secondary' />}
                  title='Go down'
                  width='145px'
                  textColor='red'
                  isSelected={down}
                />
              }
              style={{ margin: 10 }}
            />
            <FormControlLabel
              value='unchanged'
              control={<Radio color='primary' size='small' required />}
              label={
                <PredictingSelection
                  icon={<Reorder style={{ color: 'darkorange' }} />}
                  title='Be unchanged'
                  width='145px'
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
              value={stake}
              onChange={handleStakeChange}
              label='Stake'
              margin='dense'
              size='medium'
              required
              InputProps={{
                inputProps: { min: 0.01, step: 0.01 },
                endAdornment: (
                  <InputAdornment position='end'>
                    <SvgIcon component={EthereumIcon} viewBox='0 0 500 500' />
                    ETH
                  </InputAdornment>
                )
              }}
              style={{ width: '50%' }}
            />
            <Fab color='primary' variant='extended' type='submit'>
              <Navigation />
              Submit
            </Fab>
          </StakeInputAndSubmitButton>
        </form>
      )}
      <Dialog open={isDialogOpened} onClose={() => setIsDialogOpened(false)}>
        <DialogTitle>Confirm bet ?</DialogTitle>
        <Divider />
        <DialogContent>
          <DialogContentText>
            You have just predicted that the BTC's exchange rate will{' '}
            <b>{getPrediction(prediction)}</b> in the next hour and bet{' '}
            <b>{stake} ETH</b>.
            <br />
            If you were right, you would receive <b>{stake * 2.9} ETH</b>.
            Otherwise, you will lose all the stake.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setIsDialogOpened(false)}
            color='primary'
            autoFocus
          >
            Disagree
          </Button>
          <Button
            onClick={() => {
              handleConfirm();
              setIsDialogOpened(false);
              setIsAnnouncementShowed(true);
              setPrediction('');
              setStake(1);
              setIsSelected({ up: false, down: false, unchanged: false });
            }}
            color='primary'
          >
            Agree
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={isSnackbarOpened}
        autoHideDuration={4000}
        onClose={() => setIsSnackbarOpened(false)}
        message='Thank you. Please wait for the result.'
        action={
          <React.Fragment>
            <IconButton
              size='small'
              color='inherit'
              onClick={() => setIsSnackbarOpened(false)}
            >
              <Close fontSize='small' />
            </IconButton>
          </React.Fragment>
        }
      />
    </PredictionFormContainer>
  );
};

export default PredictionForm;
