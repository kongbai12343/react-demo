import React, { useState, useEffect, useCallback, useMemo, forwardRef, useRef, useImperativeHandle } from "react";
import { Table } from "antd";
import SearchForm from "./SearchForm.jsx";
import "./BaseTable.scss";

const BaseTable = forwardRef((props, ref) => {
	const { columns = [], fetchData, rowKey = "id", rowSelection, isSearchOpen, onSearchToggle, onResetSearch } = props;

	const searchParamsRef = useRef(props.searchParams);

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

	// 获取子组件
	const childrenArray = useMemo(() => {
		return React.Children.toArray(props.children);
	}, [props.children]);

	const searchForm = useMemo(() => {
		return childrenArray.find((child) => child?.props?.slot === "searchForm");
	}, [childrenArray]);

	const highSearch = useMemo(() => {
		return childrenArray.find((child) => child?.props?.slot === "highSearch");
	}, [childrenArray]);

	// 获取表格数据
	const getTableData = useCallback(
		async (params) => {
			if (!fetchData) return;

			setLoading(true);
			try {
				const result = await fetchData({
					...params,
				});

				if (result && result.data) {
					setDataSource(result.data.list || result.data || []);
					setPagination((prev) => ({
						...prev,
						total: result.data.total || 0,
					}));
				}
			} catch (error) {
				console.error("获取表格数据失败:", error);
				setDataSource([]);
			} finally {
				setLoading(false);
			}
		},
		[fetchData],
	);

	// 搜索处理
	const handleSearch = () => {
		setPagination((prev) => {
			const { current, pageSize } = prev;
			// 仅重置 current，保留 pageSize
			const newPagination = {
				...prev,
				current: current,
				pageSize: pageSize,
			};
			// 立即调用 getTableData
			getTableData({
				pageNum: current,
				pageSize: pageSize,
				...searchParamsRef.current,
			});
			return newPagination;
		});
	};

	// 重置处理
	const handleReset = () => {
		onResetSearch();
		
		setPagination((prev) => {
			const currentSize = prev.pageSize;
			// 仅重置 current，保留 pageSize
			const newPagination = {
				...prev,
				current: 1,
				pageSize: currentSize,
			};
			// 立即调用 getTableData
			getTableData({
				pageNum: 1,
				pageSize: currentSize,
			});
			return newPagination;
		});
	};

	// 分页变化处理
	const handleTableChange = useCallback(
		(paginationConfig) => {
			const newPagination = { ...pagination };
			const { current, pageSize } = paginationConfig;
			// 页码变化
			if (current !== pagination.current) {
				newPagination.current = current;
			}

			// 页大小变化：重置到第一页
			if (pageSize !== pagination.pageSize) {
				newPagination.current = 1;
				newPagination.pageSize = pageSize;
			}
			setPagination(newPagination);
		},
		[pagination],
	);

	// 当 props.searchParams 变化时更新 ref
	useEffect(() => {
		searchParamsRef.current = props.searchParams;
	}, [props.searchParams]);

	// 分页变化时重新获取数据
	useEffect(() => {
		getTableData({
			pageNum: pagination.current,
			pageSize: pagination.pageSize,
			...searchParamsRef.current,
		});
	}, [pagination.current, pagination.pageSize]);

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
		}),
		[pagination.current, pagination.pageSize, props.searchParams],
	);

	return (
		<div className="base-table-container">
			{/* 搜索表单区域 */}
			<SearchForm
				onSearch={handleSearch}
				onReset={handleReset}
				isSearchOpen={isSearchOpen}
				onSearchToggle={onSearchToggle}
				searchForm={searchForm}
				highSearch={highSearch}
			/>

			{/* 表格区域 */}
			<div className="base-table-content">
				<Table
					rowKey={rowKey}
					rowSelection={rowSelection}
					columns={columns}
					dataSource={dataSource}
					loading={loading}
					bordered={true}
					size="large"
					scroll={{ scrollToFirstRowOnChange: true, x: "max-content" }}
					pagination={pagination}
					onChange={handleTableChange}
				/>
			</div>
		</div>
	);
});

export default BaseTable;
