import { lazy } from "react";

const Receipt = lazy(() => import("@/pages/finance/receipt/index.jsx"));
const Receivable = lazy(() => import("@/pages/finance/receivable/index.jsx"));
const Payable = lazy(() => import("@/pages/finance/payable/index.jsx"));
const Payment = lazy(() => import("@/pages/finance/payment/index.jsx"));
const BalanceDeduction = lazy(() => import("@/pages/finance/balance-deduction/index.jsx"));

const financeRouter = [
	{
		path: "financial",
		children: [
			{
				path: "/financial/receipt",
				Component: Receipt,
				meta: {
					title: "收款单",
				},
			},
			{
				path: "/financial/receivable",
				Component: Receivable,
				meta: {
					title: "应收款单",
				},
			},
			{
				path: "/financial/payable",
				Component: Payable,
				meta: {
					title: "应付款单",
				},
			},
			{
				path: "/financial/payment",
				Component: Payment,
				meta: {
					title: "付款单",
				},
			},
			{
				path: "/financial/balance-deduction",
				Component: BalanceDeduction,
				meta: {
					title: "余额抵扣单",
				},
			},
		],
	},
];

export default financeRouter;
