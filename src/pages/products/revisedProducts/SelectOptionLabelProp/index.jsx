import React from 'react';
import { Select } from 'antd';
import styles from './index.less';
import { connect } from 'dva';

const { Option } = Select;

@connect(({ revised, loading }) => ({
  revised,
}))
class SelectOptionLabelProp extends React.Component {
  state = {
    value: ['Title'],
  };
  handleChange = (_, select) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'revised/selects',
      payload: {
        select,
        value: _,
      },
    });
  };
  render() {
    const { revised } = this.props;
    return (
      <div className={styles.container}>
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
            <Option value="Title" label="title">
              title
            </Option>
            <Option value="Tags" label="tags">
              Tags
            </Option>
            <Option value="Vendor" label="vendor">
              Vendor
            </Option>
            <Option value="Availability" label="published_scope">
              Availability
            </Option>
          </Select>
        </div>
      </div>
    );
  }
}
export default SelectOptionLabelProp;
