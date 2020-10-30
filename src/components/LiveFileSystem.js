import React, { useContext } from 'react';
import { Button } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';
import { TreeContext } from '../contexts/TreeContext';

// IpcRenderer
const { ipcRenderer } = window.require('electron');
const { CLICK_LIVE_FOLDER_BUTTON, SELECTED_FOLDER } = require('../utils/constants');

// Directory Tree
const dirTree = window.require("directory-tree");

const LiveFileSystem = (props) => {
  const [watchedtree, setWatchedTrees] = useContext(TreeContext);

  const ensureDirectory = (dirName) => {
    const treeData = dirTree(dirName);
    setWatchedTrees(treeData)
  }

  const openShowDialog = () => {
    // send event to electron backend
    ipcRenderer.send(CLICK_LIVE_FOLDER_BUTTON);
    ipcRenderer.on(SELECTED_FOLDER, (event, filepaths) => {
      let parentpath = filepaths[0];
      ensureDirectory(parentpath)
    });
  }

  return (
    <Button block onClick={openShowDialog} type="dashed" icon={<UploadOutlined />} size='large'>
      Upload Directory
    </Button>
  );
}

export default LiveFileSystem;
