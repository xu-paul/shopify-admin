import React, { Component } from 'react';
import { Button } from 'antd';
import styles from './index.less';
import { connect } from 'dva';
@connect(({ home }) => ({
  Ocount: home.Ocount,
}))
class HomeButton extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'home/fetch',
    });
  }
  render() {
    const { Ocount } = this.props;
    console.log('====================================');
    console.log(Ocount);
    console.log('====================================');
    return (
      <div className={styles.container}>
        <div id="components-button-demo-block">
          <div>
            <Button type="primary" block>
              {Ocount}
            </Button>
            <Button block>Default</Button>
            <Button type="dashed" block>
              Dashed
            </Button>
            <Button type="danger" block>
              Danger
            </Button>
            <Button type="link" block>
              Link
            </Button>
          </div>
        </div>
      </div>
    );
  }
}
export default HomeButton;
