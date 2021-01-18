import { Component } from 'react';
import { Layout, Menu, Icon } from 'antd';
import Link from 'umi/link';

// Header, Footer, Sider, Content组件在Layout组件模块下
const { Header, Footer, Sider, Content } = Layout;

const { SubMenu } = Menu;

class BasicLayout extends Component {
  state = {
    collapsed: false,
  };

  onCollapse = collapsed => {
    console.log(collapsed);
    this.setState({ collapsed });
  };

  render() {
    return (
      <Layout>
        <Sider width={256} style={{ minHeight: '100vh'}} collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
          <div style={{ height: '32px', background: 'rgba(255,255,255,.2)', margin: '16px'}}/>
          <Menu theme="dark" mode="inline" defaultSelectedKeys={['0']}>
            <Menu.Item key="1">
              <Link to="/planning">
                {/* <Icon type="pie-chart" /> */}
                <span>路径规划工具</span>
              </Link>
            </Menu.Item>
            <SubMenu
              key="sub1"
              title={<span>数据管理</span>}
            >
               <Menu.Item key="2"><Link to="/configuration/aircraft_information">设置飞行器信息</Link></Menu.Item>
               <Menu.Item key="3"><Link to="/configuration/goods_information">设置货物信息</Link></Menu.Item>
               <Menu.Item key="4"><Link to="/configuration/display">实时信息展示</Link></Menu.Item>
            </SubMenu>
          </Menu>
        </Sider>
        <Layout>
          {/* <Header style={{ background: '#fff', textAlign: 'center', padding: 0 }}>Header</Header> */}
          <Content style={{ margin: '24px 16px 0' }}>
            <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
              {this.props.children}
            </div>
          </Content>
          {/* <Footer style={{ textAlign: 'center' }}>
            Ant Design ©2018 Created by Ant UED
          </Footer> */}
        </Layout>
      </Layout>
    )
  }
}

export default BasicLayout;