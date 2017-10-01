//import liraries
import React, { Component } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import SharedStyle from "../utils/sharedStyle";

const apple = require("../assets/apple.png");

// create a component
const ScoreText = (props) => {
  return (
    <View style={[styles.container, props.style ]}>
      <Text style={styles.scoreText}>
        {props.label} : {props.score}
      </Text>
      <Image
        source={apple}
        style={{
          width: SharedStyle.food.width,
          height: SharedStyle.food.height
        }}
      />
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  scoreText: {
    color: SharedStyle.color.scoreColor,
    fontWeight: "bold",
    marginRight: 5
  }
});

//make this component available to the app
export default ScoreText;
