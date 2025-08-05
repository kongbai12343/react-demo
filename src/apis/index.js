import * as commonApi from "./common.api";
import * as warehouseApi from "./warehouse";
import * as purchaseApi from "./purchase.js";

export default {
	...commonApi,
	...warehouseApi,
	...purchaseApi,
};
