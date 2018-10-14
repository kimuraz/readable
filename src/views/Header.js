import React from 'react';
import { AppBar, Toolbar, Typography } from '@material-ui/core';

import './styles/Header.css';

class Header extends React.Component {
  render() {
    return (
      <AppBar position="static">
        <Toolbar>
          <Typography variant="headline" color="inherit" className="Title">
            Readable
          </Typography>
        </Toolbar>
      </AppBar>
    );
  }
}

export default Header;
