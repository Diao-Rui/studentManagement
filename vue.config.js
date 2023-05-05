// vue脚手架配置文件
const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    proxy: {
      "/api": {
        target: "http://localhost:9999/layout/api", //后端接口地址
        changeOrigin: true, //是否允许跨越
        pathRewrite: {
          // "^/api": "/api", //重写,
          "^/api": "",
        },
      },
    },
  },
});
