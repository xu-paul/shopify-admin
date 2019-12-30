import React from 'react';
import { Card, InputNumber } from 'antd';
import styles from './index.less';
import { connect } from 'dva';
@connect(({ addProduct, loading }) => ({
  addVariants:addProduct.addVariants
}))
class CardL2 extends React.Component {
  state = {
    Price: '',
    Const:'',
    Profit:'',
    
  };

  render() {
    const { addVariants } =this.props
    const { Price,Const,Profit,Prices }=this.state
    const priceChange = (e) => {
      const x=e.replace(/[^0-9.]/ig,"")
      const profit=((Math.round(((1-Const/x) * 10000)))/100.00).toFixed(2) + '%';
       const { dispatch } = this.props;
        dispatch({
          type: 'addProduct/addVariants',
          payload: { name:"price", title:x },
        });
      this.setState({Price:x,Profit:profit})
    }
    const pricesChange =(e)=>{
      const x=e.replace(/[^0-9.]/ig,"")
      const { dispatch } = this.props;
        dispatch({
          type: 'addProduct/addVariants',
          payload: { name:"compare_at_price", title:x },
        });
      
    }
    const constChange =(e)=>{
      const x=e.replace(/[^0-9.]/ig,"")
      const profit=((Math.round(((1-x/Price) * 10000)))/100.00).toFixed(2) + '%';
      this.setState({Const:x,Profit:profit})  
    }
    
    const x=Const==''||Price==''?'none':'block'
    
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
                  onBlur={(e)=>priceChange(e.target.value)}
                  defaultValue={addVariants.Price}
                /></div>
              <div ><p>Compare at price</p>
                <InputNumber
                  style={ { width: '350px' } }
                  formatter={ value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',') }
                  parser={ value => value.replace(/\$\s?|(,*)/g, '') }
                  onBlur={(e)=>pricesChange(e.target.value)}
                  defaultValue={addVariants.compare_at_price}
                //onChange={onChange}
                /></div></div>
                <div style={{display:x}}><p>Projected margin: {Profit}</p></div>
            <div> <div>
              <p>Cost per item</p>
              <InputNumber
                style={ { width: '350px' } }
                formatter={ value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',') }
                parser={ value => value.replace(/\$\s?|(,*)/g, '') }
                onBlur={(e)=>constChange(e.target.value)}
                defaultValue={Const}
              /></div></div>
          </Card>
        </div>
      </div>

    )
  }
}
export default (CardL2);
