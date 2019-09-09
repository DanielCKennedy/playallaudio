import React from 'react';
import { Container, makeStyles, Theme, createStyles, Hidden } from '@material-ui/core';
import NavBar from './NavBar';

const navBarWidth = 100;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    flex: {
      width: '100%',
      display: 'flex',
      flexDirection: 'row',
    },
    navBar: {
      width: navBarWidth,
      position: 'fixed',
      top: 0,
      left: 0,
    },
    contentContainer: {
      height: '100%',
      width: '100%',
      flex: 1,
    },
    navBarWidth: {
      width: `${navBarWidth}px!important`,
      height: '100%',
      flex: '0 0 100px',
    },
  })
);

type PageTemplateProps = {
  header?: React.ReactNode,
  content: React.ReactNode
}

const PageTemplate: React.FC<PageTemplateProps> = ({ header, content }) => {
  const classes = useStyles();

  return (
    <div className={classes.flex}>
      {header}
      <Hidden xsDown>
        <div className={classes.navBar}>
          <NavBar />
        </div>
        <div className={classes.navBarWidth} />
      </Hidden>
      <div className={classes.contentContainer}>
        <Container maxWidth="xl">
          {content}
        </Container>
      </div>
    </div>
  );
};

export default PageTemplate;
