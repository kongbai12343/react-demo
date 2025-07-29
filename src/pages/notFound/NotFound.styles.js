import styled, { keyframes } from "styled-components";
import { Link } from "react-router";

// 颜色常量
const Colors = {
	PRIMARY: "#3B82F6",
	SECONDARY: "#60A5FA",
	DARK_BG: "#1E293B",
	LIGHT_BG: "#F8FAFC",
};

// 动画定义
const rotate = keyframes`
	0% {
		transform: rotate(0deg);
		opacity: 1;
	}
	50% {
		transform: rotate(180deg);
		opacity: 0.5;
	}
	100% {
		transform: rotate(360deg);
		opacity: 1;
	}
`;

export const bounce = keyframes`
	0%, 100% {
		transform: translateY(0);
		opacity: 1;
	}
	50% {
		transform: translateY(-15px);
		opacity: 0.9;
	}
`;

export const float = keyframes`
	0% {
		transform: translateY(0px);
	}
	50% {
		transform: translateY(-10px);
	}
	100% {
		transform: translateY(0px);
	}
`;

// 样式组件
export const ErrorContainer = styled.div`
	box-sizing: border-box;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	min-height: 100vh;
	background: ${Colors.DARK_BG};
	color: white;
	text-align: center;
	padding: 2rem;
`;

export const ErrorCode = styled.div`
	display: flex;
	align-items: center;
	gap: 1.5rem;
	margin-bottom: 2rem;
`;

export const ErrorNumber = styled.span`
	font-size: 6rem;
	font-weight: 800;
	color: ${Colors.PRIMARY};
	letter-spacing: 2px;
	animation: ${bounce} 2s infinite;
	will-change: transform, opacity;
	backface-visibility: hidden;
`;

export const CircleContainer = styled.div`
	position: relative;
	width: 100px;
	height: 100px;
`;

export const Circle = styled.div`
	width: 100%;
	height: 100%;
	background: ${Colors.SECONDARY};
	border-radius: 50%;
	position: absolute;
	top: 0;
	left: 0;
	animation: ${rotate} 2s linear infinite;
	will-change: transform, opacity;
	backface-visibility: hidden;
	transform-origin: center center;

	&::after {
		content: "";
		position: absolute;
		top: 0;
		left: 0;
		width: 10px;
		height: 10px;
		background: white; /* 添加旋转标记 */
		border-radius: 50%;
`;

export const CircleBorder = styled.div`
	position: absolute;
	width: 120px;
	height: 120px;
	border: 3px dashed rgba(255, 255, 255, 0.3);
	border-radius: 50%;
	top: -12px;
	left: -12px;
`;

export const ErrorMessage = styled.div`
	max-width: 500px;
	margin-bottom: 3rem;

	h2 {
		font-size: 2rem;
		margin-bottom: 1rem;
		color: white;
	}

	p {
		font-size: 1.1rem;
		color: rgba(255, 255, 255, 0.7);
		line-height: 1.6;
	}
`;

export const BackHomeButton = styled.button`
	position: relative;
	display: inline-block;
	padding: 0.8rem 2rem;
	background: ${Colors.PRIMARY};
	border: none;
	border-radius: 8px;
	font-size: 1rem;
	color: white;
	cursor: pointer;
	overflow: hidden;
	transition: all 0.3s ease;
	z-index: 1;

	&:hover {
		background: ${Colors.SECONDARY};
		transform: translateY(-3px);
	}
`;

export const BackHomeLink = styled(Link)`
	display: block;
	text-decoration: none;
	color: white;
	z-index: 1;
	position: relative;
`;

export const ArrowContainer = styled.div`
	position: absolute;
	right: 1rem;
	top: 50%;
	transform: translateY(-50%);
	display: flex;
	align-items: center;
	height: 20px;
`;

export const Arrow = styled.span`
	width: 0;
	height: 0;
	border-top: 4px solid transparent;
	border-bottom: 4px solid transparent;
	border-left: 6px solid white;
	margin-right: 4px;
	transition: all 0.3s ease;
`;
