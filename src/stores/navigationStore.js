"use strict";
import mobx, { observable, action } from "mobx";

class NavStore {
  @observable route = undefined;

  @action("Route is changing")
  handleChangeRoute(val) {
    this.route = val;
  }

  appInitialized() {
    this.route = 'root';
  }

}

export default new NavStore()

