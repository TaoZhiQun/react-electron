/*
 * @Author: 陶之群
 * @Date: 2020年4月15日11:17:27
 * @Last Modified by: 陶之群
 * @Last Modified time: 2020年4月15日11:17:27
 */
import React, { createElement } from 'react';
import Loadable from 'react-loadable';
import { Spin } from 'antd';

const modelNotExisted = (app, model) =>
    !app._models.some(({ namespace }) => {
        return namespace === model.substring(model.lastIndexOf('/') + 1);
    });
const dynamicWrapper = (app, models, component) => {
    models.forEach(model => {
        if (modelNotExisted(app, model)) {
            app.model(require(`../models/${model}`).default);
        }
    });
    if (component.toString().indexOf('.then(') < 0) {
        return props => {
            return createElement(component().default, {
                ...props
            });
        };
    }
    return Loadable({
        loader: () => {
            return component().then(raw => {
                const Component = raw.default || raw;
                return props =>
                    createElement(Component, {
                        ...props
                    });
            });
        },
        loading: ({ error, pastDelay }) => {
            if (pastDelay) {
                return <Spin size="large" className="global-spin" />;
            } else {
                return null;
            }
        },
    });
};

export const getRouterData = app => ([
    {
        path: "/black/page2",
        component: dynamicWrapper(app, [], () => import("../routes/Page2.js")),
    },
    {
        path: "/",
        component: dynamicWrapper(app, [], () => import("../layouts/BasicLayout.js")),
        routes: [
            {
                path: "/page2",
                component: dynamicWrapper(app, [], () => import("../routes/Page2.js")),
            },
            {
                path: "/page1",
                component: dynamicWrapper(app, ["example1"], () => import("../routes/Page1.js"))
            },
            {
                path: "/page3",
                component: dynamicWrapper(app, [], () => import("../routes/Page3.js"))
            },
        ]
    }
]);
