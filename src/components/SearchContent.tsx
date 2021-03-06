import React, { useState, useEffect, useRef } from 'react';
import SearchRoundedIcon from '@material-ui/icons/SearchRounded';
import { TextField, makeStyles, Theme, createStyles, Hidden } from '@material-ui/core';
import SoundCloud from 'soundcloud';
import { Artist, TrackSource, Track } from '../types/playerTypes';
import ArtistList from './ArtistList';
import Spacer from './Spacer';
import TrackList from './TrackList';
import { createTrack } from '../utils/trackUtils';

const searchHeight = 100;
const smallSearchHeight = 50;

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
      fontSize: searchHeight,
      [theme.breakpoints.down("xs")]: {
        fontSize: smallSearchHeight,
        top: 15,
      }
    },
    searchBox: {
      height: searchHeight,
      [theme.breakpoints.down("xs")]: {
        height: smallSearchHeight,
      }
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

const onEnterPress = (e: any) => {
  // on enter key pressed
  if (e.keyCode === 13) {
    const elem = document.getElementById(searchTextId);
    if (elem) {
      elem.blur();
    }
  }
};

const searchTextId = "searchTextField";

const SearchContent: React.FC<SearchContentProps> = ({ source, artistSearchId, spotifyToken }) => {
  const classes = useStyles();
  const [searchText, setSearchText] = useState("");
  const [artistList, setArtistList] = useState<Artist[]>([]);
  const [trackList, setTrackList] = useState<Track[]>([]);
  const [soundcloudTrackList, setSoundcloudTrackList] = useState<Track[]>([]);
  const [spotifyTrackList, setSpotifyTrackList] = useState<Track[]>([]);
  const [soundcloudArtistList, setSoundcloudArtistList] = useState<Artist[]>([]);
  const [spotifyArtistList, setSpotifyArtistList] = useState<Artist[]>([]);
  const lastArtistPromiseSoundcloud = useRef();
  const lastArtistPromiseSpotify = useRef<Promise<Response>>();
  const lastTrackPromiseSoundcloud = useRef();
  const lastTrackPromiseSpotify = useRef<Promise<Response>>();

  useEffect(() => {
    SOUNDCLOUD_CLIENT_ID && soundcloud.initialize({
      client_id: SOUNDCLOUD_CLIENT_ID
    });

    // unfocus text field when user presses enter
    window.addEventListener("keydown", onEnterPress);

    return () => {
      window.removeEventListener("keydown", onEnterPress);
    }
  }, []);

  useEffect(() => {
    if (source && artistSearchId) {
      source === TrackSource.SOUNDCLOUD && searchSoundcloudArtistId(artistSearchId);
      source === TrackSource.SPOTIFY && spotifyToken && searchSpotifyArtistId(artistSearchId, spotifyToken);
    }
  }, [source, artistSearchId, spotifyToken]);

  useEffect(() => {
    setTrackList(mergeLists<Track>(soundcloudTrackList, spotifyTrackList));
  }, [soundcloudTrackList, spotifyTrackList]);

  useEffect(() => {
    setArtistList(mergeLists<Artist>(soundcloudArtistList, spotifyArtistList));
  }, [soundcloudArtistList, spotifyArtistList]);

  useEffect(() => {
    if (searchText) {
      searchArtistsSoundcloud(searchText);
      spotifyToken && searchArtistsSpotify(searchText, spotifyToken);
      searchTracksSoundcloud(searchText);
      spotifyToken && searchTracksSpotify(searchText, spotifyToken);
    }
  }, [searchText, spotifyToken]);

  const searchSoundcloudArtistId = (id: string) => {
    soundcloud.get(`/users/${id}/tracks`).then((tracks: SoundCloud.Track[]) => {
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

  const searchSpotifyArtistId = (id: string, accessToken: string) => {
    fetch(`https://api.spotify.com/v1/artists/${id}/top-tracks?country=US`, {
      method: 'GET',
      mode: 'cors',
      cache: 'no-cache',
      headers: {
          Authorization: `Bearer ${accessToken}`
      }
    }).then((res: Response) => {
      res.json().then((data: SpotifyApi.MultipleTracksResponse) => {
        var newTrackList: Track[] = [];
        data.tracks.forEach((track: SpotifyApi.TrackObjectFull) => {
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

        setTrackList(newTrackList);
      });
    });
  }

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
              artwork: track.album.images.length > 1 ? track.album.images[1].url : (track.album.images.length ? track.album.images[0].url : ""),
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

  const searchArtistsSoundcloud = (query: string) => {
    const currentPromise = soundcloud.get('/users', {
      q: query,
      limit: 20,
    });
    
    lastArtistPromiseSoundcloud.current = currentPromise;
    
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
      if (currentPromise === lastArtistPromiseSoundcloud.current && artists.length) {
        setSoundcloudArtistList(artists);
      }
    });
  };

  const searchArtistsSpotify = (query: string, accessToken: string) => {
    const currentPromise = fetch(`https://api.spotify.com/v1/search?type=artist&market=US&q=${encodeURIComponent(query)}`, {
      method: 'GET',
      mode: 'cors',
      cache: 'no-cache',
      headers: {
          Authorization: `Bearer ${accessToken}`
      }
    });
    
    lastArtistPromiseSpotify.current = currentPromise;

    currentPromise.then((res: Response) => {
      res.json().then((data: SpotifyApi.ArtistSearchResponse) => {
        if (data.artists) {
          var artists: Artist[] = [];
          data.artists.items.forEach((artist: SpotifyApi.ArtistObjectFull) => {
            if (artist.followers.total > 100) {
              artists.push({
                id: artist.id,
                name: artist.name,
                artwork: artist.images.length ? artist.images[0].url : "",
                source: TrackSource.SPOTIFY,
              })
            }
          });

          // only update if most recent
          if (currentPromise === lastArtistPromiseSpotify.current) {
            setSpotifyArtistList(artists);
          }
        }
      });
    });
  }

  return (
    <React.Fragment>
      <div className={classes.searchContainer}>
        <SearchRoundedIcon className={classes.searchIcon} />
        <div className={classes.searchTextFieldContainer}>
          <Hidden xsDown>
            <TextField
              className={classes.searchBox}
              value={searchText}
              onChange={e => setSearchText(e.target.value)}
              id={searchTextId}
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
          </Hidden>
          <Hidden smUp>
            <TextField
              className={classes.searchBox}
              value={searchText}
              onChange={e => setSearchText(e.target.value)}
              id={searchTextId}
              label="Search"
              fullWidth
              autoComplete="off"
              placeholder="Search..."
              autoFocus
              InputProps={{
                style: {
                  height: smallSearchHeight,
                  fontSize: 35,
                  color: 'white',
                }
              }}
              InputLabelProps={{
                style: {
                  display: 'none',
                }
              }}
            />
          </Hidden>
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
