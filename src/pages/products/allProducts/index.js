import React, { Component } from 'react';
import PageHeaderBreadcrumb from './PageHeaderBreadcrumb';
import TableRowSelectionAndOperation from './TableRowSelectionAndOperation';
import FormAdvancedSearch from './FormAdvancedSearch';

class AllProducts extends Component {
  render() {
    return (
      <div>
        <PageHeaderBreadcrumb />
        <FormAdvancedSearch />
        <TableRowSelectionAndOperation />
      </div>
    );
  }
}

export default AllProducts;
