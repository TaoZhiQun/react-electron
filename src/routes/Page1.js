import React, { PureComponent } from 'react'
import { connect } from 'dva';
import { Card, Form } from 'antd';
import PageHeaderLayout from '@/layouts/PageHeaderLayout';
// 引入柱状图
import  'echarts/lib/chart/bar';
// 引入提示框和标题组件
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title'
import ReactEcharts from 'echarts-for-react';
class Index extends PureComponent {
    constructor(props) {
        super(props)
    }
    componentWillMount = () => {
        this.onSearch(1, 10);
    }
    //查询
    onSearch = (pageNum, pageSize) => {
        const { dispatch, form: { validateFields } } = this.props;
        validateFields((error, values) => {
            if (!!error) return;
            dispatch({
                type: "example1/findByQuery",
                payload: { ...values, pageNum, pageSize }
            })
        })
    }
    getOption =()=> {
        const { dataSource } = this.props;
        let xAxisData=[];
        let yAxisData=[];
        if(!!dataSource.xAxis){
            xAxisData=dataSource.xAxis.data;
        }
        if(!!dataSource.yAxis){
            yAxisData=dataSource.yAxis.data;
        }
        let option = {
            title: { text: 'ECharts 入门示例' },
            tooltip: {},
            xAxis: {
                data: xAxisData
            },
            yAxis: {},
            series: [{
                name: '销量',
                type: 'bar',
                data: yAxisData
            }]
        }
        return option
    }


    render() {

        return (
            <PageHeaderLayout>
                <Card className='hover-shadow'>
                    <ReactEcharts option={this.getOption()}  />
                </Card>
            </PageHeaderLayout >)
    }
}
export default connect(({ example1, loading }) => {
    const { dataSource } = example1
    return {
        dataSource,
        loading: !!loading.effects['example1/findByQuery']
    }
})(
    Form.create()(Index)
)
