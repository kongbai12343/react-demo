import { lazy } from "react";

const DataPanel = lazy(() => import("@/pages/dataCenter/dataPanel/index.jsx"));
const FinancialStatistics = lazy(() => import("@/pages/dataCenter/financial-statistics/index.jsx"));
const CollectionStatistics = lazy(() => import("@/pages/dataCenter/collection-statistics/index.jsx"));
const InventoryStatistics = lazy(() => import("@/pages/dataCenter/inventory-statistics/index.jsx"));
const ShipmentStatistics = lazy(() => import("@/pages/dataCenter/shipment-statistics/index.jsx"));
const MergerProfitStatistics = lazy(() => import("@/pages/dataCenter/mergeProfit-statistics/index.jsx"));
const ProductAvailableStatistics = lazy(() => import("@/pages/dataCenter/product_available_statistics/index.jsx"));
const SalesCollectionStatistics = lazy(() => import("@/pages/dataCenter/sales_collection_statistics/index.jsx"));
const MeasureMarkStatistics = lazy(() => import("@/pages/dataCenter/measureMark-statistics/index.jsx"));

const dataCenterRouter = [
	{
		path: "dataCenter",
		meta: {
			title: "数据中心",
		},
		children: [
			{
				path: "dataPanel",
				Component: DataPanel,
				meta: {
					title: "数据看板",
				},
			},
			{
				path: "financial-statistics",
				Component: FinancialStatistics,
				meta: {
					title: "财务利润统计",
				},
			},
			{
				path: "collection-statistics",
				Component: CollectionStatistics,
				meta: {
					title: "客户回款统计",
				},
			},
			{
				path: "inventory",
				Component: InventoryStatistics,
				meta: {
					title: "物料库存统计",
				},
			},
			{
				path: "shipment-details",
				Component: ShipmentStatistics,
				meta: {
					title: "出货明细统计",
				},
			},
			{
				path: "merge_profit-statistics",
				Component: MergerProfitStatistics,
				meta: {
					title: "合库利润统计",
				},
			},
			{
				path: "product_available_statistics",
				Component: ProductAvailableStatistics,
				meta: {
					title: "商品可售统计",
				},
			},
			{
				path: "sales_collection_statistics",
				Component: SalesCollectionStatistics,
				meta: {
					title: "销售回款统计",
				},
			},
			{
				path: "measureMark",
				Component: MeasureMarkStatistics,
				meta: {
					title: "泥货测标统计",
				},
			},
		],
	},
];

export default dataCenterRouter;
