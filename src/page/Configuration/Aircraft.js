import React, { Component } from 'react';
import { Card ,Button } from 'antd';
import { connect } from 'dva';
import { InputNumber } from 'antd';

const namespace = 'planning';

const mapStateToProps = (state) => {
  // const cardList = state[namespace].data;
  // return {
  //   cardList,
  // };
};

const mapDispatchToProps = (dispatch) => {
  return {
    // onClickAdd: (newCard) => {
    //   const action = {
    //     type: `${namespace}/addNewCard`,
    //     payload: newCard,
    //   };
      numChange: (value) => {
        const action = {
          type: `${namespace}/set_flight_num`,
          payload: value,
        };
        //console.log(action.payload)
        dispatch(action);
      },
  };
};

@connect(mapStateToProps,mapDispatchToProps)
export default class SetFlightInformation extends Component {
  render() {
    return (
      <div>
        <font size = '3'> 飞行器信息控制面板 </font>
        <hr/>
        <p> 设置飞行器数目 </p>
        <InputNumber min={1} max={5} defaultValue={3} onChange={(value) => this.props.numChange(value)}/>
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