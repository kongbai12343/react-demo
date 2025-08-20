// NotFound.jsx
import React from "react";
import { useNavigate } from "react-router";
import {
	Arrow,
	ArrowContainer,
	BackHomeButton,
	BackHomeLink,
	Circle,
	CircleBorder,
	CircleContainer,
	ErrorCode,
	ErrorContainer,
	ErrorMessage,
	ErrorNumber,
} from "./NotFound.styles";

const NotFound = () => {
	const navigate = useNavigate();
	const handleBackToHome = () => {
		// 清除菜单相关缓存
		localStorage.removeItem("menuOpenKeys");
		localStorage.removeItem("menuSelectedKeys");

		// 跳转到首页
		navigate("/");
	};
	return (
		<ErrorContainer>
			<ErrorCode>
				<ErrorNumber>4</ErrorNumber>
				<CircleContainer>
					<Circle />
					<CircleBorder />
				</CircleContainer>
				<ErrorNumber>4</ErrorNumber>
			</ErrorCode>

			<ErrorMessage>
				<h2>找不到页面</h2>
				<p>抱歉，您访问的页面不存在。您可以返回首页继续探索。</p>
			</ErrorMessage>

			<BackHomeButton>
				<BackHomeLink onClick={handleBackToHome}>返回首页</BackHomeLink>
				<ArrowContainer>
					<Arrow />
				</ArrowContainer>
			</BackHomeButton>
		</ErrorContainer>
	);
};

export default NotFound;
