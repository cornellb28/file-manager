// const hierarchy = (data) => {
//     data = [data]
//     const tree = [];
//     const childOf = {};
//     data.forEach((item) => {
//         const { name, path, size, type, children } = item
//         childOf[path] = childOf[name] || [];
//         children = childOf[name];
//         path ? (childOf[path] = childOf[path] || []).push(item) : tree.push(item);
//     });
//     console.log(tree)
//     return tree;
// };



// Directory Tree
// const dirTree = window.require("directory-tree");
// const dt = require('directory-tree');
 
// function transformTree(dirTree, index, parentIndex = ['0']) {
//     const { type, children } = dirTree;
 
//     const curIndex = parentIndex.concat(index);
//     const parentPath = curIndex.slice(1).join('-');
 
//     return {
//         name: parentIndex.length === 1 ? `parent ${index}` : `leaf ${parentPath}`,
//         key: curIndex.join('-'),
//         isLeaf: type !== 'directory',
//         children: children ? children.map((childTree, childIndex) => transformTree(childTree, childIndex, curIndex)) : children,
//     };
// }
 
// const dirTree = dt('/path/to/your/root');
// const contentTree = dirTree.children.map((child, childIndex) => transformTree(child, childIndex));


