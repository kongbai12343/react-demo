import React from "react";
import { Col, Divider, Row } from "antd";

const style = { background: "#0092ff", padding: "8px 0" };

const SearchForm = (props) => {
	return (
		<>
			<Row gutter={16}>
				<Col className="gutter-row" span={8}>
					<div style={style}>col-6</div>
				</Col>
				<Col className="gutter-row" span={8}>
					<div style={style}>col-6</div>
				</Col>
				<Col className="gutter-row" span={8}>
					<div style={style}>col-6</div>
				</Col>
			</Row>
			<Divider />
		</>
	);
};

export default SearchForm;
