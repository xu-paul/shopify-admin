import React, { Component } from 'react';
import {Card}  from 'antd';
import { connect } from 'dva';


@connect(({ products, loading }) => ({
    products:products.products,
    loading: loading.effects['products/fetch'],
  }))
class Products extends Component{
    componentDidMount(){
        const {dispatch}=this.props;
        dispatch({
            type:'products/fetch'
        })
    }
    
        render() {
            const {products}=this.props;
            const s=products.map((products,index)=>{
            return <li key={index}>第{index+1}个商品：{products.title}</li> 
            })
            return (
                <Card >
                 <div>商品数据</div>
                  {s}
               </Card>
            );
        }
    
}
export default Products;