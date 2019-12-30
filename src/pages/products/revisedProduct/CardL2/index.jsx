import React from 'react';
import { Card, InputNumber } from 'antd';
import styles from './index.less';
import { connect } from 'dva';
@connect(({ revised, loading }) => ({
  product:revised.product,
  variants:revised.variants
}))
class CardL2 extends React.Component {
  state = {
    price:'',compare_at_price:''
  };

  render() {
   
    const { product,variants } =this.props;
    const { price,compare_at_price } =this.state
    const priceChange = (ee,e) => {
      const x=e.replace(/[^0-9.]/ig,"")
      
       const { dispatch } = this.props;
        dispatch({
          type: 'revised/addVariants',
          payload: { name:ee, title:x },
        });
     
    }
    if(variants.price!=price){
      this.setState({price:variants.price})
    }
    if(variants.compare_at_price!=compare_at_price){
      this.setState({compare_at_price:variants.compare_at_price})
    }
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
                  defaultValue={ variants.price}
                  key={variants.price!==price? 'notLoadedYet' : 'loaded'}
                /></div>
              <div ><p>Compare at price</p>
                <InputNumber
                  style={ { width: '350px' } }
                  formatter={ value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',') }
                  parser={ value => value.replace(/\$\s?|(,*)/g, '') }
                  onBlur={(e)=>priceChange("compare_at_price",e.target.value)}
                  defaultValue={ variants.compare_at_price}
                  key={variants.compare_at_price!==compare_at_price? 'notLoadedYet' : 'loaded'}
                //onChange={onChange}
                /></div></div>
                
            
          </Card>
        </div>
      </div>

    )
  }
}
export default (CardL2);
