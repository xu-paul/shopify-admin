import React from 'react';
import { Card, Input, Select,InputNumber } from 'antd';
import styles from './index.less';
import { connect } from 'dva';
const { Option } = Select;
@connect(({ revised, loading }) => ({
  product:revised.product,
  variants:revised.variants
}))
class CardL3 extends React.Component {
  state = {
    fulfillment_service:'',sku:'' ,inventory_quantity :''
  };

  render() {
    
    const { fulfillment_service ,sku ,inventory_quantity } =this.state
    const { product ,variants} =this.props
    const variantsChange=(name,title)=>{
      const { dispatch } = this.props;
        dispatch({
            type: 'revised/addVariants',
            payload: { name, title },
        });
        if(name=="fulfillment_service"){
        this.setState({fulfillment_service:title})}
        
    }
    var x=fulfillment_service=="manual"?'none':'block'
    if(variants.fulfillment_service!=fulfillment_service){
      this.setState({fulfillment_service:variants.fulfillment_service})
    }
    if(variants.sku!=sku){
      this.setState({sku:variants.sku})
    }
    if(variants.inventory_quantity!=inventory_quantity){
      this.setState({inventory_quantity:variants.inventory_quantity})
    }
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
              <Select key={variants.fulfillment_service!==fulfillment_service? 'notLoadedYet' : 'loaded'}
                      defaultValue={variants.fulfillment_service} 
                      style={{ width: "750px" }} 
                      onChange={(value)=>variantsChange("fulfillment_service",value)}>
               <Option value="manual">Shopify</Option>
               <Option value="oberlo">Oberlo</Option>
              </Select>
            </div>
            <p style={{display:x}}>This product’s SKU must match the SKU used in {fulfillment_service}.</p>
            <div> <div>
              <p>SKU (Stock Keeping Unit)</p>
              <Input
                key={variants.sku!==sku? 'notLoadedYet' : 'loaded'}
                style={ { width: '700px' } }
                onBlur={(e)=>variantsChange("sku",e.target.value)}  
                defaultValue={variants.sku}
              /></div></div>
              <hr/>
              <p style={ { fontSize: '30px' } }>QUANTITY</p>
              <div >
              <p>Available</p>
              <InputNumber  
                  key={variants.inventory_quantity!==inventory_quantity? 'notLoadedYet' : 'loaded'}
                  defaultValue={variants.inventory_quantity} 
                  onBlur={(e)=>variantsChange("inventory_quantity",e.target.value)} />
            </div>
        </Card>
      </div>
    </div>
    )
  }
}
export default (CardL3);
