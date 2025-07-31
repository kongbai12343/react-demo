import { lazy } from "react";

const Supplier = lazy(() => import("@/pages/purchase/supplier/index.jsx"));
const Bill = lazy(() => import("@/pages/purchase/bill/index.jsx"));
const WaitStored = lazy(() => import("@/pages/purchase/wait-stored/index.jsx"));
const TransportDriver = lazy(() => import("@/pages/purchase/transport-driver/index.jsx"));

const purchaseRouter = [
	{
		path: "purchase",
		children: [
			{
				path: "supplier",
				Component: Supplier,
				mate: {
					title: "供应商",
				},
			},
			{
				path: "bill",
				Component: Bill,
				mate: {
					title: "采购订单",
				},
			},
			{
				path: "wait-stored",
				Component: WaitStored,
				mate: {
					title: "待入库采购单",
				},
			},
			{
				path: "transport-driver",
				Component: TransportDriver,
				mate: {
					title: "运输司机",
				},
			},
		],
	},
];

export default purchaseRouter;
