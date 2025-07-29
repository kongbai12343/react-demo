import React, { useMemo, useState, useEffect } from 'react';
import api from '@/apis';

// 自定义 Hook：将后端菜单数据转换为 Antd Menu 所需的 items 格式
const useMenuItems = () => {
  const [menuData, setMenuData] = useState([]);
  const [selectedKeys, setSelectedKeys] = useState([]);

  useEffect(() => {
    const fetchMenuList = async () => {
      try {
        const res = await api.getMenuList();
        setMenuData(res.data.list || []);
      } catch (error) {
        console.warn(error)
      }
    }
    
    fetchMenuList();
  }, []);

  // 处理菜单点击事件
  const handleMenuClick = ({ key }) => {
    setSelectedKeys([key]);
    console.log(`Menu item clicked: ${key}`);
    
    // 在实际应用中，这里可以添加路由跳转逻辑
    // history.push(getPathById(key));
  };

  // 图标组件 - 现在作为内部函数定义，可以访问 item
  const renderIcon = (iconPath) => {
    if (!iconPath) return null;
    
    return (
      <img 
        src={`${import.meta.env.VITE_API_BASE}${iconPath}`} 
        alt="" 
        style={{ width: 16, height: 16, marginRight: 8 }} 
      />
    );
  };

  // 递归转换函数
  const convertMenuItems = (items) => {
    return items.map(item => {
      const menuItem = {
        key: item.id.toString(),
        label: item.menuName
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
  };


  // 转换菜单数据
  const menuItems = useMemo(() => {
    if (!Array.isArray(menuData) || menuData.length === 0) return [];
    return convertMenuItems(menuData);
  }, [menuData]);
  
  return [menuItems, selectedKeys, handleMenuClick];
}

export default useMenuItems;