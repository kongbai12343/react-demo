import React, { useState } from "react";
import { Button, Space, Dropdown } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import BaseTable from "@/component/BaseTable/BaseTable.jsx";
import TopOperate from "@/component/topOperate/TopOperate.jsx";
import api from "@/apis";

const Bill = () => {
	const [isAdvancedSearchOpen, setIsAdvancedSearchOpen] = useState(false);

	// 表格列配置
	const items = [
		{
			label: (
				<Button type="link" size="small">
					编辑
				</Button>
			),
			key: "edit",
		},
		{
			label: (
				<Button type="link" size="small">
					入库验收
				</Button>
			),
			key: "accept",
		},
		{
			label: (
				<Button type="link" size="small">
					加工测标
				</Button>
			),
			key: "measure-mark",
		},
		{
			label: (
				<Button type="link" size="small">
					物料入库
				</Button>
			),
			key: "storage",
		},
		{
			label: (
				<Button type="link" size="small">
					采购费用
				</Button>
			),
			key: "purchase-costs",
		},
		{
			label: (
				<Button type="link" size="small">
					撤销入库
				</Button>
			),
			key: "revokeStorage",
		},
		{
			label: (
				<Button type="link" size="small">
					取消验收
				</Button>
			),
			key: "cancel-accept",
		},
		{
			label: (
				<Button type="link" size="small">
					取消测标
				</Button>
			),
			key: "cancel-measure-mark",
		},
		{
			label: (
				<Button type="link" size="small">
					支付
				</Button>
			),
			key: "pay",
		},
		{
			label: (
				<Button type="link" size="small">
					关单
				</Button>
			),
			key: "close-order",
		},
		{
			label: (
				<Button type="link" size="small" danger>
					删除
				</Button>
			),
			key: "delete",
		},
	];
	const columns = [
		{
			title: "采购单编号",
			dataIndex: "orderNum",
			key: "orderNum",
			width: 100,
		},
		{
			title: "供应商",
			dataIndex: "supplierName",
			key: "supplierName",
			width: 100,
		},
		{
			title: "供应商电话",
			dataIndex: "supplierPhone",
			key: "supplierPhone",
			width: 120,
		},
		{
			title: "采购类型",
			dataIndex: "purchaseTypeName",
			key: "purchaseTypeName",
			width: 100,
		},
		{
			title: "需求来源",
			dataIndex: "sourceOfName",
			key: "sourceOfName",
			width: 120,
		},
		{
			title: "采购数量",
			dataIndex: "num",
			key: "num",
			width: 100,
			render: (num, record) => {
				return (
					<Button type="link" onClick={goToDetail(record)}>
						{num}
					</Button>
				);
			},
		},
		{
			title: "付款方式",
			dataIndex: "payWayName",
			key: "payWayName",
			width: 100,
		},
		{
			title: "入库状态",
			dataIndex: "putStatusName",
			key: "putStatusName",
			width: 100,
		},
		{
			title: "支付状态",
			dataIndex: "payStatusName",
			key: "payStatusName",
			width: 100,
		},
		{
			title: "采购人",
			dataIndex: "empName",
			key: "empName",
			width: 120,
		},
		{
			title: "采购时间",
			dataIndex: "purchaseTime",
			key: "purchaseTime",
			width: 160,
		},
		{
			title: "交付日期",
			dataIndex: "arrivalTime",
			key: "arrivalTime",
			width: 160,
		},
		{
			title: "操作",
			dataIndex: "action",
			key: "action",
			width: 100,
			fixed: "right",
			render: (_, record) => {
				return (
					<Space>
						<Button size="small" type="link" onClick={goToDetail(record)}>
							详情
						</Button>

						<Dropdown menu={{ items }} trigger={["click"]}>
							<a onClick={(e) => e.preventDefault()}>
								<Space>
									<Button size="small" type="link">
										更多
									</Button>
								</Space>
							</a>
						</Dropdown>
					</Space>
				);
			},
		},
	];
	const fetchData = api.getPurchaseBillList;
	const tableProps = {
		rowKey: "id", // 表格行key, 每一行的唯一标识
		rowSelection: {
			columnWidth: 80,
			onChange: (selectedRowKeys, selectedRows) => {
				console.log(`selectedRowKeys: ${selectedRowKeys}`, "selectedRows: ", selectedRows);
			},
			getCheckboxProps: (record) => ({
				disabled: record.payStatus === 1,
			}),
		},
	};

	// 搜索字段配置
	const searchFields = [
		{
			name: "name",
			label: "姓名",
			type: "input",
			placeholder: "请输入姓名",
		},
		{
			name: "email",
			label: "邮箱",
			type: "input",
			placeholder: "请输入邮箱",
		},
		{
			name: "status",
			label: "状态",
			type: "select",
			options: [
				{ label: "活跃", value: "active" },
				{ label: "非活跃", value: "inactive" },
				{ label: "待审核", value: "pending" },
			],
		},
		{
			name: "department",
			label: "部门",
			type: "select",
			options: [
				{ label: "技术部", value: "技术部" },
				{ label: "市场部", value: "市场部" },
				{ label: "人事部", value: "人事部" },
				{ label: "财务部", value: "财务部" },
			],
		},
		{
			name: "createTimeRange",
			label: "创建时间",
			type: "dateRange",
		},
		{
			name: "age",
			label: "年龄",
			type: "input",
			placeholder: "请输入年龄",
		},
	];

	// 高级搜索配置
	const advancedFilters = [
		{
			key: "categories",
			label: "Categories",
			multiple: true,
			options: [
				{ label: "Movies", value: "movies" },
				{ label: "Books", value: "books" },
				{ label: "Music", value: "music" },
				{ label: "Sports", value: "sports" },
			],
		},
		{
			key: "tags",
			label: "Tags",
			multiple: true,
			options: [
				{ label: "Popular", value: "popular" },
				{ label: "New", value: "new" },
				{ label: "Featured", value: "featured" },
				{ label: "Trending", value: "trending" },
			],
		},
		{
			key: "priority",
			label: "Priority",
			multiple: false, // 单选
			options: [
				{ label: "High", value: "high" },
				{ label: "Medium", value: "medium" },
				{ label: "Low", value: "low" },
			],
		},
	];

	const handleAdvancedSearchToggle = () => {
		setIsAdvancedSearchOpen(!isAdvancedSearchOpen);
	};

	const goToDetail = (record) => () => {
		console.log(record);
	};

	return (
		<>
			<TopOperate>
				<Button type="primary" onClick={goToDetail}>
					<PlusOutlined />
					新增
				</Button>
				<Button>导出采购单</Button>
				<Button>一键支付</Button>
			</TopOperate>
			<BaseTable
				columns={columns}
				fetchData={fetchData}
				searchFields={searchFields}
				advancedFilters={advancedFilters}
				isAdvancedSearchOpen={isAdvancedSearchOpen}
				onAdvancedSearchToggle={handleAdvancedSearchToggle}
				tableProps={tableProps}
			/>
		</>
	);
};

export default Bill;
