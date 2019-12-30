import React from 'react';
import { Select } from 'antd';
import styles from './index.less';
import { connect } from 'dva';

const { Option } = Select;

@connect(({ reviseds, loading }) => ({
  revised:reviseds,
}))
class SelectOptionLabelProp extends React.Component {
  state = {
    value: ['Title'],
  };
  handleChange = (_, select) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'reviseds/selects',
      payload: {
        select,
        value: _,
      },
    });
  };
  render() {
    const { revised } = this.props;
    return (
      <div className={styles.container} style={{marginTop:'36px',backgroundColor:'#fff',padding:'24px 24px'}}>
        <div id="components-select-demo-option-label-prop">
          <Select
            mode="multiple"
            style={{
              width: '100%',
            }}
            placeholder="select one country"
            defaultValue={revised.value}
            onChange={this.handleChange}
            optionLabelProp="label"
          >
            <Option value="title" label="Title">
              Title
            </Option>
            <Option value="tags" label="Tags">
              Tags
            </Option>
            <Option value="vendor" label="Vendor">
              Vendor
            </Option>
            <Option value="published_scope" label="Availability">
              Availability
            </Option>
          </Select>
        </div>
      </div>
    );
  }
}
export default SelectOptionLabelProp;
