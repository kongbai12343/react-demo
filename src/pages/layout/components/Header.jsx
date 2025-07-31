import React, { useContext } from "react";
import { MenuFoldOutlined, MenuUnfoldOutlined, DownOutlined, ExclamationCircleFilled } from "@ant-design/icons";
import { Button, theme, Space, Avatar, Breadcrumb, Dropdown, Modal } from "antd";
import { useNavigate, useLocation } from "react-router";
import { observer } from "mobx-react-lite";
import globalContext from "@/utils/globalContext.js";
import { HeaderContainer, NamePermission } from "@/pages/layout/styles/header.style.js";

const Header = observer((props) => {
	const { collapsed, toggle } = props;
	const {
		token: { colorBgContainer },
	} = theme.useToken();
	const { confirm } = Modal;

	const { userInfoStore } = useContext(globalContext);
	const navigate = useNavigate();
	const { pathname } = useLocation(); // 获取当前路由
	console.log(pathname);

	const userInfo = JSON.parse(localStorage.getItem("userInfo"));

	const items = [
		{ key: "logout", label: "退出登录" },
		{ key: "changePassword", label: "修改密码" },
	];

	const breadcrumbs = [{ title: "首页" }, { title: "系统管理" }, { title: "用户管理" }];

	const logoutTips = () => {
		confirm({
			title: "提示",
			okText: "确定",
			cancelText: "取消",
			icon: <ExclamationCircleFilled />,
			content: "确定退出吗？",
			onOk() {
				userInfoStore.setUserInfo(null);
				localStorage.removeItem("userInfo");
				userInfoStore.setToken("");
				localStorage.removeItem("token");
				userInfoStore.setHasPermission("");
				localStorage.removeItem("hasPermission");
				navigate("/login");
			},
		});
	};
	const onClick = ({ key }) => {
		switch (key) {
			case "logout":
				logoutTips();
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
			<Breadcrumb items={breadcrumbs} />
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
		</HeaderContainer>
	);
});

export default Header;
