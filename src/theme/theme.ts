/* istanbul ignore file */
import fs from 'fs';
import lessToJs from 'less-vars-to-js';
import path from 'path';

const themeVariables = lessToJs(
  fs.readFileSync(path.join(__dirname, './override.less'), 'utf8'),
);

export default themeVariables;
