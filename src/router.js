import React, {PureComponent} from 'react';
import {Route, routerRedux, Switch} from 'dva/router';
import {LocaleProvider} from "antd";
import zh_CN from 'antd/lib/locale-provider/zh_CN';
import { getRouterData } from './common/router';
const { ConnectedRouter } = routerRedux;

class RouterConfig extends PureComponent {
    render() {
        const { history, app } = this.props;
        const routes = getRouterData(app);
        return <LocaleProvider locale={zh_CN}>
            <ConnectedRouter history={history}>
                <Switch>
                    {routes.map((route, i) => (
                        <RouteWithSubRoutes key={i} {...route} />
                    ))}
                </Switch>
            </ConnectedRouter>
        </LocaleProvider>
    }
}

export const RouteWithSubRoutes = (route) => (
    <Route exact={route.exact} path={route.path} render={props => (
        <route.component {...props} routes={route.routes} />
    )} />
)
export default RouterConfig;