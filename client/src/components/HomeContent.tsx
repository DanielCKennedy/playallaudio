import React from 'react';
import { Typography, makeStyles, Theme, createStyles } from '@material-ui/core';
import ArtistSearchCard from './ArtistSearchCard';
import PlaylistList from './PlaylistList';

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
    spacer: {
      paddingBottom: theme.spacing(8),
    }
  }),
);

const images = [
  {
    name: "Dillon Francis",
    url: "https://i.scdn.co/image/146a871aa25799b66a7bb4e9752daa85f7701435",
    color: "#03b5e5"
  },
  {
    name: "Oliver Heldens",
    url: "https://i.scdn.co/image/40f6c98daef20a9101ea5fc3ec78827446db2f3b",
    color: '#815fc0',
  },
  {
    name: "Billie Eilish",
    url: "https://i.scdn.co/image/c1afa01d2ae18e308931fdd2ead79e6bf3408609",
    color: '#fc466b',
  },
  {
    name: "Jauz",
    url: "https://i.scdn.co/image/95a1c501b5cc0cf7bdbccea4921c5d1684b7249c",
    color: "#94bbe9",
  },
];

const HomeContent: React.FC = () => {
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
        {images.map((item) =>
          <li key={item.name}>
            <ArtistSearchCard
              color={item.color}
              url={item.url}
              name={item.name}  
            />
          </li>
        )}
      </ul>
      <div className={classes.spacer} />
      <PlaylistList name="Featured" />
      <div className={classes.spacer} />
    </React.Fragment>
  );
};

export default HomeContent;
