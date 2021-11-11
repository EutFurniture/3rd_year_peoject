import React from 'react';
import ReactToPrint from 'react-to-print';



import DataComponent1 from './DataComponent1';

class DownloadReport1 extends React.Component {
    
    render() {
      return (
        <div>
          <ReactToPrint
            content={() => this.componentRef}
            trigger={() => <button className="btn btn-success">Download to PDF!</button>}
          /><br/>
          <DataComponent1 ref={(response) => (this.componentRef = response)} />
          
        </div>
      );
    }

}

export default DownloadReport1;