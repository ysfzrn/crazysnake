//import liraries
import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import SharedStyle from "../utils/sharedStyle";

// create a component
class Segment extends Component {
  render() {
    const customStyle = {
      left: this.props.x,
      top: this.props.y
    };
    return <View style={[styles.container, customStyle]} />;
  }
}

// define your styles
const styles = StyleSheet.create({
  container: {
    position: "absolute",
    width: SharedStyle.segment.width,
    height: SharedStyle.segment.height,
    backgroundColor: SharedStyle.color.snake,
    borderWidth: SharedStyle.segment.borderWidth,
    borderColor: SharedStyle.segment.borderColor
  }
});

//make this component available to the app
export default Segment;
