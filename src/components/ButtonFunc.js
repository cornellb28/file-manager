import React from 'react';
import { Button } from 'antd';
import { FILEMOVE } from '../contexts/moveFiles';
const { ipcRenderer } = window.require('electron');
const { CLICK_LIVE_FOLDER_BUTTON, SELECTED_FOLDER } = require('../utils/constants');

const BunttonFunc = (props) => {

  const selectFolder = (path) => {
    return FILEMOVE(path)
  }

  const openDialogMove = () => {
    ipcRenderer.send(CLICK_LIVE_FOLDER_BUTTON);
    ipcRenderer.on(SELECTED_FOLDER, (event, filepaths) => {
      let parentpath = filepaths[0];
      return selectFolder(parentpath)
    });
  }

  return (
    <>
      <Button className="move__files" type="primary" onClick={() => openDialogMove()}>Move Files</Button> &nbsp;
      <Button className="clear__files" type="danger">Clear Files</Button> &nbsp;
      <Button className="edit__files" type="danger">Edit Files</Button> &nbsp;
    </>
  )
}


export default BunttonFunc;