import React from 'react';
import { Artist, TrackSource } from '../types/playerTypes';
import HorizontalList from './HorizontalList';
import ArtistSearchCard from './ArtistSearchCard';
import { GridListTile } from '@material-ui/core';

type ArtistListProps = {
  artists: Artist[]
}

const soundcloudOrange = "#F4A740" //'#ff5500'
const spotifyGreen = "#5ECF86" //"#1db954"

const ArtistList: React.FC<ArtistListProps> = ({ artists }) => {

  return (
    <HorizontalList
      title="Artists"
      items={artists.map((artist: Artist) =>
        <GridListTile key={artist.id}>
          <ArtistSearchCard
            color={artist.source === TrackSource.SOUNDCLOUD ? soundcloudOrange : spotifyGreen}
            artist={artist}
          />
        </GridListTile>)}
    />
  );
};

export default ArtistList;
