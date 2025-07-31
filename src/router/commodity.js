import { lazy } from "react";

const ProductArchives = lazy(() => import("../pages/commodity/product-archives/index.jsx"));
const Brand = lazy(() => import("../pages/commodity/brand/index.jsx"));
const CommodityArchives = lazy(() => import("../pages/commodity/commodity-archives/index.jsx"));
const GiftCard = lazy(() => import("../pages/commodity/gift-card/index.jsx"));

const commodityRouter = [
	{
		path: "commodity",
		children: [
			{
				path: "product-archives",
				Component: ProductArchives,
				mate: {
					title: "商品档案管理",
				},
			},
			{
				path: "brand",
				Component: Brand,
				mate: {
					title: "商品品牌管理",
				},
			},
			{
				path: "commodity-archives",
				Component: CommodityArchives,
				mate: {
					title: "商品档案管理",
				},
			},
			{
				path: "gift-card",
				Component: GiftCard,
				mate: {
					title: "礼品卡",
				},
			},
		],
	},
];

export default commodityRouter;
