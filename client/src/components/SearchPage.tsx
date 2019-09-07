import React from 'react';
import PageTemplate from './PageTemplate';
import SearchContent from './SearchContent';
import { RouteComponentProps } from 'react-router-dom';

type MatchProps = {
  soundcloudId: string;
};

const SearchPage: React.FC<RouteComponentProps<MatchProps>> = ({ match }) => {

  return (
    <PageTemplate content={<SearchContent soundcloudId={match.params.soundcloudId}/>} />
  );
};

export default SearchPage;
