//import liraries
import React, { Component } from "react";
import { View, Text, StyleSheet, StatusBar } from "react-native";
import { inject, observer } from "mobx-react/native";
import SharedStyle from "../utils/sharedStyle";
import { Button, ScoreText, Segment, Food } from "../components";

// create a component
@inject("nav", "gameStore")
@observer
class GameOverScreen extends Component {
  static navigatorStyle = {
    navBarHidden: true
  };

  restartClick=()=>{
    const { gameStore } = this.props;
    gameStore.handleRestart();
  }

  render() {
    const { gameStore } = this.props;
    const snake = gameStore.snake.slice();
    return (
      <View style={styles.container}>
       <StatusBar barStyle="light-content"/>   
       <View>
       <GameOverText />
       <ScoreText label="Score" score={gameStore.score} style={{justifyContent:'center', paddingTop:20}} />
       </View>
       <View style={{flex:5, marginTop:30,}}>
         <Button text="RESTART" onPress={ this.restartClick } />
        </View>
       <BoardContainer> 
        <Board>
          <Food x={gameStore.food.x} y={gameStore.food.y} />
          {snake.map((segment, i) => {
            return (
              <Segment
                key={segment.id}
                id={segment.id}
                x={segment.x}
                y={segment.y}
              />
            );
          })}
        </Board>
        </BoardContainer>
      </View>
    );
  }
}


const Board = props => {
    return (
      <View style={styles.boardStyle}>
        {props.children}
      </View>
    );
  };

const BoardContainer = props => {
    return (
      <View style={styles.boardContainer}>
        {props.children}
      </View>
    );
  };

  const GameOverText = (props) => {
    return(
     <View style={{alignItems:'center'}}> 
      <Text style={styles.overText}>GAME</Text>
      <Text style={styles.overText}>OVER</Text>
     </View> 
    )
  }

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop:50,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: SharedStyle.color.primary
  },
  boardContainer:{
    borderWidth:1,
    borderColor:'white',
    margin:-70,
    transform:[{scale:0.5}],
  },
  boardStyle: {
    flexDirection:'row',
    position: "relative",
    width:SharedStyle.board.width,
    height: SharedStyle.board.height,
    backgroundColor: SharedStyle.color.primary
  },
  overText:{
    fontSize: 52,
    backgroundColor: SharedStyle.color.primary,
    color: SharedStyle.color.scoreColor,
    fontWeight: 'bold'
  }
});

//make this component available to the app
export default GameOverScreen;
