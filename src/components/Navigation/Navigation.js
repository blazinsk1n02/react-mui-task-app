import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import HomeIcon from '@mui/icons-material/Home';
import AccountCircle from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';

import { Link } from 'react-router-dom';
import styles from './Navigation.module.css'

export default function Navigation() {
  return (
    <AppBar position="static" className={styles.header}>
      <Toolbar className={styles.headerToolbar}>
        <Link to="/" className={styles.headerToolbarLinks}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="home"
            className={styles.headerToolbarLinksBtn}
          >
            <HomeIcon fontSize="large" />
          </IconButton>
        </Link>
        <Link to="/login" className={styles.headerToolbarLinks}>
          <IconButton
            edge="end"
            aria-label="login"
            aria-haspopup="true"
            color="inherit"
            className={styles.headerToolbarLinksBtn}
          >
            <AccountCircle fontSize="large" />
          </IconButton>
        </Link>
        <Link to="/logout" className={styles.headerToolbarLinks}>
          <IconButton
            edge="end"
            aria-label="logout"
            aria-haspopup="true"
            color="inherit"
            className={styles.headerToolbarLinksBtn}
          >
            <LogoutIcon fontSize="large" />
          </IconButton>
        </Link>
      </Toolbar>
    </AppBar>
  )
}