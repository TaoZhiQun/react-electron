import React, { PureComponent } from 'react'
import { Layout } from 'antd';
import { RouteWithSubRoutes } from "../../router";
const { Content } = Layout;

export class Index extends PureComponent {
    render() {
        return (
            <Content style={{ marginTop: 44 }}>
                {this.props.routes.map((route, i) => (
                    <RouteWithSubRoutes key={i} {...route} />
                ))}
            </Content>
        )
    }
}

export default Index
