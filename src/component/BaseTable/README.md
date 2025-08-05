# BaseTable 组件使用说明

一个功能完整的React Table公共组件，基于Ant Design v5开发，支持搜索、高级筛选、分页等功能。

## 功能特性

- ✅ 顶部搜索表单（每行3个字段）
- ✅ 高级搜索标签筛选
- ✅ 异步数据加载
- ✅ 分页功能
- ✅ 加载状态
- ✅ 响应式设计
- ✅ 可配置的表格属性

## 组件结构

```
BaseTable/
├── BaseTable.jsx          # 主组件
├── SearchForm.jsx         # 搜索表单组件
├── AdvancedSearch.jsx     # 高级搜索组件
├── BaseTable.scss         # 样式文件
└── README.md             # 说明文档
```

## 基本用法

```jsx
import BaseTable from './component/BaseTable.jsx';

const MyComponent = () => {
	const [isAdvancedSearchOpen, setIsAdvancedSearchOpen] = useState(false);

	// 异步获取数据的函数
	const fetchData = async (params) => {
		const response = await api.getData(params);
		return {
			data: {
				list: response.data,
				total: response.total,
				pageNo: response.pageNo,
				pageSize: response.pageSize,
			}
		};
	};

	return (
		<BaseTable
			columns={columns}
			searchFields={searchFields}
			advancedFilters={advancedFilters}
			fetchData={fetchData}
			isAdvancedSearchOpen={isAdvancedSearchOpen}
			onAdvancedSearchToggle={() => setIsAdvancedSearchOpen(!isAdvancedSearchOpen)}
		/>
	);
};
```

## Props 说明

### BaseTable Props

| 属性                     | 类型       | 默认值   | 说明                      |
|------------------------|----------|-------|-------------------------|
| columns                | Array    | []    | 表格列配置，同Ant Design Table |
| searchFields           | Array    | []    | 搜索字段配置                  |
| advancedFilters        | Array    | []    | 高级搜索标签配置                |
| fetchData              | Function | -     | 异步获取数据的函数               |
| isAdvancedSearchOpen   | Boolean  | false | 是否展开高级搜索                |
| onAdvancedSearchToggle | Function | -     | 高级搜索展开/收起回调             |
| tableProps             | Object   | {}    | 传递给Table组件的额外属性         |

### searchFields 配置

```jsx
const searchFields = [
	{
		name: 'username',           // 字段名
		label: '用户名',            // 显示标签
		type: 'input',              // 字段类型：input/select/date/dateRange
		placeholder: '请输入用户名', // 占位符
		rules: [],                  // 验证规则
		options: [],                // select类型的选项（type为select时必需）
	}
];
```

支持的字段类型：

- `input`: 输入框
- `select`: 下拉选择
- `date`: 日期选择
- `dateRange`: 日期范围选择

### advancedFilters 配置

```jsx
const advancedFilters = [
	{
		key: 'categories',          // 筛选器key
		label: 'Categories',        // 显示标签
		multiple: true,             // 是否支持多选
		options: [                  // 选项列表
			{ label: 'Movies', value: 'movies' },
			{ label: 'Books', value: 'books' },
		],
	}
];
```

### fetchData 函数

```jsx
const fetchData = async (params) => {
	// params 包含以下参数：
	// - pageNo: 当前页码
	// - pageSize: 每页数量
	// - 搜索表单的值
	// - 高级筛选的值

	const response = await yourApiCall(params);

	// 返回格式
	return {
		data: {
			list: [],        // 数据列表
			total: 0,        // 总数
			pageNo: 1,       // 当前页码
			pageSize: 10,    // 每页数量
		}
	};
};
```

## 完整示例

参考 `BaseTableExample.jsx` 文件查看完整的使用示例。

## 样式定制

组件使用SCSS编写样式，你可以通过以下方式定制样式：

1. 直接修改 `BaseTable.scss` 文件
2. 通过CSS变量覆盖默认样式
3. 使用 `tableProps` 传递自定义的className

## 注意事项

1. 确保项目已安装 `antd` 和相关依赖
2. 搜索表单每行显示3个字段，超出会自动换行
3. 分页变化时会自动调用 `fetchData` 函数
4. 高级搜索支持单选和多选模式
5. 组件内部会处理loading状态和错误处理

## 更新日志

### v1.0.0

- 初始版本发布
- 支持基础搜索和高级筛选
- 支持异步数据加载和分页
