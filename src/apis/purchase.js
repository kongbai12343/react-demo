import { apiGet } from "@/network/request";

const getPurchaseBillList = (params) => {
	return apiGet("api/purchase/list", params);
};

const getPurchaseBillInfo = (params) => {
	return apiGet("api/purchase/info", params);
};

const getPurchaseOperationData = (params) => {
	return apiGet("api/purchase/getOperationRecord", params);
};

export { getPurchaseBillList, getPurchaseBillInfo, getPurchaseOperationData };
