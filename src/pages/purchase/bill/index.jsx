import React, { memo, useState } from "react";
import { Button, Space, Dropdown, Row, Col, Input, Select, Tag, Flex, DatePicker } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router";
import BaseTable from "@/component/BaseTable/BaseTable.jsx";
import TopOperate from "@/component/topOperate/TopOperate.jsx";
import api from "@/apis";

// 搜索项配置
const supplierOptions = [
	{
		value: 1,
		label: "供应商名称",
	},
	{
		value: 2,
		label: "供应商电话",
	},
	{
		value: 3,
		label: "采购单编号",
	},
];
const purchasePersonOptions = [
	{
		value: 1,
		label: "采购人姓名",
	},
	{
		value: 2,
		label: "采购人电话",
	},
];
const purchaseTimeOptions = [
	{
		value: 1,
		label: "采购时间",
	},
];
const purchaseList = [
	{ value: null, label: "全部" },
	{ value: 1, label: "普通采购" },
	{ value: 2, label: "外部调货" },
];
const sourceList = [
	{ value: null, label: "全部" },
	{ value: 1, label: "销售需求" },
	{ value: 2, label: "补货" },
	{ value: 3, label: "库存预警" },
	{ value: 4, label: "食材采购" },
];
const putList = [
	{ value: null, label: "全部" },
	{ value: 0, label: "待验收" },
	{ value: 1, label: "待入库" },
	{ value: 2, label: "已入库" },
	{ value: 3, label: "已关单" },
	{ value: 4, label: "待加工" },
];
const payList = [
	{ value: null, label: "全部" },
	{ value: 0, label: "未支付" },
	{ value: 1, label: "已支付" },
];
// 权限集合
const userPermissions = localStorage.getItem("hasPermission");

const { RangePicker } = DatePicker;

const Bill = memo(() => {
	// 表格列配置
	const items = [
		{
			label: (
				<Button type="link" size="small">
					编辑
				</Button>
			),
			key: "edit",
			permissionkey: "per-purchase-edit",
		},
		{
			label: (
				<Button type="link" size="small">
					入库验收
				</Button>
			),
			key: "accept",
			permissionkey: "per-purchase-accept",
		},
		{
			label: (
				<Button type="link" size="small">
					加工测标
				</Button>
			),
			key: "measure-mark",
			permissionkey: "per-purchase-measure-mark",
		},
		{
			label: (
				<Button type="link" size="small">
					物料入库
				</Button>
			),
			key: "storage",
			permissionkey: "per-purchase-put-storage",
		},
		{
			label: (
				<Button type="link" size="small">
					采购费用
				</Button>
			),
			key: "purchase-costs",
			permissionkey: "per-purchase-costs",
		},
		{
			label: (
				<Button type="link" size="small">
					撤销入库
				</Button>
			),
			key: "revokeStorage",
			permissionkey: "per-purchase-revokeStorage",
		},
		{
			label: (
				<Button type="link" size="small">
					取消验收
				</Button>
			),
			key: "cancel-accept",
			permissionkey: "per-purchase-closeAccept",
		},
		{
			label: (
				<Button type="link" size="small">
					取消测标
				</Button>
			),
			key: "cancel-measure-mark",
			permissionkey: "per-purchase-cancel-measure_mark",
		},
		{
			label: (
				<Button type="link" size="small">
					支付
				</Button>
			),
			key: "pay",
			permissionkey: "per-purchase-pay",
		},
		{
			label: (
				<Button type="link" size="small">
					关单
				</Button>
			),
			key: "close-order",
			permissionkey: "per-purchase-closeOrder",
		},
		{
			label: (
				<Button type="link" size="small" danger>
					删除
				</Button>
			),
			key: "delete",
			permissionkey: "per-purchase-delete",
		},
	];
	const getDropdownItems = (record) => {
		return items.filter((item) => {
			// 首先检查用户是否有权限
			// 如果 permissionkey 为空或未定义，则不需要检查权限，直接通过
			if (item.permissionkey) {
				// 如果定义了 permissionkey 且不为空，则检查权限
				if (userPermissions && !userPermissions.includes(item.permissionkey)) {
					return false;
				}
			}

			// 然后根据 putStatus 过滤
			if (record.putStatus === 0) {
				return ["purchase-costs", "edit", "accept", "delete"].includes(item.key);
			}
			if (record.putStatus === 1) {
				if (record.isMachining === 0) {
					return ["purchase-costs", "storage", "cancel-accept"].includes(item.key);
				}
				if (record.isMachining) {
					return ["purchase-costs", "storage", "cancel-measure-mark"].includes(item.key);
				}
			}
			if (record.putStatus === 2) {
				return ["purchase-costs", "revokeStorage", "pay", "close-order"].includes(item.key);
			}
			if (record.putStatus === 4) {
				return ["purchase-costs", "measure-mark", "cancel-accept"].includes(item.key);
			}

			// 默认返回 true（对于其他状态）
			return true;
		});
	};
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
						{record.putStatus !== 3 && (
							<Dropdown menu={{ items: getDropdownItems(record) }} trigger={["click"]}>
								<a onClick={(e) => e.preventDefault()}>
									<Space>
										<Button size="small" type="link">
											更多
										</Button>
									</Space>
								</a>
							</Dropdown>
						)}
					</Space>
				);
			},
		},
	];
	const fetchData = api.getPurchaseBillList;
	const rowKey = "id"; // 表格行key, 每一行的唯一标识
	const rowSelection = {
		columnWidth: 80,
		onChange: (selectedRowKeys, selectedRows) => {
			console.log(`selectedRowKeys: ${selectedRowKeys}`, "selectedRows: ", selectedRows);
		},
		getCheckboxProps: (record) => ({
			disabled: record.payStatus === 1,
		}),
	};

	// 高级搜索展开/收起
	const [isSearchOpen, setIsSearchOpen] = useState(false);
	const onSearchToggle = () => {
		setIsSearchOpen(!isSearchOpen);
	};

	// 搜索参数
	const [searchParams, setSearchParams] = useState({
		supplierName: "", // 供应商名称
		supplierPhone: "", // 供应商电话
		orderNum: "", // 采购单编号
		empName: "", // 采购人
		empPhone: "", // 采购人电话
		startTime: "", // 采购开始时间,
		endTime: "", // 采购结束时间,
		purchaseType: null, // 采购类型
		sourceOf: null, // 需求来源
		putStatus: null, // 入库状态
		payStatus: null, // 支付状态
	});

	const [supplierSearchVal, setSupplierSearchVal] = useState(null);
	const [supplierSearchType, setSupplierSearchType] = useState(1);
	const supplierSearchValChange = (e) => {
		const val = e.target.value;
		setSupplierSearchVal(val);
		switch (supplierSearchType) {
			case 1:
				setSearchParams((prev) => {
					return {
						...prev,
						supplierName: val,
						supplierPhone: "",
						orderNum: "",
					};
				});
				break;
			case 2:
				setSearchParams((prev) => {
					return {
						...prev,
						supplierName: "",
						supplierPhone: val,
						orderNum: "",
					};
				});
				break;
			case 3:
				setSearchParams((prev) => {
					return {
						...prev,
						supplierName: "",
						supplierPhone: "",
						orderNum: val,
					};
				});
				break;
		}
	};
	const supplierSearchTypeChange = (val) => {
		setSupplierSearchType(val);
		switch (val) {
			case 1:
				setSearchParams((prev) => {
					return {
						...prev,
						supplierName: supplierSearchVal,
						supplierPhone: "",
						orderNum: "",
					};
				});
				break;
			case 2:
				setSearchParams((prev) => {
					return {
						...prev,
						supplierName: "",
						supplierPhone: supplierSearchVal,
						orderNum: "",
					};
				});
				break;
			case 3:
				setSearchParams((prev) => {
					return {
						...prev,
						supplierName: "",
						supplierPhone: "",
						orderNum: supplierSearchVal,
					};
				});
				break;
		}
	};

	const [purchasePersonSearchVal, setPurchasePersonSearchVal] = useState(null);
	const [purchasePersonSearchType, setPurchasePersonSearchType] = useState(1);
	const purchasePersonSearchValChange = (e) => {
		const val = e.target.value;
		setPurchasePersonSearchVal(val);
		switch (purchasePersonSearchType) {
			case 1:
				setSearchParams((prev) => {
					return {
						...prev,
						empName: val,
						empPhone: "",
					};
				});
				break;
			case 2:
				setSearchParams((prev) => {
					return {
						...prev,
						empName: "",
						empPhone: val,
					};
				});
				break;
		}
	};
	const purchasePersonSearchTypeChange = (val) => {
		setPurchasePersonSearchType(val);
		switch (val) {
			case 1:
				setSearchParams((prev) => {
					return {
						...prev,
						empName: purchasePersonSearchVal,
						empPhone: "",
					};
				});
				break;
			case 2:
				setSearchParams((prev) => {
					return {
						...prev,
						empName: "",
						empPhone: purchasePersonSearchVal,
					};
				});
				break;
		}
	};

	const [purchaseTime, setPurchaseTime] = useState(null);
	const purchaseTimeChange = (dates, dateStr) => {
		console.log(dateStr);
		if (dateStr && dateStr.length === 2) {
			setSearchParams((prev) => {
				return {
					...prev,
					startTime: dateStr[0],
					endTime: dateStr[1],
				};
			});
			setPurchaseTime(dates);
		} else {
			setSearchParams((prev) => {
				return {
					...prev,
					startTime: "",
					endTime: "",
				};
			});
			setPurchaseTime(null);
		}
	};

	// 采购类型
	const selectPurchaseStatus = (tag) => {
		if (searchParams.purchaseType === tag.value) {
			setSearchParams((state) => ({ ...state, purchaseType: null }));
		} else {
			setSearchParams((state) => ({ ...state, purchaseType: tag.value }));
		}
	};
	// 需求来源
	const selectSource = (tag) => {
		if (searchParams.sourceOf === tag.value) {
			setSearchParams((state) => ({ ...state, sourceOf: null }));
		} else {
			setSearchParams((state) => ({ ...state, sourceOf: tag.value }));
		}
	};
	// 入库状态
	const selectPutStatus = (tag) => {
		if (searchParams.putStatus === tag.value) {
			setSearchParams((state) => ({ ...state, putStatus: null }));
		} else {
			setSearchParams((state) => ({ ...state, putStatus: tag.value }));
		}
	};
	// 支付状态
	const selectPayStatus = (tag) => {
		if (searchParams.payStatus === tag.value) {
			setSearchParams((state) => ({ ...state, payStatus: null }));
		} else {
			setSearchParams((state) => ({ ...state, payStatus: tag.value }));
		}
	};

	const onResetSearch = () => {
		setSearchParams({
			supplierName: "",
			supplierPhone: "",
			orderNum: "",
			empName: "",
			empPhone: "",
			startTime: "",
			endTime: "",
			purchaseType: null,
			sourceOf: null,
			putStatus: null,
			payStatus: null,
		});
		setSupplierSearchVal(null);
		setPurchasePersonSearchVal(null);
		setSupplierSearchType(1);
		setPurchasePersonSearchType(1);
		setPurchaseTime(null);
	};

	// 跳转到详情页
	const navigate = useNavigate();
	const goToDetail = (record) => () => {
		// 方式1：只使用查询参数（在地址栏显示）
		const params = {
			id: record.id,
			isMachining: record.isMachining || 0,
			putStatus: record.putStatus || 0,
		};
		navigate(`/purchase/bill-detail?${new URLSearchParams(params).toString()}`);
	};

	// 新增采购单
	const goToAdd = () => {
		navigate("/purchase/bill-detail?mode=new");
	};

	return (
		<>
			<TopOperate>
				<Button type="primary" onClick={goToAdd}>
					<PlusOutlined />
					新增
				</Button>
				<Button>导出采购单</Button>
				<Button>一键支付</Button>
			</TopOperate>
			<BaseTable
				rowKey={rowKey}
				columns={columns}
				fetchData={fetchData}
				rowSelection={rowSelection}
				searchParams={searchParams}
				isSearchOpen={isSearchOpen}
				onSearchToggle={onSearchToggle}
				onResetSearch={onResetSearch}
			>
				<div slot="searchForm">
					<Row gutter={16}>
						<Col span={8}>
							<Space.Compact style={{ width: "100%" }}>
								<Select value={supplierSearchType} options={supplierOptions} onChange={supplierSearchTypeChange} />
								<Input placeholder="请输入内容" value={supplierSearchVal} onChange={supplierSearchValChange} />
							</Space.Compact>
						</Col>
						<Col span={8}>
							<Space.Compact style={{ width: "100%" }}>
								<Select
									value={purchasePersonSearchType}
									options={purchasePersonOptions}
									onChange={purchasePersonSearchTypeChange}
									style={{ width: "200px" }}
								/>
								<Input
									placeholder="请输入内容"
									value={purchasePersonSearchVal}
									onChange={purchasePersonSearchValChange}
								/>
							</Space.Compact>
						</Col>
						<Col span={8}>
							<Space.Compact style={{ width: "100%" }}>
								<Select value={1} options={purchaseTimeOptions} />
								<RangePicker format="YYYY-MM-DD" value={purchaseTime} onChange={purchaseTimeChange} />
							</Space.Compact>
						</Col>
					</Row>
				</div>
				<div slot="highSearch">
					<Flex gap={20} vertical={true}>
						<div>
							<span style={{ marginRight: "16px" }}>采购类型:</span>
							{purchaseList.map((tag) => (
								<Tag
									key={tag.value}
									color={searchParams.purchaseType === tag.value ? "blue" : "default"} // 高亮颜色
									onClick={() => selectPurchaseStatus(tag)}
									style={{
										cursor: "pointer",
										userSelect: "none",
									}}
								>
									{tag.label}
								</Tag>
							))}
						</div>
						<div>
							<span style={{ marginRight: "16px" }}>需求来源:</span>
							{sourceList.map((tag) => (
								<Tag
									key={tag.value}
									color={searchParams.sourceOf === tag.value ? "blue" : "default"} // 高亮颜色
									onClick={() => selectSource(tag)}
									style={{
										cursor: "pointer",
										userSelect: "none",
									}}
								>
									{tag.label}
								</Tag>
							))}
						</div>
						<div>
							<span style={{ marginRight: "16px" }}>采购单状态:</span>
							{putList.map((tag) => (
								<Tag
									key={tag.value}
									color={searchParams.putStatus === tag.value ? "blue" : "default"} // 高亮颜色
									onClick={() => selectPutStatus(tag)}
									style={{
										cursor: "pointer",
										userSelect: "none",
									}}
								>
									{tag.label}
								</Tag>
							))}
						</div>
						<div>
							<span style={{ marginRight: "16px" }}>支付状态:</span>
							{payList.map((tag) => (
								<Tag
									key={tag.value}
									color={searchParams.payStatus === tag.value ? "blue" : "default"} // 高亮颜色
									onClick={() => selectPayStatus(tag)}
									style={{
										cursor: "pointer",
										userSelect: "none",
									}}
								>
									{tag.label}
								</Tag>
							))}
						</div>
					</Flex>
				</div>
			</BaseTable>
		</>
	);
});

export default Bill;
