import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    artwork: (props: ArtworkProps) => ({
      width: props.width,
      height: props.height,
      backgroundImage: `url(${props.url})`,
      backgroundSize: 'cover!important',
    }),
  }),
);

type ArtworkProps = {
  height: number | string,
  width: number | string,
  url: string,
}

const Artwork: React.FC<ArtworkProps> = (props) => {
  const classes = useStyles(props);

  return (
    <div className={classes.artwork} />
  );
};

export default Artwork;