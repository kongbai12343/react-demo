import { lazy } from "react";

const JobMap = lazy(() => import("@/pages/companyInformation/job-map/index.jsx"));
const StaffList = lazy(() => import("@/pages/companyInformation/staff-list/index.jsx"));
const OrganizationShow = lazy(() => import("@/pages/companyInformation/organization-show/index.jsx"));

const companyInformationRouter = [
	{
		path: "system",
		children: [
			{
				path: "arct-show",
				Component: OrganizationShow,
				meta: {
					title: "组织架构展示",
				},
			},
			{
				path: "job-map",
				Component: JobMap,
				meta: {
					title: "岗位角色映射",
				},
			},
			{
				path: "staff-list",
				Component: StaffList,
				meta: {
					title: "员工列表",
				},
			},
		],
	},
];

export default companyInformationRouter;
