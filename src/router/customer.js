import { lazy } from "react";

const Targeted = lazy(() => import("@/pages/customer/targeted/index.jsx"));
const Channel = lazy(() => import("@/pages/customer/channel/index.jsx"));
const Partner = lazy(() => import("@/pages/customer/partner/index.jsx"));
const Agent = lazy(() => import("@/pages/customer/agent/index.jsx"));
const Franchiser = lazy(() => import("@/pages/customer/franchiser/index.jsx"));

const customerRouter = [
	{
		path: "customer",
		meta: {
			title: "客户",
		},
		children: [
			{
				path: "targeted",
				Component: Targeted,
				meta: {
					title: "客户列表",
				},
			},
			{
				path: "channel",
				Component: Channel,
				meta: {
					title: "渠道商",
				},
			},
			{
				path: "partner",
				Component: Partner,
				meta: {
					title: "合伙人",
				},
			},
			{
				path: "agent",
				Component: Agent,
				meta: {
					title: "代理商",
				},
			},
			{
				path: "franchiser",
				Component: Franchiser,
				meta: {
					title: "经销商",
				},
			},
		],
	},
];

export default customerRouter;
