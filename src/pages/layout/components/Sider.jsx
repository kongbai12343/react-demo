import React from "react";
import { Menu } from "antd";
import useMenuItems from "@/hooks/useMenuItems";

import { SiderWrapper, SiderTitle } from "../styles/sider.style.js";

const Sider = (props) => {
	const { collapsed } = props;

	const [menuItems] = useMenuItems();

	return (
		<SiderWrapper trigger={null} collapsible collapsed={collapsed}>
			<SiderTitle $collapsed={collapsed}>协达ERP</SiderTitle>
			
			<Menu
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['sub1']}
        mode="inline"
        theme="dark"
        items={menuItems}
      />
		</SiderWrapper>
	);
};
export default Sider;
