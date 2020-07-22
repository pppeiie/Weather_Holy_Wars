import React from 'react';

import { ReactComponent as Logo } from '../../assets/icons/logo.svg';

import { HeaderContainer, LogoContainer } from './header.styles';

const Header = () => {
  return (
    <HeaderContainer className='header'>
      <LogoContainer to='/'>
        <Logo style={{ width: 110, height: 'auto' }} />
      </LogoContainer>
    </HeaderContainer>
  );
};

export default Header;
