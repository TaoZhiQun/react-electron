import fetch from 'dva/fetch';
import { routerRedux } from 'dva/router';
import { stringify } from 'qs';
import { message } from "antd";
import store from "../../index";
import _api from "../api";
import { checkStatus, parseJSON, requestHeader } from "./config";

function request(url, newOptions, showMessage = true) {
    return fetch(url, newOptions)
        .then(checkStatus)
        .then(parseJSON)
        .then(result => {
            if (result.errorCode !== 0) {
                showMessage && message.error(result.errorMsg)
                return result
            }
            return result;
        })
        .catch(e => {
            const { dispatch } = store;
            const status = e.name;
            if (status === 401) {
                dispatch({
                type: 'login/logout',
                });
                return;
            }
            if (status === 403) {
                dispatch(routerRedux.push('/exception/403'));
                return;
            }
            if (status <= 504 && status >= 500) {
                dispatch(routerRedux.push('/exception/500'));
                return;
            }
            if (status >= 404 && status < 422) {
                dispatch(routerRedux.push('/exception/404'));
            }

            return {
                errorCode: 1
            }
        });
}

/**
 * 
 * @param {string} url 请求地址
 * @param {any} params 请求参数
 * @param {Boolean} showMessage 是否显示错误提示，默认为false
 */
function GET(url, params, showMessage) {
    let _params = !!params ? "?" + stringify(params) : "";
    return request(url + _params, {
        method: "GET",
        headers: requestHeader,
        credentials: 'include'
    }, showMessage)
}

/**
 * 
 * @param {string} url 请求地址
 * @param {any} params 请求参数
 * @param {Boolean} showMessage 是否显示错误提示，默认为false
 */
function POST(url, params, showMessage) {
    return request(url, {
        method: "POST",
        headers: requestHeader,
        body: JSON.stringify(params),
        credentials: 'include',
    }, showMessage)
}

export const api = _api;
export { POST };
export { GET };