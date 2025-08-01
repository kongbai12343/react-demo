import { makeAutoObservable } from "mobx";

class UserInfoStore {
	userInfo = null;
	token = "";
	hasPermission = [];

	constructor() {
		makeAutoObservable(this);
	}

	setUserInfo(userInfo) {
		this.userInfo = userInfo;
	}

	setToken(token) {
		this.token = token;
	}

	setHasPermission(hasPermissionStr) {
		this.hasPermission = hasPermissionStr ? hasPermissionStr.split("|") : [];
	}
}

export default new UserInfoStore();
