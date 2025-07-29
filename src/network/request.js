import axios from "axios";
import { message } from "antd";

// 请求接口白名单（无需token）
const requestWhitelist = ["/login"];

const axiosInstance = axios.create({
	baseURL: import.meta.env.VITE_API_BASE,
	timeout: 30000,
	headers: {
		// "Content-Type": "application/json;charset=utf-8",
		platform: 1,
	},
});

// 请求拦截器
axiosInstance.interceptors.request.use(
	(config) => {
		// 检查是否是白名单接口
		const isWhitelisted = requestWhitelist.some((path) => new RegExp(`^${path}(/|$)`).test(config.url));
		// 添加token
		const token = localStorage.getItem("token");
		if (!token && !isWhitelisted) {
			window.location.href = "/login";
			return Promise.reject(new Error("未授权，请先登录"));
		}

		if (token) {
			config.headers.token = token;
		}

		return config;
	},
	(error) => {
		// 请求配置错误处理
		return Promise.reject(error);
	},
);

// 响应拦截器
axiosInstance.interceptors.response.use(
	(response) => {
		// 根据业务逻辑处理响应
		if (response.data.code === 2000) {
			return response.data;
		} else {
			// 业务错误处理
			if (response.data.code === 1003) {
				message.error(response.data.msg);
				setTimeout(() => {
					localStorage.removeItem("token");
					window.location.href = "/login";
				}, 1500);
			} else {
				message.error(response.data.msg || "操作失败");
				return Promise.reject(response.data);
			}
		}
	},
	(error) => {
		if (error.response) {
			// HTTP状态码错误处理
			switch (error.response.status) {
				case 401:
					message.error("登录已过期，请重新登录");
					localStorage.removeItem("token");
					window.location.href = "/login";
					break;
				case 403:
					message.error("没有操作权限");
					break;
				case 404:
					message.error("请求的资源不存在");
					break;
				case 500:
					message.error("服务器内部错误");
					break;
				case 502:
					message.error("服务器错误");
					break;
				case 503:
					message.error("服务不可用");
					break;
				case 504:
					message.error("网关超时");
					break;
				default:
					message.error(`请求错误: ${error.response.status}`);
			}
		} else if (error.request) {
			// 请求未收到响应
			message.error("网络错误，请检查连接");
		} else {
			// 其他错误
			message.error("请求失败");
		}
		return Promise.reject(error);
	},
);

// GET请求封装
export function apiGet(url, params = {}, config = {}) {
	return axiosInstance.get(url, { ...config, params });
}

// POST请求封装
export function apiPost(url, data = {}, config = {}) {
	return axiosInstance.post(url, data, config);
}
