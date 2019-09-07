import React, { useState, useEffect, useRef } from 'react';
import SearchRoundedIcon from '@material-ui/icons/SearchRounded';
import { TextField, makeStyles, Theme, createStyles } from '@material-ui/core';
import SoundCloud from 'soundcloud';
import { Artist, TrackSource } from '../types/playerTypes';
import ArtistList from './ArtistList';

const searchHeight = 100;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    searchContainer: {
      display: 'flex',
      flexDirection: 'row',
    },
    searchTextFieldContainer: {
      flexGrow: 1,
    },
    searchIcon: {
      position: 'relative',
      top: 10,
      marginRight: 5,
    },
    spacer: {
      paddingBottom: theme.spacing(8),
    },
    searchBox: {
      height: searchHeight,
    },
  }),
);

const SOUNDCLOUD_CLIENT_ID = process.env.REACT_APP_SOUNDCLOUD_CLIENT_ID;
const soundcloud: SoundCloud = SoundCloud;

const SearchContent: React.FC = () => {
  const classes = useStyles();
  const [searchText, setSearchText] = useState("");
  const [artistList, setArtistList] = useState<Artist[]>([]);
  const lastPromise = useRef();

  useEffect(() => {
    SOUNDCLOUD_CLIENT_ID && soundcloud.initialize({
      client_id: SOUNDCLOUD_CLIENT_ID
    });
  }, []);

  useEffect(() => {
    searchText && search(searchText);
    
  }, [searchText]);

  const search = (query: string) => {
    const currentPromise = soundcloud.get('/users', {
      q: query,
      limit: 20,
    });
    
    lastPromise.current = currentPromise;
    
    currentPromise.then((users: SoundCloud.User[]) => {
      var artists: Artist[] = [];
      users.map((user: SoundCloud.User) => {
        if (user.track_count > 0 && user.followers_count > 100) {
          artists.push({
            id: `${user.id}`,
            name: user.username,
            artwork: user.avatar_url.replace('large', 't300x300'),
            source: TrackSource.SOUNDCLOUD,
          });
        }
        return user;
      });

      // only update if most recent search
      if (currentPromise === lastPromise.current && artists.length) {
        setArtistList(artists);
      }
    });
  };

  return (
    <React.Fragment>
      <div className={classes.searchContainer}>
        <SearchRoundedIcon
          className={classes.searchIcon}
          style={{ fontSize: 100 }}
        />
        <div className={classes.searchTextFieldContainer}>
          <TextField
            className={classes.searchBox}
            value={searchText}
            onChange={e => setSearchText(e.target.value)}
            id="search"
            label="Search"
            fullWidth
            autoComplete="off"
            placeholder="Search..."
            autoFocus
            InputProps={{
              style: {
                height: searchHeight,
                fontSize: 55,
                color: 'white',
              }
            }}
            InputLabelProps={{
              style: {
                display: 'none',
              }
            }}
          />
        </div>
      </div>
      <div className={classes.spacer} />
      {artistList.length > 0 && <ArtistList artists={artistList} />}
      {artistList.length > 0 && <div className={classes.spacer} />}
    </React.Fragment>
  );
};

export default SearchContent;
