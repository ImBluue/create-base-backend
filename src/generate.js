const path = require('path');
const fs = require('fs');
const ejs = require('ejs');

module.exports = {
  generate: async (options) => {
    // Function to copy recursively sync
    const copyRecursiveSync = function (src, dest) {
      const exists = fs.existsSync(src);
      const stats = exists && fs.statSync(src);
      const isDirectory = exists && stats.isDirectory();
      if (isDirectory) {
        if (!fs.existsSync(dest))
            fs.mkdirSync(dest);
        fs.readdirSync(src).forEach((childItemName) => {
          copyRecursiveSync(
            path.join(src, childItemName),
            path.join(dest, childItemName)
          );
        });
      } else {
        fs.copyFileSync(src, dest);
      }
    };

    // Function to render file with ejs
    const renderFile = (path, data) => {
      ejs.renderFile(path, data, (err, str) => {
        if (err) throw err;
        fs.writeFileSync(path, str);
      });
    };

    // Set src and dest directory
    const srcDir = path.resolve(__dirname, './template/');
    const destDir = `./${options.name}`;

    // Copy the template recursively
    copyRecursiveSync(srcDir, destDir);

    // Render the README and package.json (name)
    renderFile(path.resolve(destDir, 'README.md'), options);
    renderFile(path.resolve(destDir, 'package.json'), options);
  },
};
