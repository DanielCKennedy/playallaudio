import React from 'react';
import PageTemplate from './PageTemplate';
import SearchContent from './SearchContent';
import { RouteComponentProps } from 'react-router-dom';

type MatchProps = {
  source: string;
  id: string;
};

type SearchPageProps = {
  route: RouteComponentProps<MatchProps>,
  spotifyToken: string;
}

const SearchPage: React.FC<SearchPageProps> = ({ route, spotifyToken }) => {

  return (
    <PageTemplate content={
      <SearchContent
        artistSearchId={route.match.params.id}
        source={route.match.params.source}
        spotifyToken={spotifyToken}
      />
    } />
  );
};

export default SearchPage;
