import React from 'react';
import { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Table} from 'react-bootstrap';


class statusView extends Component{
  constructor(props) {
    super(props);
    this.state = {
      records: [],
      isLoaded: false,
    };
  }

  componentDidMount() {
    fetch('http://localhost:3001/statusView')
      .then(res => res.json())
      .then(result => {
        this.setState({
          isLoaded: true,
          records: result,

        });
      });
      
  }
  
    render(){
      //const { records } = this.state;
     return(  
                 
              <Table striped bordered hover responsive>
              <thead >
                <tr>
                  <th scope="col">Deliver Id</th>
                  <th scope="col">Name</th>
                  <th scope="col">Pending</th>
                </tr>
              </thead>

             <tbody>
                 {this.state.records.map((record)=>{
                   return(
                    <tr>
                    <th scope="row">{record.employee_id}</th>
                    <td>{record.name}</td>
                    <td>{record.pending}</td>
                  </tr>
                   )
                 })}
              </tbody> 
            </Table>
        
    
     )
    }
}

export default statusView;
