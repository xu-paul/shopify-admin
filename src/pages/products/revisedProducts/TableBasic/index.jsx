import React from 'react';
import styles from './index.less';
import { connect } from 'dva';
import Editable from 'antd-editable';

@connect(({ revised, loading }) => ({
  revised,
  loading: loading.effects['revised/fetch'],
}))
class TableBasic extends React.Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'revised/fetch',
    });
  }

  revisedProducts = (a, aa) => {
    console.log('aa', revised.products);
  };
  render() {
    const { revised, loading } = this.props;
    var columns = [
      {
        title: '',
        dataIndex: 'image.src',
        editable: false,
        width: '10%',
        render: (_, record) => {
          const srcs =
            record.image == null
              ? 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1576564146465&di=0eea2d0226ac52395002f6aaf264008c&imgtype=0&src=http%3A%2F%2Fe.hiphotos.baidu.com%2Fzhidao%2Fpic%2Fitem%2Fb90e7bec54e736d13303db2498504fc2d562698d.jpg'
              : record.image.src;
          return <img src={srcs} style={{ width: '50px' }} />;
        },
      },
    ];
    for (var i = '0'; i < revised.selects.length; i++) {
      columns.push(revised.selects[i]);
      console.log(columns);
    }
    const data = revised.products;
    return (
      <div className={styles.container}>
        <div id="components-table-demo-basic">
          <Editable
            columns={columns}
            dataSource={data}
            rowKey={'id'}
            loading={loading}
            onChange={this.revisedProducts}
          />
        </div>
      </div>
    );
  }
}
export default TableBasic;
