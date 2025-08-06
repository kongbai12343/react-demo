/*
 * @Author: kb
 * @Date: 2025-08-04
 * @description: 一个具备搜索的表格组件
 * @Props:
 *   - columns: 表格列配置
 *   - searchFields: 搜索字段配置
 *   - advancedFilters: 高级搜索标签配置
 *   - fetchData: 异步获取数据的函数
 *   - isAdvancedSearchOpen: 是否展开高级搜索
 *   - onAdvancedSearchToggle: 高级搜索展开/收起回调
 */

import React, { useState, useEffect, useCallback, forwardRef, useImperativeHandle } from "react";
import { Table } from "antd";
import SearchForm from "./SearchForm.jsx";
import "./BaseTable.scss";

const BaseTable = forwardRef((props, ref) => {
	const {
		columns = [],
		searchFields = [],
		advancedFilters = [],
		fetchData,
		rowKey = "id",
		isAdvancedSearchOpen = false,
		onAdvancedSearchToggle,
		tableProps,
	} = props;

	// 状态管理
	const [loading, setLoading] = useState(false);
	const [dataSource, setDataSource] = useState([]);
	const [pagination, setPagination] = useState({
		current: 1,
		pageSize: 10,
		total: 0,
		showSizeChanger: true,
		showQuickJumper: true,
		showTotal: (total) => `共 ${total} 条`,
		pageSizeOptions: ["10", "20", "50", "100"],
	});

	// 搜索参数
	const [searchParams, setSearchParams] = useState({});
	const [selectedAdvancedFilters, setSelectedAdvancedFilters] = useState([]);

	// 获取表格数据
	const getTableData = useCallback(
		async (params = {}) => {
			if (!fetchData) return;

			setLoading(true);
			try {
				const requestParams = {
					pageNum: pagination.current,
					pageSize: pagination.pageSize,
					...searchParams,
					...selectedAdvancedFilters.reduce((acc, filter) => {
						acc[filter.key] = filter.value;
						return acc;
					}, {}),
					...params,
				};

				const result = await fetchData(requestParams);

				if (result && result.data) {
					setDataSource(result.data.list || result.data || []);
					setPagination((prev) => ({
						...prev,
						total: result.data.total || result.total || 0,
						current: result.data.pageNum || result.pageNum || params.pageNum || prev.current,
					}));
				}
			} catch (error) {
				console.error("获取表格数据失败:", error);
				setDataSource([]);
			} finally {
				setLoading(false);
			}
		},
		[fetchData, searchParams, selectedAdvancedFilters, pagination.current, pagination.pageSize],
	);

	// 搜索处理
	const handleSearch = (values) => {
		setSearchParams(values);
		setPagination((prev) => ({ ...prev, current: 1 }));
	};

	// 重置处理
	const handleReset = () => {
		setSearchParams({});
		setSelectedAdvancedFilters([]);
		setPagination((prev) => ({ ...prev, current: 1 }));
	};

	// 高级搜索标签选择处理
	const handleAdvancedFilterChange = useCallback((filters) => {
		setSelectedAdvancedFilters(filters);
		setPagination((prev) => ({ ...prev, current: 1 }));
	}, []);

	// 分页变化处理
	const handleTableChange = useCallback(
		(paginationConfig) => {
			const newPagination = {
				...pagination,
				current: paginationConfig.current,
				pageSize: paginationConfig.pageSize,
			};

			// 如果pageSize改变，重置到第一页
			if (paginationConfig.pageSize !== pagination.pageSize) {
				newPagination.current = 1;
			}

			setPagination(newPagination);
		},
		[pagination],
	);

	// 分页变化时重新获取数据
	useEffect(() => {
		getTableData({
			pageNum: pagination.current,
			pageSize: pagination.pageSize,
		});
	}, [searchParams, selectedAdvancedFilters, pagination.current, pagination.pageSize]);

	// 暴露给父组件的方法
	useImperativeHandle(
		ref,
		() => ({
			// 刷新当前页数据
			refresh: () => {
				getTableData({
					pageNum: pagination.current,
					pageSize: pagination.pageSize,
				});
			},
			// 重置到第一页并刷新
			refreshToFirstPage: () => {
				setPagination((prev) => ({ ...prev, current: 1 }));
				getTableData({
					pageNum: 1,
					pageSize: pagination.pageSize,
				});
			},
			// 获取当前搜索参数
			getCurrentParams: () => ({
				pageNum: pagination.current,
				pageSize: pagination.pageSize,
				...searchParams,
				...selectedAdvancedFilters.reduce((acc, filter) => {
					acc[filter.key] = filter.value;
					return acc;
				}, {}),
			}),
		}),
		[pagination.current, pagination.pageSize, searchParams, selectedAdvancedFilters],
	);

	return (
		<div className="base-table-container">
			{/* 搜索表单区域 */}
			{searchFields.length > 0 && (
				<SearchForm
					searchFields={searchFields}
					onSearch={handleSearch}
					onReset={handleReset}
					isAdvancedSearchOpen={isAdvancedSearchOpen}
					onAdvancedSearchToggle={onAdvancedSearchToggle}
					showAdvancedToggle={advancedFilters.length > 0}
					filters={advancedFilters}
					selectedFilters={selectedAdvancedFilters}
					onChange={handleAdvancedFilterChange}
				/>
			)}

			{/* 表格区域 */}
			<div className="base-table-content">
				<Table
					columns={columns}
					dataSource={dataSource}
					loading={loading}
					bordered={true}
					rowKey={rowKey}
					size="large"
					scroll={{ scrollToFirstRowOnChange: true, x: "max-content" }}
					pagination={pagination}
					onChange={handleTableChange}
					{...tableProps}
				/>
			</div>
		</div>
	);
});

export default BaseTable;
