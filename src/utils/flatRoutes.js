import router from "@/router";

// 递归处理路由
const formatRoute = (children, parentPath) => {
	return children.map((child) => {
		// 构造完整的路径：父路径 + 子路径
		const fullPath =
			parentPath === "/" ? `/${child.path}`.replace(/\/+/g, "/") : `${parentPath}/${child.path}`.replace(/\/+/g, "/");

		const formattedChild = {
			...child,
			path: fullPath,
		};

		// 如果子路由还有自己的子路由，递归处理
		if (child.children) {
			formattedChild.children = formatRoute(child.children, fullPath);
		}

		return formattedChild;
	});
};

// 扁平化所有路由
const flatRoutes = router.routes.flatMap((route) => {
	if (route.children) {
		// 使用 formatRoute 处理子路由，传入父路由路径
		const formattedChildren = formatRoute(route.children, route.path);

		// 返回处理后的子路由和父路由本身
		return [...formattedChildren, route];
	}
	return route;
});

export { flatRoutes };
