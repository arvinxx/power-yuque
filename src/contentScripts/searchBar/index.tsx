import ReactDOM from 'react-dom';

import App from './app';

// 创建容器
const container = document.createElement('div');
document.body.append(container);
ReactDOM.render(<App />, container);
