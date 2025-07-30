import { Layout, Space } from "antd";
import { styled } from "styled-components";

const { Header } = Layout;

export const HeaderContainer = styled(Header)`
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding-right: 16px !important;
`;

export const SpaceBox = styled(Space)`
	display: flex;
	align-items: center;
`;
