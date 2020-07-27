import styled from 'styled-components';

const getResultType = ({ type }) => {
  if (type === 'winned') return '#08ce96';
  if (type === 'lost') return '#ff725e';
  return '#0f222d';
};

export const ResultAnnouncementContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
`;

export const Content = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
`;

export const Title = styled.h2`
  font-size: 2.5em;
  color: ${getResultType};
`;

export const Description = styled.p`
  font-size: 1.5em;
  color: dimgray;
`;

export const Illustration = styled.img`
  width: 30%;
`;
