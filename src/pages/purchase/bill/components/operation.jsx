import React, { useState, useEffect, useCallback, forwardRef, useImperativeHandle } from "react";
import { Table, Spin } from "antd";

import Loading from "@/component/loading/loading.jsx";
import api from "@/apis";

// 初始分页配置
const INITIAL_PAGINATION = {
	current: 1,
	pageSize: 10,
};

const Operation = forwardRef((props, ref) => {
	const { id } = props;

	// 操作记录数据
	const [operationData, setOperationData] = useState([]);
	// 加载状态
	const [loading, setLoading] = useState(true);

	// 分页配置
	const [pagination, setPagination] = useState({
		...INITIAL_PAGINATION,
		total: 0,
		showSizeChanger: true,
		showQuickJumper: true,
		showTotal: (total) => `共 ${total} 条`,
		pageSizeOptions: ["10", "20", "50", "100"],
	});

	// 操作记录表格列配置
	const columns = [
		{
			title: "操作时间",
			dataIndex: "operationTime",
			key: "operationTime",
			width: 150,
		},
		{
			title: "操作员工",
			dataIndex: "name",
			key: "name",
			width: 150,
		},
		{
			title: "修改类型",
			dataIndex: "type",
			key: "type",
			width: 120,
		},
		{
			title: "修改前内容",
			dataIndex: "inParam",
			key: "inParam",
			width: 300,
		},
		{
			title: "修改后内容",
			dataIndex: "outParam",
			key: "outParam",
			width: 300,
		},
	];

	// 获取操作记录数据
	const getPurchaseOperationData = useCallback(
		async (params = {}) => {
			if (!id) return;

			setLoading(true);
			try {
				const searchParams = {
					id,
					pageNum: params.pageNum || pagination.current,
					pageSize: params.pageSize || pagination.pageSize,
				};

				const result = await api.getPurchaseOperationData(searchParams);
				setOperationData(result.data.list || []);
				setPagination((prev) => ({
					...prev,
					current: searchParams.pageNum,
					pageSize: searchParams.pageSize,
					total: result.data.total || 0,
				}));
			} catch (error) {
				console.error("获取操作记录失败:", error);
				setOperationData([]);
				setPagination((prev) => ({ ...prev, total: 0 }));
			} finally {
				setLoading(false);
			}
		},
		[id, pagination.current, pagination.pageSize],
	);

	// 处理表格分页变化
	const handleTableChange = useCallback(
		(paginationConfig) => {
			const { current, pageSize } = paginationConfig;
			getPurchaseOperationData({
				pageNum: current,
				pageSize,
			});
		},
		[getPurchaseOperationData],
	);

	// 暴露给父组件的方法
	useImperativeHandle(
		ref,
		() => ({
			refresh: () => {
				// 重置分页到初始状态
				setPagination((prev) => ({
					...prev,
					...INITIAL_PAGINATION, // 重置到初始分页配置
				}));
				// 使用初始化参数获取数据
				getPurchaseOperationData({
					pageNum: INITIAL_PAGINATION.current,
					pageSize: INITIAL_PAGINATION.pageSize,
				});
			},
		}),
		[getPurchaseOperationData],
	);

	return (
		<Loading
			spinning={loading}
			tip="正在加载操作记录..."
		>
			<Table
				rowKey="id"
				columns={columns}
				dataSource={operationData}
				pagination={pagination}
				bordered
				size="middle"
				onChange={handleTableChange}
				scroll={{ x: "max-content" }}
			/>
		</Loading>
	);
});

export default Operation;
