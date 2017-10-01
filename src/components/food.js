//import liraries
import React, { Component } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import SharedStyle from '../utils/sharedStyle'
const apple = require('../assets/apple.png')
// create a component
const Food = props => {
  const customStyle = {
      left:props.x,
      top:props.y
  }  
  return (
    <Image source={ apple } style={[styles.container, customStyle ]}/>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: SharedStyle.food.width,
    height: SharedStyle.food.height,
  }
});

//make this component available to the app
export default Food;
