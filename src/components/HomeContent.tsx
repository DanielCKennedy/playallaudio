import React from 'react';
import { Typography, makeStyles, Theme, createStyles } from '@material-ui/core';
import ArtistSearchCard from './ArtistSearchCard';
import PlaylistList from './PlaylistList';
import Spacer from './Spacer';
import { TrackSource } from '../types/playerTypes';
import SpotifyAuthNotification from './SpotifyAuthNotification';
import SpotifyBrowserSupportNotification from './SpotifyBrowserSupportNotification';
import SoundcloudBrowserSupportNotification from './SoundcloudBrowserSupportNotification';

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

const artistItems = [
  {
    color: "#03b5e5",
    artist: {
      artwork: "https://i.scdn.co/image/146a871aa25799b66a7bb4e9752daa85f7701435",
      id: "146393",
      name: "Dillon Francis",
      source: TrackSource.SOUNDCLOUD,
    }
  },
  {
    color: '#815fc0',
    artist: {
      artwork: "https://i.scdn.co/image/40f6c98daef20a9101ea5fc3ec78827446db2f3b",
      id: "2279060",
      name: "Oliver Heldens",
      source: TrackSource.SOUNDCLOUD,
    }
  },
  {
    color: '#fc466b',
    artist: {
      artwork: "https://i.scdn.co/image/c1afa01d2ae18e308931fdd2ead79e6bf3408609",
      id: "87105617",
      name: "Billie Eilish",
      source: TrackSource.SOUNDCLOUD,
    }
  },
  {
    color: "#94bbe9",
    artist: {
      artwork: "https://i.scdn.co/image/95a1c501b5cc0cf7bdbccea4921c5d1684b7249c",
      id: "3398477",
      name: "Jauz",
      source: TrackSource.SOUNDCLOUD,
    }
  }
]

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
      <PlaylistList title="Featured" spotifyToken={spotifyToken} />
      <Spacer />
    </React.Fragment>
  );
};

export default HomeContent;
