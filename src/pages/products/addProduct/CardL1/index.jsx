import React from 'react';
import { Card,Input } from 'antd';
import styles from './index.less';
import { Editor } from '@tinymce/tinymce-react';
import { connect } from 'dva';
@connect(({ addProduct, loading }) => ({
  addContent:addProduct.addContent
}))
class CardL1 extends React.Component {
  state = {
    content: '' };
  
  render() {
    const { addContent }=this.props
    const inputChange = (name,title) => {
      const { dispatch } = this.props;
      dispatch({
        type: 'addProduct/addProperty',
        payload: { name, title },
      });

  }
    return (
      <div className={ styles.container }>
        <div id="components-card-demo-simple">
          <Card
            style={ {
              width: '800px ',
            } }
          >
            <p>Title</p>
            <Input style={{width: '750px ',}} 
                   id='title' 
                   onBlur={()=>inputChange('title',document.getElementById('title').value) } 
                   defaultValue={addContent.title}></Input>
            <p>Description</p>
            <Editor
              //id='body_html'
              className='min-h300'
              apiKey='eazes39m70e8iubf7fy09l08lknlnr1zlyeodcuzqnhqtn1n'
              ref='tinyEditor'
              // automatic_uploads={!false}
              // images_upload_url={utils.url + '/fileclient-management/api/uploadpic'}
              // images_upload_handler={this.imagesUploadHandler}
              // initialValue='<p>在此輸入您的資訊內容</p>'
              value={ addContent.body_html }
              onChange={ (value) => inputChange('body_html',value.target.getContent()) }
              init={ {
                min_height: 500,
                //theme: 'modern',
                // language: 'zh_TW',
                // skin: 'lightgray',
                // menubar: false, // 頂部菜單
                resize: false, // 右下角調整大小
                statusbar: false, // 底部狀態欄
                object_resizing: false, // 禁止設置媒體大小
                ////images_upload_url: utils.url + '/fileclient-management/api/uploadpic',
                ////images_upload_handler: this.imagesUploadHandler,
                images_reuse_filename: true,
                plugins: 'table advlist image lists preview textcolor', // imagetools 圖片編輯工具-剪切、旋轉、設置大小
                toolbar: 'formatselect | bold italic strikethrough forecolor backcolor | link | alignleft aligncenter alignright alignjustify  | numlist bullist outdent indent  | removeformat | image'
                // image_description: false, // 图像对话框中的图像描述输入字段
                // image_caption: true // 圖片下的文字
                // image_title: true
              } }
            />

          </Card>
        </div>
      </div>

    )
  }
}
export default (CardL1);
