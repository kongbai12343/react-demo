import { lazy } from "react";

const PreSale = lazy(() => import("@/pages/order/pre-sale/index.jsx"));
const SaleBill = lazy(() => import("@/pages/order/sale-bill/index.jsx"));
const RefundRecord = lazy(() => import("@/pages/order/refund-record/index.jsx"));
const IntendingAudit = lazy(() => import("@/pages/order/intending-audit/index.jsx"));

const orderRouter = [
	{
		path: "sale",
		meta: {
			title: "订单",
		},
		children: [
			{
				path: "pre-sale",
				Component: PreSale,
				meta: {
					title: "预售订单",
				},
			},
			{
				path: "sale-bill",
				Component: SaleBill,
				meta: {
					title: "销售订单",
				},
			},
			{
				path: "refund-record",
				Component: RefundRecord,
				meta: {
					title: "退款申请单",
				},
			},
			{
				path: "intending-audit",
				Component: IntendingAudit,
				meta: {
					title: "变价申请单",
				},
			},
		],
	},
];

export default orderRouter;
