import React, { Component } from 'react';
import Form from './Form';
import Table from './Table';

class Inventory extends Component {
  render() {
    return (
      <div>
        <Form />
        <Table />
      </div>
    );
  }
}

export default Inventory;
