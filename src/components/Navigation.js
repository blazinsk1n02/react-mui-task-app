import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import HomeIcon from '@mui/icons-material/Home';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { Link } from 'react-router-dom';

export default function Navigation() {
  return (
    <AppBar position="static">
      <Toolbar>
        <Link to="/">
          <IconButton
            edge="start"
            color="inherit"
            aria-label="home"
          >
            <HomeIcon fontSize="large" />
          </IconButton>
        </Link>
        <Link to="/login">
          <IconButton
            edge="end"
            aria-label="account of current user"
            aria-haspopup="true"
            color="inherit"
          >
            <AccountCircle fontSize="large" />
          </IconButton>
        </Link>
      </Toolbar>
    </AppBar>
  )
}