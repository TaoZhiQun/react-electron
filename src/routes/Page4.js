import React, { PureComponent } from 'react'
import { connect } from 'dva';
import { Card, Form, Divider, Modal, Input, InputNumber, Select, DatePicker, Button,Table, Icon } from 'antd';
import PageHeaderLayout from '@/layouts/PageHeaderLayout';
let page = null;
const FormItem = Form.Item;
const Option = Select.Option;
const confirm = Modal.confirm;
const columns = [{
    title: '序号',
    dataIndex: 'index',
    key: 'index',
},
    {
        title: '姓名',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: '年龄',
        dataIndex: 'age',
        key: 'age',
    },
    {
        title: '出生日期',
        dataIndex: 'birthday',
        key: 'birthday',
    },
    {
        title: '籍贯',
        dataIndex: 'address',
        key: 'address',
    },
    {
        title: '工资',
        dataIndex: 'salary',
        key: 'salary',
        align: "right"
    },
    {
        title: '公司',
        dataIndex: 'company',
        key: 'company',
    },
    {
        title: '人员状态',
        dataIndex: 'status',
        key: 'status',
        option: "status"
    },
    {
        title: '操作',
        key: 'action',
        render: (text, record) => (
            <span>
            <a onClick={() => page.update(record)} href="javascript:;"><Icon type="edit" /></a>
            <Divider type="vertical" />
            <a onClick={() => page.delete(record.id)} href="javascript:;"><Icon type="delete" /></a>
        </span>
        ),
    }];
class Index extends PureComponent {
    constructor(props) {
        super(props)
        page = this;
    }
    componentWillMount = () => {
        this.onSearch(1, 10);
    }
    //新增点击事件
    addClick = () => {
        const { dispatch } = this.props;
        dispatch({
            type: "example1/save",
            payload: {
                addVisible: true,
                isUpdate: false,
                currentData: {}
            }
        })
    }
    //删除事件
    delete = (id) => {
        const { dispatch } = this.props;
        confirm({
            title: '确认删除?',
            content: '删除后将无法回退！',
            onOk() {
                dispatch({
                    type: "example1/delete",
                    payload: { id }
                })
            },
            onCancel() { },
        });

    }
    //修改
    update = (record) => {
        const { dispatch } = this.props;
        dispatch({
            type: "example1/save",
            payload: {
                addVisible: true,
                isUpdate: true,
                currentData: record
            }
        })
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
    //页码变化回调
    pageonChange = (pageNum, pageSize) => {
        if (!!pageNum && !!pageSize) {
            this.onSearch(pageNum, pageSize)
        }
    }
    render() {
        const { dataSource, form: { getFieldDecorator }, loading, pageNum, pageSize, totalCount, options } = this.props;
        let status = options["status"] || [];
        return (
            <PageHeaderLayout>
                <Card className='hover-shadow'>
                    <Form layout={"inline"}>
                        <FormItem
                            label="姓名"
                        >
                            {getFieldDecorator('name')(
                                <Input />
                            )}
                        </FormItem>
                        <FormItem
                            label="年龄"
                        >
                            {getFieldDecorator('age')(
                                <InputNumber style={{ width: "100%" }} />
                            )}
                        </FormItem>
                        <FormItem
                            label="人员状态"
                        >
                            {getFieldDecorator('status')(
                                <Select style={{ width: 172 }}>
                                    {status.map(({ value, name }) => <Option key={value} value={value}>{name}</Option>)}
                                </Select>
                            )}
                        </FormItem>
                        <FormItem
                            label="出生日期"
                        >
                            {getFieldDecorator('birthday')(
                                <DatePicker />
                            )}
                        </FormItem>
                        <FormItem >
                            <Button onClick={() => this.onSearch(pageNum, pageSize)} icon="search" type="primary">查询</Button>
                        </FormItem>
                    </Form>
                    <div className="btns-group">
                        <Button icon="plus" type="primary" onClick={this.addClick}>新增</Button>
                    </div>
                    <div style={{ marginTop: "24px" }}>
                        <Table
                            bordered
                            columns={columns}
                            loading={loading}
                            dataSource={dataSource}
                            rowKey="id"
                            options={options}
                            pagination={{
                                current: pageNum,
                                pageSize: pageSize,
                                total: totalCount,
                                onChange: this.pageonChange,
                                onShowSizeChange: this.pageonChange,
                                showSizeChanger: true,
                                //pageSizeOptions: ['10', '30', '50', '100'],
                                //showTotal: (total, range) => range[0] + '-' + range[1] + ' 共 ' + total + '条'
                            }}
                        />
                    </div>
                </Card>
            </PageHeaderLayout >)
    }
}
export default connect(({ example1, loading }) => {
    const { dataSource, pageNum, pageSize, totalCount, options } = example1
    return {
        dataSource,
        pageNum,
        pageSize,
        totalCount,
        options,
        loading: !!loading.effects['example1/findByQuery']
    }
})(
    Form.create()(Index)
)
