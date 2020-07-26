import React from 'react';
import { Button, Menu, MenuItem, Badge, makeStyles } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { ReactComponent as Logo } from '../../assets/icons/logo.svg';

import { HeaderContainer, LogoContainer } from './header.styles';

const useStyles = makeStyles((theme) => ({
  success: {
    '& span': {
      backgroundColor: '#28a745',
    },
  },
}));

const Header = () => {
  const wallet = useSelector((state) => state.wallet);
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
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
        <Button
          style={{
            color: 'white',
            border: '1px solid white',
          }}
          variant='outlined'
          aria-controls='simple-menu'
          aria-haspopup='true'
          onClick={handleClick}
        >
          {!!wallet.web3 ? (
            <Badge
              style={{ margin: '0px 10px 0px 0px' }}
              className={classes.success}
              variant='dot'
            />
          ) : (
            <Badge style={{ margin: '0px 10px 0px 0px' }} color='error' variant='dot' />
          )}
          MetaMask
        </Button>

        <Menu
          id='simple-menu'
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
          transformOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
        >
          <MenuItem>{wallet.shortAddress}</MenuItem>
          <MenuItem>{wallet.balance} Eth</MenuItem>
          <MenuItem>Disconnect</MenuItem>
        </Menu>
      </div>
    </HeaderContainer>
  );
};

export default Header;
