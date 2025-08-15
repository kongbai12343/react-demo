import { useEffect } from "react";
import router from "@/router";

const useDocumentTitle = () => {
	useEffect(() => {
		// 使用 router.subscribe 监听路由变化
		const unsubscribe = router.subscribe(() => {
			updateTitle();
		});

		return () => {
			unsubscribe();
		};
	}, []);

	const updateTitle = () => {
		console.log(window.location, "location");
		console.log(router, "router");
		const location = window.location;
		const pathname = location.pathname;

		// 扁平化所有路由
		const flatRoutes = router.routes.flatMap((route) => {
			if (route.children) {
				return route.children
					.map((child) => ({
						...child,
						path:
							route.path === "/"
								? `/${child.path}`.replace(/\/+/g, "/")
								: `${route.path}/${child.path}`.replace(/\/+/g, "/"),
					}))
					.concat(route);
			}
			return route;
		});

		console.log(flatRoutes, "flatRoutes");

		// 查找匹配的路由
		const currentRoute =
			flatRoutes.find((route) => {
				if (route.path === pathname) return true;

				// 处理动态路由参数
				if (route.path.includes(":")) {
					const routeRegex = new RegExp(`^${route.path.replace(/:\w+/g, "[^/]+")}$`);
					return routeRegex.test(pathname);
				}

				return false;
			}) || flatRoutes.find((route) => route.path === "*");

		// 更新文档标题
		if (currentRoute?.meta?.title) {
			document.title = currentRoute.meta.title;
		} else {
			document.title = "默认标题";
		}
	};
};

export default useDocumentTitle;
