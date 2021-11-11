import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import Image from '../../../images/h7.jpeg';
const useStyles = makeStyles((theme) => ({
  mainFeaturedPost: {
    position: 'relative',
    // backgroundColor: theme.palette.grey[500],
    color: 'white',
    marginBottom: theme.spacing(8),
    // // backgroundImage: `url(${Image})` ,
    background: 'linear-gradient( 360deg ,rgb(0,0,139, 0) 10%, rgba(0,0,139,1)), url(../../../images/h7.jpeg)',

    backgroundSize: '100% 150%',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    marginTop:'0%',
    fontWeight:'bold',
    //filter:'blur(8px)',
   

  },
  overlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    backgroundColor: 'rgba(0,0,0,.02)',
  },
  mainFeaturedPostContent: {
    position: 'relative',
    padding: theme.spacing(3),
    [theme.breakpoints.up('md')]: {
      padding: theme.spacing(25),
      paddingRight: 0,
      paddingLeft: '11%',
       left:'40%',
      top:'-20%',
      width: '900px',

    },
  },
}));

export default function MainFeaturedPost(props) {
  const classes = useStyles();
  const { post } = props;

  return (
    <Paper className={classes.mainFeaturedPost} style={{ backgroundImage: `url(${post.image})` }}>
      {/* Increase the priority of the hero background image */}
      {<img style={{ display: 'none' }} src={post.image} alt={post.imageText} />}
      <div className={classes.overlay} />
      <Grid container>
        <Grid item md={6}>
          <div className={classes.mainFeaturedPostContent}>
            <Typography component="h1" variant="h2" color="inherit" gutterBottom align='center' fontWeight="700px">
              {post.title}
            </Typography>
            <Typography variant="h4" color="inherit"  align='center'>
              {post.description}
            </Typography>
            <Typography variant="h4" color="inherit" align = "center">
              {post.content}
            </Typography>
            <Link variant="subtitle1" href="#">
              {post.linkText}
            </Link>
          </div>
        </Grid>
      </Grid>
    </Paper>
  );
}

MainFeaturedPost.propTypes = {
  post: PropTypes.object,
};
