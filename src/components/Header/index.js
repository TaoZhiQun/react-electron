import React, { PureComponent } from 'react'
import { Layout, Menu, Icon } from 'antd';
import menuDate from "../../common/menu";
import { Link } from 'dva/router';
const { SubMenu } = Menu;
const { Header } = Layout;

const getIcon = icon => {
    if (typeof icon === 'string') {
        return <Icon type={icon} />;
    }
    return icon;
};


const LogoStyle = {
    width: '120px',
    height: '30px',
    background: 'rgba(255, 255, 255, 0.2)',
    margin: '7px 24px 7px 0',
    float: 'left'
}

export class Index extends PureComponent {
    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.pathname !== prevState.pathname) {
            let selectedKeys = [nextProps.pathname]
            return {
                selectedKeys,
                prePathname: nextProps.pathname
            }
        }
        return null;
    }
    state = {
        selectedKeys: []
    }
    /**
     * 获得菜单子节点
     * @memberof SiderMenu
     */
    getNavMenuItems = menusData => {
        if (!menusData) {
            return [];
        }
        return menusData
            .filter(item => item.name && !item.hideInMenu)
            .map(item => {
                // make dom
                const ItemDom = this.getSubMenuOrItem(item);
                return ItemDom;
            })
            .filter(item => item);
    };
    getSubMenuOrItem = item => {
        if (item.children && item.children.some(child => child.name)) {
            const childrenItems = this.getNavMenuItems(item.children);
            // 当无子菜单时就不展示菜单
            if (childrenItems && childrenItems.length > 0) {
                return (
                    <SubMenu
                        title={
                            item.icon ? (
                                <span>
                                    {getIcon(item.icon)}
                                    <span>{item.name}</span>
                                </span>
                            ) : (
                                    item.name
                                )
                        }
                        key={item.path}
                    >
                        {childrenItems}
                    </SubMenu>
                );
            }
        } else {
            return <Menu.Item key={item.path}>{this.getMenuItemPath(item)}</Menu.Item>;
        }
    };
    getMenuItemPath = item => {
        const itemPath = item.path;
        const icon = getIcon(item.icon);
        const { target, name } = item;
        // Is it a http link
        if (/^https?:\/\//.test(itemPath)) {
            return (
                <a href={itemPath} target={target}>
                    {icon}
                    <span>{name}</span>
                </a>
            );
        }
        return (
            <Link
                to={itemPath}
                target={target}
            >
                {icon}
                <span>{name}</span>
            </Link>
        );
    };
    render() {
        const { selectedKeys } = this.state;
        return (
            <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
                <Menu
                    theme="dark"
                    mode="horizontal"
                    selectedKeys={selectedKeys}
                    style={{ lineHeight: '44px' }}
                >
                    {this.getNavMenuItems(menuDate)}
                </Menu>
            </Header>
        )
    }
}

export default Index
