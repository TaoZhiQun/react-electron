import { POST, GET,api } from '../utils/request/index';
import { message } from "antd"
export default {
    namespace: 'example1',
    state: {
        addVisible: false,  //modal显示隐藏

        dataSource: [],     //表格数据
        isUpdate: false,    //当前modal状态  新增还是修改
        currentData: {},    //当前操作数据
        queryCondition: {}, //查询条件
        //分页信息
        pageNum: 1,
        pageSize: 10,
        totalCount: 0,

        //数据字典--关联表存储--公共字典最好存在global
        options: {
            status: [{ value: "0", name: "在职" }, { value: "1", name: "离职" }]
        }
    },
    effects: {
        //条件查询
        *findByQuery({ payload }, { call, put, select }) {
            yield put({
                type: "save",
                payload: {
                    queryCondition: payload,
                }
            })
            const { success,result } = yield call(GET, api.example1.findByQuery, payload);
            if(success){
                yield put({
                    type: "save",
                    payload: {
                        dataSource: result
                    }
                })
            }
        },
        //新增
        *add({ payload }, { call, put, select }) {
            let queryCondition = yield select(({ example1 }) => example1.queryCondition); //查询条件
            const { errorCode, data } = yield call(POST, api.example1.delete, payload);
            if (errorCode === 0) {
                yield put({
                    type: "save",
                    payload: {
                        addVisible: false
                    }
                })
                message.success("新增成功!");
                yield put({
                    type: "findByQuery",
                    payload: queryCondition
                })
            }
        },
        //删除
        *delete({ payload }, { call, put, select }) {
            let queryCondition = yield select(({ example1 }) => example1.queryCondition); //查询条件
            const { errorCode, data } = yield call(POST, api.example1.delete, payload);
            if (errorCode === 0) {
                message.success("删除成功!");
                yield put({
                    type: "findByQuery",
                    payload: queryCondition
                })
            }
        },
        //修改
        *update({ payload }, { call, put, select }) {
            let queryCondition = yield select(({ example1 }) => example1.queryCondition); //查询条件
            const { errorCode, data } = yield call(POST, api.example1.update, payload);
            if (errorCode === 0) {
                message.success("修改成功!");
                yield put({
                    type: "save",
                    payload: {
                        addVisible: false
                    }
                })
                yield put({
                    type: "findByQuery",
                    payload: queryCondition
                })
            }
        },
    },
    reducers: {
        save(state, { payload }) {
            return {
                ...state, ...payload
            };
        },
        //对Options进行修改
        optionsSave(state, { payload }) {
            state.options = { ...state.options, ...payload }
            return {
                ...state
            };
        },
    },
    subscriptions: {

    },
};
