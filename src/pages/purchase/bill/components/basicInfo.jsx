import React, { useState, useEffect, useCallback, useImperativeHandle } from "react";
import { Card, Descriptions, Space, Table, Image } from "antd";
import formatMoney from "@/utils/formatMoney.js";
import api from "@/apis";
import Loading from "@/component/loading/loading.jsx";

const baseUrl = import.meta.env.VITE_API_BASE;

const BasicInfo = (props) => {
	// 采购明细表格列配置
	const columns = [
		{
			title: "物料编码",
			dataIndex: "productId",
			key: "productId",
			width: 100,
		},
		{
			title: "物料名称",
			dataIndex: "productName",
			key: "productName",
			width: 160,
		},
		{
			title: "分类",
			dataIndex: "productClassify",
			key: "productClassify",
			width: 120,
		},
		{
			title: "规格",
			dataIndex: "skuName",
			key: "skuName",
			width: 100,
		},
		{
			title: "采购数量",
			dataIndex: "num",
			key: "num",
			width: 100,
			align: "right",
		},
		{
			title: "采购单价",
			dataIndex: "price",
			key: "price",
			width: 100,
			align: "right",
			render: (value) => formatMoney(value, "", 4),
		},
		{
			title: "采购金额",
			dataIndex: "totalPrice",
			key: "totalPrice",
			width: 100,
			align: "right",
			render: (value) => formatMoney(value, "", 4),
		},
		{
			title: "单位",
			dataIndex: "productUnit",
			key: "productUnit",
			width: 80,
		},
	];
	const { id } = props;

	const [loading, setLoading] = useState(false);
	const [purchaseBillInfo, setPurchaseBillInfo] = useState({});
	const [totalPrice, setTotalPrice] = useState(0);

	useEffect(() => {
		const getPurchaseBillInfo = async () => {
			setLoading(true);
			try {
				const result = await api.getPurchaseBillInfo({ id });
				let detailInfo = result.data.info;
				let totalPrice = 0;
				detailInfo.productList.forEach((it) => {
					totalPrice += Number(it.totalPrice);
				});
				setTotalPrice(totalPrice);
				setPurchaseBillInfo(detailInfo);
				setLoading(false);
			} catch (error) {
				console.error("获取采购单详情失败:", error);
				setLoading(false);
			}
		};

		getPurchaseBillInfo();
	}, [id]);

	return (
		<Loading spinning={loading} tip="正在加载基础资料...">
			<Space direction="vertical" size="large" style={{ width: "100%" }}>
				{/* 采购基础信息 */}
				<Card title="采购基础信息" className="shadow-sm">
					<Descriptions column={2} styles={{ label: { width: "120px" } }}>
						<Descriptions.Item label="供应商">{purchaseBillInfo.supplierName}</Descriptions.Item>
						<Descriptions.Item label="采购人">{purchaseBillInfo.empName}</Descriptions.Item>
						<Descriptions.Item label="采购类型">{purchaseBillInfo.purchaseTypeName}</Descriptions.Item>
						<Descriptions.Item label="采购日期">{purchaseBillInfo.purchaseTime}</Descriptions.Item>
						<Descriptions.Item label="物资分类">{purchaseBillInfo.purchaseGoodTypeName}</Descriptions.Item>
						<Descriptions.Item label="交付日期">{purchaseBillInfo.arrivalTime}</Descriptions.Item>
						<Descriptions.Item label="需求来源">{purchaseBillInfo.sourceOfName}</Descriptions.Item>
						<Descriptions.Item label="付款方式">{purchaseBillInfo.payWayName}</Descriptions.Item>
						<Descriptions.Item label="包装方式">{purchaseBillInfo.packageMethod}</Descriptions.Item>
						<Descriptions.Item label="采购申请单">
							<Image.PreviewGroup>
								<Space>
									{purchaseBillInfo.purchaseApplicationForm
										?.split(",")
										.filter(Boolean)
										.map((item) => (
											<Image key={item} width={80} height={80} src={baseUrl + item} />
										))}
								</Space>
							</Image.PreviewGroup>
						</Descriptions.Item>
						<Descriptions.Item label="对接销售">{purchaseBillInfo.dockerPersonName}</Descriptions.Item>
						<Descriptions.Item label="是否入库">{purchaseBillInfo.isStored === 1 ? "是" : "否"}</Descriptions.Item>
						<Descriptions.Item label="交付仓库">{purchaseBillInfo.deliveryRepertoryName}</Descriptions.Item>
						<Descriptions.Item label="创建人">{purchaseBillInfo.createPerson}</Descriptions.Item>
						<Descriptions.Item label="备注">{purchaseBillInfo.comment}</Descriptions.Item>
						<Descriptions.Item label="创建时间">{purchaseBillInfo.createTime}</Descriptions.Item>
					</Descriptions>
				</Card>

				{/* 采购物料 */}
				<Card title="采购物料" className="shadow-sm">
					<Table
						rowKey="id"
						columns={columns}
						dataSource={purchaseBillInfo.productList || []}
						pagination={false}
						bordered
						size="middle"
						scroll={{ x: "max-content" }}
					/>
				</Card>

				{/*其他信息*/}
				<Card title="其他信息" className="shadow-sm">
					<Space direction="vertical">
						<Descriptions styles={{ label: { width: "120px" } }}>
							<Descriptions.Item label="采购运费类型">
								{purchaseBillInfo.freightType === 1 ? "供应商支付" : "公司支付"}
							</Descriptions.Item>
							{purchaseBillInfo.transportDriverName && (
								<Descriptions.Item label="运输司机">{purchaseBillInfo.transportDriverName}</Descriptions.Item>
							)}
							{purchaseBillInfo.transportFreight && (
								<Descriptions.Item label="采购运费">{purchaseBillInfo.transportFreight}</Descriptions.Item>
							)}
						</Descriptions>
						<Descriptions styles={{ label: { width: "120px" } }}>
							<Descriptions.Item label="采购单总金额">
								{formatMoney(totalPrice + Number(purchaseBillInfo.transportFreight || 0), "", 4)}元
							</Descriptions.Item>
						</Descriptions>
					</Space>
				</Card>

				{/*采购验收信息*/}
				{purchaseBillInfo.record && (
					<Card title="采购验收信息" className="shadow-sm">
						<Descriptions column={3} styles={{ label: { width: "120px" } }}>
							<Descriptions.Item label="验收人">{purchaseBillInfo.record.acceptancePersonName}</Descriptions.Item>
							<Descriptions.Item label="验收单号">{purchaseBillInfo.record.acceptanceNum}</Descriptions.Item>
							<Descriptions.Item label="验收结果">
								{purchaseBillInfo.record.acceptanceResult === 0 ? "存在不合格" : "全部合格"}
							</Descriptions.Item>
							{purchaseBillInfo.record.acceptanceResult === 0 && (
								<Descriptions.Item label="不合格原因">{purchaseBillInfo.record.failureReason}</Descriptions.Item>
							)}
							<Descriptions.Item label="备注说明">{purchaseBillInfo.record.comment}</Descriptions.Item>
							<Descriptions.Item label="验收时间">{purchaseBillInfo.record.acceptanceTime}</Descriptions.Item>
							<Descriptions.Item label="收货单附件">
								<Image.PreviewGroup>
									<Space>
										{purchaseBillInfo.record.receiptAttachment
											.split(",")
											.filter(Boolean)
											.map((item) => (
												<Image key={item} width={80} height={80} src={baseUrl + item} />
											))}
									</Space>
								</Image.PreviewGroup>
							</Descriptions.Item>
						</Descriptions>
					</Card>
				)}
			</Space>
		</Loading>
	);
};

export default BasicInfo;
