import { createBrowserRouter } from "react-router";
import { lazy } from "react";

const Layout = lazy(() => import("@/pages/layout/Layout.jsx"));
const Login = lazy(() => import("@/pages/login/Login.jsx"));
const NotFound = lazy(() => import("@/pages/notFound/NotFound.jsx"));

import commodityRouter from "./commodity.js";
import companyInformationRouter from "./companyInformation.js";
import customerRouter from "./customer.js";
import dataCenterRouter from "./dataCenter.js";
import financeRouter from "./finance.js";
import inventoryRouter from "./inventory.js";
import orderRouter from "./order.js";
import purchaseRouter from "./purchase.js";
import systemConfigRouter from "./systemConfig.js";
import warehouseRouter from "./warehouse.js";

const router = createBrowserRouter([
	{
		path: "/",
		Component: Layout,
		children: [
			...commodityRouter,
			...companyInformationRouter,
			...customerRouter,
			...dataCenterRouter,
			...financeRouter,
			...inventoryRouter,
			...orderRouter,
			...purchaseRouter,
			...systemConfigRouter,
			...warehouseRouter,
		],
	},
	{
		path: "/login",
		Component: Login,
		meta: {
			title: "登录",
		},
	},
	{
		path: "*",
		Component: NotFound,
		meta: {
			title: "404",
		},
	},
]);

export default router;
