import React from 'react';
// import CustomerChart from '../../charts/CustomerChart';
// import OrderChart from '../../charts/OrderChart';
// import OrderData from './OrderData';
// import ReturnItem from './ReturnItem';
// import CustomizeData from './CustomizeData'
// import DeliveryData from './DeliveryData';
// import CustomerData from './CustomerData';
import ReportDetails from './ReportDetails';
  
class DataComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
          records: [],
          isLoaded: false,
        };
      }
    
      componentDidMount() {
        fetch('http://localhost:3001/deliveryReport')
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
          <ReportDetails />
        </div>    
      );
    }
  }

  export default DataComponent;

