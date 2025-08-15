import { RouterProvider } from "react-router";
import router from "./router/index.js";
import useDocumentTitle from "@/hooks/useDocumentTitle.js";

function App() {
	useDocumentTitle();
	return <RouterProvider router={router}></RouterProvider>;
}

export default App;
