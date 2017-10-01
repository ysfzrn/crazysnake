import { Dimensions, Platform } from "react-native";

const { width, height } = Dimensions.get("window");

function definiteWidth(width){
    const reminder = width % 10;
    if( reminder !== 0 ){
        return width - 5;
    }else{
        return width;
    }
}

const SharedStyle ={
  color:{
      primary:'#122210',
      primaryBlack:'#223D1D',
      secondary:'#F9FF1C',
      snake:'#4CAF50',
      scoreColor: 'yellow',
      buttonBackground: '#000000'
  },
  board:{
      height: Platform.OS === 'ios' ? 500 : 400,
      width: definiteWidth(width),
  },
  segment:{
      width:10,
      height:10,
      backgroundColor: '#4CAF50',
      borderWidth:1,
      borderColor: '#285A2A',
  },
  food: {
      width: 10,
      height: 10,
      backgroundColor: 'red',
      borderWidth:1,
      borderColor: 'black',
  },
  scoreBoard: {
      height: 34,
  }
}

export default SharedStyle