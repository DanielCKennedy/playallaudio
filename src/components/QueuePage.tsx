import React from 'react';
import PageTemplate from './PageTemplate';
import Queue from './Queue';

const QueuePage: React.FC = () => {

  return (
    <PageTemplate content={<Queue />} />
  );
};

export default QueuePage;
