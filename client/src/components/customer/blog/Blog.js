import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Header from './Header';
// const useStyles = makeStyles((theme) => ({
//   mainGrid: {
//     marginTop: theme.spacing(1),
//   },
// }));

export default function Blog(userData) {
  //const classes = useStyles();

  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="xxl" minWidth="360px">
        <Header title="EUT FURNITURE"  />
        
      </Container>
     
    </React.Fragment>
  );
}
