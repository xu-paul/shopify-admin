import React, { Component } from 'react';
import { Button } from 'antd';
import styles from './index.less';
import { connect } from 'dva';
import { Link } from 'umi';
@connect(({ home }) => ({
  Ocount: home.Ocount,
  Pcount: home.Pcount,
  Ccount: home.Ccount,
}))
class HomeButton extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'home/fetch',
    });
  }
  render() {
    const { Ocount,Pcount,Ccount } = this.props;
    
    return (
      <div className={styles.container}>
        <div id="components-button-demo-block">
          <div style={{backgroundColor:"#fff" ,width:"500px",margin:"0 auto"}}>
            <Button type="primary" block >
                <Link to="/order/all"> {Ocount}  orders in progress</Link>
            </Button>
            <Button block>
            <Link to="/order/draft/create"> Add order</Link>
            </Button>
            <Button type="primary" block>
                <Link to="/products/allProducts">  A total of  {Pcount} products</Link>
            </Button>
            <Button block>
            <Link to="/products/allProduct/new"> Add product</Link>
            </Button>
            <Button type="primary" block>
                <Link to="/customer"> There were {Ccount} customers</Link>
            </Button>
            <Button block>
            <Link to="/order/draft/create"> Add customer</Link>
            </Button>
           
          </div>
        </div>
      </div>
    );
  }
}
export default HomeButton;
