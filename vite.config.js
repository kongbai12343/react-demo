import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { resolve } from "path";

// https://vite.dev/config/
export default defineConfig({
	plugins: [react(), tailwindcss()],
	build: {
		// 输出目录
		outDir: "dist",
		// 代码分割策略
		rollupOptions: {
			output: {
				manualChunks(id) {
					if (id.includes("node_modules")) {
						if (id.includes("react") || id.includes("react-dom")) {
							return "react";
						}
						return "vendor";
					}
				},
				// 入口文件命名
				entryFileNames: "assets/[name]-[hash].js",
				// 资源文件命名
				assetFileNames: "assets/[name]-[hash][extname]",
				// 块文件命名
				chunkFileNames: "assets/[name]-[hash].js",
			},
			// 启用 CSS 代码分割
			cssCodeSplit: true,

			// 启用最小化混淆
			minify: "terser",
			terserOptions: {
				compress: {
					drop_console: true,
					drop_debugger: true,
				},
			},
			// 阈值，超过这个值将被内联为 base64 编码，否则将生成单独的文件
			assetsInlineLimit: 8192,
			// 启用源映射
			sourcemap: true,
		},
	},
	resolve: {
		alias: {
			"@": resolve(__dirname, "src"),
		},
	},
});
