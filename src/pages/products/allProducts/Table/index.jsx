import React from 'react';
import { Table, Button } from 'antd';
import { connect } from 'dva';
import styles from './style.less';
import Link from 'umi/link';

@connect(({ products, loading }) => ({
  products: products.products,
  productsCount: products.count,
  loading: loading.models.products,
  productsValues: products.values,
  productsCurrent: products.current,
  productsColumnKey: products.products,
}))
class App extends React.Component {
  state = {
    selectedRowKeys: [],
    // Check here to configure the default column
    loading: false,
    current: '1',
  };
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'products/fetch',
    });
  }
  start = async () => {
    this.setState({
      loading: true,
    }); // ajax request after empty completing
    const { dispatch } = this.props;
    await dispatch({
      type: 'products/delete',
      payload: { selectedRowKeys: this.state.selectedRowKeys },
    });
    await dispatch({
      type: 'products/fetch',
    });
    this.setState({
      selectedRowKeys: [],
      loading: false,
    });
  };

  // revised = async () => {
  //   const { dispatch } = this.props;
   
  //   await dispatch({
  //     type: 'reviseds/rowKeys',
  //     payload: { revisedRowKeys: this.state.selectedRowKeys },
  //   });

  //   location.hash = '/products/revisedProducts';
    
  // };

  onSelectChange = selectedRowKeys => {
    this.setState({
      selectedRowKeys,
    });
  };
  handleTableChange = (pagination, filters, sorter) => {
    const { dispatch, productsValues } = this.props;
    dispatch({
      type: 'products/change',
      payload: {
        current: pagination.current,
        order: sorter.order,
        values: productsValues,
        columnKey: sorter.columnKey,
      },
    });
    dispatch({
      type: 'products/fetch',
    });
  };

  render() {
    const { products, loading, productsCount, productsCurrent } = this.props;
    const { selectedRowKeys } = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    };

    const paginationProps = {
      simple: true,
      //showLessItems:true,
      total: productsCount,
      hideOnSinglePage: true,
      current: productsCurrent,
      // if(productsCurrent='1'){}
    };
    const hasSelected = selectedRowKeys.length > 0;
    const columns = [
      {
        title: ' ',
        dataIndex: 'image.src',

        render: (_, record) => {
          const srcs =
            record.image == null
              ? 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1576564146465&di=0eea2d0226ac52395002f6aaf264008c&imgtype=0&src=http%3A%2F%2Fe.hiphotos.baidu.com%2Fzhidao%2Fpic%2Fitem%2Fb90e7bec54e736d13303db2498504fc2d562698d.jpg'
              : record.image.src;
          return <img src={srcs} style={{ width: '50px' }} />;
        },
      },
      {
        title: 'Products',
        dataIndex: 'title',
        sorter: true,
      },
      {
        title: 'SKU',
        dataIndex: 'variants[0].sku',
        render: (h, record) => {
          return (
            <span>
              {record.variants[0].sku}
            </span>
          );
        },
      },
      {
        width:"150px",
        title: 'When sold out',
        dataIndex: 'variants[0].inventory_policy',
        render: (h, record) => {
          return (
            <span>
              {record.variants[0].inventory_policy=="deny"?"Stop selling":"Continue selling"}
            </span>
          );
        },
      },
      {
        title: 'Inventory',
        dataIndex: 'variants[0].inventory_quantity',
       
        render: (h, record) => {
          let num = 0;
          for (let i = 0; i < record.variants.length; i++) {
            num = num + record.variants[i].inventory_quantity;
          }
          return (
            <span>
              {num} in stock for {record.variants.length} variants
              {/* {record.variants[0].inventory_quantity} */}
            </span>
          );
        },
      },{
        title: 'Incoming',
        dataIndex: 'variants[0].grams',
        render: (h, record) => {
          return (
            <span>
              {record.variants[0].grams}
            </span>
          );
        },
      },{
        title: 'Available',
        dataIndex: 'variants[0].Available',
        render: (h, record) => {
          return (
            <span>
              {record.variants[0].inventory_quantity}
            </span>
          );
        },
      },
      {
        title: 'Type',
        dataIndex: 'product_type',
      },
      {
        title: 'Vendor',
        dataIndex: 'vendor',
      },
    ];
   const  changeLocation = async (e)=>{
    const { dispatch } = this.props;
    await dispatch({
      type: 'revised/fetch',
      payload: { id: e.id },
    });
      location.hash = `/products/revised/${e.id}`;
    }
    
    const pathReviseds = {
      pathname: `/products/revisedProducts/${selectedRowKeys}`,
     
    };
    return (
      <div
        style={{
          backgroundColor: '#fff',
        }}
      >
        <div
          style={{
            margin: '0px 30px 20px',
          }}
        >
          <Button
            type="primary"
            onClick={this.start}
            disabled={!hasSelected}
            loading={loading}
            style={{ float: 'left' }}
          >
            Delete
          </Button>
          <Button
            style={{ display: !hasSelected ? 'none' : 'block', float: 'left' }}
            disabled={!hasSelected}
            //onClick={this.revised}
          >
             <Link
                to={pathReviseds}>
                Revised
              </Link>
          </Button>
          <Button
            style={{
              float: 'right',
              marginBottom: 24,
            }}
          >
            <Link to={{ pathname: '/products/allProduct/new' }}>Add product</Link>
          </Button>
          <span
            style={{
              marginLeft: 8,
            }}
          >
            {hasSelected ? `Selected ${selectedRowKeys.length} items` : ''}
          </span>
        </div>
        <Table
          rowSelection={rowSelection}
          columns={columns}
          dataSource={products}
          rowKey={'id'}
          onChange={this.handleTableChange}
          loading={loading}
          pagination={paginationProps}
          onRow={record => {
            return {
              onClick: ()=>changeLocation(record), // 点击行
              //onMouseEnter: () => {cursor:pointer}
            };
          }}
        />
      </div>
    );
  }
}

export default () => (
  <div>
    <div id="components-table-demo-row-selection-and-operation">
      <App />
    </div>
  </div>
);
