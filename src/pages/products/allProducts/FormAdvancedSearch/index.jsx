import React from 'react';
import { Form, Row, Col, Input, Button, Icon, Select, DatePicker } from 'antd';
import styles from './index.less';
import { connect } from 'dva';
const FormItem = Form.Item;
const { Option } = Select;

@connect(({ products, loading }) => ({
  products,
}))
class AdvancedSearchForm extends React.Component {
  state = {
    expand: false,
    expandForm: false,
  }; // To generate mock Form.Item

  handleSearch = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      const { dispatch, products } = this.props;
      dispatch({
        type: 'products/change',
        payload: {
          current: products.current,
          order: products.order,
          values,
          columnKey: products.columnKey,
        },
      });
      dispatch({
        type: 'products/fetch',
      });
    });
  };

  handleFormReset = () => {
    const { form, dispatch } = this.props;
    form.resetFields();
    this.setState({
      formValues: {},
    });
    dispatch({
      type: 'order/fetch',
      payload: {},
    });
  };

  toggleForm = () => {
    const { expandForm } = this.state;
    this.setState({
      expandForm: !expandForm,
    });
  };
  renderSimpleForm() {
    const { form } = this.props;
    const { getFieldDecorator } = form;
    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row
          gutter={{
            md: 8,
            lg: 24,
            xl: 48,
          }}
        >
          <Col md={8} sm={24}>
            <FormItem label="Search">
              {getFieldDecorator('query')(<Input placeholder="Search Products" />)}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="Availability">
              {getFieldDecorator('published_status')(
                <Select
                  placeholder="Select a value"
                  style={{
                    width: '150px',
                  }}
                >
                  <Option value="Select">Select a value</Option>
                  <Option value="online_store:visible">Available on Online Store</Option>
                  <Option value="online_store:hidden">Unavailable on Online Store</Option>
                </Select>,
              )}
            </FormItem>
          </Col>

          <Col md={8} sm={24}>
            <div
              style={{
                overflow: 'hidden',
              }}
            >
              <div
                style={{
                  float: 'right',
                  marginBottom: 24,
                }}
              >
                <Button type="primary" htmlType="submit">
                  query
                </Button>
                <Button
                  style={{
                    marginLeft: 8,
                  }}
                  onClick={this.handleFormReset}
                >
                  reset
                </Button>
                <a
                  style={{
                    marginLeft: 8,
                  }}
                  onClick={this.toggleForm}
                >
                  expand <Icon type="down" />
                </a>
              </div>
            </div>
          </Col>
        </Row>
      </Form>
    );
  }

  renderAdvancedForm() {
    const {
      form: { getFieldDecorator },
    } = this.props;

    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row
          gutter={{
            md: 8,
            lg: 24,
            xl: 48,
          }}
        >
          <Col md={8} sm={24}>
            <FormItem label="Search">
              {getFieldDecorator('query')(<Input placeholder="Search Products" />)}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="Availability">
              {getFieldDecorator('published_status')(
                <Select
                  placeholder="Select a value"
                  style={{
                    width: '100%',
                  }}
                >
                  <Option value="Select">Select a value</Option>
                  <Option value="online_store:visible">Available on Online Store</Option>
                  <Option value="online_store:hidden">Unavailable on Online Store</Option>
                </Select>,
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="Tagged with">
              {getFieldDecorator('tag')(<Input placeholder="Search Tagged" />)}
            </FormItem>
          </Col>
        </Row>
        <Row
          gutter={{
            md: 8,
            lg: 24,
            xl: 48,
          }}
        >
          <Col md={8} sm={24}>
            <FormItem label="Product vendor">
              {getFieldDecorator('vendor')(
                <Select
                  placeholder="Select a value"
                  style={{
                    width: '100%',
                  }}
                >
                  <Option value="">Select a value</Option>
                  <Option value="xuzyy">xuzyy</Option>
                  <Option value="zyl">zyl</Option>
                </Select>,
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="Product type">
              {getFieldDecorator('product_type')(
                <Select
                  placeholder="Select a value"
                  style={{
                    width: '100%',
                  }}
                >
                  <Option value="">Select a value</Option>
                  <Option value="tttt">tttt</Option>
                  <Option value="ttttt">ttttt</Option>
                </Select>,
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <div
              style={{
                overflow: 'hidden',
              }}
            >
              <div
                style={{
                  float: 'right',
                  marginBottom: 24,
                }}
              >
                <Button type="primary" htmlType="submit">
                  query
                </Button>
                <Button
                  style={{
                    marginLeft: 8,
                  }}
                  onClick={this.handleFormReset}
                >
                  reset
                </Button>
                <a
                  style={{
                    marginLeft: 8,
                  }}
                  onClick={this.toggleForm}
                >
                  unexpanded <Icon type="up" />
                </a>
              </div>
            </div>
          </Col>
        </Row>
      </Form>
    );
  }

  renderForm() {
    const { expandForm } = this.state;
    return expandForm ? this.renderAdvancedForm() : this.renderSimpleForm();
  }
  render() {
    return <div className={styles.tableListForm}>{this.renderForm()}</div>;
  }
}

const WrappedAdvancedSearchForm = Form.create({
  name: 'advanced_search',
})(AdvancedSearchForm);
export default () => (
  <div className={styles.container}>
    <div id="components-form-demo-advanced-search">
      <div style={{ backgroundColor: '#fff', marginTop: '24px', padding: '24px' }}>
        <WrappedAdvancedSearchForm />
      </div>
    </div>
  </div>
);
