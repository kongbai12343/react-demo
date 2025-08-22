import React from "react";
import "./loading.scss";

const Loading = ({
	spinning = true,
	tip = "加载中...",
	children,
}) => {
	// 检测菜单栏状态
	const getSidebarStatus = () => {
		// 尝试通过 DOM 检测菜单栏状态
		const sidebar = document.querySelector('.ant-layout-sider');
		if (sidebar) {
			const siderWidth = sidebar.offsetWidth;
			return siderWidth <= 80 ? 'collapsed' : 'expanded';
		}
		return 'expanded'; // 默认展开状态
	};

	// 统一使用自定义的覆盖层模式
	const sidebarStatus = getSidebarStatus();
	const overlayClassName = `loading-overlay ${sidebarStatus === 'collapsed' ? 'sidebar-collapsed' : ''}`;

	return (
		<div className={overlayClassName}>
			{/* 当加载时，给内容添加模糊效果 */}
			<div className={spinning ? "loading-content-blur" : ""}>
				{children}
			</div>
			{spinning && (
				<div className="loading-mask">
					<div className="loading-content-center">
						<div className="loading-spinner">
							<div className="spinner-ring"></div>
							<div className="spinner-ring"></div>
							<div className="spinner-ring"></div>
						</div>
						<div className="loading-text">{tip}</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default Loading;
