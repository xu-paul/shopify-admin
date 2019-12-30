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
  Layout,
  Modal,
  Spin
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
    this.state={price:0.00,totalprice:0.00,count:1,loading: false,loadings:false,
      visible: false,display:'block',fn:'/',ln:'/',email:null,ordercount:0,note:'',customerid:0}
  }
  
  handleSubmit = e => {
    e.preventDefault();
    const { dispatch,create:{item,status}} = this.props;
    console.log('count',this.state.count);
    const first_name=this.state.fn
    const last_name=this.state.ln
    const email=this.state.email
     var b=0; 
    if(this.state.customerid==0){
        b={
        "order": {
          "line_items": [
            {
              "product_id": item.variants[0].product_id,
              "variant_id": item.variants[0].id,
              "quantity":this.state.count
            }
          ],
          "customer": {  
            "first_name": first_name,
            "last_name": last_name,
            "email":email
           },
           "financial_status":status,
           "note":this.state.note
        }
    }    
    }
    else{
      b={
        "order": {
          "line_items": [
            {
              "id": item.variants[0].product_id,
              "variant_id": item.variants[0].id,
              "quantity":this.state.count,
            }
          ],
          "customer": {  
            "id":this.state.customerid
           },
           "financial_status":status,
           "note":this.state.note
        }
    }    
    }
    console.log(this.state.customerid,b);
     dispatch({
       type:'create/addorder',
       payload:b
     })
     dispatch({
      type: 'create/fetch',
      });
      this.setState({totalprice:0.00,display:'block',note:'',loadings:true,customerid:0});
      setTimeout(() => {
        this.setState({loadings:false});
      }, 2000);

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
 changeFirst=e=>{
     this.setState({
       fn:e.target.value
     })
 }
 changeLast=e=>{
     this.setState({
      ln:e.target.value
    }) 
 }
 changeEmail=e=>{
     this.setState({
      email:e.target.value
    })
 }
 changeNote=e=>{
  this.setState({
    note:e.target.value
  })
 }
 close=()=>{
  this.setState({
    display:'block'
  })
 }
 getCustomers=()=>{
     const { dispatch }=this.props
     
     dispatch({
         type:'create/getcustomer'
     })
     this.setState({loading:true})
     setTimeout(() => {
      this.setState({loading:false});
    }, 1500);
 }
 //model
 showModal = () => {
  this.setState({
    visible: true,fn:'/',ln:'/',email:null,customerid:0
  });
};
changeDisplay=(e)=>{
  const v=JSON.parse(e.key) 
  this.setState({  fn:v.first_name,ln:v.last_name,email:v.email,ordercount:v.orders_count,customerid:v.id});
  setTimeout(() => {
    this.setState({display:'none'});
  }, 1000);
}
handleOk = () => {

  this.setState({ loading: true  });
  setTimeout(() => {
    this.setState({ loading: false, visible: false,display:'none',ordercount:0});
  }, 3000);
};

handleCancel = () => {
  this.setState({ visible: false });
};
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
    const { create:{ data:{list},image,item,customer} } = this.props;
    const { visible, loading } = this.state;
    const noimage='https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=33325274,822918042&fm=26&gp=0.jpg';
    console.log('item',customer);
  
    
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
{/* 选择产品 */}
          <FormItem label='订单详情'>       
           <Select  style={{ width: '600px' }} onChange={this.selectProduct} placeholder='请选择商品' showSearch allowClear={true}> 
            {
          list.map((item,index)=> 
          <Option value={JSON.stringify(item)} key={index}><img style={{width:'20px'}} src={item.image==null?noimage:item.image.src} /> {item.title}</Option>)
            }
          </Select> 
          </FormItem> 
{/* 产品预览 */}
          <div style={{display: item==0 ?'none':'block'}}>
          <Row>
             <Col style={{display:'flex',}}>
                 <img style={{width:'50px',height:'50px',flex:1,display:'block',marginRight:'10px'}} src={image} />
                 <div style={{flex:3}}>
                      <a style={{pointerEvents:'none' }} href='#'>{item.title}</a>
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
{/* note,价格 */}
          <div style={{display:'flex',borderBottom:'1px solid #eee',marginBottom:'10px'}}>
            <FormItem label='Notes' style={{width:'300px',flex:3,marginRight:'50px'}} >
                  <Input placeholder="add a note..." onBlur={this.changeNote} />
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
{/* 付款状态 */}
         <FormItem >
             <Button style={{marginRight:'20px'}} onClick={this.changestatus.bind(this,'paid')}>标记为已付款</Button>
             <Button onClick={this.changestatus.bind(this,'pending')}>标记为待处理</Button>
            </FormItem>
{/* 提交保存按钮*/}
          <FormItem
              {...submitFormLayout}
              style={{
                marginTop: 32,
              }}
            >
              <Button type="primary" htmlType="submit" loading={this.state.loadings}>
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

{/* 创建顾客 */}
          <div className={styles.cus}>
           <Card bordered={true}>
              <FormItem label="创建顾客">   

              <div style={{display:this.state.display}}>
               
                <Select style={{ width: '200px',color:'#ccc' }}  value='搜索顾客' allowClear={true} showSearch onFocus={this.getCustomers} notFoundContent={<div style={{textAlign:'center'}}><Spin  spinning={this.state.loading} /></div>} >  

             {
            customer.length!=0 &&  <Option value="add a customer">
            <Button type="link" onClick={this.showModal}> + add a customer </Button>
              </Option>
             } 
              
           
                {customer && customer.map((item,index)=>
                     <Option value={JSON.stringify(item)} key={index} onClick={this.changeDisplay}>
                       <div style={{display:'flex'}}>
                           <Icon type="user" style={{color:'skyblue',fontSize:'28px',paddingTop:'8px',paddingRight:'10px'}} /> 
                           <div style={{display:'flex',flexDirection:'column'}}>
                             <span>{item.first_name} {item.last_name} </span>
                             <span>{item.email==null?'no email':item.email}</span>
                           </div>
                      
                       </div>
                       </Option>
                )}
        
               
             </Select>
            
              </div>
               

              <div style={{display:this.state.display=='none'?'block':'none'}} >
               <div><span>{this.state.ordercount} order</span> <span style={{paddingLeft:'100px',cursor:'pointer'}} onClick={this.close} ><Icon type="close" /> </span></div>    
           
                  <div>{this.state.fn} {this.state.ln}</div>    
                  <div>{this.state.email==null?'No email':this.state.email}</div>    

              </div>

              </FormItem> 
               </Card>
         </div>

         <Modal
          visible={visible}
          title="Create a customer"
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer={[
            <Button key="back" onClick={this.handleCancel}>
              Return
            </Button>,
            <Button key="submit" type="primary" loading={this.state.loading} onClick={this.handleOk}>
              Submit
            </Button>,
          ]}
        >
          <div style={{display:'flex',justifyContent:'space-around'}}>
          <FormItem label='First name'>
          {getFieldDecorator('first_name')( <Input style={{width:'200px'}} size='large'onBlur={this.changeFirst} />)} 
           </FormItem>
           <FormItem label='Last name'>
           {getFieldDecorator('last_name')( <Input style={{width:'200px'}} size='large'onBlur={this.changeLast} />)}  
           </FormItem>
          </div>
           <FormItem label='Email'>
           {getFieldDecorator('email')( <Input size='large'onBlur={this.changeEmail} />)} 
           </FormItem>
        
          
           
        </Modal>
      </div>
      </PageHeaderWrapper>

    );
  }
}

export default Form.create()(CreateOrder);
