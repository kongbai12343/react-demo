import { createRoot } from "react-dom/client";
// 引入antd-v5的补丁, 兼容react19
import "@ant-design/v5-patch-for-react-19";
import { ConfigProvider } from "antd";
import zhCN from "antd/locale/zh_CN";
import "normalize.css";
import App from "./App.jsx";
import dayjs from "dayjs";
import "dayjs/locale/zh-cn";
import store from "./store/index.js";
import "@/styles/index.scss";
import globalContext from "./utils/globalContext.js";

dayjs.locale("zh-cn");

createRoot(document.getElementById("root")).render(
	<ConfigProvider locale={zhCN}>
		<globalContext.Provider value={store}>
			<App />
		</globalContext.Provider>
	</ConfigProvider>,
);
