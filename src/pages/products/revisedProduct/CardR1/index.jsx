import React from 'react';
import { Card, Input, Select,InputNumber, Button } from 'antd';
import { connect } from 'dva';
import styles from './index.less';
const { Option } = Select;
@connect(({ revised, loading }) => ({
  product:revised.product
}))
class CardR1 extends React.Component {
  state = {
    Type:'',Vendor:''
  };

  render() {
    const { product }= this.props
    const constChange=(name,title)=>{
     
      const { dispatch } = this.props;
        dispatch({
            type: 'revised/addProperty',
            payload: { name, title },
        });
      
    }
    const addType=(Type)=>{
        this.setState({Type:Type})
        
    }
    const addVendor=(Vendor)=>{
        this.setState({Vendor:Vendor})
        
    }
    const pushType=()=>{
        children.push(<Option value={this.state.Type} key={this.state.Type}>{this.state.Type}</Option>)
    }
    const pushVendor=()=>{
        childrens.push(<Option value={this.state.Vendor} key={this.state.Vendor}>{this.state.Vendor}</Option>)
    }
    const children = [<Option value={product.product_type} key={product.product_type}>{product.product_type}</Option>]; 
    const childrens = [<Option value={product.vendor} key={product.vendor}>{product.vendor}</Option>,];
    return (
      <div className={ styles.container }>
      <div id="components-card-demo-simple">
        <Card
          style={ {
            width: '300px ',
          } }
        >
          <p style={ { fontSize: '30px' } }>Organization</p>
          
            <div ><div >
              <p>Product type</p>
              <Select   style={{ width: '100%' }}  
              onChange={(e)=>constChange('product_type',e)} 
              defaultValue={product.product_type}
              >
                {children}
              </Select>
            </div>
            <p>Add Product type</p>
           <div>
                <Input
                style={ { width: '120px' } }
                onBlur={(e)=>addType(e.target.value)}
              />
              <Button onClick={pushType}>
                  Add
              </Button>
           </div></div>
           
           
           <div ><div >
              <p>Vendor</p>
              <Select   
              style={{ width: '100%' }}  
              onChange={(e)=>constChange('vendor',e)} 
              defaultValue={product.vendor}
              >
                {childrens}
              </Select>
            </div>
            <p>Add Vendor</p>
           <div>
                <Input
                style={ { width: '120px' } }
                onBlur={(e)=>addVendor(e.target.value)}
              />
              <Button onClick={pushVendor}>
                  Add
              </Button>
           </div></div>  
        </Card>
      </div>
    </div>
    )
  }
}
export default (CardR1);
