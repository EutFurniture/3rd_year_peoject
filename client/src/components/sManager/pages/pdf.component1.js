import React from 'react';
import ReactToPrint from 'react-to-print';

import DataComponent1 from './data.component1';

class PdfComponent1 extends React.Component {
    
    render() {
      return (
        <div>
          <ReactToPrint
            content={() => this.componentRef}
            trigger={() => <button className="btn btn-primary">Print to PDF!</button>}
          />
          <DataComponent1 ref={(response) => (this.componentRef = response)} />
        </div>
      );
    }

}

export default PdfComponent1;