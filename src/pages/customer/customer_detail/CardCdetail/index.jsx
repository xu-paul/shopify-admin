import React, { Component }  from 'react';
import { Card,Icon,Row,Col, Input ,Button} from 'antd';
import moment from 'moment'
import { connect } from 'dva';
import {routerRedux } from 'dva/router'
import styles from './index.less';
@connect(({ cdetail, loading }) => ({
  cdetail,
  loading: loading.models.cdetail,
}))
class Index extends Component {
  constructor(props) {
    super(props);
    this.state={note:this.props.cdetail.list.note}
  }
  linkorder=(id)=>{
    const { dispatch } = this.props; 
    dispatch({
      type: 'order/linkdetail',
      payload:id
    });  
  }
  changeNote=(e)=>{
          this.setState({note:e.target.value})    
  }
  saveNote=()=>{
        const n =this.state.note;
        const { dispatch,cdetail:{list} } = this.props; 
        dispatch({
          type: 'cdetail/changeNote',
          payload:{id:list.id,p:{
            "customer": {
              "id":list.id,
              "note":n
            }
          }}
        });  
         
  }
  
  render() {
     const {cdetail:{ list }} =this.props;
     console.log(list);
     const avge=parseFloat(list.total_spent)/list.orders_count;
    return (
      <div className={styles.container}>
      <div id="components-card-demo-basic">
        <div>
          <Card
            style={{
              width: 700,borderBottom:'1px solid #eee'
            }}
          >

               <Row style={{marginBottom:'10px'}}> 
              <Col span={3}>
               <Icon type="user" style={{color:'skyblue',fontSize:'40px'}} />
              </Col>
              <Col span={6} style={{paddingTop:'5px',fontSize:'20px'}}>
                    {list.first_name} {list.last_name}
              </Col>
            </Row>

            <Row >
              <div>Customer Note</div>
             <Input style={{width:'350px'}} key={list.id} placeholder={list.note} onBlur={this.changeNote} /> 
             <Button style={{marginLeft:'20px'}} type='primary' onClick={this.saveNote.bind(this)}>保存</Button>
            </Row>
         
          </Card>

           <Card
            style={{
              width: 700
            }}
          >
            <div style={{display:'flex',justifyContent:'space-around'}}>
              <div>
                    <Button type='link' disabled={list.last_order_id?false:true} onClick={this.linkorder.bind(this,list.last_order_id)}>Last Order</Button>
                    <div style={{padding:'10px 0 0',color:'black'}}>{moment(list.created_at).format('YYYY-MM-DD HH:mm:ss')}</div> 
              </div>
          
              <div style={{display:'flex',flexDirection:'column'}}>
                 <span>Total spent to date</span>
                 <span style={{padding:'10px 0',color:'black'}}>${list.total_spent}</span>
                 <span>{list.orders_count} order</span>
              </div>
              <div style={{display:'flex',flexDirection:'column'}} >
                <span style={{padding:'0 0 10px'}}>Average order value</span>
                <span style={{color:'black'}}>${avge.toFixed(2)}</span>
              </div>
            </div>
          </Card>   
        </div>
      </div>
    </div>
    );
  }
}

export default Index;

