import { lazy } from "react";

const Inventory = lazy(() => import("@/pages/inventory/inventory-list/index.jsx"));
const InventoryOutbound = lazy(() => import("@/pages/inventory/outbound/index.jsx"));

const inventoryRouter = [
	{
		path: "inventory",
		meta: {
			title: "库存",
		},
		children: [
			{
				path: "list",
				Component: Inventory,
				meta: {
					title: "库存列表",
				},
			},
			{
				path: "outbound",
				Component: InventoryOutbound,
				meta: {
					title: "出库单管理",
				},
			},
		],
	},
];

export default inventoryRouter;
