import React, { useEffect, useContext } from "react";
import { observer } from "mobx-react-lite";
import { Menu } from "antd";
import useMenuItems from "@/hooks/useMenuItems";
import globalContext from "@/utils/globalContext.js";
import { SiderWrapper, SiderTitle } from "../styles/sider.style.js";

const Sider = observer((props) => {
	const { collapsed } = props;

	const { menuStore } = useContext(globalContext);
	const [menuItems, selectedKeys, openKeys, setOpenKeys, handleMenuClick] = useMenuItems();

	useEffect(() => {
		console.log(menuItems);
	}, [menuItems]);

	// 查找菜单项的路径
	const findMenuItemPath = (key, items) => {
		for (const item of items) {
			if (item.key === key) {
				return item.path; // 找到匹配的菜单项路径
			}
			if (item.children) {
				const path = findMenuItemPath(key, item.children);
				if (path) return path; // 在子菜单中找到路径
			}
		}
		return null; // 未找到路径
	};

	const menuChange = (e) => {
		const path = findMenuItemPath(e.key, menuItems);
		handleMenuClick(e, path);
	};
	// 处理菜单展开/收起事件
	const handleOpenChange = (keys) => {
		setOpenKeys(keys);
		menuStore.setOpenKeys(keys);
	};

	return (
		<SiderWrapper trigger={null} collapsible collapsed={collapsed}>
			<SiderTitle $collapsed={collapsed}>协达ERP</SiderTitle>

			<Menu
				selectedKeys={selectedKeys}
				openKeys={openKeys}
				mode="inline"
				theme="dark"
				items={menuItems}
				onClick={menuChange}
				onOpenChange={handleOpenChange}
			/>
		</SiderWrapper>
	);
});

export default Sider;
