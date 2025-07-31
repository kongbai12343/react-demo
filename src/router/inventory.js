import { lazy } from "react";

const Inventory = lazy(() => import("@/pages/inventory/inventory-list/index.jsx"));
const InventoryOutbound = lazy(() => import("@/pages/inventory/outbound/index.jsx"));

const inventoryRouter = [
	{
		path: "inventory",
		children: [
			{
				path: "list",
				Component: Inventory,
				mate: {
					title: "库存列表",
				},
			},
			{
				path: "outbound",
				Component: InventoryOutbound,
				mate: {
					title: "出库单管理",
				},
			},
		],
	},
];

export default inventoryRouter;
