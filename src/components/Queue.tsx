import React from 'react';
import { makeStyles, createStyles, Theme, Typography } from '@material-ui/core';
import QueueList from './QueueList';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      height: '100%',
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
    },
    queueContainer: {
      overflowY: 'auto',
      flexGrow: 1,
    },
    infoContainer: {
      marginTop: theme.spacing(2),
      marginLeft: theme.spacing(2),
    }
  })
);

const Queue: React.FC = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.infoContainer}>
        <Typography variant="h4" component="h3" color="textPrimary" gutterBottom>
          Queue
        </Typography>
      </div>
      <div className={classes.queueContainer}>
        <QueueList />
      </div>
    </div>
  );
};

export default Queue;
