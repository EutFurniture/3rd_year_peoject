import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Hidden from '@material-ui/core/Hidden';
import { Redirect } from 'react-router-dom';

const useStyles = makeStyles({
  card: {
    display: 'flex',
    marginBottom:"8%",
  },

  cardDetails: {
    flex: 1,
    textDecoration:"none",
    '&:hover':{
     
      textDecoration:'none',
     }
  },
  cardMedia: {
    width: 160,
  },
  title:{
    marginTop:'40px',
    color:'rgb(66, 56, 117)',
    textAlign:'center',
    fontWeight:'bold',

  },
  des:{
  
    textAlign:'center',
    fontWeight:'bold',
  }
});

export default function FeaturedPost(props) {
  const classes = useStyles();
  const { post } = props;

  return (
    <Grid item xs={12} md={6}>
      <CardActionArea  >
        <Card className={classes.card}>
          <div className={classes.cardDetails}>
            <CardContent>
              <Typography component="h2" color="inherit"  className={classes.title} variant="h5">
                {post.title}
              </Typography>
             
              <Typography variant="subtitle1" paragraph className={classes.des}>
                {post.description}
              </Typography>
              
            </CardContent>
          </div>
         
          <Hidden xsDown>
          <img width='200' height='200' src={post.image} />
          </Hidden>
        </Card>
      </CardActionArea>
    </Grid>
  );
}

FeaturedPost.propTypes = {
  post: PropTypes.object,
};
