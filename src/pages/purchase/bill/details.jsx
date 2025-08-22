import React, { useState, useRef } from "react";
import { Button, Space, Tabs } from "antd";
import { useNavigate, useSearchParams } from "react-router";

import BasicInfo from "./components/basicInfo.jsx";
import PutInInfo from "./components/putInInfo.jsx";
import Operation from "./components/operation.jsx";
import MeasureMark from "./components/measureMark.jsx";

const userPermissions = localStorage.getItem("hasPermission");

const BillDetail = () => {
	const [searchParams] = useSearchParams();
	const navigate = useNavigate();
	const [activeTab, setActiveTab] = useState("basic");

	// 从查询参数中获取数据
	const id = searchParams.get("id");
	const isMachining = searchParams.get("isMachining");
	const putStatus = searchParams.get("putStatus");

	// 操作记录组件的引用
	const operationRef = useRef(null);

	const handleGoBack = () => {
		navigate(-1);
	};

	const activeTabChange = (tab) => {
		setActiveTab(tab);
		switch (tab) {
			case "basic":
				break;
			case "putInInfo":
				break;
			case "operation":
				setTimeout(() => {
					operationRef.current?.refresh();
				}, 0);
				break;
			case "measure-mark":
				break;
		}
	};

	// Tabs 配置
	const tabItems = [
		{
			key: "basic",
			label: "基础资料",
			children: <BasicInfo id={id} />,
		},
		{
			key: "putInInfo",
			label: "采购入库信息",
			children: <PutInInfo />,
			permissionkey: "per-purchase-put-info",
		},
		{
			key: "operation",
			label: "操作记录",
			children: <Operation ref={operationRef} id={id} />,
			permissionkey: "per-purchase-operate-log",
		},
		{
			key: "measure-mark",
			label: "加工测标信息",
			children: <MeasureMark />,
			permissionkey: "per-purchase-measure-mark",
		},
	];

	const filteredTabItems = tabItems.filter((item) => {
		if (item.permissionkey) {
			if (item.key === "measure-mark") {
				return (
					userPermissions.includes(item.permissionkey) &&
					Number(isMachining) === 1 &&
					[1, 2, 3].includes(Number(putStatus))
				);
			} else {
				return userPermissions.includes(item.permissionkey);
			}
		}
		return true;
	});

	return (
		<div>
			{/* Tabs 页签 - 添加底部边距避免被按钮遮挡 */}
			<div className="pb-10">
				<Tabs activeKey={activeTab} onChange={activeTabChange} items={filteredTabItems} />
			</div>

			{/* 固定在底部的操作按钮 */}
			<div
				className="fixed bottom-0 bg-white border-t border-gray-200 px-6 py-4 text-center z-[1000] shadow-[0_-2px_8px_rgba(0,0,0,0.1)] transition-all duration-200 ease-in-out"
				style={{ left: "var(--sider-width)", right: 0 }}
			>
				<Space>
					<Button onClick={handleGoBack}>返回</Button>
				</Space>
			</div>
		</div>
	);
};

export default BillDetail;
