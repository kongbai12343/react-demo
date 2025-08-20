import { useEffect, useCallback, useRef, useState } from "react";
import { useLocation } from "react-router";
import router from "@/router";
import { flatRoutes } from "@/utils/flatRoutes.js";

const useBreadcrumb = () => {
	const [breadcrumbs, setBreadcrumbs] = useState([]);
	const lastPathnameRef = useRef(null);
	const location = useLocation();

	// 查找父路由
	const findParentRoute = useCallback((currentRoute, pathname) => {
		// 从所有路由中查找包含当前路由作为子路由的父路由
		for (const route of flatRoutes) {
			if (route.children && route.children.length) {
				const hasChild = route.children.some((child) => child.path === pathname || child === currentRoute);
				if (hasChild) {
					return route;
				}
			}
		}
		return null;
	}, []);

	// 生成面包屑数据
	const generateBreadcrumbs = useCallback(
		(currentRoute, pathname) => {
			if (!currentRoute) {
				return [{ title: "404" }];
			}

			const breadcrumbItems = [];

			// 查找父路由
			const parentRoute = findParentRoute(currentRoute, pathname);

			if (parentRoute && parentRoute.meta?.title) {
				breadcrumbItems.push({
					title: parentRoute.meta.title,
				});
			}

			// 添加当前路由
			if (currentRoute.meta?.title) {
				breadcrumbItems.push({
					title: currentRoute.meta.title,
				});
			}

			return breadcrumbItems;
		},
		[findParentRoute],
	);

	const updateBreadcrumb = useCallback(() => {
		const pathname = location.pathname;

		// 如果路径没有变化，就不执行
		if (lastPathnameRef.current === pathname) {
			return;
		}

		lastPathnameRef.current = pathname;

		// 查找匹配的路由
		let currentRoute = flatRoutes.find((route) => {
			if (route.path === pathname) return true;
			return false;
		});

		// 如果没有直接匹配，在嵌套路由中查找
		if (!currentRoute) {
			for (const route of flatRoutes) {
				if (route.children && route.children.length) {
					const matchedChild = route.children.find((child) => {
						return child.path === pathname;
					});
					if (matchedChild) {
						currentRoute = matchedChild;
						break;
					}
				}
			}
		}

		// 生成面包屑
		const breadcrumbItems = generateBreadcrumbs(currentRoute, pathname);
		setBreadcrumbs(breadcrumbItems);
	}, [location.pathname, generateBreadcrumbs]);

	useEffect(() => {
		// 初始化时立即更新一次面包屑
		updateBreadcrumb();

		// 使用 router.subscribe 监听路由变化
		const unsubscribe = router.subscribe(() => {
			updateBreadcrumb();
		});

		return () => {
			unsubscribe();
		};
	}, [updateBreadcrumb]);

	return breadcrumbs;
};

export default useBreadcrumb;
