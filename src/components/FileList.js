import React, { useContext, useState } from 'react';
import { FileContext } from "../contexts/FileContext";
import ButtonFunc from './ButtonFunc';
import { Button } from 'antd';
import { SoundOutlined } from '@ant-design/icons';
import { humanFileSize } from '../utils/sizeConverter';
import { Table, Tooltip, Tag } from 'antd';
import _ from 'lodash';
import 'antd/dist/antd.css';
const { shell } = window.require('electron')


const FileList = (props) => {
  const [files] = useContext(FileContext);
  const [selectionType, setSelectionType] = useState('checkbox');
  const [selectedFile, setSelectedFile] = useState({})

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

  const folderFinder = (id) => {
    shell.showItemInFolder(id);
  }

  const playSong = (item) => {
    const { location, key } = item
    setSelectedFile({ path: location, id: key })
  }
  const columns = [
    {
      title: '',
      key: 'id',
      dataIndex: 'id',
      width: 80,
      render: (data, index) => {
        const i = index
        return <Button onClick={() => playSong(i)}><SoundOutlined /></Button>
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

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {

      if (selectedRowKeys && selectedRowKeys.length >= 1) {
        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        return
      } else {
        return false
      }
    }
  };


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
    </>
  )
}

export default FileList;