import React from 'react';
import { makeStyles, Theme, createStyles, IconButton, Tooltip } from '@material-ui/core';
import HomeRoundedIcon from '@material-ui/icons/HomeRounded';
import SearchRoundedIcon from '@material-ui/icons/SearchRounded';
import QueueMusicRoundedIcon from '@material-ui/icons/QueueMusicRounded';
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
    hover: {
      "&:hover": {
        backgroundColor: '#ffffff11',
      }
    },
  })
);

const NavBar: React.FC = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Tooltip title="Home" placement="top">
        <Link to="/" className={classes.link}>
          <IconButton color="secondary" className={classes.hover} title="Home">
            <HomeRoundedIcon fontSize="large" />
          </IconButton>
        </Link>
      </Tooltip>
      <Tooltip title="Search" placement="top">
        <Link to="/search" className={classes.link}>
          <IconButton color="secondary" className={classes.hover} title="Search">
            <SearchRoundedIcon fontSize="large" />
          </IconButton>
        </Link>
      </Tooltip>
      <Tooltip title="Queue" placement="top">
        <Link to="/queue" className={classes.link}>
          <IconButton color="secondary" className={classes.hover} title="Queue">
            <QueueMusicRoundedIcon fontSize="large" />
          </IconButton>
        </Link>
      </Tooltip>
      <Tooltip title="View source code" placement="top">
        <a href="https://github.com/DanielCKennedy/playallaudio" className={classes.link} target="_blank" rel="noopener noreferrer">
          <IconButton color="secondary" className={classes.hover} title="View source code">
            <img src={require("../assets/GitHub-Mark-Light-64px.png")} height="35" alt="GitHub" />
          </IconButton>
        </a>
      </Tooltip>
    </div>
  );
};

export default NavBar;
