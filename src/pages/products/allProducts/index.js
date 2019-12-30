import React, { Component } from 'react';
import PageHeaderBreadcrumb from './PageHeaderBreadcrumb';
import Table from './Table'
import Form from './Form'

class AllProducts extends Component {
  render() {
    return (
      <div>
        <PageHeaderBreadcrumb />
        <Form />
        <Table />
      </div>
    );
  }
}

export default AllProducts;
