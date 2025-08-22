import accounting from "accounting";

const formatMoney = (value, symbol = "", precision = 2) => {
	return accounting.formatMoney(value, symbol, precision);
};

export default formatMoney;
