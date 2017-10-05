//import liraries
import React, { Component } from "react";
import { View, Text, StyleSheet, Dimensions, StatusBar, Image, Platform } from "react-native";
import { inject, observer } from "mobx-react/native";
import { DirectionButton,  Segment, ScoreText, Food} from "../components";
import SharedStyle from "../utils/sharedStyle";

const { width } = Dimensions.get("window");
const rightButton = require('../assets/rightButton.png');
const leftButton = require('../assets/leftButton.png');
const upButton = require('../assets/upButton.png');
const downButton = require('../assets/downButton.png');

// create a component
@inject("nav", "gameStore")
@observer
class GameScreen extends Component {
  static navigatorStyle = {
    navBarHidden: true
  };

  componentDidMount() {
    const { gameStore } = this.props;
   // gameStore.handleMoveSnake();
  }

  leftButtonPress=()=>{
    const { gameStore } = this.props;
    gameStore.handleLeftButton();
  }

  rightButtonPress=()=>{
    const { gameStore } = this.props;
    gameStore.handleRightButton();
  }

  render() {
    const { gameStore } = this.props;
    const snake = gameStore.snake.slice();
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content"/>
        
        <Board>
         {snake.map((segment, i) => {
            return <Segment key={segment.id} id={segment.id} x={segment.x} y={segment.y} />;
          })}
          <Food x={ gameStore.food.x } y={ gameStore.food.y }/>
        </Board>    
        <ButtonContainer>
          <DirectionButton icon={gameStore.leftButtonText === 'down' ? downButton : leftButton } onPressIn={ this.leftButtonPress } />
          <DirectionButton icon={gameStore.rightButtonText === 'up' ? upButton : rightButton } onPressIn={ this.rightButtonPress} />
        </ButtonContainer>
      </View>
    );
  }
}

const ButtonContainer = props => {
  return (
    <View style={styles.buttonContainer}>
      {props.children}
    </View>
  );
};

const Board = props => {
  return (
    <View style={styles.boardStyle}>
      {props.children}
    </View>
  );
};

const ScoreBoardContainer = props => {
  return(
    <View style={styles.scoreBoard} >
      <ScoreText label="Score" score={props.score} />
      <ScoreText label="High Score" score={props.highScore} />
    </View>  
  )
}


// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: SharedStyle.color.primaryBlack,
    ...Platform.select({
      ios:{
        paddingTop: 20
      }
    })
  },
  boardStyle: {
    flexDirection:'row',
    position: "relative",
    width:SharedStyle.board.width,
    height: SharedStyle.board.height,
    backgroundColor: SharedStyle.color.primary
  },
  scoreBoard:{
    flexDirection:'row',
    justifyContent:'space-between',
    paddingHorizontal: 10,
    alignItems: 'center',
    width,
    marginBottom: 5,
    height: SharedStyle.scoreBoard.height,
    backgroundColor: SharedStyle.color.primary
  },
  buttonContainer: {
    width,
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around"
  },
});

//make this component available to the app
export default GameScreen;
