// @ts-nocheck
import { plugin } from './plugin';
import * as Plugin_0 from '../plugin-initial-state/runtime';
import * as Plugin_1 from '/Users/runner/work/power-yuque/power-yuque/src/.umi/plugin-locale/runtime.tsx';
import * as Plugin_2 from '../plugin-model/runtime';

  plugin.register({
    apply: Plugin_0,
    path: '../plugin-initial-state/runtime',
  });
  plugin.register({
    apply: Plugin_1,
    path: '/Users/runner/work/power-yuque/power-yuque/src/.umi/plugin-locale/runtime.tsx',
  });
  plugin.register({
    apply: Plugin_2,
    path: '../plugin-model/runtime',
  });
