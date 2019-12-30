import React from 'react';
import { Card, Input, Select,InputNumber, Button } from 'antd';
import { connect } from 'dva';
import styles from './index.less';
const { Option } = Select;
@connect(({ addProduct, loading }) => ({

}))
class CardR2 extends React.Component {
  state = {
   
  };

  render() {
    const tagsChange=(name,title)=>{
      const { dispatch } = this.props;
        dispatch({
            type: 'addProduct/addProperty',
            payload: { name, title},
        });
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
          
          <Select mode="tags" style={{ width: '100%' }}  onChange={(e)=>tagsChange('tags',e)}>
          <Option value="qwe" key="qwe">qwe</Option>
          <Option value="John's Fav" key="John's Fav">John's Fav</Option>
          <Option value="Barnes & Noble" key="Barnes & Noble">Barnes & Noble</Option>
          <Option value="11111" key="11111">11111</Option>
          </Select>
        </Card>
      </div>
    </div>
    )
  }
}
export default (CardR2);
