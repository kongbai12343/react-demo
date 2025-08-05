import React from "react";
import { TopOperateContainer } from "./style.js";
import { Space } from "antd";

const TopOperate = (props) => {
	return (
		<TopOperateContainer>
			<Space>{props.children}</Space>
		</TopOperateContainer>
	);
};

export default TopOperate;
