import { Navigation } from "react-native-navigation";
import HomeScreen from './screens/home';
import GameScreen from './screens/gameScreen';
import GameOverScreen from './screens/gameOverScreen';
import Store from './stores'
import Provider from './Provider'

export function registerScreens() {
  Navigation.registerComponent("crazySnake.HomeScreen", () => HomeScreen,Store,Provider);
  Navigation.registerComponent("crazySnake.GameScreen", () => GameScreen,Store,Provider);
  Navigation.registerComponent("crazySnake.GameOverScreen", () => GameOverScreen,Store,Provider);
}
