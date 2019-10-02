import React from 'react';
import { makeStyles, createStyles } from '@material-ui/styles';
import { Theme } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    spacer: {
      paddingBottom: theme.spacing(8),
    }
  }),
);

const Spacer: React.FC = () => {
  const classes = useStyles();

  return (
    <div className={classes.spacer} />
  ); 
};

export default Spacer;
