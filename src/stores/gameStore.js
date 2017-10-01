"use strict";
import mobx, { observable, action } from "mobx";
import { AsyncStorage } from "react-native";


class GameStore {
  @observable highScore = 0;

  @action("getting high score")
  getHighScore() {
    AsyncStorage.getItem("snakeHighScore").then(_highScore => {
      this.highScore = _highScore;
      if (_highScore === null) {
        AsyncStorage.setItem("snakeHighScore", JSON.stringify(0));
      }
    });
  }
}

export default new GameStore();
