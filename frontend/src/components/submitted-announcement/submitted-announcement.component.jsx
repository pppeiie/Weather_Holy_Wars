import React from 'react';

import { Button } from '@material-ui/core';

import SubmittedIllustration from '../../assets/illustrations/bitcoin.svg';

import {
  SubmittedAnnouncementContainer,
  Illustration,
  Title
} from './submitted-announcement.styles';

const SubmittedAnnouncement = ({ handleClick }) => (
  <SubmittedAnnouncementContainer>
    <Illustration src={SubmittedIllustration} alt='submitted' />
    <Title>Thank you. Stay tuned for the result.</Title>
    <Button variant='outlined' color='primary' onClick={handleClick}>
      Bet more
    </Button>
  </SubmittedAnnouncementContainer>
);

export default SubmittedAnnouncement;
