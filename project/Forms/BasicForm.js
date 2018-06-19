import React, { PureComponent } from 'react';
import { connect } from 'dva';
import {
  Form,
  Input,
  DatePicker,
  Select,
  Button,
  Card,
  InputNumber,
  Radio,
  Icon,
  Tooltip,
} from 'antd';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import styles from './style.less';

const FormItem = Form.Item;
const { Option } = Select;
const { RangePicker } = DatePicker;
const { TextArea } = Input;

@connect(({ loading }) => ({
  submitting: loading.effects['form/submitRegularForm'],
}))
@Form.create()
export default class BasicForms extends PureComponent {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.props.dispatch({
          type: 'form/submitRegularForm',
          payload: values,
        });
      }
    });
  };
  render() {
    const { submitting } = this.props;
    const { getFieldDecorator, getFieldValue } = this.props.form;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 7 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 12 },
        md: { span: 10 },
      },
    };

    const submitFormLayout = {
      wrapperCol: {
        xs: { span: 24, offset: 0 },
        sm: { span: 10, offset: 7 },
      },
    };

    return (
      <PageHeaderLayout
        title="基礎表單"
        content="表單頁用於向用戶收集或驗證信息，基礎表單常見於數據項較少的表單場景。"
      >
        <Card bordered={false}>
          <Form onSubmit={this.handleSubmit} hideRequiredMark style={{ marginTop: 8 }}>
            <FormItem {...formItemLayout} label="標題">
              {getFieldDecorator('title', {
                rules: [
                  {
                    required: true,
                    message: '請輸入標題',
                  },
                ],
              })(<Input placeholder="給目標起個名字" />)}
            </FormItem>
            <FormItem {...formItemLayout} label="起止日期">
              {getFieldDecorator('date', {
                rules: [
                  {
                    required: true,
                    message: '請選擇起止日期',
                  },
                ],
              })(<RangePicker style={{ width: '100%' }} placeholder={['開始日期', '結束日期']} />)}
            </FormItem>
            <FormItem {...formItemLayout} label="目標描述">
              {getFieldDecorator('goal', {
                rules: [
                  {
                    required: true,
                    message: '請輸入目標描述',
                  },
                ],
              })(
                <TextArea
                  style={{ minHeight: 32 }}
                  placeholder="請輸入妳的階段性工作目標"
                  rows={4}
                />
              )}
            </FormItem>
            <FormItem {...formItemLayout} label="衡量標準">
              {getFieldDecorator('standard', {
                rules: [
                  {
                    required: true,
                    message: '請輸入衡量標準',
                  },
                ],
              })(<TextArea style={{ minHeight: 32 }} placeholder="請輸入衡量標準" rows={4} />)}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label={
                <span>
                  客戶
                  <em className={styles.optional}>
                    （選填）
                    <Tooltip title="目標的服務對象">
                      <Icon type="info-circle-o" style={{ marginRight: 4 }} />
                    </Tooltip>
                  </em>
                </span>
              }
            >
              {getFieldDecorator('client')(
                <Input placeholder="請描述妳服務的客戶，內部客戶直接 @姓名／工號" />
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label={
                <span>
                  邀評人<em className={styles.optional}>（選填）</em>
                </span>
              }
            >
              {getFieldDecorator('invites')(
                <Input placeholder="請直接 @姓名／工號，最多可邀請 5 人" />
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label={
                <span>
                  權重<em className={styles.optional}>（選填）</em>
                </span>
              }
            >
              {getFieldDecorator('weight')(<InputNumber placeholder="請輸入" min={0} max={100} />)}
              <span className="ant-form-text">%</span>
            </FormItem>
            <FormItem {...formItemLayout} label="目標公開" help="客戶、邀評人默認被分享">
              <div>
                {getFieldDecorator('public', {
                  initialValue: '1',
                })(
                  <Radio.Group>
                    <Radio value="1">公開</Radio>
                    <Radio value="2">部分公開</Radio>
                    <Radio value="3">不公開</Radio>
                  </Radio.Group>
                )}
                <FormItem style={{ marginBottom: 0 }}>
                  {getFieldDecorator('publicUsers')(
                    <Select
                      mode="multiple"
                      placeholder="公開給"
                      style={{
                        margin: '8px 0',
                        display: getFieldValue('public') === '2' ? 'block' : 'none',
                      }}
                    >
                      <Option value="1">同事甲</Option>
                      <Option value="2">同事乙</Option>
                      <Option value="3">同事丙</Option>
                    </Select>
                  )}
                </FormItem>
              </div>
            </FormItem>
            <FormItem {...submitFormLayout} style={{ marginTop: 32 }}>
              <Button type="primary" htmlType="submit" loading={submitting}>
                提交
              </Button>
              <Button style={{ marginLeft: 8 }}>保存</Button>
            </FormItem>
          </Form>
        </Card>
      </PageHeaderLayout>
    );
  }
}
