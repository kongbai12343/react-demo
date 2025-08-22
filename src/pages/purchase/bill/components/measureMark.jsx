import React, { useState, useEffect, useCallback, useImperativeHandle } from "react";
import { Table } from "antd";

const MeasureMark = () => {
	// 加工测标信息表格列配置
	const processingColumns = [
		{
			title: "2025-03-04",
			children: [
				{
					title: "序号",
					dataIndex: "sequence",
					key: "sequence",
					width: 80,
					align: "center",
				},
				{
					title: "规格",
					dataIndex: "specification",
					key: "specification",
					width: 100,
					align: "center",
				},
			],
		},
		{
			title: "牡蛎分拣表",
			children: [
				{
					title: "分拣件数",
					dataIndex: "sortingCount",
					key: "sortingCount",
					width: 100,
					align: "center",
				},
				{
					title: "单价",
					dataIndex: "unitPrice",
					key: "unitPrice",
					width: 80,
					align: "center",
				},
				{
					title: "金额",
					dataIndex: "amount",
					key: "amount",
					width: 80,
					align: "center",
				},
				{
					title: "备注",
					dataIndex: "remark",
					key: "remark",
					width: 100,
					align: "center",
				},
			],
		},
		{
			title: "标准范围",
			children: [
				{
					title: "比例",
					dataIndex: "ratio",
					key: "ratio",
					width: 100,
					align: "center",
				},
			],
		},
	];

	// 加工测标信息数据
	const processingData = [
		{
			key: "1",
			sequence: "1",
			specification: "泥蚝",
			sortingCount: "3",
			unitPrice: "2",
			amount: "6",
			remark: "",
			ratio: "100%",
		},
		{
			key: "2",
			sequence: "",
			specification: "分拣总数",
			sortingCount: "3.0",
			unitPrice: "销售总额",
			amount: "6.00",
			remark: "3+比例",
			ratio: "0.00%",
		},
		{
			key: "3",
			sequence: "",
			specification: "采购数",
			sortingCount: "3",
			unitPrice: "采购金额",
			amount: "6",
			remark: "每斤采购价",
			ratio: "2",
		},
		{
			key: "4",
			sequence: "对接区域",
			specification: "泥蚝",
			sortingCount: "0.0",
			unitPrice: "泥比例",
			amount: "0.00%",
			remark: "利润总额",
			ratio: "0.00",
		},
		{
			key: "5",
			sequence: "",
			specification: "采购员",
			sortingCount: "Tommy",
			unitPrice: "结主",
			amount: "新增成功提示",
			remark: "每斤利润",
			ratio: "-0.80",
		},
	];
	return (
		<>
			<Table
				rowKey="key"
				columns={processingColumns}
				dataSource={processingData}
				pagination={false}
				bordered
				size="middle"
				scroll={{ x: "max-content" }}
				className="processing-table"
			/>
		</>
	);
};

export default MeasureMark;
