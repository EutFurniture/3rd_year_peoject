import React from 'react';
import ReactToPrint from 'react-to-print';



import DataComponent from './DataComponent';

class DownloadReport extends React.Component {
    
    render() {
      return (
        <div>
          <ReactToPrint
            content={() => this.componentRef}
            trigger={() => <button className="btn btn-success">Download to PDF!</button>}
          /><br/>
          <DataComponent ref={(response) => (this.componentRef = response)} />
          
        </div>
      );
    }

}

export default DownloadReport;