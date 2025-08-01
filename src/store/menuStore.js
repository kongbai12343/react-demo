import { makeAutoObservable } from "mobx";

class MenuStore {
	menuData = [];
	openKeys = [];
	selectedKeys = [];

	constructor() {
		makeAutoObservable(this);
	}

	setMenuData(menuData) {
		this.menuData = menuData;
		localStorage.setItem("menuData", JSON.stringify(menuData));
	}

	setOpenKeys(openKeys) {
		this.openKeys = openKeys;
		localStorage.setItem("menuOpenKeys", JSON.stringify(openKeys));
	}

	setSelectedKeys(selectedKeys) {
		this.selectedKeys = selectedKeys;
		localStorage.setItem("menuSelectedKeys", JSON.stringify(selectedKeys));
	}
}

export default new MenuStore();
