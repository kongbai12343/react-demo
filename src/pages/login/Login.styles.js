import { styled } from "styled-components";

export const LoginContainer = styled.div`
	width: 100vw;
	height: 100vh;
	margin: 0 auto;
	display: flex;
`;

export const LoginLeft = styled.div`
	width: 50vw;
	position: relative;
`;

export const LoginRight = styled.div`
	display: flex;
	align-items: center;
	flex: 1;
	position: relative;
`;

export const LeftTopImg = styled.img`
	position: absolute;
	width: 300px;
	top: 0;
	left: 0;
`;

export const CenterImg = styled.img`
	position: absolute;
	width: 400px;
	top: 50%;
	right: 24px;
	transform: translateY(-50%);
`;

export const RightForm = styled.div`
	width: 384px;
	box-sizing: border-box;
	position: relative;
	background-color: hsla(0, 0%, 100%, 0.8);
	padding: 30px 30px 15px;
	border-radius: 2px;
	box-shadow: 0 0 40px 0 rgba(0, 0, 0, 0.15);
`;

export const FormHeader = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: 14px 0 30px;
`;

export const FormHeaderLogo = styled.img`
	width: 100px;
	height: 100px;
`;

export const FormHeaderTitle = styled.p`
	font-size: 24px;
	font-weight: 500;
	color: #0e0c0c;
	line-height: 33px;
	margin-top: 19px;
	margin-bottom: 5px;
`;

export const FormFooterVersion = styled.p`
	text-align: center;
	color: #666;
	font-size: 14px;
	margin-top: 32px;
`;

export const RightTopImg = styled.img`
	position: absolute;
	width: 180px;
	right: 0;
	bottom: 0;

	img {
		width: 100%;
	}
`;
