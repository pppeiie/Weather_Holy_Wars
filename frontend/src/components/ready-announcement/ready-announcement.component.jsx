import React from 'react';

import { Fab } from '@material-ui/core';
import { AssignmentTurnedIn } from '@material-ui/icons';

import { ReadyAnnouncementContainer, Title } from './ready-announcement.styles';

const ReadyAnnouncement = ({ transactionIndex }) => {
  return (
    <ReadyAnnouncementContainer>
      <AssignmentTurnedIn style={{ fontSize: '7em', color: '#0f222d' }} />
      <Title>Result is available now !</Title>
      <Fab variant='extended' size='large' color='primary'>
        Check it out
      </Fab>
    </ReadyAnnouncementContainer>
  );
};

export default ReadyAnnouncement;
