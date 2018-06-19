import React, { PureComponent } from 'react';
import { Button, Spin, Card } from 'antd';
import { connect } from 'dva';
import styles from './style.less';

@connect(state => ({
  isloading: state.error.isloading,
}))
export default class TriggerException extends PureComponent {
  state = {
    isloading: false,
  };
  triggerError = code => {
    this.setState({
      isloading: true,
    });
    this.props.dispatch({
      type: 'error/query',
      payload: {
        code,
      },
    });
  };
  render() {
    return (
      <Card>
        <Spin spinning={this.state.isloading} wrapperClassName={styles.trigger}>
          <Button type="danger" onClick={() => this.triggerError(401)}>
            觸發401
          </Button>
          <Button type="danger" onClick={() => this.triggerError(403)}>
            觸發403
          </Button>
          <Button type="danger" onClick={() => this.triggerError(500)}>
            觸發500
          </Button>
          <Button type="danger" onClick={() => this.triggerError(404)}>
            觸發404
          </Button>
        </Spin>
      </Card>
    );
  }
}
