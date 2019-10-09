import React from 'react';
import PageTemplate from './PageTemplate';
import HomeContent from './HomeContent';
import LandingHeader from './LandingHeader';

type HomePageProps = {
  spotifyToken: string;
  spotifySupport: boolean;
  soundcloudSupport: boolean;
};

const HomePage: React.FC<HomePageProps> = ({ spotifyToken, spotifySupport, soundcloudSupport }) => {

  return (
    <PageTemplate
      header={<LandingHeader />}
      content={<HomeContent spotifyToken={spotifyToken} spotifySupport={spotifySupport} soundcloudSupport={soundcloudSupport} />}
    />
  );
};

export default HomePage;
