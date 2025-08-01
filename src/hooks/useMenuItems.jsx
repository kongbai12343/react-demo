import React, { useMemo, useCallback, useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router";
import globalContext from "@/utils/globalContext.js";
import api from "@/apis";

// 自定义 Hook：将后端菜单数据转换为 Antd Menu 所需的 items 格式
const useMenuItems = () => {
	const [menuData, setMenuData] = useState([]);
	const [openKeys, setOpenKeys] = useState([]);
	const [selectedKeys, setSelectedKeys] = useState([]);

	const navigate = useNavigate();
	const { menuStore } = useContext(globalContext);

	// 图标组件 - 现在作为内部函数定义，可以访问 item
	const renderIcon = (iconPath) => {
		if (!iconPath) return null;

		return <img src={`${import.meta.env.VITE_API_BASE}${iconPath}`} alt="" style={{ width: 16, height: 16, marginRight: 8 }} />;
	};

	// 获取默认的 openKeys 和 selectedKeys
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

	// 递归查找菜单项路径
	const findMenuItemPath = useCallback((key, items) => {
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
	}, []);

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

	useEffect(() => {
		const fetchMenuList = async () => {
			try {
				const res = await api.getMenuList();
				const menuList = res.data.list || [];
				setMenuData(menuList);
				menuStore.setMenuData(menuList);

				// 如果menuStore中存在已经选择的菜单项，则使用这些菜单项
				const savedOpenKeys = localStorage.getItem("menuOpenKeys");
				const savedSelectedKeys = localStorage.getItem("menuSelectedKeys");
				if (savedOpenKeys && savedSelectedKeys) {
					setOpenKeys(JSON.parse(savedOpenKeys));
					setSelectedKeys(JSON.parse(savedSelectedKeys));

					// 更新menuStore中的数据
					menuStore.setOpenKeys(JSON.parse(savedOpenKeys));
					menuStore.setSelectedKeys(JSON.parse(savedSelectedKeys));
				} else {
					// 计算默认的 openKeys 和 selectedKeys
					const defaultKeys = getDefaultKeys(menuList);
					if (defaultKeys) {
						setOpenKeys(defaultKeys.openKeys);
						menuStore.setOpenKeys(defaultKeys.openKeys);
						setSelectedKeys(defaultKeys.selectedKey);
						menuStore.setSelectedKeys(defaultKeys.selectedKey);
					}
				}
			} catch (error) {
				console.warn(error);
			}
		};

		void fetchMenuList(); // 显式忽略 Promise 返回值，消除警告
	}, [getDefaultKeys, menuStore]);

	useEffect(() => {
		if (menuItems.length > 0 && selectedKeys.length > 0) {
			const path = findMenuItemPath(selectedKeys[0], menuItems);
			if (path) {
				navigate(path);
			}
		}
	}, [menuItems, selectedKeys, findMenuItemPath, navigate]);

	// 处理菜单点击事件
	const handleMenuClick = (menu, path) => {
		const { key, keyPath } = menu;
		const openKey = keyPath.slice(1);
		setOpenKeys(openKey);
		menuStore.setOpenKeys(openKey);
		setSelectedKeys([key]);
		menuStore.setSelectedKeys([key]);
		// 路由跳转
		if (path) {
			navigate(path);
		}
	};

	return [menuItems, selectedKeys, openKeys, setOpenKeys, handleMenuClick];
};

export default useMenuItems;
