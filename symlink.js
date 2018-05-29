/*

 This little script will set up symlinks for commonly used paths.
 The idea is that instead of having '../../someFolder/thing' in our imports,
 we can instead make a link from node_modules to the folder (node will always look
 for things inside the node_modules).

 So, if we add a link from node_modules to someFolder, we can instead write the much
 nicer path: 'someFolder/thing' and it will work like a charm!

 To change what paths should be linked, simply edit the marked array below!

*/

/* eslint-disable no-var */
const os = require('os');
const exec = require('child_process').exec;

const win32ExecStr =
  'if not exist "./node_modules/__FROM__" mklink /J "./node_modules/__FROM__" "./__TO__"';
const nixExecStr =
  'rm -rf ./node_modules/__FROM__ && ln -sf ../__TO__ ./node_modules/__FROM__';

var isPlatformNix = os.platform() !== 'win32';

// CHANGE FOLDERS HERE! (a friendly reminder) <--
['confs', 'localization', 'pages', 'tests', 'tools'].forEach(path => {
  let to;
  let from;

  if (path && path.constructor === Array) {
    to = path[0];
    from = path[1];
  }

  if (typeof path === 'string') {
    to = path;
    from = path;
  }

  const execStr = isPlatformNix ? nixExecStr : win32ExecStr;

  to &&
    from &&
    (exec(execStr.replace(/__FROM__/g, from).replace(/__TO__/g, to)) &&
      console.log('<<SYMLINK>> ' + from + ' --> ' + to));
});
