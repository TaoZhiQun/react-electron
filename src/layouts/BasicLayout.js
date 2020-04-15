import React, { PureComponent, Fragment } from 'react';
import DocumentTitle from 'react-document-title';
import { Layout } from 'antd';
import Header from "../components/Header/index";
import Content from "../components/Content/index";
import menuDate from "../common/menu";
const { Footer } = Layout;
const getMenuItemByPath = (menuDate, pathname) => {
    let menuItem;
    menuDate.forEach((item) => {
        if (item.path === pathname) {
            menuItem = item;
            return;
        } else if (item.children && (menuItem = getMenuItemByPath(item.children, pathname))) {
            return
        }
    })
    return menuItem;
}
export default class BasicLayout extends PureComponent {
    render() {
        let menuItem = getMenuItemByPath(menuDate, this.props.location.pathname)
        return <DocumentTitle title={menuItem && menuItem.name}>
            <Fragment>
                <Layout>
                    <Header pathname={this.props.location.pathname} />
                    <Content style={{ marginTop: 44 }} routes={this.props.routes || []} />
                    <Footer style={{ textAlign: 'center' }}>2020 </Footer>
                </Layout>
            </Fragment>
        </DocumentTitle>
    }
}
