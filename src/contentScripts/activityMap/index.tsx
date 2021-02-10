import ReactDOM from 'react-dom';

import App from './app';

// 只针对个人主页 homepage 生效
const selectors = Array.from(
  document.getElementsByClassName('homepage-header'),
);

const target = selectors[0];

if (target) {
  console.log(target);
  // 创建容器
  const container = document.createElement('div');
  target?.prepend(container);
  // @ts-ignore
  ReactDOM.render(<App />, container);
}
