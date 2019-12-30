import React from 'react';
import { Modal, Button } from 'antd';
import styles from './index.less';
import { connect } from 'dva';
@connect(({ reviseds, loading }) => ({
  revised:reviseds,
  loading: loading.effects[('reviseds/save','reviseds/empty','reviseds/fetch')],
}))
class App extends React.Component {
  state = {};
  save = async() => { 
    const { dispatch } = this.props;
    await dispatch({
      type: 'reviseds/save',
    });
    await dispatch({
      type:'reviseds/fetch'
    })
  };
  discard = async()=>{
    const { dispatch } = this.props;

    await dispatch({
      type: 'revised/empty',
    });
    location.hash = '/products/allProducts';
  }
  render() {
    return (
      <div>
        <Button onClick={this.save} disabled={false} style={{ float: 'right' ,margin:'24px 12px' }}>
          Save
        </Button>
        <Button style={{ float: 'right' ,margin:'24px 12px' }} disabled={false} onClick={this.discard}>
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
