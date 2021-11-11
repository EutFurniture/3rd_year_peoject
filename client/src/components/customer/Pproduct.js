import React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import ButtonBase from '@material-ui/core/ButtonBase';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';

const images = [

  {
    url: '/images/p5.jpg',
    title: 'Dining sets',
    width: '20%',
    path:'/customer/dining',
  },
  {
    url: '/images/p4.jpg',
    title: 'Chairs',
    width: '20%',
    path:'/customer/chair',
    
  },
  {
    url: '/images/p1.jpg',
    title: 'Sofa',
    width: '20%',
    path:'/customer/sofa',
  },
  {
    url: '/images/p2.jpg',
    title: 'Tables',
    width: '20%',
    path:'/customer/table',
  },
  {
    url: '/images/p3.jpg',
    title: 'Bed',
    width: '20%',
    path:'/customer/bed',
  },
  
 
];

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      minWidth: 200,
      width: '100%',
      marginTop:theme.spacing(3),
      marginBottom:"-2%",
    },
    image: {
      position: 'relative',
      height: 130,
      width:100,
      
      [theme.breakpoints.down('xs')]: {
        width: '100% !important', // Overrides inline-style
        height: 100,
      },
      '&:hover, &$focusVisible': {
        zIndex: 1,
        '& $imageBackdrop': {
          opacity: 0.15,
        },
        '& $imageMarked': {
          opacity: 0,
        },
        '& $imageTitle': {
          border: '4px solid currentColor',
        },
      },
    },
    focusVisible: {},
    imageButton: {
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: theme.palette.common.white,
    },
    imageSrc: {
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      backgroundSize: '40% ',
      backgroundPosition: 'center 40%',
      backgroundRepeat:'no-repeat',
    },
    imageBackdrop: {
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      backgroundColor: theme.palette.common.black,
      opacity: 0.4,
      transition: theme.transitions.create('opacity'),
    },
    imageTitle: {
      position: 'relative',
      padding: `${theme.spacing(2)}px ${theme.spacing(4)}px ${theme.spacing(1) + 6}px`,
    },
    imageMarked: {
      height: 3,
      width: 18,
      backgroundColor: theme.palette.common.white,
      position: 'absolute',
      bottom: -2,
      left: 'calc(50% - 9px)',
      transition: theme.transitions.create('opacity'),
    },
    route:{
      fontWeight:'bold',
      textDecoration:"none",
      fontSize:'20px',
      '&:hover':{
        textDecoration:'none',
        color:'brown'
      },
    }
  }),
);

export default function ButtonBases() {
  const classes = useStyles();

  return (
    <React.Fragment>
  
    <div className={classes.root} >
      
      {images.map((image) => (
        <ButtonBase
          focusRipple
          key={image.title}
          className={classes.image}
          focusVisibleClassName={classes.focusVisible}
          style={{
            width: image.width,
          }}
        >
          <span
            className={classes.imageSrc}
            style={{
              backgroundImage: `url(${image.url})`,
            }}
          />
          <span className={classes.imageBackdrop} />
          <span className={classes.imageButton}>
            <Typography
              component="span"
              variant="subtitle1"
              color="inherit"
              className={classes.imageTitle}
            >
              <Link href={image.path} className={classes.route} color="inherit">
              {image.title}
              </Link>
              <span className={classes.imageMarked} />
            </Typography>
          </span>
        </ButtonBase>
      ))}
     
    </div>
    
    </React.Fragment>
   
  );
}
