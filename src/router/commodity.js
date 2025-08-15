import { lazy } from "react";

const ProductArchives = lazy(() => import("../pages/commodity/product-archives/index.jsx"));
const Brand = lazy(() => import("../pages/commodity/brand/index.jsx"));
const CommodityArchives = lazy(() => import("../pages/commodity/commodity-archives/index.jsx"));
const GiftCard = lazy(() => import("../pages/commodity/gift-card/index.jsx"));

const commodityRouter = [
	{
		path: "commodity",
		meta: {
			title: "商品",
		},
		children: [
			{
				path: "product-archives",
				Component: ProductArchives,
				meta: {
					title: "商品档案管理",
				},
			},
			{
				path: "brand",
				Component: Brand,
				meta: {
					title: "商品品牌管理",
				},
			},
			{
				path: "commodity-archives",
				Component: CommodityArchives,
				meta: {
					title: "商品档案管理",
				},
			},
			{
				path: "gift-card",
				Component: GiftCard,
				meta: {
					title: "礼品卡",
				},
			},
		],
	},
];

export default commodityRouter;
