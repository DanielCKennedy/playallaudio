import React from 'react';
import { makeStyles, createStyles, Theme, Typography } from '@material-ui/core';
import QueueList from './QueueList';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      height: '100%',
      // width: 300,
      width: '100%',
      // maxWidth: '95vw',
      display: 'flex',
      flexDirection: 'column',
      // backgroundColor: "rgba(0, 0, 0, 0.25)"
    },
    queueContainer: {
      // height: '100%',
      overflowY: 'auto',
      flexGrow: 1,
      // direction: 'rtl',
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
