import React, { useState, useEffect, useContext } from "react";
import { MenuFoldOutlined, MenuUnfoldOutlined, DownOutlined, ExclamationCircleFilled } from "@ant-design/icons";
import { Button, theme, Space, Avatar, Breadcrumb, Dropdown, Modal, Form, Input, message } from "antd";
import { useNavigate, useLocation } from "react-router";
import { observer } from "mobx-react-lite";
import md5 from "js-md5";

import globalContext from "@/utils/globalContext.js";
import { HeaderContainer, NamePermission } from "@/pages/layout/styles/header.style.js";
import api from "@/apis";

const Header = observer((props) => {
	const { collapsed, toggle } = props;
	const {
		token: { colorBgContainer },
	} = theme.useToken();
	const [form] = Form.useForm();
	const { confirm } = Modal;

	const userInfo = JSON.parse(localStorage.getItem("userInfo"));
	const items = [
		{ key: "logout", label: "退出登录" },
		{ key: "changePassword", label: "修改密码" },
	];

	const breadcrumbs = [{ title: "首页" }, { title: "系统管理" }, { title: "用户管理" }];

	const [show, setShow] = useState(false);
	const [account, _] = useState(() => {
		return userInfo.account;
	});
	const [pwd, setPwd] = useState("");
	const [cofPwd, setCofPwd] = useState("");
	const [confirmLoading, setConfirmLoading] = useState(false);
	const { userInfoStore, menuStore } = useContext(globalContext);
	const navigate = useNavigate();
	const { pathname } = useLocation(); // 获取当前路由

	useEffect(() => {
		const menuData = JSON.parse(localStorage.getItem("menuData"));
		const openKey = Number(JSON.parse(localStorage.getItem("menuOpenKeys"))[0]);
		const selectedKey = Number(JSON.parse(localStorage.getItem("menuSelectedKeys"))[0]);
		console.log(findBreadcrumb(menuData, openKey, selectedKey));
	}, [pathname]);

	const findBreadcrumb = (menuData, openKey, selectedKey) => {
		return menuData.map((item) => {
			if (item.id === openKey) {
				return {
					title: item.menuName,
				};
			}
			if (item.children) {
				// const findItem = findBreadcrumb(item.children, null, selectedKey);
				// if (findItem) {
				// 	return {
				// 		title: item.menuName,
				// 	};
				// }
				return findBreadcrumb(item.children, null, selectedKey);
			}
		});
	};
	const logout = () => {
		// 清理用户信息
		userInfoStore.setUserInfo(null);
		localStorage.removeItem("userInfo");
		userInfoStore.setToken("");
		localStorage.removeItem("token");
		userInfoStore.setHasPermission("");
		localStorage.removeItem("hasPermission");
		// 清理菜单数据
		menuStore.menuData = [];
		menuStore.openKeys = [];
		menuStore.selectedKeys = [];
		localStorage.removeItem("menuData");
		localStorage.removeItem("menuOpenKeys");
		localStorage.removeItem("menuSelectedKeys");
		navigate("/login");
	};
	const logoutTips = () => {
		confirm({
			title: "提示",
			okText: "确定",
			cancelText: "取消",
			icon: <ExclamationCircleFilled />,
			content: "确定退出吗？",
			onOk() {
				logout();
			},
		});
	};
	const onClick = ({ key }) => {
		switch (key) {
			case "logout":
				logoutTips();
				break;
			case "changePassword":
				setShow(true);
				break;
		}
	};
	const ok = () => {
		setConfirmLoading(true);
		form
			.validateFields()
			.then((values) => {
				// 验证通过后的处理逻辑
				if (values.pwd !== values.cofPwd) {
					// 可以手动添加密码一致性检查
					form.setFields([
						{
							name: "cofPwd",
							errors: ["两次输入的密码不一致"],
						},
					]);
					setConfirmLoading(false);
					return;
				}
				// 处理密码修改逻辑
				const formData = new FormData();
				formData.append("account", values.account);
				formData.append("pwd", md5(values.pwd.toUpperCase()));
				api.updatePassword(formData).then(() => {
					message.success("修改密码成功");
					// 退出登录
					logout();
				});
				cancel();
				setConfirmLoading(false);
			})
			.catch((errorInfo) => {
				setConfirmLoading(false);
				// 验证失败的处理
				console.log("验证失败:", errorInfo);
			});
	};
	const cancel = () => {
		setPwd("");
		setCofPwd("");
		setShow(false);
		// 重置表单
		form.resetFields();
	};

	return (
		<HeaderContainer style={{ padding: 0, background: colorBgContainer }}>
			<div style={{ display: "flex", alignItems: "center" }}>
				<Button
					type="text"
					icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
					onClick={() => toggle()}
					style={{
						fontSize: "16px",
						width: 64,
						height: 64,
					}}
				/>
				<Breadcrumb items={breadcrumbs} />
			</div>
			<Dropdown menu={{ items, onClick }}>
				<a onClick={(e) => e.preventDefault()}>
					<Space>
						<Avatar src="src/assets/images/user@2x.png" />
						<NamePermission>
							<span>{userInfo?.name}</span>
							<span style={{ opacity: 0.6 }}>{userInfo?.postName}</span>
						</NamePermission>
						<DownOutlined />
					</Space>
				</a>
			</Dropdown>
			{/*修改密码*/}
			<Modal
				title="修改密码"
				width={450}
				destroyOnHidden={true}
				closable={false}
				keyboard={false}
				maskClosable={false}
				open={show}
				confirmLoading={confirmLoading}
				cancelText="取消"
				okText="确认"
				onOk={ok}
				onCancel={cancel}
			>
				<Form
					form={form}
					initialValues={{ account: account, pwd: pwd, cofPwd: cofPwd }}
					labelCol={{ span: 5 }}
					wrapperCol={{ span: 18 }}
					layout="horizontal"
					style={{ maxWidth: 400 }}
				>
					<Form.Item label="账号" name="account" rules={[{ required: true, message: "请输入账号" }]}>
						<Input placeholder="请输入账号" value={account} disabled />
					</Form.Item>
					<Form.Item
						label="密码"
						name="pwd"
						rules={[
							{
								required: true,
								message: "请输入密码",
							},
							{
								pattern: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/,
								message: "密码需包含数字和字母，并至少6位",
							},
						]}
					>
						<Input type="password" placeholder="请输入密码" value={pwd} />
					</Form.Item>
					<Form.Item
						label="确认密码"
						name="cofPwd"
						rules={[
							{ required: true, message: "请再次输入密码" },
							{
								pattern: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/,
								message: "密码需包含数字和字母，并至少6位",
							},
						]}
					>
						<Input type="password" placeholder="请再次输入密码" value={cofPwd} />
					</Form.Item>
				</Form>
			</Modal>
		</HeaderContainer>
	);
});

export default Header;
