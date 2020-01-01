import React from 'react';
import { Card, Input, Select, InputNumber, Button } from 'antd';
import { connect } from 'dva';
import styles from './index.less';
const { Option } = Select;
@connect(({ revised, loading }) => ({
  product: revised.product,
}))
class CardR2 extends React.Component {
  state = {};

  render() {
    const { product } = this.props;
    const tagsChange = (name, title) => {
      var tags = '';
      for (let index = 0; index < title.length; index++) {
        tags = tags + title[index] + ',';
      }

      const { dispatch } = this.props;
      dispatch({
        type: 'revised/addProperty',
        payload: { name, title: tags },
      });
    };
    const childrens = [];

    const tags2 = product.tags == null ? ['yyy'] : product.tags.split(',');
    //product.tags.split(",");
    for (var i = 0; i < tags2.length; i++) {
      childrens.push(
        <Option value={tags2[i]} key={tags2[i]}>
          {tags2[i]}
        </Option>,
      );
    }

    return (
      <div className={styles.container}>
        <div id="components-card-demo-simple">
          <Card
            style={{
              width: '300px ',
              marginTop: '48px',
            }}
          >
            <p style={{ fontSize: '30px' }}>TAGS</p>

            <Select
              mode="tags"
              style={{ width: '100%' }}
              onChange={e => tagsChange('tags', e)}
              defaultValue={tags2}
            >
              {childrens}
            </Select>
          </Card>
        </div>
      </div>
    );
  }
}
export default CardR2;
