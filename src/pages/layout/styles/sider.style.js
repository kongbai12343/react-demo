import { styled } from "styled-components";
import { Layout } from "antd";

const { Sider } = Layout;

export const SiderWrapper = styled(Sider)`
  height: 100vh;
	width: 240px !important;
  overflow: hidden;
  overflow-y: scroll;
	
	&::-webkit-scrollbar {
		display: none;
	}
`;

export const SiderTitle = styled.div`
	height: 32px;
	line-height: 32px;
	color: #fff;
	font-size: 18px;
	text-align: center;
	display: ${props => props.$collapsed ? "none" : "block"}
`;