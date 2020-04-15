const { override, fixBabelImports, addLessLoader, addWebpackAlias, addWebpackExternals } = require('customize-cra');
const path = require("path");

module.exports = override(
    fixBabelImports("lodash", {
        libraryDirectory: "",
        camel2DashComponentName: false
    }),
    fixBabelImports('import', {
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: true
    }),
    addWebpackAlias({
        ["@"]: path.resolve(__dirname, "src")
    }),
    addLessLoader({
        javascriptEnabled: true,
        modifyVars: {
            "@layout-header-height": "44px",
            "@body-background": "#f0f2f5",
            "@layout-header-padding": "0 14px;"
        },
    }),
    addWebpackExternals({
        electron: "_electron"
    })
);