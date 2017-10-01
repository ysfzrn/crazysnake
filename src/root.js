import { Navigation } from "react-native-navigation";
import { reaction } from "mobx";
import { registerScreens } from "./registerScreens";
import { observer } from "mobx-react/native";
import Store from "./stores";

registerScreens();

export default class App {
  constructor() {
    reaction(() => Store.nav.route, () => this.startApp(Store.nav.route));
    Store.nav.appInitialized();
  }

  startApp(root) {
    switch (root) {
      case "root":
        Navigation.startSingleScreenApp({
          screen: {
            screen: "crazySnake.HomeScreen",
            title: "HOME"
          }
        });
        return;
    }
  }
}
