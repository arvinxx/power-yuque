// @ts-nocheck
import React from 'react';
import { ApplyPluginsType } from '/Users/runner/work/power-yuque/power-yuque/node_modules/@umijs/runtime';
import * as umiExports from './umiExports';
import { plugin } from './plugin';

export function getRoutes() {
  const routes = [
  {
    "path": "/option.html",
    "exact": true,
    "component": require('@/pages/options').default
  },
  {
    "path": "/index.html",
    "exact": true,
    "component": require('@/pages/popup').default
  },
  {
    "path": "/",
    "exact": true,
    "component": require('@/pages/popup').default
  }
];

  // allow user to extend routes
  plugin.applyPlugins({
    key: 'patchRoutes',
    type: ApplyPluginsType.event,
    args: { routes },
  });

  return routes;
}
