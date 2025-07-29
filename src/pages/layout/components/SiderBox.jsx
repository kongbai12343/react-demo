import React from "react";
import { Menu } from "antd";
import useMenuItems from "@/hooks/useMenuItems";

import { SiderBoxWrapper } from "../styles/siderBox.style";

const SiderBox = (props) => {
	const { collapsed } = props;

	const [menuItems] = useMenuItems();

	return (
		<SiderBoxWrapper trigger={null} collapsible collapsed={collapsed}>
			<div className="">协达ERP</div>
			
			<Menu
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['sub1']}
        mode="inline"
        theme="dark"
        items={menuItems}
      />
		</SiderBoxWrapper>
	);
};
export default SiderBox;
