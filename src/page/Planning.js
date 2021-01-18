import React, { Component } from 'react';
import { Card ,Button } from 'antd';
import { connect } from 'dva';
import { InputNumber, Input } from 'antd';

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
    // onClickAdd: (newCard) => {
    //   const action = {
    //     type: `${namespace}/addNewCard`,
    //     payload: newCard,
    //   };
      getStart: (event) => {
        const action = {
          type: `${namespace}/set_start_point`,
          payload: 10,
        };
        dispatch(action);
      },
      getPass: (event) => {
        const action = {
          type: `${namespace}/set_pass_point`,
          payload: [11,12,13,14,15,16,17,18],
        };
        dispatch(action);
      },
      postState: (newState) => {
        const action = {
          type: `${namespace}/pre_to_plan`,
          payload: {
            ...newState
          },
        };
        dispatch(action);
      },
      getRoute: (newState) => {
        const action = {
          type: `${namespace}/get_the_route`,
        };
        dispatch(action);
      },
  };
};

@connect(mapStateToProps,mapDispatchToProps)
export default class PointSetting extends Component {
  render() {
    const {flightInformation, goodInformation, pointInformation, routeInformation} = this.props
    const newState = {flightInformation,goodInformation,pointInformation,routeInformation}
    return (
      <div>
        <Button style={{width: 200}} onClick={(event) => this.props.getStart(event)}>
          设置起点
        </Button>
        <br/>
        <Button style={{width: 200}} onClick={(event) => this.props.getPass(event)}>
          设置经过点
        </Button>
        <br/>
        <Button style={{width: 200}} onClick={(event) => this.props.postState(newState)}>
          规划路径
        </Button>
        <br/>
        <Button style={{width: 200}} onClick={(event) => this.props.getRoute(event)}>
          展示路径
        </Button>
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