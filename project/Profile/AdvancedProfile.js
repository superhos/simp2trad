import React, { Component, Fragment } from 'react';
import Debounce from 'lodash-decorators/debounce';
import Bind from 'lodash-decorators/bind';
import { connect } from 'dva';
import {
  Button,
  Menu,
  Dropdown,
  Icon,
  Row,
  Col,
  Steps,
  Card,
  Popover,
  Badge,
  Table,
  Tooltip,
  Divider,
} from 'antd';
import classNames from 'classnames';
import DescriptionList from 'components/DescriptionList';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import styles from './AdvancedProfile.less';

const { Step } = Steps;
const { Description } = DescriptionList;
const ButtonGroup = Button.Group;

const getWindowWidth = () => window.innerWidth || document.documentElement.clientWidth;

const menu = (
  <Menu>
    <Menu.Item key="1">選項壹</Menu.Item>
    <Menu.Item key="2">選項二</Menu.Item>
    <Menu.Item key="3">選項三</Menu.Item>
  </Menu>
);

const action = (
  <Fragment>
    <ButtonGroup>
      <Button>操作</Button>
      <Button>操作</Button>
      <Dropdown overlay={menu} placement="bottomRight">
        <Button>
          <Icon type="ellipsis" />
        </Button>
      </Dropdown>
    </ButtonGroup>
    <Button type="primary">主操作</Button>
  </Fragment>
);

const extra = (
  <Row>
    <Col xs={24} sm={12}>
      <div className={styles.textSecondary}>狀態</div>
      <div className={styles.heading}>待審批</div>
    </Col>
    <Col xs={24} sm={12}>
      <div className={styles.textSecondary}>訂單金額</div>
      <div className={styles.heading}>¥ 568.08</div>
    </Col>
  </Row>
);

const description = (
  <DescriptionList className={styles.headerList} size="small" col="2">
    <Description term="創建人">曲麗麗</Description>
    <Description term="訂購產品">XX 服務</Description>
    <Description term="創建時間">2017-07-07</Description>
    <Description term="關聯單據">
      <a href="">12421</a>
    </Description>
    <Description term="生效日期">2017-07-07 ~ 2017-08-08</Description>
    <Description term="備註">請於兩個工作日內確認</Description>
  </DescriptionList>
);

const tabList = [
  {
    key: 'detail',
    tab: '詳情',
  },
  {
    key: 'rule',
    tab: '規則',
  },
];

const desc1 = (
  <div className={classNames(styles.textSecondary, styles.stepDescription)}>
    <Fragment>
      曲麗麗
      <Icon type="dingding-o" style={{ marginLeft: 8 }} />
    </Fragment>
    <div>2016-12-12 12:32</div>
  </div>
);

const desc2 = (
  <div className={styles.stepDescription}>
    <Fragment>
      週毛毛
      <Icon type="dingding-o" style={{ color: '#00A0E9', marginLeft: 8 }} />
    </Fragment>
    <div>
      <a href="">催壹下</a>
    </div>
  </div>
);

const popoverContent = (
  <div style={{ width: 160 }}>
    吳加號
    <span className={styles.textSecondary} style={{ float: 'right' }}>
      <Badge status="default" text={<span style={{ color: 'rgba(0, 0, 0, 0.45)' }}>未響應</span>} />
    </span>
    <div className={styles.textSecondary} style={{ marginTop: 4 }}>
      耗時：2小時25分鐘
    </div>
  </div>
);

const customDot = (dot, { status }) =>
  status === 'process' ? (
    <Popover placement="topLeft" arrowPointAtCenter content={popoverContent}>
      {dot}
    </Popover>
  ) : (
    dot
  );

const operationTabList = [
  {
    key: 'tab1',
    tab: '操作日誌壹',
  },
  {
    key: 'tab2',
    tab: '操作日誌二',
  },
  {
    key: 'tab3',
    tab: '操作日誌三',
  },
];

const columns = [
  {
    title: '操作類型',
    dataIndex: 'type',
    key: 'type',
  },
  {
    title: '操作人',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '執行結果',
    dataIndex: 'status',
    key: 'status',
    render: text =>
      text === 'agree' ? (
        <Badge status="success" text="成功" />
      ) : (
        <Badge status="error" text="駁回" />
      ),
  },
  {
    title: '操作時間',
    dataIndex: 'updatedAt',
    key: 'updatedAt',
  },
  {
    title: '備註',
    dataIndex: 'memo',
    key: 'memo',
  },
];

@connect(({ profile, loading }) => ({
  profile,
  loading: loading.effects['profile/fetchAdvanced'],
}))
export default class AdvancedProfile extends Component {
  state = {
    operationkey: 'tab1',
    stepDirection: 'horizontal',
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'profile/fetchAdvanced',
    });

    this.setStepDirection();
    window.addEventListener('resize', this.setStepDirection);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.setStepDirection);
    this.setStepDirection.cancel();
  }

  onOperationTabChange = key => {
    this.setState({ operationkey: key });
  };

  @Bind()
  @Debounce(200)
  setStepDirection() {
    const { stepDirection } = this.state;
    const w = getWindowWidth();
    if (stepDirection !== 'vertical' && w <= 576) {
      this.setState({
        stepDirection: 'vertical',
      });
    } else if (stepDirection !== 'horizontal' && w > 576) {
      this.setState({
        stepDirection: 'horizontal',
      });
    }
  }

  render() {
    const { stepDirection } = this.state;
    const { profile, loading } = this.props;
    const { advancedOperation1, advancedOperation2, advancedOperation3 } = profile;
    const contentList = {
      tab1: (
        <Table
          pagination={false}
          loading={loading}
          dataSource={advancedOperation1}
          columns={columns}
        />
      ),
      tab2: (
        <Table
          pagination={false}
          loading={loading}
          dataSource={advancedOperation2}
          columns={columns}
        />
      ),
      tab3: (
        <Table
          pagination={false}
          loading={loading}
          dataSource={advancedOperation3}
          columns={columns}
        />
      ),
    };

    return (
      <PageHeaderLayout
        title="單號：234231029431"
        logo={
          <img alt="" src="https://gw.alipayobjects.com/zos/rmsportal/nxkuOJlFJuAUhzlMTCEe.png" />
        }
        action={action}
        content={description}
        extraContent={extra}
        tabList={tabList}
      >
        <Card title="流程進度" style={{ marginBottom: 24 }} bordered={false}>
          <Steps direction={stepDirection} progressDot={customDot} current={1}>
            <Step title="創建項目" description={desc1} />
            <Step title="部門初審" description={desc2} />
            <Step title="財務復核" />
            <Step title="完成" />
          </Steps>
        </Card>
        <Card title="用戶信息" style={{ marginBottom: 24 }} bordered={false}>
          <DescriptionList style={{ marginBottom: 24 }}>
            <Description term="用戶姓名">付小小</Description>
            <Description term="會員卡號">32943898021309809423</Description>
            <Description term="身份證">3321944288191034921</Description>
            <Description term="聯系方式">18112345678</Description>
            <Description term="聯系地址">
              曲麗麗 18100000000 浙江省杭州市西湖區黃姑山路工專路交叉路口
            </Description>
          </DescriptionList>
          <DescriptionList style={{ marginBottom: 24 }} title="信息組">
            <Description term="某某數據">725</Description>
            <Description term="該數據更新時間">2017-08-08</Description>
            <Description>&nbsp;</Description>
            <Description
              term={
                <span>
                  某某數據
                  <Tooltip title="數據說明">
                    <Icon
                      style={{ color: 'rgba(0, 0, 0, 0.43)', marginLeft: 4 }}
                      type="info-circle-o"
                    />
                  </Tooltip>
                </span>
              }
            >
              725
            </Description>
            <Description term="該數據更新時間">2017-08-08</Description>
          </DescriptionList>
          <h4 style={{ marginBottom: 16 }}>信息組</h4>
          <Card type="inner" title="多層級信息組">
            <DescriptionList size="small" style={{ marginBottom: 16 }} title="組名稱">
              <Description term="負責人">林東東</Description>
              <Description term="角色碼">1234567</Description>
              <Description term="所屬部門">XX公司 - YY部</Description>
              <Description term="過期時間">2017-08-08</Description>
              <Description term="描述">
                這段描述很長很長很長很長很長很長很長很長很長很長很長很長很長很長...
              </Description>
            </DescriptionList>
            <Divider style={{ margin: '16px 0' }} />
            <DescriptionList size="small" style={{ marginBottom: 16 }} title="組名稱" col="1">
              <Description term="學名">
                Citrullus lanatus (Thunb.) Matsum. et
                Nakai壹年生蔓生藤本；莖、枝粗壯，具明顯的棱。卷須較粗..
              </Description>
            </DescriptionList>
            <Divider style={{ margin: '16px 0' }} />
            <DescriptionList size="small" title="組名稱">
              <Description term="負責人">付小小</Description>
              <Description term="角色碼">1234568</Description>
            </DescriptionList>
          </Card>
        </Card>
        <Card title="用戶近半年來電記錄" style={{ marginBottom: 24 }} bordered={false}>
          <div className={styles.noData}>
            <Icon type="frown-o" />暫無數據
          </div>
        </Card>
        <Card
          className={styles.tabsCard}
          bordered={false}
          tabList={operationTabList}
          onTabChange={this.onOperationTabChange}
        >
          {contentList[this.state.operationkey]}
        </Card>
      </PageHeaderLayout>
    );
  }
}
