import React, { useCallback } from "react";
import { Row, Col, Button, Space, Divider } from "antd";
import { SearchOutlined, ReloadOutlined, DownOutlined, UpOutlined } from "@ant-design/icons";

const SearchForm = (props) => {
	const { onSearch, onReset, isSearchOpen, onSearchToggle, searchForm, highSearch } = props;

	// 搜索处理
	const handleSearch = useCallback(() => {
		onSearch();
	}, []);

	// 重置处理
	const handleReset = useCallback(() => {
		onReset();
	}, []);

	return (
		<div className="search-container">
			{/*搜索区域*/}
			<div className="search-form">{searchForm}</div>
			<Divider variant="dashed" />
			{/*高级搜索*/}
			{isSearchOpen && <div className="high-search">{highSearch}</div>}
			{/* 按钮区域 */}
			<Row justify="center" style={{ marginTop: "16px" }}>
				<Col>
					<Space>
						<Button type="primary" icon={<SearchOutlined />} onClick={handleSearch}>
							搜索
						</Button>
						<Button icon={<ReloadOutlined />} onClick={handleReset}>
							重置
						</Button>
					</Space>

					<Button type="link" icon={isSearchOpen ? <UpOutlined /> : <DownOutlined />} onClick={onSearchToggle}>
						{isSearchOpen ? "收起" : "展开"}
					</Button>
				</Col>
			</Row>
		</div>
	);
};

export default SearchForm;
