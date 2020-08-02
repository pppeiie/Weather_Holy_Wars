import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import * as walletActions from '../../redux/thunk-actions';

import { Fab } from '@material-ui/core';
import { AssignmentTurnedIn } from '@material-ui/icons';

import { ReadyAnnouncementContainer, Title } from './ready-announcement.styles';

const ReadyAnnouncement = ({ transactionIndex }) => {
  const [isProcessing, setIsProcessing] = useState(false);

  const dispatch = useDispatch();

  const claim = transactionIndex => {
    dispatch(walletActions.claim(transactionIndex));
  };

  return (
    <ReadyAnnouncementContainer>
      <AssignmentTurnedIn style={{ fontSize: '7em', color: '#0f222d' }} />
      <Title>Result is available now !</Title>
      <Fab
        variant='extended'
        size='large'
        color='primary'
        disabled={isProcessing}
        onClick={() => {
          claim(transactionIndex);
          setIsProcessing(true);
        }}
      >
        {isProcessing ? 'Processing...' : 'Check it out'}
      </Fab>
    </ReadyAnnouncementContainer>
  );
};

export default ReadyAnnouncement;
