import React,{ useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Table} from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import  Link  from '@material-ui/core/Link';
import { Row } from 'react-bootstrap';
import { Col } from 'react-bootstrap';
import axios from "axios";

const styles = {

okbtn:{
  backgroundColor: '#007E33',
  width: '200px',
  textDecoration: 'none',
  height: '100px',
  marginRight: '5px',
  fontSize: '17px',
  paddingLeft: '15px',
  paddingRight: '15px',
  paddingTop: '5px',
  paddingBottom: '5px',
  color: 'white',
  borderRadius: '7px',
  cursor:'pointer'
},
}

const dateOnly = (d) => {
  const date = new Date(d);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return `${year} - ${month} - ${day}`;
};

export default function Assign()
{
    const [AssignList,setAssignList]=useState([])
    useEffect(()=>{
      axios.get('http://localhost:3001/Assign').then((response)=>{
        setAssignList(response.data)
      })
    },[])

    const [deliverList,setdeliverList]=useState([])
    useEffect(()=>{
      axios.get('http://localhost:3001/deliverid').then((response)=>{
        setdeliverList(response.data)
      })
    }, [])

    const [Deliver_id,setDeliver_id] = useState();
    const AssignDelivers = (order_id) =>{
      axios.put('http://localhost:3001/AssignDeliver', {
        order_id:order_id,
        Deliver_id:Deliver_id
      }).then(
        (response) => {
          alert("Deliver Assigned Successfully");
        }
      )
    }
   
      
     return(  
  
              <Table striped bordered hover responsive>
              <thead >
                <tr>
                  <th scope="col">OrderId</th>
                  <th scope="col">Last Date</th>
                  <th scope="col">Ship To</th>
                  <th scope="col">DeliverId</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>

             <tbody>
                {AssignList.map((record, key) =>{
                   return(
                    <tr>
                    <th scope="row">{record.order_id}</th>
                    <td>{dateOnly(record.order_last_date)}</td>
                    <td>{record.address}</td>
          
                    <td>
                        <Form >
                        <Form.Group as={Row} controlId="formHorizontalID">
                        <Col sm={10}>
                            <Form.Control as="Select" name="id" onChange={(event) =>{setDeliver_id(event.target.value);}} required>
                              <option>Select Deliver</option>
                              {deliverList.map((record) => {return(
                                <option value={record.id}>{record.id}-{record.name}</option>
                              )})}
                            </Form.Control>
                        </Col>
                        </Form.Group><br/>
                        </Form>
                    </td>
                    <td>
                    <Link style={styles.okbtn} onClick={() => {AssignDelivers(record.order_id)}} > Assign </Link>
                    </td>
                  </tr>
                   )
                 })}
              </tbody> 
            </Table>
           
    
     )
  }

