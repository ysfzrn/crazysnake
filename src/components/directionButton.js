//import liraries
import React, { Component } from "react";
import { View, Text, StyleSheet, Image, TouchableWithoutFeedback, TouchableOpacity } from "react-native";
import SharedStyle from "../utils/sharedStyle";

// create a component
class DirectionButton extends Component {
  render() {
    const { icon } = this.props;
    
    return (
      <TouchableWithoutFeedback {...this.props} style={[styles.container]}>
        <View style={{flex:1}} >
         <Image source={ icon } style={[styles.image]} resizeMode="contain" />
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

// define your styles
const styles = StyleSheet.create({
  container: {
    flex:1,
    alignItems:'center',
    justifyContent:'center',
  },
  image:{
    width:SharedStyle.board.width / 2,
    height:80
  },
  text: {
    fontSize: 20,
    color: "#FFFFFF",
    fontWeight: "bold"
  }
});

//make this component available to the app
export default DirectionButton;
