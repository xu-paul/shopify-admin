import React, { Component } from 'react';
import PageHeaderBreadcrumb from './PageHeaderBreadcrumb';
import Table from './Table';
import SelectOptionLabelProp from './SelectOptionLabelProp';
import Button from './Button';
import { connect } from 'dva';
@connect(({ reviseds, loading }) => ({

}))
class RevisedProducts extends Component {
  componentDidMount() {
   
      const { dispatch } = this.props;
   const id=this.props.location.pathname.substring(26)
     dispatch({
      type: 'reviseds/rowKeys',
      payload: { revisedRowKeys: id.split(',') },
    });
    
    dispatch({
      type: 'reviseds/fetch',
    });
  }
  render() {
    
    
    return (
      <div>
        <PageHeaderBreadcrumb />
        <SelectOptionLabelProp />
        <Table />
        <Button />
      </div>
    );
  }
}

export default RevisedProducts;
