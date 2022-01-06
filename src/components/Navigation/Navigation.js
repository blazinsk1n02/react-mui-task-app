import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import HomeIcon from '@mui/icons-material/Home';
import AccountCircle from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';

import { Link } from 'react-router-dom';
import { useState } from 'react'
import styles from './Navigation.module.css'

import { userAtom } from '../../atoms/user';
import { useRecoilValue } from 'recoil';

export default function Navigation() {
  const user  = useRecoilValue(userAtom);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const userNavigation = (
    <Link to="/logout" className={styles.headerToolbarLinks}>
      <IconButton
        edge="end"
        aria-label="logout"
        aria-haspopup="true"
        color="inherit"
        className={styles.toolbarIconButton}
      >
        <LogoutIcon fontSize="large" />
      </IconButton>
    </Link>
  );

  const guestNavigation = (
    <div>
      <IconButton
        onClick={handleMenu}
        edge="end"
        aria-label="user menu"
        aria-haspopup="true"
        className={styles.toolbarIconButton}
      >
        <AccountCircle fontSize="large" />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <Link to="/login" className={styles.headerToolbarLinks}>
          <MenuItem onClick={handleClose}>Login</MenuItem>
        </Link>
        <Link to="/register" className={styles.headerToolbarLinks}>
          <MenuItem onClick={handleClose}>Register</MenuItem>
        </Link>
      </Menu>
    </div>
  );

  return (
    <AppBar position="static" className={styles.header}>
      <Toolbar className={styles.headerToolbar}>

        <Link to="/" className={styles.headerToolbarLinks}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="home"
            className={styles.toolbarIconButton}
          >
            <HomeIcon fontSize="large" />
          </IconButton>
        </Link>

        {user.email
          ? userNavigation
          : guestNavigation
        }

      </Toolbar>
    </AppBar>
  )
}