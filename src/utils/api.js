// baseUrl为后台上下文
let basUrl = "/31";
export default {
    basUrl: basUrl,
    "example1": {
        findByQuery: basUrl + "/echart",   //条件查询接口
        update: basUrl + "/update",        //更新、修改接口
        delete: basUrl + "/delete",        //删除接口
        add: basUrl + "/add",           //添加接口
    },

}
