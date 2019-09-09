import React from 'react';
import { makeStyles, Theme, createStyles, IconButton } from '@material-ui/core';
import HomeRoundedIcon from '@material-ui/icons/HomeRounded';
import SearchRoundedIcon from '@material-ui/icons/SearchRounded';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      height: '100%',
      overflowX: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      paddingTop: '25px',
      paddingBottom: '25px',
      textAlign: 'center',
    },
    link: {
      color: 'white',
      textDecoration: 'none',
      "&:hover": {
        color: 'white',
        textDecoration: 'none',
      },
      "&:visited": {
        color: 'white',
        textDecoration: 'none',
      },
      "&:link": {
        color: 'white',
        textDecoration: 'none',
      },
      "&:active": {
        color: 'white',
        textDecoration: 'none',
      }
    },
  })
);

const NavBar: React.FC = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Link to="/" className={classes.link}>
        <IconButton color="secondary">
          <HomeRoundedIcon fontSize="large" />
        </IconButton>
      </Link>
      <Link to="/search" className={classes.link}>
        <IconButton color="secondary">
          <SearchRoundedIcon fontSize="large" />
        </IconButton>
      </Link>
    </div>
  );
};

export default NavBar;
