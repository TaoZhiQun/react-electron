import dva from 'dva';
import React from "react";
import createLoading from 'dva-loading';
import logger from 'redux-logger';
import RouterConfig from "./router";
const app = dva(
    process.env.NODE_ENV === "development" ? {
        onAction: logger,
    } : {}
);
app.use(createLoading());
app.router(({ history, app }) => <RouterConfig history={history} app={app} />);

app.start("#root");
export default app._store;

