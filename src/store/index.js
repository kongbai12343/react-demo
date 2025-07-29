import userInfoStore from "./userInfoStore.js";

class Store {
	constructor() {
		this.userInfoStore = userInfoStore;
	}
}

export default new Store();
