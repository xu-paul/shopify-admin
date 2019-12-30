import React, { Component } from 'react';
import PageHeaderBreadcrumb from './PageHeaderBreadcrumb';
import CardL1 from './CardL1';
import CardL2 from './CardL2';
import CardL3 from './CardL3';
import CardR1 from './CardR1';
import CardR2 from './CardR2';
import Button from './Button'

class RevisedProduct extends Component {
  
  render() {
    
    return (
      <div>
        <PageHeaderBreadcrumb />
        <div style={{display:'flex'}}>
          <div style={{margin:'24px 48px' }}><CardL1 /></div>
        
          <div style={{margin:'24px 0px',}}><CardR1 /><CardR2 /></div>
         
        </div>
        <div style={{margin:'24px 48px'}}><CardL2 /></div>
        <div style={{margin:'24px 48px'}}><CardL3 /></div>
        <Button />
      </div>
    );
  }
}

export default RevisedProduct;
