import {
  Button,
  Card,
  DatePicker,
  Form,
  Icon,
  Input,
  InputNumber,
  Radio,
  Select,
  Tooltip,
  Col,
  Row,
  Layout
} from 'antd';
import { FormattedMessage, formatMessage } from 'umi-plugin-react/locale';
import React, { Component } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { connect } from 'dva';
import styles from './style.less';
import { log } from 'lodash-decorators/utils';
import Link from 'umi/link'
const FormItem = Form.Item;
const { Option } = Select;
const { RangePicker } = DatePicker;
const { TextArea } = Input;
const { Header, Footer, Sider, Content } = Layout;
@connect(({ create, loading }) => ({
  create,
  loading: loading.models.create,
}))
class CreateOrder extends Component {
  constructor(props) {
    super(props);
    this.state={price:0.00,totalprice:0.00,count:1}
  }
  
  handleSubmit = e => {
    const { dispatch,create:{item,status}} = this.props;
    console.log(this.props.form.getFieldsValue().first_name);
    
    const first_name=this.props.form.getFieldsValue().first_name==undefined?'/':this.props.form.getFieldsValue().first_name;
    const last_name=this.props.form.getFieldsValue().last_name==undefined?'/':this.props.form.getFieldsValue().last_name;
      
    const b={
        "order": {
          "line_items": [
            {
              "id": item.variants[0].product_id,
              "variant_id": item.variants[0].id,
              "quantity": 1
            }
          ],
          "customer": {  
            "first_name": first_name,
            "last_name": last_name
           },
           "financial_status":status,
        }
    }    
     dispatch({
       type:'create/addorder',
       payload:b
     })
     dispatch({
       type:'create/fetch'
     })
     this.setState({totalprice:0.00});
  };
 componentDidMount(){
  const { dispatch } = this.props;
  dispatch({
    type: 'create/fetch',
  });
 }
 selectProduct=(val)=>{
     val=JSON.parse(val)
       console.log(val);  
       const { dispatch} = this.props;       
       dispatch({
         type:'create/selectp',
         payload:val 
       });   
       this.setState({price:val.variants[0].price,totalprice:val.variants[0].price,count:1});
 }
 changestatus=(status)=>{
  const { dispatch} = this.props;  
      dispatch({
        type:'create/changestatus',
        payload:status 
      })   
 }
 changeCount=x=>{
   if(this.state.count>=1){
    let v=parseFloat(this.state.price);
    let total= parseFloat(this.state.totalprice);
    let count=this.state.count;
     if(x=='+'){
       total=total+v;
       count++;
     }
     else{
      total=total-v;
       count--;
     }
    this.setState({totalprice:total.toFixed(2),count:count})
    
   }
    
 }
  render() {
    const submitFormLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 10,
          offset: 7,
        },
      },
    };
    const { submitting } = this.props;
    const { getFieldDecorator } = this.props.form;
    const { create:{ data:{list},image,item } } = this.props;
    console.log('item',item);
  
    
    return (
      <PageHeaderWrapper content={  <Link to={
        {pathname:'/order/all'}
      }>
       返回订单
      </Link>}>
        
         <div className={styles.whorder}>
       <div className={styles.produ}>
          <Form
            onSubmit={this.handleSubmit}
            hideRequiredMark
          >   
            <Card bordered={true}>
          <FormItem label='订单详情'>       
           <Select  style={{ width: '600px' }} onChange={this.selectProduct} placeholder='请选择商品'> 
            {
              list.map((item,index)=> <Option value={JSON.stringify(item)} key={index}>{item.title}</Option>)
            }
          </Select> 
          </FormItem> 
          
          <div style={{display:item==0?'none':'block'}}>
          <Row>
             <Col style={{display:'flex',}}>
                 <img style={{width:'50px',height:'50px',flex:1,display:'block',marginRight:'10px'}} src={image} />
                 <div style={{flex:3}}>
                      <a href='#'>{item.title}</a>
                      <div style={{padding:'5px 0'}}>{item==0?'':item.variants[0].title}</div>
                      <div>   sku: {item==0?'':item.variants[0].sku} </div>
                 </div>
                 <div style={{flex:4,display:'flex',justifyContent:'center',alignItems:'center'}}>
                      <span>X</span>  
                      <Input style={{margin:'0 15px',width:'80px'}} value={this.state.count}  /> 
                     <div style={{display:'flex',flexDirection:'column',marginRight:'10px'}}>
                     <Button size='small'  icon='up' onClick={this.changeCount.bind(this,'+')} ></Button>
                     <Button size='small'  icon='down' onClick={this.state.count==1?'':this.changeCount.bind(this,'-')}></Button>
                     </div>
                      <span>{`$${this.state.totalprice}`}</span> 
                     
                 </div>
              
             </Col> 
          </Row>
           </div>

          <div style={{display:'flex',borderBottom:'1px solid #eee',marginBottom:'10px'}}>
            <FormItem label='Notes' style={{width:'300px',flex:3,marginRight:'50px'}} >
              {getFieldDecorator('note')(<Input placeholder="add a note...(暂未实现)" />)}
            </FormItem>
             <Row style={{flex:2,padding:'30px'}}>
               <Col style={{display:'flex',justifyContent:'space-between'}}>
                 <span>Subtotal</span> <span>{`$${this.state.totalprice}`}</span>  
               </Col>
               <Col style={{display:'flex',justifyContent:'space-between',margin:'20px 0'}}>
                 <span>Taxes</span> <span>$0.00</span>  
               </Col>
               <Col style={{display:'flex',justifyContent:'space-between',color:'black'}}>
                 <span>Total</span> <span>{`$${this.state.totalprice}`}</span>  
               </Col>
             </Row>
          </div>
          
          

          <Row
          type='flex'
          // justify="center"
          >  
          <Col span={6} style={{marginRight:'10px'}}>
            <FormItem >
              {getFieldDecorator('first_name')(<Input placeholder="姓(选填)" />)}
            </FormItem>
           </Col> 
           <Col span={6}>
            <FormItem >
              {getFieldDecorator('last_name')(<Input placeholder="名(选填)" />)}
            </FormItem>
         </Col>
         </Row>
         <FormItem >
             <Button style={{marginRight:'20px'}} onClick={this.changestatus.bind(this,'paid')}>标记为已付款</Button>
             <Button onClick={this.changestatus.bind(this,'pending')}>标记为待处理</Button>
            </FormItem>
        
          <FormItem
              {...submitFormLayout}
              style={{
                marginTop: 32,
              }}
            >
              <Button type="primary" htmlType="submit" loading={submitting}>
               <FormattedMessage id="formandbasic-form.form.submit" />
              </Button>
              <Button
                style={{
                  marginLeft: 8,
                }}
              >
                <FormattedMessage id="formandbasic-form.form.save" />
              </Button>
            </FormItem>  
              </Card>
          </Form>   
          </div>


          <div className={styles.cus}>
           <Card bordered={true}>
              <FormItem label="创建顾客">       
              <Select style={{ width: '200px' }} placeholder='搜索顾客(暂未实现)'>  
              {/* <Option value='sss'>add</Option>    */}
             </Select> 
              </FormItem> 
               </Card>
         </div>

      </div>
      </PageHeaderWrapper>

    );
  }
}

export default Form.create()(CreateOrder);
