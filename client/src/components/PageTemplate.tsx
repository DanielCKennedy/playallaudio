import React from 'react';
import { Container } from '@material-ui/core';

type PageTemplateProps = {
  header?: React.ReactNode,
  content: React.ReactNode
}

const PageTemplate: React.FC<PageTemplateProps> = ({ header, content }) => {

  return (
    <React.Fragment>
      {header}
      <Container maxWidth="xl">
        {content}
      </Container>

    </React.Fragment>
  );
};

export default PageTemplate;
