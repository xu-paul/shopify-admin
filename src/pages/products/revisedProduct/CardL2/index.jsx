import React from 'react';
import { Card, InputNumber } from 'antd';
import styles from './index.less';
import { connect } from 'dva';
@connect(({ revised, loading }) => ({
  product:revised.product
}))
class CardL2 extends React.Component {
  state = {};

  render() {
   
    const { product } =this.props;
    const priceChange = (ee,e) => {
      const x=e.replace(/[^0-9.]/ig,"")
      
       const { dispatch } = this.props;
        dispatch({
          type: 'revised/addVariants',
          payload: { name:ee, title:x },
        });
     
    }
    console.log(product);
    
   return (
      <div className={ styles.container }>
        <div id="components-card-demo-simple">
          <Card
            style={ {
              width: '800px ',
            } }
          >
            <p style={ { fontSize: '30px' } }>Pricing</p>
            <div style={ { display: 'flex' } }>
              <div >
                <p>Price</p>
                <InputNumber
                  style={ { width: '350px', margin: '0px 48px 48px 0px' } }
                  formatter={ value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',') }
                  parser={ value => value.replace(/\$\s?|(,*)/g, '') }
                  onBlur={(e)=>priceChange("price",e.target.value)}
                  defaultValue={ Object.keys(product).length==0?'':product.variants[0].price}
                /></div>
              <div ><p>Compare at price</p>
                <InputNumber
                  style={ { width: '350px' } }
                  formatter={ value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',') }
                  parser={ value => value.replace(/\$\s?|(,*)/g, '') }
                  onBlur={(e)=>priceChange("compare_at_price",e.target.value)}
                  defaultValue={ Object.keys(product).length==0?'':product.variants[0].compare_at_price}
                //onChange={onChange}
                /></div></div>
                
            
          </Card>
        </div>
      </div>

    )
  }
}
export default (CardL2);
