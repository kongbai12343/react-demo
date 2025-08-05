import { apiGet } from "@/network/request";

const getPurchaseBillList = (params) => {
	return apiGet("api/purchase/list", params);
};

export { getPurchaseBillList };
