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
  Badge,
  Modal,
  Spin,
  Timeline,
  Tree
} from 'antd';
import { FormattedMessage, formatMessage } from 'umi-plugin-react/locale';
import React, { Component } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { connect } from 'dva';
import styles from './style.less';
import  moment from 'moment';
const FormItem = Form.Item;
const { Option } = Select;
const { RangePicker } = DatePicker;
const { TextArea } = Input;
const { confirm}=Modal;
const { TreeNode } = Tree;
@connect(({detail,loading})=>({
   detail,
   loading:loading.models.detail
}))


class Detail extends Component {
  constructor(props) {
    super(props);
    this.state={notes:'',loading:false,email:'',loading2:false,show:[]}
  }
  
  componentDidMount(){
      const { dispatch } =this.props
      console.log(parseInt(this.props.match.params.id));
      dispatch({
        type:'detail/fetch',
        payload:parseInt(this.props.match.params.id),
        callback: () => {
          this.setState({
            notes:this.props.detail.list.note,
            show:[<Timeline.Item >
              <div style={{display:'flex',justifyContent:'space-between'}}>
                <span>{this.props.detail.list.customer.first_name} {this.props.detail.list.customer.last_name} create the order </span> 
              <span style={{paddingRight:'8px'}}>{moment(this.props.detail.list.created_at).format('YYYY-MM-DD HH:mm:ss')}</span>   
              </div>
              </Timeline.Item>]
          });      
        },
      })
 
      
  }
  changefulfill=(ful)=>{ 
    console.log('f',ful);
    
    const { dispatch } =this.props;
    const id=this.props.match.params.id;
    const ff={
      "order": {
        "id": this.props.match.params.id,
        "fulfillment_status":"fulfilled"
      }
    }
    confirm({
      title: `Do you Want to mask it ${ful=='fulfilled'?'Unfulfill':'fulfilled'} ?`,
      onOk() {
            dispatch({
      type:'detail/update',
      payload:{id:id,f:ff}
       })
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  }
  getData=()=>{
     var date=new Date();
     var d=`${date.getFullYear()}-${date.getMonth()}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getMinutes()}`;
     return  d
  }
  changeNote=()=>{ 
    var nowDate =this.getData()
     console.log(nowDate);     
    const { dispatch } =this.props;
    const id=this.props.match.params.id;
    const that=this;
    let newshow=this.state.show;
    confirm({
      title: `Edit note`,
      content:
      <div>
         <div style={{marginBottom:'10px'}}>Notes</div> 
         <TextArea rows={5} onBlur={this.setNote} />
      </div>,
      width:'640px',     
      onOk(){
        newshow.unshift(<Timeline.Item >
          <Tree   switcherIcon={<Icon type="down" />}>
         <TreeNode title={
            <div style={{display:'flex',justifyContent:'space-between',width:'576px'}}>
             <span> xzy edited the note on this order </span> 
             <span style={{marginLeft:'5px'}} >{that.getData()}</span>   
             </div>
         } > 
         <TreeNode title='Note'/>
         <TreeNode title={that.state.notes}/>
         </TreeNode>
         </Tree> 
         </Timeline.Item>
       );
       console.log(newshow);
       
        that.setState({
         loading:true
        });
             console.log('okok',that.state.notes);
             dispatch({
               type:'detail/update',
               payload:{
                 id:id,
                 f: {
                  "order": {
                    "id":id,
                    "note":that.state.notes
                  }
                }                
                },
                callback: () => {
                  that.setState({
                    notes:'',loading:false,show:newshow
                  });      
                },
             })
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  }
   setNote=e=>{
     console.log(e.target.value);
     this.setState({notes:e.target.value})
     
   }


  changeEmail=()=>{ 
    const { getFieldDecorator } = this.props.form;
    console.log('ssss',getFieldDecorator);
    
    const { dispatch,detail:{list} } =this.props;
    const id=this.props.match.params.id;
    const idc=list.customer.id
    const that=this;
    confirm({
      title: `Edit email`,
      content:
      <div>
         <div style={{marginBottom:'10px'}}>Email</div> 
         <Input style={{width:'300px'}} onBlur={this.setEmail} />     
      </div>,
      width:'440px',     
      onOk(){
        that.setState({
         loading2:true
        });
             console.log('okok',that.state.email);
             dispatch({
               type:'detail/updateEmail',
               payload:{
                 id:id,
                 idc:idc,
                 e: {
                  "customer": {
                    "id":idc,
                    "email":that.state.email
                  }
                }                
                },
                callback: () => {
                  that.setState({
                    email:'',loading2:false
                  });      
                },
             })
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  }
   setEmail=e=>{
     console.log(e.target.value);
     this.setState({email:e.target.value})
     
   }
  render() {     
    const { submitting } = this.props;
    const { detail:{list,src}} =this.props;
    const noimg='https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=33325274,822918042&fm=26&gp=0.jpg'
    console.log('note',list.note,list);
    return (
//  页头     
      <PageHeaderWrapper title='订单详情' content={
      <div style={{display:'flex',alignItems:'center',color:'black'}}>
        <h1 style={{fontSize:'30px',padding:'10px 8px 0 0'}}>{list.name}</h1> 
        <div style={{display:'flex',}}> {moment(list.created_at).format('YYYY-MM-DD HH:mm:ss')}</div>
        <Badge style={{margin:'0 10px'}} status={list.financial_status=='paid'?"success":"processing"} text={list.financial_status} className={styles.payment} />
        <Badge status={list.fulfillment_status=='fulfilled'?"processing":"warning"} text={list.fulfillment_status=='fulfilled'?'fulfilled': 'Unfulfill'} className={styles.fulfillment} />
      </div>
      }>


    <div style={{display:'flex'}}>
        <div style={{flex:7}}>

{/* fulfill */}
  { list.length!=0 &&    <Card bordered={true} style={{margin:'0 20px'}}>
          <div style={{marginBottom:'10px'}}>
              <Icon style={{fontSize:'30px',margin:' 5px 10px 0 0'}} type="check-circle" theme="twoTone" twoToneColor={list.fulfillment_status==null?"#ccc":"#52c41a"} />
              <span style={{fontSize:'18px',color:'black'}}>{list.fulfillment_status==null?'Unfulfill':list.fulfillment_status} {list.length!==0 && `(${list.line_items[0].quantity})`}</span>
          </div>

          <div style={{display:'flex',alignItems:'center',borderBottom:'1px solid #ccc',paddingBottom:'20px'}}>
          <Badge count={list.line_items[0].quantity} style={{backgroundColor:'#ccc'}}>
            <img style={{width:'70px',flex:1,display:'block'}} src={src==null?noimg:src}/>
          </Badge>
              
              <div style={{flex:3,marginLeft:'20px'}}>
                      <a style={{pointerEvents:'none' }} href='#'>{list.line_items[0].name}</a>
                      <div style={{padding:'5px 0'}}>{list.line_items[0].variant_title}</div>
                      <div>   sku: {list.line_items[0].sku} </div>
                 </div>
                 <div style={{flex:3,color:'black'}}>
                     ${list.line_items[0].price} <span style={{padding:'0 20px'}}>x</span> {list.line_items[0].quantity}  
                      <span style={{paddingLeft:'80px'}}>${list.subtotal_price}</span>
                 </div>
                 
              </div>

                <div style={{textAlign:'right',paddingTop:'20px'}}>
              <Button size='large' type="primary" onClick={this.changefulfill.bind(this,list.fulfillment_status==null?'n':list.fulfillment_status)} >Mask as {list.fulfillment_status==null?'fulfilled':'Unfulfill'} </Button>
                </div> 
        </Card>}
        
{/* paid_status */}
     {list.length!=0 &&  <Card bordered={true} style={{margin:'20px 20px 0',color:'black'}}>
          <div>
              <Icon style={{fontSize:'30px',margin:' 5px 10px 25px 0'}} type="check-circle" theme="twoTone" twoToneColor={list.financial_status=='paid'?"#52c41a":"#ccc"} />
              <span style={{fontSize:'18px',color:'black'}}>{list.financial_status=='paid'?'Paid':'Payment pending'} </span>
          </div>

          <div style={{display:'flex',justifyContent:'space-between'}}>
         <span>Subtotal <span style={{paddingLeft:'20px'}}>{list.line_items[0].quantity} item</span></span>
         <span>${list.subtotal_price}</span>
          </div>

          <div style={{display:'flex',justifyContent:'space-between',margin:'15px 0'}}>
         <span>Tax</span>
         <span>$0.00</span>
          </div>

          <div style={{display:'flex',justifyContent:'space-between',fontWeight:'bold',marginBottom:'10px'}}>
         <span>Total</span>
         <span>${list.subtotal_price}</span>
          </div>

          <div style={{display:'flex',justifyContent:'space-between',padding:'20px 0',borderBottom:'1px solid #ccc',borderTop:'1px solid #ccc'}}>
         <span>Paid by customer</span>
         <span>{list.financial_status=='paid'?`$${list.subtotal_price}`:`$0.00`}</span>
          </div>
           
          <div style={{textAlign:'right',paddingTop:'20px',display:list.financial_status=='paid'?'none':'block'}}>
              <Button size='large' type="primary" >
               Mask as {list.financial_status=='paid'?'pending':'paid '} 
              </Button>
          </div> 
        </Card>}

 {/* Timeline*/}
  <h2 style={{padding:'20px 0 0 50px'}}>Timeline</h2>
 

  <Timeline style={{padding:'20px 50px 0'}} >
    
      {this.state.show}
      
  </Timeline> 

   

        </div>
       <div style={{flex:3}}>

{/* Note */}
      {list.length!=0 &&    <Card bordered={true} style={{marginBottom:'20px'}} >
         
          <div>
             
          <div style={{display:'flex',justifyContent:'space-between',fontWeight:'bold',alignItems:'center',marginBottom:'15px'}}>
         <span>Notes</span>
         <Button type="link" onClick={this.changeNote.bind(this)}>Edit</Button>
          </div>

           {
           this.state.loading ?<Spin size="small" />:
            <span>
              {list.note==''?'No notes from customer':list.note}
            </span>
           } 

         
          </div>
        </Card>}
{/* Customer */}
    {list.length!=0 && <Card bordered={true}>
          <div>
               
          <div style={{display:'flex',justifyContent:'space-between',fontWeight:'bold',alignItems:'center',marginBottom:'15px'}}>
         <span>Customer</span>
         <Icon type="user" style={{color:'skyblue',fontSize:'25px'}} />
          </div>

           <div style={{display:'flex',flexDirection:'column'}}>
             <span>{list.customer.first_name} {list.customer.last_name}</span> 
             <span style={{padding:'10px 0'}}>{list.customer.orders_count} orders</span>
           </div>
           {this.state.loading2 ?<Spin size="small" />:
                <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                  <span>{list.customer.email?list.customer.email:'no email'}</span>
                  <Button type="link" onClick={this.changeEmail.bind(this)}>Edit</Button>
                </div>}
               
          </div>
        </Card>}
        </div> 
      

    </div>
       






      </PageHeaderWrapper>
    );
  }
}

export default Form.create()(Detail);
