import React from 'react';

import {
  ResultAnnouncementContainer,
  Content,
  Title,
  Description,
  Illustration
} from './result-announcement.styles';

const ResultAnnouncement = ({ type, title, description, illustration }) => (
  <ResultAnnouncementContainer>
    <Content>
      <Title type={type}>{title}</Title>
      <Description>{description}</Description>
    </Content>
    <Illustration src={illustration} alt='result' />
  </ResultAnnouncementContainer>
);

export default ResultAnnouncement;
