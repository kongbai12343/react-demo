import { createRoot } from "react-dom/client";
// 引入antd-v5的补丁, 兼容react19
import "@ant-design/v5-patch-for-react-19";
import { ConfigProvider } from "antd";
import zhCN from "antd/es/locale/zh_CN";
import "normalize.css";
import App from "./App.jsx";
import store from "./store/index.js";
import "@/styles/index.scss";
import globalContext from "./utils/globalContext.js"; // eslint-disable-line no-unused-vars

createRoot(document.getElementById("root")).render(
	<globalContext.Provider value={store}>
		<ConfigProvider locale={zhCN}>
			<App />
		</ConfigProvider>
	</globalContext.Provider>,
);
