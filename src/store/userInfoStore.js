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

	getUserInfo() {
		return this.userInfo;
	}

	getToken() {
		return this.token;
	}

	getHasPermission() {
		return this.hasPermission;
	}

}

export default new UserInfoStore();
