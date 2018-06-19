import React, { Fragment } from 'react';
import { connect } from 'dva';
import { Form, Input, Button, Select, Divider } from 'antd';
import { routerRedux } from 'dva/router';
import styles from './style.less';

const { Option } = Select;

const formItemLayout = {
  labelCol: {
    span: 5,
  },
  wrapperCol: {
    span: 19,
  },
};

@Form.create()
class Step1 extends React.PureComponent {
  render() {
    const { form, dispatch, data } = this.props;
    const { getFieldDecorator, validateFields } = form;
    const onValidateForm = () => {
      validateFields((err, values) => {
        if (!err) {
          dispatch({
            type: 'form/saveStepFormData',
            payload: values,
          });
          dispatch(routerRedux.push('/form/step-form/confirm'));
        }
      });
    };
    return (
      <Fragment>
        <Form layout="horizontal" className={styles.stepForm} hideRequiredMark>
          <Form.Item {...formItemLayout} label="付款賬戶">
            {getFieldDecorator('payAccount', {
              initialValue: data.payAccount,
              rules: [{ required: true, message: '請選擇付款賬戶' }],
            })(
              <Select placeholder="test@example.com">
                <Option value="ant-design@alipay.com">ant-design@alipay.com</Option>
              </Select>
            )}
          </Form.Item>
          <Form.Item {...formItemLayout} label="收款賬戶">
            <Input.Group compact>
              <Select defaultValue="alipay" style={{ width: 100 }}>
                <Option value="alipay">支付寶</Option>
                <Option value="bank">銀行賬戶</Option>
              </Select>
              {getFieldDecorator('receiverAccount', {
                initialValue: data.receiverAccount,
                rules: [
                  { required: true, message: '請輸入收款人賬戶' },
                  { type: 'email', message: '賬戶名應為郵箱格式' },
                ],
              })(<Input style={{ width: 'calc(100% - 100px)' }} placeholder="test@example.com" />)}
            </Input.Group>
          </Form.Item>
          <Form.Item {...formItemLayout} label="收款人姓名">
            {getFieldDecorator('receiverName', {
              initialValue: data.receiverName,
              rules: [{ required: true, message: '請輸入收款人姓名' }],
            })(<Input placeholder="請輸入收款人姓名" />)}
          </Form.Item>
          <Form.Item {...formItemLayout} label="轉賬金額">
            {getFieldDecorator('amount', {
              initialValue: data.amount,
              rules: [
                { required: true, message: '請輸入轉賬金額' },
                {
                  pattern: /^(\d+)((?:\.\d+)?)$/,
                  message: '請輸入合法金額數字',
                },
              ],
            })(<Input prefix="￥" placeholder="請輸入金額" />)}
          </Form.Item>
          <Form.Item
            wrapperCol={{
              xs: { span: 24, offset: 0 },
              sm: {
                span: formItemLayout.wrapperCol.span,
                offset: formItemLayout.labelCol.span,
              },
            }}
            label=""
          >
            <Button type="primary" onClick={onValidateForm}>
              下壹步
            </Button>
          </Form.Item>
        </Form>
        <Divider style={{ margin: '40px 0 24px' }} />
        <div className={styles.desc}>
          <h3>說明</h3>
          <h4>轉賬到支付寶賬戶</h4>
          <p>
            如果需要，這裏可以放壹些關於產品的常見問題說明。如果需要，這裏可以放壹些關於產品的常見問題說明。如果需要，這裏可以放壹些關於產品的常見問題說明。
          </p>
          <h4>轉賬到銀行卡</h4>
          <p>
            如果需要，這裏可以放壹些關於產品的常見問題說明。如果需要，這裏可以放壹些關於產品的常見問題說明。如果需要，這裏可以放壹些關於產品的常見問題說明。
          </p>
        </div>
      </Fragment>
    );
  }
}

export default connect(({ form }) => ({
  data: form.step,
}))(Step1);
