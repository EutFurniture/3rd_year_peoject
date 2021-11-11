import React from 'react';
import CustomerData from './CustomerData';


class DataComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
          records: [],
          isLoaded: false,
        };
      }
    
      componentDidMount() {
        fetch('http://localhost:3001/CustomerReport1')
          .then(res => res.json())
          .then(result => {
            this.setState({
              isLoaded: true,
              records: result,
    
            });
          });
          
      }
    

    render() {
      return (
          <div >
             <h1 style={{marginBottom:'1px',textAlign:'center',marginBottom:'30px',height:'60px'}}><b>SYSTEM REPORT</b></h1>   
          <CustomerData />
        </div>    
      );
    }
  }

  export default DataComponent;