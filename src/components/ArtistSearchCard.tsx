import React, { useState } from 'react';
import { Card, CardActionArea, Avatar, CardContent, Typography, makeStyles, Theme, createStyles } from '@material-ui/core';
import SearchRoundedIcon from '@material-ui/icons/SearchRounded';
import { Artist } from '../types/playerTypes';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    avatar: {
      height: '75%',
      width: '75%',
      margin: 'auto',
      marginTop: '15px',
      marginBottom: '15px',
    },
    avatarContainer: {
      position: 'relative',
    },
    "searchIcon": {
      position: 'absolute',
      color: 'white',
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      margin: 'auto',
      zIndex: 2,
      height: 75,
      width: 75,
      display: 'block',
    },
    nameContainer: {
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
    },
    card: (props: StyleProps) => ({
      alignItems: 'center',
      background: `linear-gradient(${props.color}, black)`,
      borderRadius: 0,
      display: 'inline-block',
      width: '15vw',
      minWidth: '220px',
      maxWidth: '245px',
    }),
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
  }),
);

type ArtistSearchCardProps = {
  color: string,
  artist: Artist,
}

type StyleProps = {
  color: string,
}

const ArtistSearchCard: React.FC<ArtistSearchCardProps> = ({ color, artist }) => {
  const classes = useStyles({ color });
  const [showSearch, setShowSearch] = useState(false);

  
  return (
    <Card className={classes.card}>
      <Link to={`/search/${artist.source}/${artist.id}`} className={classes.link}>
        <CardActionArea
          onMouseEnter={() => {setShowSearch(true)}} onMouseLeave={() => {setShowSearch(false)}}>
          <div className={classes.avatarContainer}>
            {showSearch && <SearchRoundedIcon className={classes.searchIcon} />}
            <Avatar alt={artist.name} src={artist.artwork} className={classes.avatar} />
          </div>
          <CardContent>
            <Typography gutterBottom variant="h4" color="secondary">
              <div className={classes.nameContainer}>
                {artist.name}
              </div>
            </Typography>
          </CardContent>
        </CardActionArea>
      </Link>
    </Card>
  );
};

export default ArtistSearchCard;
