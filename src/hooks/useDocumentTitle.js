import { useEffect, useCallback, useRef } from "react";
import router from "@/router";
import { flatRoutes } from "@/utils/flatRoutes.js";

const useDocumentTitle = () => {
	const lastPathnameRef = useRef(null);

	const updateTitle = useCallback(() => {
		const location = window.location;
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

		if (!currentRoute) {
			for (const route of flatRoutes) {
				if (route.children && route.children.length) {
					const matchedChild = route.children.find((child) => {
						return child.path === pathname;
					});
					if (matchedChild) {
						currentRoute = matchedChild; // 返回匹配的子路由对象
						break;
					}
				}
			}
		}
		// 更新文档标题
		if (currentRoute) {
			document.title = currentRoute.meta?.title;
		} else {
			document.title = "Not Found";
		}
	}, []);

	useEffect(() => {
		// 初始化时立即更新一次标题
		updateTitle();

		// 使用 router.subscribe 监听路由变化
		const unsubscribe = router.subscribe(() => {
			updateTitle();
		});

		return () => {
			unsubscribe();
		};
	}, [updateTitle]);
};

export default useDocumentTitle;
