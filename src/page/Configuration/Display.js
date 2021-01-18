import React, { Component } from 'react';
import { Card ,Button } from 'antd';
import { connect } from 'dva';
import { InputNumber } from 'antd';

const namespace = 'planning';

const mapStateToProps = (state) => {
  const flightInformation = state[namespace].flight;
  const goodInformation = state[namespace].good;
  const pointInformation = state[namespace].point;
  const routeInformation = state[namespace].route;
  return {
    flightInformation,
    goodInformation,
    pointInformation,
    routeInformation,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    // // onClickAdd: (newCard) => {
    // //   const action = {
    // //     type: `${namespace}/addNewCard`,
    // //     payload: newCard,
    // //   };
    //   numChange: (value) => {
    //     const action = {
    //       type: `${namespace}/set_flight_num`,
    //       payload: value,
    //     };
    //     dispatch(action);
    //   },
  };
};

@connect(mapStateToProps)
export default class DisplayInformation extends Component {
  array2string(arrayContent) {
    //console.log(arrayContent)
    let result = '';
    for (let a of arrayContent) {
      //console.log(a);
      result += a + " "
      //console.log(result);
    }
    return result;
  }

  render() {
    return (
      <div>
        <font size = '4'> 信息展示面板</font>
        <hr/>
        <font size = '3'> 飞行器信息</font>
        <br/>
        <font size = '3'> 数目：{this.props.flightInformation.num}</font>
        <hr/>
        <font size = '3'> 货物信息</font>
        <br/>
        <font size = '3'> 数目：{this.props.goodInformation.num}</font>
        <hr/>
        <font size = '3'> 地点信息</font>
        <br/>
        <font size = '3'> 起点：{this.props.pointInformation.start}</font>
        <br/>
        <font size = '3'> 经过点：{this.array2string(this.props.pointInformation.pass)}</font>
        <hr/>
        <font size = '3'> 路径信息</font>
        <br/>
        <font size = '3'> 路径：{this.props.routeInformation}</font>
        {/* <InputNumber min={1} max={5} defaultValue={3} onChange={(value) => this.props.numChange(value)}/> */}
        
      </div>
    );
  }
}
// export default class PuzzleCardsPage extends Component {
//   render() {
//     return (
//       <div>
//         {
//           this.props.cardList.map(card => {
//             return (
//               <Card key={card.id}>
//                 <div>Q: {card.setup}</div>
//                 <div>
//                   <strong>A: {card.punchline}</strong>
//                 </div>
//               </Card>
//             );
//           })
//         }
//         <div>
//           <Button onClick={() => this.props.onClickAdd({
//             setup: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
//             punchline: 'here we use dva',
//           })}> 添加卡片 </Button>
//         </div>
//       </div>
//     );
//   }
// }