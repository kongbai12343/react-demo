import React, { useContext, useState } from "react";
import md5 from "js-md5";
import { useNavigate } from "react-router";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input, message } from "antd";
import { observer } from "mobx-react-lite";
import {
	CenterImg,
	FormFooterVersion,
	FormHeader,
	FormHeaderLogo,
	FormHeaderTitle,
	LeftTopImg,
	LoginContainer,
	LoginLeft,
	LoginRight,
	RightForm,
	RightTopImg,
} from "./Login.styles.js";
import api from "@/apis";
import globalContext from "@/utils/globalContext.js";

const Login = observer(() => {
	const version = import.meta.env.VITE_WEB_VERSION;

	const { userInfoStore } = useContext(globalContext);
	const [loading, setLoading] = useState(false);

	const onFinish = (values) => {
		setLoading(true);
		const { account, pwd } = values;
		const loginData = new FormData();
		loginData.append("account", account);
		loginData.append("pwd", md5(pwd.toUpperCase()));

		api
			.login(loginData)
			.then((res) => {
				// 更新状态
				userInfoStore.setUserInfo(res.data.userSession);
				userInfoStore.setToken(res.data.token);
				userInfoStore.setHasPermission(res.data.hasPermissionStr);
				// 持久化状态
				localStorage.setItem("userInfo", JSON.stringify(res.data.userSession));
				localStorage.setItem("token", res.data.token);
				const hasPermission = res.data.hasPermissionStr ? res.data.hasPermissionStr.split("|") : [];
				localStorage.setItem("hasPermission", JSON.stringify(hasPermission));
				message.success("登录成功");
				navigate("/");
				setLoading(false);
			})
			.catch(() => {
				setLoading(false);
			});
	};
	const navigate = useNavigate();

	return (
		<LoginContainer>
			<LoginLeft>
				<LeftTopImg alt="" src="/images/bg-Upper-left.png" />
				<CenterImg alt="" src="/images/img-2.5D.png" />
			</LoginLeft>
			<LoginRight>
				<RightForm>
					<FormHeader>
						<FormHeaderLogo alt="" src="/images/logo.png" />
						<FormHeaderTitle>协达ERP供应链管理平台</FormHeaderTitle>
					</FormHeader>

					<Form name="login" initialValues={{ remember: true }} style={{ maxWidth: 360 }} onFinish={onFinish}>
						<Form.Item name="account" rules={[{ required: true, message: "请输入账号" }]}>
							<Input prefix={<UserOutlined />} placeholder="账号" />
						</Form.Item>
						<Form.Item name="pwd" rules={[{ required: true, message: "请输入密码" }]}>
							<Input prefix={<LockOutlined />} type="password" placeholder="密码" />
						</Form.Item>

						<Form.Item style={{ marginTop: "60px" }}>
							<Button block loading={loading} type="primary" htmlType="submit" style={{ height: "52px" }}>
								登录
							</Button>
						</Form.Item>
					</Form>
					<FormFooterVersion>当前版本号：{version}</FormFooterVersion>
				</RightForm>

				<RightTopImg alt="" src="/images/bg-lower-right.png" />
			</LoginRight>
		</LoginContainer>
	);
});

export default Login;
