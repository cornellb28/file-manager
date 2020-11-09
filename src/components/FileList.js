import React, { useContext, useState } from 'react';
import ButtonFunc from './ButtonFunc';
import { Button } from 'antd';
import { SoundOutlined } from '@ant-design/icons';
import { humanFileSize } from '../utils/sizeConverter';
import { Table, Tooltip, Tag } from 'antd';
import { FileContext } from '../contexts/FileContext';
import AudioPlayer from './AudioPlayer';

import _ from 'lodash';
import 'antd/dist/antd.css';

// Component
const FileList = (props) => {
  const [files, setFiles] = useContext(FileContext);
  const [selectionType, setSelectionType] = useState('checkbox');
  const [selectedFiles, setSelectedFiles] = useState({ id: null, path: null })

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },
    getCheckboxProps: record => ({
      disabled: record.name === 'Disabled User', // Column configuration not to be checked
      name: record.name,
    }),
  };

  const folderFinder = (id) => {
    const { shell } = window.require('electron')
    shell.showItemInFolder(id);
  }

  const playButtonAction = (item) => {
    const { key, location, type } = item
    setSelectedFiles({ id: key, path: location, type })
  }

  const tableData = _.map(files, (item) => {
    const { size, id, type, path, name, tags: { artist, genre } } = item
    return {
      key: id,
      name: name,
      location: path,
      size: size,
      type: type,
      artist: artist,
      genre: genre,
      tags: ['Hip Hp']
    }
  });

  const columns = [
    {
      title: '',
      key: 'id',
      dataIndex: 'id',
      width: 80,
      render: (data, index) => {
        const i = index
        return <Button onClick={() => playButtonAction(i)}><SoundOutlined /></Button>
      }
    },
    {
      title: 'Artist',
      key: 'id',
      dataIndex: 'artist',
      width: 180,
      fixed: 'left'
    },
    {
      title: 'Filename',
      dataIndex: 'name',
      key: 'name',
      width: 150,
      ellipsis: {
        showTitle: false,
      },
      render: filename => (
        <Tooltip placement="topLeft" title={filename}>
          {filename}
        </Tooltip>
      )
    }, {
      title: 'Find',
      dataIndex: 'location',
      key: 'location',
      ellipsis: { showTitle: false },
      width: 120,
      render: (data, index) => {
        const loc = index.location
        return <Button onClick={() => folderFinder(loc)}>Find File</Button>
      }
    },
    {
      title: 'Size',
      dataIndex: 'size',
      key: 'size',
      width: 100,
      render: size => (
        <span>{humanFileSize(size, true)}</span>
      )
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
      width: 100,
      ellipsis: {
        showTitle: false,
      },
    },
    {
      title: 'Genre',
      key: 'genre',
      dataIndex: 'genre',
      width: 180
    }, {
      title: 'Comment',
      key: 'comment',
      dataIndex: 'comment',
      width: 180
    },
    {
      title: 'Tags',
      key: 'tags',
      dataIndex: 'tags',
      width: 180,
      render: tags => (
        <span>
          {tags.map(tag => {
            let color = tag.length > 5 ? 'geekblue' : 'green';
            if (tag === 'Hip Hop') {
              color = 'volcano';
            }
            return (
              <Tag color={color} key={tag}>
                {tag.toUpperCase()}
              </Tag>
            );
          })}
        </span>
      )
    },
    {
      title: 'Action',
      key: 'action',
      dataIndex: 'action',
      width: 100,
      render: action => (
        <a href="#">action</a>
      )
    }
  ];

  return (
    <>
      <ButtonFunc />
      <Table
        rowSelection={{
          type: selectionType,
          ...rowSelection,
        }}
        columns={columns}
        dataSource={tableData}
        scroll={{ x: 1200, y: 1100 }}
      />
      <AudioPlayer id={selectedFiles.id} path={selectedFiles.path} type={selectedFiles.type} />
    </>
  )
}

export default FileList;