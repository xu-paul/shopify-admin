import React, { Component } from 'react';
import PageHeaderBreadcrumb from './PageHeaderBreadcrumb';
import TableBasic from './TableBasic';
import SelectOptionLabelProp from './SelectOptionLabelProp';
import ModalButtonProps from './ModalButtonProps';

class RevisedProduct extends Component {
  render() {
    return (
      <div>
        <PageHeaderBreadcrumb />
        <SelectOptionLabelProp />
        <TableBasic />
        <ModalButtonProps />
      </div>
    );
  }
}

export default RevisedProduct;
