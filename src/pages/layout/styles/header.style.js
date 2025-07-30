import { Layout } from "antd";
import { styled } from "styled-components";

const { Header } = Layout;

export const HeaderContainer = styled(Header)`
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding-right: 16px !important;
`;

export const NamePermission = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	line-height: normal;
`;
