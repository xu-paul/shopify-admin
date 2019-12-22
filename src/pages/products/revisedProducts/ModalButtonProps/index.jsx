import React from 'react';
import { Modal, Button } from 'antd';
import styles from './index.less';
import { connect } from 'dva';
@connect(({ revised, loading }) => ({
  revised,
  loading,
}))
class App extends React.Component {
  state = {};
  save = () => {
    const { revised } = this.props;
    console.log(revised.products);
  };

  render() {
    return (
      <div>
        <Button onClick={this.save} disabled={false} style={{ float: 'left' }}>
          Save
        </Button>
        <Button style={{ float: 'left' }} disabled={false}>
          Discard
        </Button>
      </div>
    );
  }
}

export default () => (
  <div className={styles.container}>
    <div id="components-modal-demo-button-props">
      <App />
    </div>
  </div>
);
