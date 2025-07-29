import React from "react";
import { Outlet } from "react-router";
import { Layout, theme } from "antd";

const { Content } = Layout;
const ContentBox = () => {
	const {
		token: { colorBgContainer, borderRadiusLG },
	} = theme.useToken();
	return (
		<Content
			style={{
				margin: "24px 16px",
				padding: 24,
				minHeight: 280,
				background: colorBgContainer,
				borderRadius: borderRadiusLG,
			}}
		>
			<Outlet />
		</Content>
	);
};
export default ContentBox;
