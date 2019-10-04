import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {

    }
  })
);

const Template: React.FC = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}></div>
  );
};

export default Template;
