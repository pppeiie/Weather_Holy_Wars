import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import { Button, Menu, MenuItem, Badge, makeStyles } from '@material-ui/core';

import { ReactComponent as Logo } from '../../assets/icons/logo.svg';
import { ReactComponent as MetaMask } from '../../assets/icons/metamask-icon.svg';

import {
  HeaderContainer,
  LogoContainer,
  MenuOption,
  MenuOptionDescription,
  MenuOptionContent
} from './header.styles';

const useStyles = makeStyles(theme => ({
  success: {
    '& span': {
      backgroundColor: '#28a745'
    }
  }
}));

const Header = () => {
  const wallet = useSelector(state => state.wallet);
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <HeaderContainer className='header'>
      <LogoContainer to='/'>
        <Logo style={{ width: 110, height: 'auto' }} />
      </LogoContainer>
      <div>
        <Button variant='outlined' onClick={handleClick} style={{ border: 'none' }}>
          {!!wallet.web3 ? (
            <Badge
              style={{ margin: '0px 10px 0px 0px' }}
              className={classes.success}
              variant='dot'
            />
          ) : (
            <Badge style={{ margin: '0px 10px 0px 0px' }} color='error' variant='dot' />
          )}
          <MetaMask />
        </Button>
        <Menu
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
          transformOrigin={{
            vertical: 'bottom',
            horizontal: 'center'
          }}
        >
          <MenuItem>
            <MenuOption>
              <MenuOptionDescription>Connected to</MenuOptionDescription>
              <MenuOptionContent>{wallet.shortAddress}</MenuOptionContent>
            </MenuOption>
          </MenuItem>
          <MenuItem>
            <MenuOption>
              <MenuOptionDescription>Balance</MenuOptionDescription>
              <MenuOptionContent>{wallet.balance} ETH</MenuOptionContent>
            </MenuOption>
          </MenuItem>
          <MenuItem>Disconnect</MenuItem>
        </Menu>
      </div>
    </HeaderContainer>
  );
};

export default Header;
