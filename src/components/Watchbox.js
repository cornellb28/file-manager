import React from 'react';
import { Space } from 'antd';
import LiveFileSystem from './LiveFileSystem';
import LiveFolderView from './LiveFolderView';

const WatchBox = (props) => {
    return (
        <Space direction="vertical">
            <LiveFileSystem />
            <LiveFolderView />
        </Space>
    )
}

export default WatchBox;   