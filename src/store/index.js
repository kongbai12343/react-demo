import userInfoStore from "./userInfoStore.js";
import menuStore from "@/store/menuStore.js";

class Store {
	constructor() {
		this.userInfoStore = userInfoStore;
		this.menuStore = menuStore;
	}
}

export default new Store();
