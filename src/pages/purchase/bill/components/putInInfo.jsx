import React, { useState, useEffect, useCallback, useImperativeHandle } from "react";
import { Card, Descriptions, Space, Table } from "antd";

const PutInInfo = (props) => {
	// 入库物料表格列配置
	const warehouseColumns = [
		{
			title: "物料编码",
			dataIndex: "materialCode",
			key: "materialCode",
			width: 100,
		},
		{
			title: "物料名称",
			dataIndex: "materialName",
			key: "materialName",
			width: 120,
		},
		{
			title: "分类",
			dataIndex: "category",
			key: "category",
			width: 80,
		},
		{
			title: "款本号",
			dataIndex: "styleNumber",
			key: "styleNumber",
			width: 120,
		},
		{
			title: "物料规格",
			dataIndex: "specification",
			key: "specification",
			width: 120,
		},
		{
			title: "入库数量",
			dataIndex: "warehouseQuantity",
			key: "warehouseQuantity",
			width: 100,
		},
		{
			title: "采购单价",
			dataIndex: "purchasePrice",
			key: "purchasePrice",
			width: 100,
		},
		{
			title: "单位",
			dataIndex: "unit",
			key: "unit",
			width: 80,
		},
	];

	// 入库物料数据
	const warehouseData = [
		{
			id: 1,
			materialCode: "392",
			materialName: "矿泉水",
			category: "生鲜",
			styleNumber: "既见未来，为何不拜！",
			specification: "小农夫山泉",
			warehouseQuantity: 12,
			purchasePrice: "0.00",
			unit: "斤",
		},
	];
	return (
		<>
			<Space direction="vertical" size="large" style={{ width: "100%" }}>
				{/* 入库基本信息 */}
				<Card title="入库基本信息" className="shadow-sm">
					<Descriptions column={2} styles={{ label: { width: "120px" } }}>
						<Descriptions.Item label="入库仓库：">小麦测试仓库</Descriptions.Item>
						<Descriptions.Item label="入库时间：">2024-09-09</Descriptions.Item>
						<Descriptions.Item label="入库人：">Tommy</Descriptions.Item>
						<Descriptions.Item label="备注信息：">1</Descriptions.Item>
					</Descriptions>
				</Card>

				{/* 入库物料 */}
				<Card className="shadow-sm">
					<div style={{ marginBottom: "16px" }}>
						<span style={{ fontWeight: "bold" }}>入库物料</span>
						<span style={{ marginLeft: "16px", color: "#666" }}>入库状态：</span>
						<span style={{ color: "#1890ff" }}>取消</span>
					</div>

					<Table
						rowKey="id"
						columns={warehouseColumns}
						dataSource={warehouseData}
						pagination={false}
						bordered
						size="middle"
						scroll={{ x: "max-content" }}
					/>
				</Card>

				{/* 入库成本 */}
				<Card title="入库成本" className="shadow-sm">
					<div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
						<div>
							<span style={{ marginRight: "24px" }}>成本名称：运费</span>
							<span>成本价：¥1.00</span>
						</div>
						<div style={{ display: "flex", gap: "24px" }}>
							<span>采购成本+入库成本：¥1.00</span>
							<span>本次采购平均入库成本：¥0.08</span>
						</div>
					</div>
				</Card>
			</Space>
		</>
	);
};

export default PutInInfo;
