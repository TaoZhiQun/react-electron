import React from 'react';
import { Link } from 'dva/router';
import { PageHeader } from 'antd';

export default ({ children, wrapperClassName, top, ...restProps }) => (
    <div style={{ margin: '0' }} className={wrapperClassName}>
        {top}
        <PageHeader key="pageheader" {...restProps} linkElement={Link} />
        {children}
    </div>
);
