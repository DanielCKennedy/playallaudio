import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core';
import LandingBackdrop from './LandingBackdrop';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    landingHeading: {
      position: 'relative',
      height: 'auto',
      maxHeight: 'calc(100% - 88px)',
      overflow: 'visible',
      [theme.breakpoints.down("xs")]: {
        marginTop: '48px',
      }
    },
    innerDiv: {
      width: '100%',
      overflow: 'visible',
    },
  }),
);

const LandingHeader: React.FC = () => {
  const classes = useStyles();

  return (
    <div className={classes.landingHeading}>
      <div className={classes.innerDiv}>
        <LandingBackdrop 
          hue={290}
          sm={require('../assets/zachary-nelson_sm.jpg')}
          md={require('../assets/zachary-nelson_md.jpg')}
          lg={require('../assets/zachary-nelson_lg.jpg')}
          xl={require('../assets/zachary-nelson_xl.jpg')}
        />
      </div>
    </div>
  );
};

export default LandingHeader;
