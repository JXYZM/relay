import React, { Component } from 'react'
import { Map, MouseTool, Marker, Polyline, Circle } from 'react-amap'
import { connect } from 'dva'
import {
  Button,
  Card,
  Row,
  Col,
  Tabs,
  Tooltip,
  List,
  Layout,
  Form,
  Collapse,
  Descriptions,
  Badge,
  Space,
  Input,
  Select,
  InputNumber,
  Switch,
  Slider,
  Radio,
  Checkbox,
  Rate,
  Upload,
  message,
  Table,
} from 'antd'
import {
  MinusCircleOutlined,
  PlusOutlined,
  createFromIconfontCN,
  UploadOutlined,
  InboxOutlined,
} from '@ant-design/icons'
import load_point from '../resources/load_point'

const IconFont0 = createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_1282563_kns8e1am00d.js',
})

const IconFont1 = createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_1289406_de15s4r5mdv.js',
})

const { TabPane } = Tabs
const { Header, Content, Footer } = Layout
const { Panel } = Collapse
const { Option } = Select
const { Column, ColumnGroup } = Table

const namespace = 'planning'

const mapStateToProps = ({ [namespace]: n }) => {
  return {
    bInfo: n.boarder,
    uInfo: n.uav,
    iInfo: n.info,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    post_algo_profile: (values) => {
      const action = {
        type: `${namespace}/post_algo_profile`,
        payload: {
          type: 0,
          ...values,
        },
      }
      dispatch(action)
    },
    query_from_host: () => {
      const action = {
        type: `${namespace}/query_from_host`,
        payload: {
          type: 1,
        },
      }
      dispatch(action)
    },
  }
}

const formItemLayout = {
  labelCol: { span: 6, offset: 0 },
  wrapperCol: { span: 14, offset: 0 },
}

@connect(mapStateToProps, mapDispatchToProps)
export default class Amap extends Component {
  constructor() {
    super()
    const self = this
    this.timer
    this.state = {
      what: '点击下方按钮开始绘制',
      load_point,
      color: ['yellow', 'blue', 'red', 'green'],
      button_disabled: true,
      selectedRowKeys: [],
    }
    this.amapEvents = {
      created: (mapInstance) => {
        self.map = mapInstance
      },
    }
    this.lineEvents = {
      created: (ins) => {
        console.log(ins)
      },
      show: () => {
        console.log('line show')
      },
    }
    this.toolEvents = {
      created: (tool) => {
        self.tool = tool
      },
      draw({ obj }) {
        self.drawWhat(obj)
      },
    }
    this.mapPlugins = ['ToolBar']
    this.mapCenter = { longitude: 118.958877, latitude: 32.114745 }
  }

  display_boarder() {
    console.log(this.props.bInfo)
    let temp = []
    for (let a of this.props.bInfo) {
      temp = temp.concat({
        longitude: a[0],
        latitude: a[1],
      })
    }
    let temp_path = []
    temp_path = temp_path.concat({ route: temp })
    return [temp_path]
  }

  display_uav() {
    let temp = []
    let count = 0
    for (let a of this.props.uInfo) {
      temp = temp.concat({
        key: 'uav' + JSON.stringify(count),
        position: {
          longitude: a['longitude'],
          latitude: a['latitude'],
        },
        r: a['radius'],
        color: a['key'],
      })
      count = count + 1
    }
    return [temp]
  }

  onSelectChange = (selectedRowKeys) => {
    console.log('selectedRowKeys changed: ', selectedRowKeys)
    this.setState({ selectedRowKeys })
  }

  render() {
    const [boarder] = this.display_boarder()
    console.log(boarder)
    const [uav] = this.display_uav()
    console.log(uav)

    const onSave = (values) => {
      console.log('Received values of form: ', values)
      this.props.post_algo_profile(values)
      this.setState({
        button_disabled: false,
      })
    }

    const uploadChange = (info) => {
      // console.log('Upload event:', e)
      // if (Array.isArray(e)) {
      //   return e
      // }
      // return e && e.fileList
      const { status } = info.file

      console.log(info)

      if (status !== 'uploading') {
        console.log(info.file, info.fileList)
      }
      if (status === 'done') {
        message.success(`${info.file.name} uploaded successfully.`, 3)
      } else if (status === 'error') {
        message.error(`${info.file.name} upload failed.`, 3)
      }
    }
    const { selectedRowKeys } = this.state
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    }

    return (
      <div className="container">
        <div className="header">
          <div
            className="logo"
            style={{
              position: 'absolute',
              left: 50,
              textAlign: 'left',
              color: 'white',
              fontSize: 24,
            }}
          >
            <div>
              <IconFont0 style={{ padding: '20px' }} type="icon-wurenji-copy" />
              {`无人机中继平台`}
            </div>
          </div>
        </div>
        <div className="content">
          <div className="my_map">
            <Map
              events={this.amapEvents}
              plugins={this.mapPlugins}
              center={this.mapCenter}
            >
              <MouseTool events={this.toolEvents} />
              {this.state.load_point.map((item) => (
                <Marker
                  position={item.position}
                  extData={{ key: item.key }}
                  clickable
                  title={item.key.toString()}
                  events={this.markerEvents}
                />
              ))}
              {uav.map((item) => (
                <Marker
                  position={item.position}
                  // icon={'//vdata.amap.com/icons/b18/1/2.png'}
                  offset={{ x: -8, y: -12 }}
                  title={item.key}
                >
                  <IconFont1 type="icon-wurenji" />
                </Marker>
              ))}
              {uav.map((item) => (
                <Circle
                  center={item.position}
                  radius={item.r}
                  style={{
                    fillColor: this.state.color[item.color],
                    fillOpacity: 0.1,
                    strokeColor: 'black',
                    strokeOpacity: 1.0,
                    strokeWeight: 1,
                  }}
                />
              ))}
              {boarder.map((item) => (
                <Polyline
                  path={item.route}
                  showDir={false}
                  style={{
                    strokeWeight: 3,
                    strokeColor: 'purple',
                  }}
                />
              ))}
            </Map>
          </div>
          <div className="my_input">
            <Form
              name="input_form"
              {...formItemLayout}
              onFinish={onSave}
              autoComplete="off"
            >
              <span className="ant-form-text">算法配置页</span>
              <Form.Item
                name="select"
                label="选择"
                hasFeedback
                rules={[{ required: true, message: '缺少优化目标' }]}
              >
                <Select placeholder="选择优化目标">
                  <Option value="无人机100%时间持续覆盖">
                    无人机100%时间持续覆盖
                  </Option>
                </Select>
              </Form.Item>
              <Form.Item
                name="switch"
                label="智能规划算法"
                valuePropName="checked"
              >
                <Switch />
              </Form.Item>
              <Form.Item name="slider" label="无人机数目">
                <Slider
                  min={1}
                  max={16}
                  marks={{
                    1: '1',
                    4: '4',
                    7: '7',
                    10: '10',
                    13: '13',
                    16: '16',
                  }}
                />
              </Form.Item>
              <Form.Item label="上传">
                <Form.Item
                  name="dragger"
                  valuePropName="fileList"
                  getValueFromEvent={uploadChange}
                  noStyle
                >
                  <Upload.Dragger
                    name={'file'}
                    multiple={true}
                    action={'http://localhost:7000/dev/'}
                  >
                    <p className="ant-upload-drag-icon">
                      <InboxOutlined />
                    </p>
                    <p className="ant-upload-text">双击或拖拽文件以上传</p>
                    <p className="ant-upload-hint">支持任务描述文件</p>
                  </Upload.Dragger>
                </Form.Item>
              </Form.Item>
              <Form.Item wrapperCol={{ span: 12, offset: 6 }}>
                <Button type="ghost" htmlType="submit">
                  Save
                </Button>
              </Form.Item>
            </Form>
          </div>
          <div className="my_display">
            <div className="my_start">
              <Button
                type="primary"
                htmlType="button"
                size="large"
                disabled={this.state.button_disabled}
                block
              >
                <a
                  onClick={(_) => {
                    clearInterval(this.timer)
                    this.timer = setInterval(() => {
                      this.props.query_from_host()
                    }, 200)
                  }}
                >
                  Plan
                </a>
              </Button>
            </div>
            <div className="my_interact">
              <div style={{ position: 'relative', left: '10%', width: '80%' }}>
                <Tabs defaultActiveKey="0" style={{ textAlign: 'center' }}>
                  <TabPane tab="无人集群个体状态信息" key="0">
                    <Table dataSource={this.props.iInfo}>
                      <Column title="编号" dataIndex="id" />
                      <Column title="位置" dataIndex="position" />
                      <Column title="巡航速度" dataIndex="velocity" />
                      <Column title="中继半径" dataIndex="radius" />
                    </Table>
                  </TabPane>
                </Tabs>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
