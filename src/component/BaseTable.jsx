/*
 * @Author: kb
 * @Date: 2021-05-07
 * @description: 一个具备搜索的表格组件
 * @Attribute: showOperate 是否显示操作
 * @Attribute: showSearch 是否可搜索
 * @Attribute: isSearchOpen 是否展开搜索项
 * @Attribute: showShrink 是否可收缩
 */

import React from "react";
import { Switch, Table } from "antd";

import SearchForm from "@/component/SearchForm.jsx";

const columns = [
	{
		title: "Full Name",
		width: 100,
		dataIndex: "name",
		key: "name",
		fixed: "left",
	},
	{
		title: "Age",
		width: 100,
		dataIndex: "age",
		key: "age",
		fixed: "left",
	},
	{
		title: "Column 1",
		dataIndex: "address",
		key: "1",
		width: 150,
	},
	{
		title: "Column 2",
		dataIndex: "address",
		key: "2",
		width: 150,
	},
	{
		title: "Column 3",
		dataIndex: "address",
		key: "3",
		width: 150,
	},
	{
		title: "Column 4",
		dataIndex: "address",
		key: "4",
		width: 150,
	},
	{
		title: "Column 5",
		dataIndex: "address",
		key: "5",
		width: 150,
	},
	{
		title: "Column 6",
		dataIndex: "address",
		key: "6",
		width: 150,
	},
	{
		title: "Column 7",
		dataIndex: "address",
		key: "7",
		width: 150,
	},
	{ title: "Column 8", dataIndex: "address", key: "8" },
	{
		title: "Action",
		key: "operation",
		fixed: "right",
		width: 100,
		render: () => <a>action</a>,
	},
];
const dataSource = Array.from({ length: 100 }).map((_, i) => ({
	key: i,
	name: `Edward ${i}`,
	age: 32,
	address: `London Park no. ${i}`,
}));

const BaseTable = (props) => {
	return (
		<>
			{/*搜索表达区域*/}
			<div className="base-table">
				<SearchForm {...props} />
			</div>
			{/*表格区域*/}
			<div className="base-table-content">
				<Table
					columns={columns}
					dataSource={dataSource}
					bordered={true}
					loading={false}
					size="middle"
					scroll={{ scrollToFirstRowOnChange: true, x: 1500 }}
					// antd site header height
					sticky={{ offsetHeader: 64 }}
					onChange={(pagination, filters, sorter, extra) => {
						console.log("params", pagination, filters, sorter, extra);
					}}
				/>
			</div>
		</>
	);
};

export default BaseTable;
