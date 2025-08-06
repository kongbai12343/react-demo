import React, { useCallback } from "react";
import { Tag, Space, Divider } from "antd";

const AdvancedSearch = (props) => {
	const { filters = [], selectedFilters = [], onChange } = props;

	// 处理标签点击
	const handleTagClick = useCallback(
		(filter, option) => {
			const filterId = `${filter.key}_${option.value}`;
			const existingIndex = selectedFilters.findIndex((item) => item.filterId === filterId);

			let newSelectedFilters;

			if (existingIndex >= 0) {
				// 如果已选中，则取消选中
				newSelectedFilters = selectedFilters.filter((_, index) => index !== existingIndex);
			} else {
				// 如果未选中，则添加到选中列表
				const newFilter = {
					filterId,
					key: filter.key,
					value: option.value,
					label: option.label,
					filterLabel: filter.label,
				};

				// 检查是否为单选类型
				if (filter.multiple === false) {
					// 单选：移除同一filter下的其他选项
					newSelectedFilters = [...selectedFilters.filter((item) => !item.key.startsWith(filter.key)), newFilter];
				} else {
					// 多选：直接添加
					newSelectedFilters = [...selectedFilters, newFilter];
				}
			}

			onChange?.(newSelectedFilters);
		},
		[selectedFilters, onChange],
	);

	// 检查标签是否被选中
	const isTagSelected = useCallback(
		(filter, option) => {
			const filterId = `${filter.key}_${option.value}`;
			return selectedFilters.some((item) => item.filterId === filterId);
		},
		[selectedFilters],
	);

	// 移除选中的标签
	const handleRemoveTag = useCallback(
		(filterId) => {
			const newSelectedFilters = selectedFilters.filter((item) => item.filterId !== filterId);
			onChange?.(newSelectedFilters);
		},
		[selectedFilters, onChange],
	);

	// 清空所有选中的标签
	const handleClearAll = useCallback(() => {
		onChange?.([]);
	}, [onChange]);

	if (filters.length === 0) {
		return null;
	}

	return (
		<div className="advanced-search-container" style={{ padding: "16px 0" }}>
			{/* 可选择的标签区域 */}
			{filters.map((filter) => (
				<div key={filter.key} style={{ marginBottom: "12px" }}>
					<span
						style={{
							display: "inline-block",
							minWidth: "80px",
							marginRight: "12px",
							fontWeight: 500,
							color: "#666",
						}}
					>
						{filter.label}:
					</span>
					<Space size={[8, 8]} wrap>
						{filter.options?.map((option) => (
							<Tag
								key={option.value}
								color={isTagSelected(filter, option) ? "blue" : "default"}
								style={{
									cursor: "pointer",
									userSelect: "none",
									border: isTagSelected(filter, option) ? "1px solid #1890ff" : "1px solid #d9d9d9",
								}}
								onClick={() => handleTagClick(filter, option)}
							>
								{option.label}
							</Tag>
						))}
					</Space>
				</div>
			))}
		</div>
	);
};

export default AdvancedSearch;
