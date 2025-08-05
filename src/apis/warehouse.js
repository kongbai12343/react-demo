import { apiGet } from "@/network/request";

const getRepositoryList = (params) => {
	return apiGet("api/repertory/list", params);
};

export { getRepositoryList };
