//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, StatusBar } from 'react-native';
import { inject, observer } from "mobx-react/native";
import SharedStyle from "../utils/sharedStyle";
import { Button, ScoreText} from "../components";

// create a component
@inject("nav", "gameStore")
@observer
class Home extends Component {
  static navigatorStyle = {
    navBarHidden: true
  };

  componentDidMount() {
    const { gameStore } = this.props;
    //gameStore.getHighScore();
  }

  handlePlay=()=>{
    const { nav } = this.props;
    nav.handleChangeRoute("gameScreen");
  }

  render() {
    const { gameStore } = this.props; 
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content"/>
        <View style={{flex:1,  justifyContent:'center'}} >
          <Logo />
        </View>  
        <View style={{flex:1, flexDirection:'column',   }}>
           <Button text="PLAY" onPress={ this.handlePlay } />
           <ScoreText label="High Score" score={gameStore.highScore} style={{justifyContent:'center', marginTop:42}} />
        </View>  
      </View>
    );
  }
}

const Logo = (props) => {
  return(
   <View style={{alignItems:'center'}}> 
    <Text style={styles.logoText}>SNAKE</Text>
    <Text style={styles.logoText}>GAME</Text>
   </View> 
  )
}

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: SharedStyle.color.primary,
  },
  logoText: {
    fontSize: 52,
    color: SharedStyle.color.snake,
  }
});

//make this component available to the app
export default Home;
