import React, { useCallback } from "react";
import { Form, Row, Col, Button, Input, Select, DatePicker, Space, Divider } from "antd";
import { SearchOutlined, ReloadOutlined, DownOutlined, UpOutlined } from "@ant-design/icons";
import AdvancedSearch from "./AdvancedSearch.jsx";

const { RangePicker } = DatePicker;
const { Option } = Select;

const SearchForm = (props) => {
	const {
		searchFields = [],
		onSearch,
		onReset,
		isAdvancedSearchOpen = false,
		onAdvancedSearchToggle,
		showAdvancedToggle = false,
		filters = [],
		selectedFilters = [],
		onChange,
	} = props;

	const [form] = Form.useForm();

	// 搜索处理
	const handleSearch = useCallback(() => {
		form.validateFields().then((values) => {
			// 处理日期范围
			const processedValues = { ...values };
			Object.keys(processedValues).forEach((key) => {
				const field = searchFields.find((f) => f.name === key);
				if (field && field.type === "dateRange" && processedValues[key]) {
					processedValues[`${key}Start`] = processedValues[key][0]?.format("YYYY-MM-DD");
					processedValues[`${key}End`] = processedValues[key][1]?.format("YYYY-MM-DD");
					delete processedValues[key];
				}
			});

			onSearch?.(processedValues);
		});
	}, [form, onSearch, searchFields]);

	// 重置处理
	const handleReset = useCallback(() => {
		form.resetFields();
		onReset?.();
	}, [form, onReset]);

	// 渲染表单项
	const renderFormItem = (field) => {
		const { type, name, label, placeholder, options = [], ...fieldProps } = field;

		switch (type) {
			case "input":
				return <Input placeholder={placeholder || `请输入${label}`} allowClear {...fieldProps} />;

			case "select":
				return (
					<Select placeholder={placeholder || `请选择${label}`} allowClear {...fieldProps}>
						{options.map((option) => (
							<Option key={option.value} value={option.value}>
								{option.label}
							</Option>
						))}
					</Select>
				);

			case "dateRange":
				return <RangePicker placeholder={["开始日期", "结束日期"]} {...fieldProps} />;

			case "date":
				return <DatePicker placeholder={placeholder || `请选择${label}`} {...fieldProps} />;

			default:
				return <Input placeholder={placeholder || `请输入${label}`} allowClear {...fieldProps} />;
		}
	};

	// 将搜索字段按行分组，每行3个
	const groupedFields = [];
	for (let i = 0; i < searchFields.length; i += 3) {
		groupedFields.push(searchFields.slice(i, i + 3));
	}

	return (
		<div className="search-form-container">
			<Form form={form} layout="vertical" onFinish={handleSearch}>
				{groupedFields.map((rowFields, rowIndex) => (
					<Row gutter={16} key={rowIndex}>
						{rowFields.map((field) => (
							<Col span={8} key={field.name}>
								<Form.Item name={field.name} label={field.label} rules={field.rules}>
									{renderFormItem(field)}
								</Form.Item>
							</Col>
						))}
						{/* 如果是最后一行且字段不足3个，填充空列 */}
						{rowFields.length < 3 &&
							Array.from({ length: 3 - rowFields.length }).map((_, index) => <Col span={8} key={`empty-${index}`} />)}
					</Row>
				))}

				{/* 高级搜索区域 */}
				{isAdvancedSearchOpen && showAdvancedToggle && (
					<AdvancedSearch filters={filters} selectedFilters={selectedFilters} onChange={onChange} />
				)}

				{/* 按钮区域 */}
				<Row justify="center">
					<Col>
						<Space>
							<Button type="primary" icon={<SearchOutlined />} onClick={handleSearch}>
								搜索
							</Button>
							<Button icon={<ReloadOutlined />} onClick={handleReset}>
								重置
							</Button>
						</Space>

						{showAdvancedToggle && (
							<Button
								type="link"
								icon={isAdvancedSearchOpen ? <UpOutlined /> : <DownOutlined />}
								onClick={onAdvancedSearchToggle}
							>
								{isAdvancedSearchOpen ? "收起" : "展开"}
							</Button>
						)}
					</Col>
				</Row>
			</Form>

			<Divider />
		</div>
	);
};

export default SearchForm;
