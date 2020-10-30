import React, { useContext } from 'react';
import 'antd/dist/antd.css';
import { TreeContext } from '../contexts/TreeContext';
import _ from 'lodash'
import { Tree } from 'antd';

const { DirectoryTree } = Tree;

function transformTree(dirTree) {
  const { type, children, name, path } = dirTree;
  return {
    title: name,
    key: path,
    isLeaf: type !== 'directory',
    children: children ? children.map((childTree) => transformTree(childTree)) : children
  };
}

const LiveFolderView = (prop) => {
  const [watchedtree] = useContext(TreeContext);

  const contentTree = transformTree(watchedtree)
  const treeData = [contentTree]

  const onSelect = (keys, event) => {
    console.log('Trigger Select', keys, event);
  };

  const onExpand = () => {
    console.log('Trigger Expand');
  };

  return (
    <DirectoryTree
      multiple
      defaultExpandAll
      onSelect={onSelect}
      onExpand={onExpand}
      treeData={treeData}
      height={433}
    />
  );
}

export default LiveFolderView;