import React from 'react';
import ReportDetails1 from './ReportDetails1';
  
class DataComponent1 extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
          records: [],
          isLoaded: false,
        };
      }
    
      componentDidMount() {
        fetch('http://localhost:3001/salesReport')
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
          <ReportDetails1 />
        </div>    
      );
    }
  }

  export default DataComponent1;

