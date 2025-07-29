import { createBrowserRouter } from "react-router";
import { lazy } from "react";

const LayoutBox = lazy(() => import("../pages/layout/LayoutBox.jsx"));
const Login = lazy(() => import("../pages/login/Login.jsx"));
const NotFound = lazy(() => import("../pages/notFound/NotFound.jsx"));

const router = createBrowserRouter([
	{
		path: "/",
		Component: LayoutBox,
		// children: [
		// 	{
		// 		index: true,
		// 		element: <Navigate to="/home" replace />,
		// 	},
		// ],
	},
	{
		path: "/login",
		Component: Login,
	},
	{
		path: "*",
		Component: NotFound,
	},
]);

export default router;
