import React, { Fragment } from 'react';
import { Button, Icon, Card } from 'antd';
import Result from 'components/Result';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';

const extra = (
  <Fragment>
    <div
      style={{
        fontSize: 16,
        color: 'rgba(0, 0, 0, 0.85)',
        fontWeight: '500',
        marginBottom: 16,
      }}
    >
      您提交的內容有如下錯誤：
    </div>
    <div style={{ marginBottom: 16 }}>
      <Icon style={{ color: '#f5222d', marginRight: 8 }} type="close-circle-o" />您的賬戶已被凍結
      <a style={{ marginLeft: 16 }}>
        立即解凍 <Icon type="right" />
      </a>
    </div>
    <div>
      <Icon style={{ color: '#f5222d', marginRight: 8 }} type="close-circle-o" />您的賬戶還不具備申請資格
      <a style={{ marginLeft: 16 }}>
        立即升級 <Icon type="right" />
      </a>
    </div>
  </Fragment>
);

const actions = <Button type="primary">返回修改</Button>;

export default () => (
  <PageHeaderLayout>
    <Card bordered={false}>
      <Result
        type="error"
        title="提交失敗"
        description="請核對並修改以下信息後，再重新提交。"
        extra={extra}
        actions={actions}
        style={{ marginTop: 48, marginBottom: 16 }}
      />
    </Card>
  </PageHeaderLayout>
);
