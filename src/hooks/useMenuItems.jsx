import React, { useMemo, useCallback, useState, useEffect } from "react";
import { useNavigate } from "react-router";
import api from "@/apis";

// 自定义 Hook：将后端菜单数据转换为 Antd Menu 所需的 items 格式
const useMenuItems = () => {
	const [menuData, setMenuData] = useState([]);
	const [openKeys, setOpenKeys] = useState([]);
	const [selectedKeys, setSelectedKeys] = useState([]);

	const navigate = useNavigate();

	const getDefaultKeys = useCallback((menuList) => {
		if (!Array.isArray(menuList) || menuList.length === 0) return null;

		// 默认展开第一个菜单
		const firstMenu = menuList[0];
		if (!firstMenu.children || firstMenu.children.length === 0) {
			// 如果没有子菜单，则直接选中第一个菜单
			return {
				openKeys: [],
				selectedKey: [firstMenu.id.toString()],
			};
		}

		// 默认展开第一个子菜单
		const firstSubMenu = firstMenu.children[0];
		const openKeys = [firstMenu.id.toString()];

		// 默认选中第一个子菜单的第一项
		const selectedKey = [firstSubMenu.id.toString()];

		return {
			openKeys,
			selectedKey,
		};
	}, []);

	useEffect(() => {
		const fetchMenuList = async () => {
			try {
				const res = await api.getMenuList();
				const menuList = res.data.list || [];
				setMenuData(menuList);

				// 计算默认的 openKeys 和 selectedKeys
				const defaultKeys = getDefaultKeys(menuList);
				if (defaultKeys) {
					setOpenKeys(defaultKeys.openKeys);
					setSelectedKeys(defaultKeys.selectedKey);
				}
			} catch (error) {
				console.warn(error);
			}
		};

		void fetchMenuList(); // 显式忽略 Promise 返回值，消除警告
	}, [getDefaultKeys]);

	// 处理菜单点击事件
	const handleMenuClick = (menu, path) => {
		const { key, keyPath } = menu;
		const openKey = keyPath.slice(1);
		setOpenKeys(openKey);
		setSelectedKeys([key]);
		console.log(openKeys, selectedKeys);
		// 路由跳转
		navigate(path);
	};

	// 图标组件 - 现在作为内部函数定义，可以访问 item
	const renderIcon = (iconPath) => {
		if (!iconPath) return null;

		return <img src={`${import.meta.env.VITE_API_BASE}${iconPath}`} alt="" style={{ width: 16, height: 16, marginRight: 8 }} />;
	};

	// 递归转换函数
	const convertMenuItems = useCallback((items) => {
		return items.map((item) => {
			const menuItem = {
				key: item.id.toString(),
				label: item.menuName,
				path: item?.path,
			};

			// 处理图标
			if (item.icon) {
				menuItem.icon = renderIcon(item.icon);
			}

			// 递归处理子菜单
			if (item.children && item.children.length > 0) {
				menuItem.children = convertMenuItems(item.children);
			}

			return menuItem;
		});
	}, []);

	// 转换菜单数据
	const menuItems = useMemo(() => {
		if (!Array.isArray(menuData) || menuData.length === 0) return [];
		return convertMenuItems(menuData);
	}, [menuData, convertMenuItems]);

	return [menuItems, selectedKeys, openKeys, setOpenKeys, handleMenuClick];
};

export default useMenuItems;
