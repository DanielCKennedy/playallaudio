import React from 'react';
import PageTemplate from './PageTemplate';
import SearchContent from './SearchContent';

const SearchPage: React.FC = () => {

  return (
    <PageTemplate content={<SearchContent />} />
  );
};

export default SearchPage;
