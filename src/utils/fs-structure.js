// const chokidar = require("chokidar");
// const fs = require("fs");
// const path = require("path");
// const util = require("util");

// const watcher = chokidar.watch([], { alwaysStat: true, persistent: true });

// function createWatchedFSStructure() {
//     // create an empty object
//     const fsStructure = {};

//     // create the directory tree
//     function ensureDirectory(dirNames) {
//         let parent = fsStructure;
//         for (const dir of dirNames) {
//             parent[dir] = parent[dir] || { type: "directory", name: dir, children: {} };
//             parent = parent[dir].children;
//         }
//         return parent
//     }

//     // watch the directory you selected. watch for options(changes, deletions, adds)
//     watcher.on("all", (event, realPath) => {
//         console.log({ event, realPath });
//         const pathParts = realPath.split(path.sep);
//         if (event === "addDir") {
//             ensureDirectory(pathParts)
//         } else if (event === "add") {
//             const parent = ensureDirectory(pathParts.slice(0, -1))
//             const filename = pathParts.slice(-1)[0]
//             parent[filename] = { type: "file", name: filename }
//         } else if (event === "unlinkDir" || event === "unlink") {
//             const parent = ensureDirectory(pathParts.slice(0, -1))
//             const dirname = pathParts.slice(-1)[0]
//             delete parent[dirname]
//         }
//     });

//     // what directory to watch
//     function watchdir(dir) {
//         watcher.add(dir);
//     }

//     // log the tree  in console
//     function logStructure() {
//         console.log("fsStructure", util.inspect(fsStructure, false, 5, true))
//     }

//     return { fsStructure, watchdir, logStructure }
// }

// async function test() {
//     const { watchdir, logStructure } = createWatchedFSStructure()
//     await fs.promises.mkdir("./MUSICDATABASE");
//     watchdir("./MUSICDATABASE");

//     await new Promise((res) => setTimeout(res, 100));
//     await fs.promises.writeFile("./MUSICDATABASE/Hip_Hop", "Hip Hop");
//     await fs.promises.writeFile("./MUSICDATABASE/SOUL", "SOUL");

//     await new Promise((res) => setTimeout(res, 1000));
//     logStructure()
//     console.log('part 1')

//     await new Promise((res) => setTimeout(res, 2000));

//     await fs.promises.mkdir("./dir_b");
//     watchdir("./dir_b");

//     await new Promise((res) => setTimeout(res, 100));
//     await fs.promises.writeFile("./dir_b/file_b1", "FILEB1");
//     await fs.promises.writeFile("./dir_b/file_b2", "FILEB2");

//     await new Promise((res) => setTimeout(res, 1000));
//     logStructure()
//     console.log('part 2')

//     await fs.promises.unlink("./dir_b/file_b1");
//     await new Promise((res) => setTimeout(res, 1000));
//     logStructure()
//     console.log('part 3')

//     process.exit(0);
// }

// test();
