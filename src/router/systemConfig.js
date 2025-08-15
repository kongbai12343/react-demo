import { lazy } from "react";

const LevelOne = lazy(() => import("@/pages/systemConfig/level-one/index.jsx"));
const LevelTow = lazy(() => import("@/pages/systemConfig/level-tow/index.jsx"));
const UrlManage = lazy(() => import("@/pages/systemConfig/url-manage/index.jsx"));
const RoleList = lazy(() => import("@/pages/systemConfig/role-list/index.jsx"));
const OperationLog = lazy(() => import("@/pages/systemConfig/operation-log/index.jsx"));
const OtherSetting = lazy(() => import("@/pages/systemConfig/other-setting/index.jsx"));
const Carousel = lazy(() => import("@/pages/systemConfig/carousel/index.jsx"));
const MaterialVersionSettings = lazy(() => import("@/pages/systemConfig/material-version-settings/index.jsx"));
const BlacklistRule = lazy(() => import("@/pages/systemConfig/blacklist-rule/index.jsx"));
const Classify = lazy(() => import("@/pages/systemConfig/classify/index.jsx"));
const AuditProcessSettings = lazy(() => import("@/pages/systemConfig/audit-process-settings/index.jsx"));
const ExpoSetting = lazy(() => import("@/pages/systemConfig/expo-setting/index.jsx"));
const Notify = lazy(() => import("@/pages/systemConfig/notify/index.jsx"));

const systemConfigRouter = [
	{
		path: "system-config",
		meta: {
			title: "系统配置",
		},
		children: [
			{
				path: "level-one",
				Component: LevelOne,
				meta: {
					title: "一级菜单管理",
				},
			},
			{
				path: "level-tow",
				Component: LevelTow,
				meta: {
					title: "二级菜单管理",
				},
			},
			{
				path: "url-manage",
				Component: UrlManage,
				meta: {
					title: "URL管理",
				},
			},
			{
				path: "role-list",
				Component: RoleList,
				meta: {
					title: "角色列表",
				},
			},
			{
				path: "operationLog",
				Component: OperationLog,
				meta: {
					title: "操作日志(新)",
				},
			},
			{
				path: "other-setting",
				Component: OtherSetting,
				meta: {
					title: "其它设置",
				},
			},
			{
				path: "carousel",
				Component: Carousel,
				meta: {
					title: "轮播广告",
				},
			},
			{
				path: "material-version-settings",
				Component: MaterialVersionSettings,
				meta: {
					title: "物料版本管理",
				},
			},
			{
				path: "blacklist_rule",
				Component: BlacklistRule,
				meta: {
					title: "黑名单规则设置",
				},
			},
			{
				path: "classify",
				Component: Classify,
				meta: {
					title: "分类管理",
				},
			},
			{
				path: "auditProcessSettings",
				Component: AuditProcessSettings,
				meta: {
					title: "审核流程设置",
				},
			},
			{
				path: "expoSetting",
				Component: ExpoSetting,
				meta: {
					title: "展会设置",
				},
			},
			{
				path: "notify",
				Component: Notify,
				meta: {
					title: "消息通知管理",
				},
			},
		],
	},
];

export default systemConfigRouter;
