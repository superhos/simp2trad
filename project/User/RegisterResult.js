import React from 'react';
import { Button } from 'antd';
import { Link } from 'dva/router';
import Result from 'components/Result';
import styles from './RegisterResult.less';

const actions = (
  <div className={styles.actions}>
    <a href="">
      <Button size="large" type="primary">
        查看郵箱
      </Button>
    </a>
    <Link to="/">
      <Button size="large">返回首頁</Button>
    </Link>
  </div>
);

export default ({ location }) => (
  <Result
    className={styles.registerResult}
    type="success"
    title={
      <div className={styles.title}>
        妳的賬戶：{location.state ? location.state.account : 'AntDesign@example.com'} 註冊成功
      </div>
    }
    description="激活郵件已發送到妳的郵箱中，郵件有效期為24小時。請及時登錄郵箱，點擊郵件中的鏈接激活帳戶。"
    actions={actions}
    style={{ marginTop: 56 }}
  />
);
