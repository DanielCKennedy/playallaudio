import React, { createRef } from 'react';
import { Typography, GridList, makeStyles, Theme, createStyles, Fab, } from '@material-ui/core';
import ArrowBackIosRoundedIcon from '@material-ui/icons/ArrowBackIosRounded';
import ArrowForwardIosRoundedIcon from '@material-ui/icons/ArrowForwardIosRounded';

const height = 275;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {

    },
    gridListContainer: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
      overflow: 'hidden',
      backgroundColor: 'transparent',
      flex: 1,
    },
    gridList: {
      flexWrap: 'nowrap',
      transform: 'translateZ(0)',
      scrollBehavior: 'smooth',
      msOverflowStyle: 'none',
      scrollbarWidth: 'none',
      "&::-webkit-scrollbar": {
        display: 'none',
      },
    },
    container: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
    },
    leftButton: {
      position: 'relative',
      right: '-20px',
      zIndex: 1,
    },
    rightButton: {
      position: 'relative',
      left: '-20px',
      zIndex: 1,
    },
  }),
);

type HorizontalListProps = {
  title: string,
  items?: React.ReactNode,
}

const HorizontalList: React.FC<HorizontalListProps> = ({ title, items }) => {
  const classes = useStyles();
  const ref = createRef<HTMLElement | null>();

  const scrollLeft = () => {
    const gridList = ref.current;
    if (gridList && gridList.parentElement) {
      gridList.scrollLeft -= gridList.parentElement.scrollWidth;
    }
  };

  const scrollRight = () => {
    const gridList = ref.current;
    if (gridList && gridList.parentElement) {
      gridList.scrollLeft += gridList.parentElement.scrollWidth;
    }
  };

  if (!items) {
    return (
      <React.Fragment />
    );
  }

  return (
    <div className={classes.root}>
      <Typography variant="h4" component="h3" color="textPrimary" gutterBottom>
        {title}
      </Typography>
      <div className={classes.container}>
        <Fab className={classes.leftButton} color="secondary" onClick={scrollLeft} size="medium" aria-label="scroll left">
          <ArrowBackIosRoundedIcon color="primary"/>
        </Fab>
        <div className={classes.gridListContainer}>
          <GridList className={classes.gridList} cellHeight={height} cols={0} ref={ref}>
            {items}
          </GridList>
        </div>
        <Fab className={classes.rightButton} color="secondary" onClick={scrollRight} size="medium" aria-label="scroll right">
          <ArrowForwardIosRoundedIcon color="primary"/>
        </Fab>
      </div>
    </div>
  );
};

export default HorizontalList;
