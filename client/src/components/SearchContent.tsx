import React, { useState, useEffect, useRef } from 'react';
import SearchRoundedIcon from '@material-ui/icons/SearchRounded';
import { TextField, makeStyles, Theme, createStyles } from '@material-ui/core';
import SoundCloud from 'soundcloud';
import { Artist, TrackSource, Track } from '../types/playerTypes';
import ArtistList from './ArtistList';
import Spacer from './Spacer';
import TrackList from './TrackList';
import { createTrack } from '../utils/trackUtils';

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
    searchBox: {
      height: searchHeight,
    },
  }),
);

const SOUNDCLOUD_CLIENT_ID = process.env.REACT_APP_SOUNDCLOUD_CLIENT_ID;
const soundcloud: SoundCloud = SoundCloud;

type SearchContentProps = {
  artistSearchId: string,
  spotifyToken: string,
  source?: string,
}

function mergeLists<T>(list1: T[], list2: T[]): T[] {
  const maxLength = Math.max(list1.length, list2.length);
  const mergedList: T[] = [];

  for (let i = 0; i < maxLength; i++) {
    (i < list1.length) && mergedList.push(list1[i]);
    (i < list2.length) && mergedList.push(list2[i]);
  }

  return mergedList;
}

const SearchContent: React.FC<SearchContentProps> = ({ source, artistSearchId, spotifyToken }) => {
  const classes = useStyles();
  const [searchText, setSearchText] = useState("");
  const [artistList, setArtistList] = useState<Artist[]>([]);
  const [trackList, setTrackList] = useState<Track[]>([]);
  const [soundcloudTrackList, setSoundcloudTrackList] = useState<Track[]>([]);
  const [spotifyTrackList, setSpotifyTrackList] = useState<Track[]>([]);
  const lastArtistPromise = useRef();
  const lastTrackPromiseSoundcloud = useRef();
  const lastTrackPromiseSpotify = useRef<Promise<Response>>();

  useEffect(() => {
    SOUNDCLOUD_CLIENT_ID && soundcloud.initialize({
      client_id: SOUNDCLOUD_CLIENT_ID
    });
  }, []);

  useEffect(() => {
    if (source && artistSearchId) {
      source === TrackSource.SOUNDCLOUD && searchSoundcloudArtistId(artistSearchId);
    }
  }, [source, artistSearchId]);

  useEffect(() => {
    setTrackList(mergeLists<Track>(soundcloudTrackList, spotifyTrackList));
  }, [soundcloudTrackList, spotifyTrackList])

  useEffect(() => {
    if (searchText) {
      searchArtists(searchText);
      searchTracksSoundcloud(searchText);
      spotifyToken && searchTracksSpotify(searchText, spotifyToken);
    }
  }, [searchText, spotifyToken]);

  const searchSoundcloudArtistId = (id: string) => {
    soundcloud.get(`/tracks`, {
      user_id: id,
    }).then((tracks: SoundCloud.Track[]) => {
      var newTrackList: Track[] = [];
      tracks.map((track: SoundCloud.Track) => {
        newTrackList.push(createTrack({
          id: track.id.toString(),
          title: track.title,
          artists: [track.user.username],
          duration: track.duration,
          artwork: track.artwork_url,
          source: TrackSource.SOUNDCLOUD,
          externalUrl: track.permalink_url,
        }));

        return track;
      });

      setTrackList(newTrackList);
    });
  };

  const searchTracksSoundcloud = (query: string) => {
    const currentPromise = soundcloud.get('/tracks', {
      q: query,
      limit: 20,
    });

    lastTrackPromiseSoundcloud.current = currentPromise;

    currentPromise.then((tracks: SoundCloud.Track[]) => {
      var newTrackList: Track[] = [];
      tracks.forEach((track: SoundCloud.Track) => {
        newTrackList.push(createTrack({
          id: track.id.toString(),
          title: track.title,
          artists: [track.user.username],
          duration: track.duration,
          artwork: track.artwork_url,
          source: TrackSource.SOUNDCLOUD,
          externalUrl: track.permalink_url,
        }));
      });

      // only update if most recent
      if (currentPromise === lastTrackPromiseSoundcloud.current) {
        setSoundcloudTrackList(newTrackList);
      }
    });
  }

  const searchTracksSpotify = (query: string, accessToken: string) => {
    const currentPromise = fetch(`https://api.spotify.com/v1/search?type=track&market=US&q=${encodeURIComponent(query)}`, {
      method: 'GET',
      mode: 'cors',
      cache: 'no-cache',
      headers: {
          Authorization: `Bearer ${accessToken}`
      }
    });

    lastTrackPromiseSpotify.current = currentPromise;

    currentPromise.then((res: Response) => {
      res.json().then((data: SpotifyApi.TrackSearchResponse) => {
        if (data.tracks) {
          var newTrackList: Track[] = [];
          data.tracks.items.forEach((track: SpotifyApi.TrackObjectFull) => {
            newTrackList.push(createTrack({
              id: track.id,
              title: track.name,
              artists: track.artists.map(artist => artist.name),
              duration: track.duration_ms,
              artwork: track.album.images.length ? track.album.images[0].url : "",
              source: TrackSource.SPOTIFY,
              externalUrl: track.external_urls.spotify,
            }));
          });

          // only update if most recent
          if (currentPromise === lastTrackPromiseSpotify.current) {
            setSpotifyTrackList(newTrackList);
          }
        }
      });
    });
  }

  const searchArtists = (query: string) => {
    const currentPromise = soundcloud.get('/users', {
      q: query,
      limit: 20,
    });
    
    lastArtistPromise.current = currentPromise;
    
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

      // only update if most recent
      if (currentPromise === lastArtistPromise.current && artists.length) {
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
            id="searchArtists"
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
      <Spacer />
      {artistList.length > 0 &&
      <React.Fragment>
        <ArtistList artists={artistList} />
        <Spacer />
      </React.Fragment>}
      {trackList.length > 0 &&
      <React.Fragment>
        <TrackList title="Tracks" tracks={trackList} />
        <Spacer />
      </React.Fragment>}
    </React.Fragment>
  );
};

export default SearchContent;
