import { createRoot } from "react-dom/client";
// 引入antd-v5的补丁, 兼容react19
import "@ant-design/v5-patch-for-react-19";
import "normalize.css";
import App from "./App.jsx";
import store from "./store/index.js";

import globalContext from "./utils/globalContext.js";

createRoot(document.getElementById("root")).render(
	<globalContext.Provider value={store}>
		<App />
	</globalContext.Provider>,
);
