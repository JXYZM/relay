import React, { Component } from 'react';
import { Card ,Button } from 'antd';
import { connect } from 'dva';
import { InputNumber, Input } from 'antd';

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
      numChange: (e) => {
        const action = {
          type: `${namespace}/set_good_num`,
          payload: e.target.value,
        };
        dispatch(action);
      },
  };
};

@connect(mapStateToProps,mapDispatchToProps)
export default class SetGoodInformation extends Component {
  render() {
    return (
      <div>
        <font size = '3'> 货物信息控制面板 </font>
        <hr/>
        <p> 设置货物数目 </p>
        {/* <InputNumber min={1} max={5} defaultValue={3} onChange={(value) => this.props.numChange(value)}/> */}
        <Input style={{width: 200}} onChange={(e) => this.props.numChange(e)}/>
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