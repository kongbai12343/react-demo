import React, { useRef } from "react";
import { Space, Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import BaseTable from "@/component/baseTable/BaseTable.jsx";
import TopOperate from "@/component/topOperate/TopOperate.jsx";
import api from "@/apis";

const Manager = () => {
	const tableRef = useRef(null);
	const columns = [
		{
			title: "仓库编号",
			dataIndex: "id",
			key: "id",
			width: 80,
		},
		{
			title: "仓库名称",
			dataIndex: "name",
			key: "name",
		},
		{
			title: "仓库地址",
			dataIndex: "provinceName",
			key: "provinceName",
			render: (text, record) => (
				<div>
					{record?.provinceName}省{record?.cityName}市{record?.areaName}区{record?.detailAddress}
				</div>
			),
		},
		{
			title: "仓库负责人",
			dataIndex: "headName",
			key: "headName",
			width: 200,
		},
		{
			title: "可用范围",
			dataIndex: "availableRange",
			key: "availableRange",
			render: (text, record) => <div>{record?.availableRange === 1 ? "部分可用" : "全部可用"}</div>,
			width: 100,
		},
		{
			title: "仓库状态",
			dataIndex: "stateName",
			key: "stateName",
			width: 100,
		},
		{
			title: "操作",
			dataIndex: "action",
			key: "action",
			fixed: "right",
			width: 180,
			render: (text, record) => (
				<>
					<Button type="link" size="small" onClick={goToDetail(record)}>
						详情
					</Button>
					<Button type="link" size="small" onClick={goToEdit(record)}>
						编辑
					</Button>
					<Button type="link" size="small" danger onClick={handleDelete(record)}>
						删除
					</Button>
				</>
			),
		},
	];
	const fetchData = api.getRepositoryList;

	const goAdd = () => {};

	const goToDetail = (record) => async () => {
		console.log(record);
	};

	const goToEdit = (record) => async () => {
		console.log(record);
	};

	const handleDelete = (record) => async () => {
		console.log(record);
		// 执行删除相关操作
		// ... 您的删除逻辑

		// 操作完成后刷新表格（删除后可能需要重置到第一页）
		tableRef.current?.refreshToFirstPage();
	};

	return (
		<>
			<TopOperate>
				<Button type="primary" onClick={goAdd}>
					<PlusOutlined />
					新增
				</Button>
			</TopOperate>
			<BaseTable ref={tableRef} columns={columns} fetchData={fetchData} />
		</>
	);
};

export default Manager;
