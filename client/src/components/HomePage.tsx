import React from 'react';
import PageTemplate from './PageTemplate';
import HomeContent from './HomeContent';
import LandingHeader from './LandingHeader';

type HomePageProps = {
  spotifyToken: string;
};

const HomePage: React.FC<HomePageProps> = ({ spotifyToken }) => {

  return (
    <PageTemplate
      header={<LandingHeader />}
      content={<HomeContent spotifyToken={spotifyToken} />}
    />
  );
};

export default HomePage;
