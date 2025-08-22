import React, { useState } from "react";
import { Layout as AntdLayout } from "antd";
import { LayoutContainer } from "./Layout.styles.js";
import Content from "./components/Content.jsx";
import Header from "./components/Header.jsx";
import Sider from "./components/Sider.jsx";

const Layout = () => {
	const [collapsed, setCollapsed] = useState(false);

	// 侧边栏折叠/展开
	const toggle = () => {
		setCollapsed(!collapsed);
	};

	return (
		<LayoutContainer className={collapsed ? "sider-collapsed" : "sider-expanded"}>
			<AntdLayout style={{ height: "100vh" }}>
				<Sider rigger={null} collapsible collapsed={collapsed} />
				<AntdLayout>
					<Header collapsed={collapsed} toggle={toggle} />
					<Content />
				</AntdLayout>
			</AntdLayout>
		</LayoutContainer>
	);
};
export default Layout;
