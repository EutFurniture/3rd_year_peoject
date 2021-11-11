import React from 'react';
import Main from "./views/Main";
import { ThemeProvider } from '@material-ui/styles';
import theme from './constant/theme';
import { StateProvider } from './stateContext';
import { Stepper } from '@material-ui/core';
import Header from "./views/Header";
import Sidebar from '../Sidebar';
const Payment = () => {

    return(
        <StateProvider>
          
        <ThemeProvider theme={theme}>
            <Header />
            <Main/>
        </ThemeProvider>
        </StateProvider>

        );
}
export default Payment


