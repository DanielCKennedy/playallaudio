import React from 'react';
import { Typography, makeStyles, Theme, createStyles } from '@material-ui/core';
import ArtistSearchCard from './ArtistSearchCard';
import PlaylistList from './PlaylistList';
import Spacer from './Spacer';
import SpotifyAuthNotification from './SpotifyAuthNotification';
import SpotifyBrowserSupportNotification from './SpotifyBrowserSupportNotification';
import SoundcloudBrowserSupportNotification from './SoundcloudBrowserSupportNotification';
import { artistItems } from '../constants/artistConstants';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    titleContainer: {
      color: 'white',
      [theme.breakpoints.down('sm')]: {
        marginTop: '20px',
        marginBottom: '40px',
      },
      [theme.breakpoints.up('md')]: {
        marginTop: '50px',
        marginBottom: '75px',
      },
      [theme.breakpoints.up('lg')]: {
        marginTop: '115px',
        marginBottom: '180px',
      },
      [theme.breakpoints.up('xl')]: {
        marginTop: '175px',
        marginBottom: '175px',
      },
    },
    subtextContainer: {
      WebkitLineClamp: 2,
      lineClamp: 2,
      width: '55%',
      [theme.breakpoints.down('sm')]: {
        width: '100%',
      },
    },
    cardList: {
      display: 'inline-flex',
      flexDirection: 'row',
      width: '100%',
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden',
      flexWrap: 'wrap',
      listStyle: 'none',
    },
    subtext: {
      fontFamily: "'Work Sans', sans-serif",
    },
  }),
);

type HomeContentProps = {
  spotifyToken: string;
  spotifySupport: boolean;
  soundcloudSupport: boolean;
};

const HomeContent: React.FC<HomeContentProps> = ({ spotifyToken, spotifySupport, soundcloudSupport }) => {
  const classes = useStyles();

  return (
    <React.Fragment>
      <div className={classes.titleContainer}>
        <Typography variant="h1" gutterBottom>
          Playall Audio
        </Typography>
        <div className={classes.subtextContainer}>
          <Typography variant="h4" component="h2" gutterBottom>
            <div className={classes.subtext}>
              Listen to music from your favorite streaming services, all in one place.
            </div>
          </Typography>
        </div>
      </div>
      <ul className={classes.cardList}>
        {artistItems.map((item) =>
          <li key={item.artist.id}>
            <ArtistSearchCard
              color={item.color}
              artist={item.artist}
            />
          </li>
        )}
      </ul>
      <Spacer />
      {!spotifySupport &&
      <React.Fragment>
        <SpotifyBrowserSupportNotification />
        <Spacer />
      </React.Fragment>}
      {!soundcloudSupport &&
      <React.Fragment>
        <SoundcloudBrowserSupportNotification />
        <Spacer />
      </React.Fragment>}
      {!spotifyToken && spotifySupport && 
      <React.Fragment>
        <SpotifyAuthNotification />
        <Spacer />
      </React.Fragment>}
      <PlaylistList title="Featured Playlists" spotifyToken={spotifyToken} />
      <Spacer />
    </React.Fragment>
  );
};

export default HomeContent;
