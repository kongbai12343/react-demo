import { lazy } from "react";

const Supplier = lazy(() => import("@/pages/purchase/supplier/index.jsx"));
const Bill = lazy(() => import("@/pages/purchase/bill/index.jsx"));
const BillDetail = lazy(() => import("@/pages/purchase/bill/details.jsx"));
const WaitStored = lazy(() => import("@/pages/purchase/wait-stored/index.jsx"));
const TransportDriver = lazy(() => import("@/pages/purchase/transport-driver/index.jsx"));

const purchaseRouter = [
	{
		path: "purchase",
		meta: {
			title: "采购",
		},
		children: [
			{
				path: "supplier",
				Component: Supplier,
				meta: {
					title: "供应商",
				},
			},
			{
				path: "bill",
				Component: Bill,
				meta: {
					title: "采购订单",
				},
			},
			{
				path: "bill-detail",
				Component: BillDetail,
				meta: {
					title: "采购单详情",
				},
			},
			{
				path: "wait-stored",
				Component: WaitStored,
				meta: {
					title: "待入库采购单",
				},
			},
			{
				path: "transport-driver",
				Component: TransportDriver,
				meta: {
					title: "运输司机",
				},
			},
		],
	},
];

export default purchaseRouter;
