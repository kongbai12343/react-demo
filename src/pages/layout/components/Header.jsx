import React, { useContext } from "react";
import { MenuFoldOutlined, MenuUnfoldOutlined, DownOutlined } from "@ant-design/icons";
import { Button, theme, Space, Avatar, Breadcrumb, Dropdown } from "antd";
import { useNavigate, useLocation } from "react-router";
import { observer } from "mobx-react-lite";
import globalContext from "@/utils/globalContext.js";
import { HeaderContainer, SpaceBox } from "@/pages/layout/styles/header.style.js";

const Header = observer((props) => {
	const { collapsed, toggle } = props;
	const {
		token: { colorBgContainer },
	} = theme.useToken();

	const { userInfoStore } = useContext(globalContext);
	const navigate = useNavigate();
	const { pathname } = useLocation(); // 获取当前路由
	console.log(pathname);

	const userInfo = JSON.parse(localStorage.getItem("userInfo"));

	const items = [
		{ key: "logout", label: "退出登录" },
		{ key: "changePassword", label: "修改密码" },
	];

	const onClick = ({ key }) => {
		switch (key) {
			case "logout":
				userInfoStore.setUserInfo(null);
				localStorage.removeItem("userInfo");
				userInfoStore.setToken("");
				localStorage.removeItem("token");
				userInfoStore.setHasPermission("");
				localStorage.removeItem("hasPermission");
				navigate("/login");
				break;
			case "changePassword":
				// navigate("/changePassword");
				break;
		}
	};

	return (
		<HeaderContainer style={{ padding: 0, background: colorBgContainer }}>
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
			<Breadcrumb
				items={[
					{
						title: "首页",
					},
					{
						title: "系统管理",
					},
					{
						title: "用户管理",
					},
				]}
			/>
			<Dropdown menu={{ items, onClick }}>
				<a onClick={(e) => e.preventDefault()}>
					<SpaceBox>
						<Avatar src="src/assets/images/user@2x.png" />
						<Space>
							<div>{userInfo?.name}</div>
							<div>{userInfo?.postName}</div>
						</Space>
						<DownOutlined />
					</SpaceBox>
				</a>
			</Dropdown>
		</HeaderContainer>
	);
});

export default Header;
