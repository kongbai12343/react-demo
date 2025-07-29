import React, { useState } from "react";
import { Layout } from "antd";
import { LayoutContainer } from "./Layout.styles.js";
import ContentBox from "./components/ContentBox.jsx";
import HeaderBox from "./components/HeaderBox.jsx";
import SiderBox from "./components/SiderBox.jsx";

const LayoutBox = () => {
	const [collapsed, setCollapsed] = useState(false);

	// 侧边栏折叠/展开
	const toggle = () => {
		setCollapsed(!collapsed);
	};

	return (
		<LayoutContainer>
			<Layout style={{ height: "100vh" }}>
				<SiderBox rigger={null} collapsible collapsed={collapsed} />
				<Layout>
					<HeaderBox collapsed={collapsed} toggle={toggle} />
					<ContentBox />
				</Layout>
			</Layout>
		</LayoutContainer>
	);
};
export default LayoutBox;
