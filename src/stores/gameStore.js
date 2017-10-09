"use strict";
import mobx, { observable, action } from "mobx";
import _ from "lodash";
import { AsyncStorage } from "react-native";
import SharedStyle from "../utils/sharedStyle";
import NavigationStore from './navigationStore'


const segmentRate = 10; // yılanın her hareketinde katedeceği mesafe
const boardWidth = SharedStyle.board.width;
const BoardHeight = SharedStyle.board.height - 10;
let globalID;

class GameStore {
  @observable highScore = 0;  //yapılan en yüksek skoru tutar
  @observable score = 0;        // yiyilen elma sayısı
  @observable intervalRate = 25; //yılanın hızı
  @observable currentDirection = "right"; // Yılanın yönü, alacağı değerler: left / right / up / down 
  @observable lastSegment = 10; // her segmentin kendinden önce takip edeceği, segment
  @observable                   // yılanı oluşturan array, ve başlangıç koordinatları
  snake = [
    { id: 1, x: 20, y: 0 },
    { id: 2, x: 10, y: 0 },
    { id: 3, x: 0, y: 0 }
  ];
  @observable rightButtonText = "up";
  @observable leftButtonText = "down";
  @observable food = { x: 50, y: 50 };

  @action("Snake is moving")
  handleMoveSnake =() => {
    let temp = _.cloneDeep(this.snake.slice());
      this.lastSegment = temp[0];
      for (let i = 0; i < temp.length; i++) {
        if (i !== 0) {
          this.lastSegment = temp[i - 1];
        }

        if (this.currentDirection === "right") {
          if (i === 0) {
            if (this.snake[i].x + segmentRate >= boardWidth ) {
              this.snake[i].x = 0;
            }else{
              this.snake[i].x = this.snake[i].x + segmentRate;
            }
            this.handleEatFood();
          } else {
            this.snake[i].x = this.lastSegment.x;
            this.snake[i].y = this.lastSegment.y;
          }
        }else if (this.currentDirection === "left") {
          if (i === 0) {
            this.snake[i].x = this.snake[i].x - segmentRate;
            if (this.snake[i].x < 0) {
              this.snake[i].x = boardWidth - segmentRate;
            }
            this.handleEatFood();
          } else {
            this.snake[i].x = this.lastSegment.x;
            this.snake[i].y = this.lastSegment.y;
          }
        } else if (this.currentDirection === "down") {
          if (i === 0) {
            this.snake[i].y = this.snake[i].y + segmentRate;
            if (this.snake[i].y > BoardHeight) {
              this.snake[i].y = 0;
            }
            this.handleEatFood();
          } else {
            this.snake[i].x = this.lastSegment.x;
            this.snake[i].y = this.lastSegment.y;
          }
        } else if (this.currentDirection === "up") {
          if (i === 0) {
            this.snake[i].y = this.snake[i].y - segmentRate;
            if (this.snake[i].y < 0) {
              this.snake[i].y = BoardHeight;
            }
            this.handleEatFood();
          } else {
            this.snake[i].x = this.lastSegment.x;
            this.snake[i].y = this.lastSegment.y;
          }
        } 
      }

      //isGameOver control
      for(let i = 1; i < this.snake.slice().length; i++){
      if(this.snake[0].x === this.snake[i].x && this.snake[0].y === this.snake[i].y  ){
          this.gameover = true;
          if( this.score > this.highScore ){
            AsyncStorage.setItem('snakeHighScore', JSON.stringify(this.score));
          }
          cancelAnimationFrame(this.handleMoveSnake);
          NavigationStore.handleChangeRoute('gameOverScreen');
          this.handleClearTimeout();
          return;
      }
    }

      globalID = setTimeout(()=>{
        requestAnimationFrame(this.handleMoveSnake);
      }, 1000 / this.intervalRate);
  }

  @action("leftButton Pressed")
  handleClearTimeout() {
    clearTimeout(globalID);
  }



  @action("leftButton Pressed")
  handleLeftButton() {
    if (this.currentDirection === "right") {
      this.currentDirection = "down";
      this.leftButtonText = "left";
      this.rightButtonText = "right";
    } else if (this.currentDirection === "down") {
      this.currentDirection = "left";
      this.leftButtonText = "down";
      this.rightButtonText = "up";
    } else if (this.currentDirection === "left") {
      this.currentDirection = "down";
      this.leftButtonText = "left";
      this.rightButtonText = "right";
    } else if (this.currentDirection === "up") {
      this.currentDirection = "left";
      this.leftButtonText = "down";
      this.rightButtonText = "up";
    }
  }

  @action("rightButton Pressed")
  handleRightButton() {
    if (this.currentDirection === "right") {
      this.currentDirection = "up";
      this.rightButtonText = "right";
      this.leftButtonText = "left";
    } else if (this.currentDirection === "down") {
      this.currentDirection = "right";
      this.rightButtonText = "up";
      this.leftButtonText = "down";
    } else if (this.currentDirection === "left") {
      this.currentDirection = "up";
      this.rightButtonText = "right";
      this.leftButtonText = "left";
    } else if (this.currentDirection === "up") {
      this.currentDirection = "right";
      this.rightButtonText = "up";
      this.leftButtonText = "down";
    }
  }

  @action("make food")
  handleMakeFood() {
    const frameX = (boardWidth -10) / segmentRate;
    const frameY = BoardHeight / segmentRate;

    this.food.x = this.getRandomInt(0, frameX) * segmentRate;
    this.food.y = this.getRandomInt(0, frameY) * segmentRate;
  }

  getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  @action("Did the snake eat the food ?")
  handleEatFood() {
    if (this.snake[0].x === this.food.x && this.snake[0].y === this.food.y) {
      this.score = this.score + 1;
      this.snake.push({
        id: this.snake[this.snake.length - 1].id + 1,
        x: this.snake[this.snake.length - 1].x,
        y: this.snake[this.snake.length - 1].y
      });
      if( this.score % 3 === 0 ){
       this.intervalRate = this.intervalRate + 3;
      }
       
      this.handleMakeFood();
    }
  }


  @action("getting high score")
  getHighScore() {
    AsyncStorage.getItem("snakeHighScore").then(_highScore => {
      this.highScore = _highScore;
      if (_highScore === null) {
        AsyncStorage.setItem("snakeHighScore", JSON.stringify(0));
      }
    });
  }

  @action("restart handler")
  handleRestart(){
    NavigationStore.handleChangeRoute('gameScreen');
    this.intervalRate = 25;
    this.currentDirection = "right";
    this.lastSegment = 10;
    this.gameover = false;
    this.rightButtonText = "up";
    this.leftButtonText = "down";
    this.score = 0;
    this.food = { x: 50, y: 50 };
    this.snake = [
      { id: 1, x: 20, y: 0 },
      { id: 2, x: 10, y: 0 },
      { id: 3, x: 0, y: 0 }
    ];
  }

  
}

export default new GameStore();
