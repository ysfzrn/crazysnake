import { Navigation } from "react-native-navigation";
import HomeScreen from './screens/home';
import Store from './stores'
import Provider from './Provider'

export function registerScreens() {
  Navigation.registerComponent("crazySnake.HomeScreen", () => HomeScreen,Store,Provider);
}
