import { apiGet, apiPost } from "@/network/request";

// 登陆
const login = (data) => {
	return apiPost("/login", data);
};

// 获取菜单列表
const getMenuList = () => {
	return apiGet("api/resource/getMenu");
};

// 修改密码
const updatePassword = (data) => {
	return apiPost("api/employee/updatePwd", data);
};
export { login, getMenuList, updatePassword };
