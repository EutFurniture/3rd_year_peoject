import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Landing from './Landing';

export default function Blog() {
  

  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="xxl"  minWidth='360px'>
        <Landing title="EUT FURNITURE"  />
        
      </Container>
     
    </React.Fragment>
  );
}
