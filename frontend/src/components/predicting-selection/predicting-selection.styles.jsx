import styled, { css } from 'styled-components';

const getTextColor = ({ textColor }) => (textColor ? textColor : 'dimgray');

const defaultStyles = css`
  border: 2px solid gray;
`;

const isSelectedStyles = css`
  box-shadow: 1px 2px 8px 0 ${getTextColor};
  border: ${({ textColor }) =>
    textColor ? `2px solid ${textColor}` : '2px solid dimgray'};
`;

export const PredictingSelectionContainer = styled.div`
  width: ${({ width }) => (width ? width : '130px')};
  height: ${({ height }) => (height ? height : '50px')};
  padding: 0 5px;
  border-radius: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 1.1em;
  color: ${getTextColor};

  ${({ isSelected }) => (isSelected ? isSelectedStyles : defaultStyles)}
`;
