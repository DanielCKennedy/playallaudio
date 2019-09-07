import React from 'react';
import PageTemplate from './PageTemplate';
import HomeContent from './HomeContent';
import LandingHeader from './LandingHeader';

const HomePage: React.FC = () => {

  return (
    <PageTemplate
      header={<LandingHeader />}
      content={<HomeContent />}
    />
  );
};

export default HomePage;
