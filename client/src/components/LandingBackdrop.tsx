import React from 'react';
import { Fade, useTheme, makeStyles, Theme, createStyles } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100vw',
      overflow: 'hidden',
      backgroundColor: 'black',
      maxHeight: 'calc(100vw - 88px)',
      [theme.breakpoints.down('sm')]: {
        height: '300px',
      },
      [theme.breakpoints.up('md')]: {
        height: '400px',
      },
      [theme.breakpoints.up('lg')]: {
        height: '600px',
      },
      [theme.breakpoints.up('xl')]: {
        height: '700px',
      },
      zIndex: -1,
    },
    image: {
      position: 'absolute',
      top: 0,
      right: 0,
      height: '700px',
      width: 'auto',
      overflow: 'hidden',
      [theme.breakpoints.down('sm')]: {
        height: '300px',
      },
      [theme.breakpoints.up('md')]: {
        height: '500px',
        top: 0,
      },
      [theme.breakpoints.up('lg')]: {
        height: '750px',
        top: -25,
      },
      [theme.breakpoints.up('xl')]: {
        height: '1000px',
        top: -50,
      },
      maskImage: "linear-gradient(to left, rgba(0,0,0,1) 35%, rgba(0,0,0,0) 100%)",
      WebkitMaskImage: "linear-gradient(to left, rgba(0,0,0,1) 35%, rgba(0,0,0,0) 100%)",
    },
    gradient1: (props: LandingBackdropProps) => ({
      position: 'absolute',
      top: 0,
      left: 0,
      overflow: 'visible',
      backgroundImage: `linear-gradient(245deg, hsla(${props.hue}, 50%, 40%, 0) 35%, hsla(${props.hue}, 50%, 40%, 1) 70%)`,
      width: '100vw',
      [theme.breakpoints.down('sm')]: {
        height: '300px',
      },
      [theme.breakpoints.up('md')]: {
        height: '400px',
      },
      [theme.breakpoints.up('lg')]: {
        height: '600px',
      },
      [theme.breakpoints.up('xl')]: {
        height: '700px',
      },
    }),
    gradient2: (props: LandingBackdropProps) => ({
      position: 'absolute',
      top: 0,
      left: 0,
      overflow: 'visible',
      backgroundImage: `linear-gradient(180deg, rgba(41, 44, 51, 0.4) 0%, rgba(41, 44, 51, 0.25) 15%, rgba(41, 44, 51, 0) 40%), linear-gradient(0deg, rgba(0, 0, 0, 0.45) 0%, rgba(0, 0, 0, 0.432) 4.34%, rgba(0, 0, 0, 0.392) 7.78%, rgba(0, 0, 0, 0.338) 10.86%, rgba(0, 0, 0, 0.266) 13.74%, rgba(0, 0, 0, 0.189) 16.63%, rgba(0, 0, 0, 0.122) 19.8%, rgba(0, 0, 0, 0.059) 23.48%, rgba(0, 0, 0, 0.018) 27.91%, rgba(0, 0, 0, 0) 33.33%), radial-gradient(ellipse at left top, hsla(${props.hue}, 100%, 60%, 1) 5%, hsla(${props.hue}, 100%, 60%, 0) 60%)`,
      width: '100vw',
      [theme.breakpoints.down('sm')]: {
        height: '300px',
      },
      [theme.breakpoints.up('md')]: {
        height: '400px',
      },
      [theme.breakpoints.up('lg')]: {
        height: '600px',
      },
      [theme.breakpoints.up('xl')]: {
        height: '700px',
      },
    }),
  }),
);

type LandingBackdropProps = {
  hue: number,
  sm: string,
  md: string,
  lg: string,
  xl: string,
}

const LandingBackdrop: React.FC<LandingBackdropProps> = (props: LandingBackdropProps) => {
  const classes = useStyles(props);
  const theme = useTheme();

  return (
    <Fade in={true} timeout={1000}>
      <div className={classes.root}>
        <img
          className={classes.image}
          alt="Backdrop"
          srcSet={`
            ${props.sm} ${theme.breakpoints.values.sm}w,
            ${props.md} ${theme.breakpoints.values.md}w,
            ${props.lg} ${theme.breakpoints.values.lg}w,
            ${props.xl} ${theme.breakpoints.values.xl}w`}
        />
        <div className={classes.gradient1} />
        <div className={classes.gradient2} />
      </div>
    </Fade>
  );
};

export default LandingBackdrop;