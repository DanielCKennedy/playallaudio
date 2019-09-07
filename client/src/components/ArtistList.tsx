import React from 'react';
import { Artist } from '../types/playerTypes';
import HorizontalList from './HorizontalList';
import ArtistSearchCard from './ArtistSearchCard';
import { GridListTile } from '@material-ui/core';

type ArtistListProps = {
  artists: Artist[]
}

const ArtistList: React.FC<ArtistListProps> = ({ artists }) => {
  console.log(artists);

  return (
    <HorizontalList
      title="Artists"
      items={artists.map((artist: Artist) =>
        <GridListTile key={artist.id}>
          <ArtistSearchCard
            color="#f70"
            artist={artist}
          />
        </GridListTile>)}
    />
  );
};

export default ArtistList;
