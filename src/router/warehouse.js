import { lazy } from "react";

const Repository = lazy(() => import("@/pages/warehouse/manage/index.jsx"));

const warehouseRouter = [
	{
		path: "repository",
		children: [
			{
				path: "manage",
				Component: Repository,
				meta: {
					title: "仓库配置",
				},
			},
		],
	},
];

export default warehouseRouter;
