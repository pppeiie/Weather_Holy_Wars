import styled from 'styled-components';

import { Link } from 'react-router-dom';

export const HeaderContainer = styled.div`
  position: sticky;
  top: 0;
  z-index: 100;
  display: flex;
  padding: 0px 30px;
  justify-content: space-between;
  align-items: center;
  background-color: rgba(15, 34, 45, 0.95);
`;

export const LogoContainer = styled(Link)``;

export const OptionsContainer = styled.div`
  width: 20%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

export const OptionLink = styled(Link)`
  padding: 10px 15px;
  cursor: pointer;
`;
