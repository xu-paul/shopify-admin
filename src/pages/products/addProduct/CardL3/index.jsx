import React from 'react';
import { Card, Input, Select,InputNumber } from 'antd';
import styles from './index.less';
import { connect } from 'dva';
const { Option } = Select;
@connect(({ addProduct, loading }) => ({
  
}))
class CardL3 extends React.Component {
  state = {
    fulfillment_service:'manual'
  };

  render() {
    
    const { fulfillment_service } =this.state
    const variantsChange=(name,title)=>{
      const { dispatch } = this.props;
        dispatch({
            type: 'addProduct/addVariants',
            payload: { name, title },
        });
        if(name=="fulfillment_service"){
        this.setState({fulfillment_service:title})}
        
    }
    var x=fulfillment_service=="manual"?'none':'block'
    return (
      <div className={ styles.container }>
      <div id="components-card-demo-simple">
        <Card
          style={ {
            width: '800px ',
          } }
        >
          <p style={ { fontSize: '30px' } }>Inventory</p>
          
            <div >
              <p>Inventory managed by</p>
              <Select defaultValue="manual" style={{ width: "750px" }} onChange={(value)=>variantsChange("fulfillment_service",value)}>
               <Option value="manual">Shopify</Option>
               <Option value="oberlo">Oberlo</Option>
              </Select>
            </div>
            <p style={{display:x}}>This product’s SKU must match the SKU used in {fulfillment_service}.</p>
            <div> <div>
              <p>SKU (Stock Keeping Unit)</p>
              <Input
                style={ { width: '700px' } }
                onBlur={(e)=>variantsChange("sku",e.target.value)}
              /></div></div>
              <hr/>
              <p style={ { fontSize: '30px' } }>QUANTITY</p>
              <div >
              <p>Available</p>
              <InputNumber  defaultValue={0} onBlur={(e)=>variantsChange("old_inventory_quantity",e.target.value)} />
            </div>
        </Card>
      </div>
    </div>
    )
  }
}
export default (CardL3);
