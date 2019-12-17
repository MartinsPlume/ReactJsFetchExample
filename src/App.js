import React, { Component } from 'react'
import './App.css';
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'
import ButtonToolbar from 'react-bootstrap/ButtonToolbar'


class App extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
      items:[]
    }
  }

  componentDidMount() {
    this.fetchProducts()
  }

  fetchProducts() {
    // Where we're fetching data from
    fetch(`http://localhost:61406/api/ItemDetails`)
      // We get the API response and receive data in JSON format...
      .then(response => response.json())
      // ...then we update the users state
      .then(data => {
        console.log(data)
        this.setState({
          items: data,
          isLoading: false,
        })
      })
      // Catch any errors we hit and update the app
      .catch(error => this.setState({ error, isLoading: false }));
  }


  fetchProduct(itemId){
    // Where we're fetching data from
    fetch(`http://localhost:61406/api/ItemDetails/${itemId}`)
      // We get the API response and receive data in JSON format...
      .then(response => response.json())
      // ...then we update the users state
      .then(data => {
        console.log(data)
        if (data && data.itemId) {
          this.setState({
            items: this.state.items.map(item => {
              if (item.itemId === data.itemId) item = data;
              return item;
            })
          })
        }
      })
      // Catch any errors we hit and update the app
      .catch(error => this.setState({ error, isLoading: false }));
  }

  renderTableData() {
      return this.state.items.map((item, index) => {
         const { itemId, itemName, itemPrice, itemCount, itemDescription } = item //destructuring
         return (
            <tr key={itemId}>
               <td>{itemId}</td>
               <td>{itemName}</td>
               <td>{itemPrice}</td>
               <td>{itemCount}</td>
               <td>{itemDescription}</td>
               <td>
                 <Button onClick={(e) => this.fetchProduct(itemId)}>Update Product</Button>
               </td>
            </tr>
         )
      })
   }

   deleteAll(){
      this.setState({
        items:[]
      })
   }
  
  render(){
  return (
    <div className="App">
        <Table striped bordered hover variant="dark">
          <thead>
            <tr>
              <th>itemId</th>
              <th>item Name</th>
              <th>Item Price</th>
              <th>Item Count</th>
              <th>Item Description</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {this.renderTableData()}
          </tbody>
      </Table>
      <ButtonToolbar>
        <Button variant="dark" onClick={(e) => this.deleteAll()}>Delete All</Button>
        <Button variant="dark" onClick={(e) => this.fetchProducts()}>Get All</Button>
      </ButtonToolbar>

    </div>
  );
  }
}

export default App