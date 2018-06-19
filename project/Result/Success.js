import React, { Fragment } from 'react';
import { Button, Row, Col, Icon, Steps, Card } from 'antd';
import Result from 'components/Result';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';

const { Step } = Steps;

const desc1 = (
  <div
    style={{
      fontSize: 12,
      color: 'rgba(0, 0, 0, 0.45)',
      position: 'relative',
      left: 42,
    }}
  >
    <div style={{ margin: '8px 0 4px' }}>
      曲麗麗<Icon style={{ marginLeft: 8 }} type="dingding-o" />
    </div>
    <div>2016-12-12 12:32</div>
  </div>
);

const desc2 = (
  <div style={{ fontSize: 12, position: 'relative', left: 42 }}>
    <div style={{ margin: '8px 0 4px' }}>
      週毛毛<Icon type="dingding-o" style={{ color: '#00A0E9', marginLeft: 8 }} />
    </div>
    <div>
      <a href="">催壹下</a>
    </div>
  </div>
);

const extra = (
  <Fragment>
    <div
      style={{
        fontSize: 16,
        color: 'rgba(0, 0, 0, 0.85)',
        fontWeight: '500',
        marginBottom: 20,
      }}
    >
      項目名稱
    </div>
    <Row style={{ marginBottom: 16 }}>
      <Col xs={24} sm={12} md={12} lg={12} xl={6}>
        <span style={{ color: 'rgba(0, 0, 0, 0.85)' }}>項目 ID：</span>
        23421
      </Col>
      <Col xs={24} sm={12} md={12} lg={12} xl={6}>
        <span style={{ color: 'rgba(0, 0, 0, 0.85)' }}>負責人：</span>
        曲麗麗
      </Col>
      <Col xs={24} sm={24} md={24} lg={24} xl={12}>
        <span style={{ color: 'rgba(0, 0, 0, 0.85)' }}>生效時間：</span>
        2016-12-12 ~ 2017-12-12
      </Col>
    </Row>
    <Steps style={{ marginLeft: -42, width: 'calc(100% + 84px)' }} progressDot current={1}>
      <Step title={<span style={{ fontSize: 14 }}>創建項目</span>} description={desc1} />
      <Step title={<span style={{ fontSize: 14 }}>部門初審</span>} description={desc2} />
      <Step title={<span style={{ fontSize: 14 }}>財務復核</span>} />
      <Step title={<span style={{ fontSize: 14 }}>完成</span>} />
    </Steps>
  </Fragment>
);

const actions = (
  <Fragment>
    <Button type="primary">返回列表</Button>
    <Button>查看項目</Button>
    <Button>打 印</Button>
  </Fragment>
);

export default () => (
  <PageHeaderLayout>
    <Card bordered={false}>
      <Result
        type="success"
        title="提交成功"
        description="提交結果頁用於反饋壹系列操作任務的處理結果，
        如果僅是簡單操作，使用 Message 全局提示反饋即可。
        本文字區域可以展示簡單的補充說明，如果有類似展示
        “單據”的需求，下面這個灰色區域可以呈現比較復雜的內容。"
        extra={extra}
        actions={actions}
        style={{ marginTop: 48, marginBottom: 16 }}
      />
    </Card>
  </PageHeaderLayout>
);
