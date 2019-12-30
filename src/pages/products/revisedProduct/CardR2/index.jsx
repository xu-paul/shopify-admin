import React from 'react';
import { Card, Input, Select,InputNumber, Button } from 'antd';
import { connect } from 'dva';
import styles from './index.less';
const { Option } = Select;
@connect(({ revised, loading }) => ({
   product:revised.product
}))
class CardR2 extends React.Component {
  state = {
   
  };

  render() {
    const { product } =this.props
    const tagsChange=(name,title)=>{
      const { dispatch } = this.props;
        dispatch({
            type: 'revised/addProperty',
            payload: { name, title},
        });
    }
    const childrens=[];
    const tags = product=={}?["yyy"]:["yyy"];
    //product.tags.split(",");
    for(var i=0 ;i<tags.length;i++){
      childrens.push(<Option value={tags[i]} key={tags[i]}>{tags[i]}</Option>)
    }
    
    return (
      <div className={ styles.container }>
      <div id="components-card-demo-simple">
        <Card
          style={ {
            width: '300px ',marginTop:'48px'
          } }
        >
          <p style={ { fontSize: '30px' } }>TAGS</p>
          
          <Select mode="tags" style={{ width: '100%' }}  onChange={(e)=>tagsChange('tags',e)}  defaultValue={tags}>
          {childrens}
          </Select>
        </Card>
      </div>
    </div>
    )
  }
}
export default (CardR2);
