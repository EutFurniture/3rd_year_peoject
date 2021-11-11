import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import MainFeaturedPost from './MainFeaturedPost';
import FeaturedPost from './FeaturedPost';
import Footer from '../Footer';
import Img1 from '../../../images/din.jpg';
import Img2 from '../../../images/add.jpg';
import Image from '../../../images/img4.jpg';
import '../Footer.css'
import Caresoul from '../Caresoul'
import Navbar from './Navbar'
import Promotion from '../Products/category/Promotion'
const useStyles = makeStyles((theme) => ({
  mainGrid: {
    marginTop: theme.spacing(1),
  },
  post:{
    textDecoration:"none",
    '&:hover':{
     
     
     textDecoration:'none',
    },
    
  },
  sale:{
    fontWeight:'bold',
    marginLeft:"45%",
    color:'rgb(66, 56, 117)',
    align: 'center',
    fontSize:'50px'

  }
}));


const mainFeaturedPost = {
  title: 'Explore The New Furniture World !',
  description:
    "Why are you Waiting ?",
  image:`url(${Image})`,
  imgText: 'main image description',

  content: "Life is too short for Boring Furniture"
  
};



const featuredPosts = [
  {
   
    title: 'Sales Off Up to 50%',
    description:
      'This is a wider card with supporting text below as a natural lead-in to additional content.',
      image:Img1,
    imageText: 'Image Text',
  },
  {
    title: 'Sofa Collection',
    
    description:
      'starting from Rs.50000.00',
    image: Img2,
    imageText: 'Image Text',
  },
];





export default function Home(userData) {
  const classes = useStyles();

  return (
    <React.Fragment>
     
      <CssBaseline />
      <Container maxWidth="xxl"  minWidth='360px'>
        
        <main>
          <MainFeaturedPost post={mainFeaturedPost} />
          <Grid container spacing={4}>
            {featuredPosts.map((post) => (
              <FeaturedPost  className={classes.post} key={post.title} post={post} />
            ))}
          </Grid>
          <h1 className={classes.sale}> Promotions</h1>
          <Promotion  userData={userData}/>
          <Caresoul />
          <Grid  xs={12}>
      <section className='footer-subscription'>
        <p className='footer-subscription-heading'>
          Get Access to our Latest Sales, Product Details
        </p>
        <p className='footer-subscription-text'>
          You can unsubscribe at any time.
        </p>
        <div className='input-areas'>
          <form>
            <input
              className='footer-input'
              name='email'
              type='email'
              placeholder='Your Email'
             
            />
           <Button size="small">Subscribe</Button>
          </form>
        </div>
      </section>
      </Grid>
      
        </main>

       
      </Container>
     <Footer />
    </React.Fragment>
  );
}
