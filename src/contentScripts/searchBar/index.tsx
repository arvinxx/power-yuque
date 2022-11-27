import client from 'react-dom/client';

import App from './app';
import Layout from '@/layouts/Layout';

// 创建容器
const container = document.createElement('div');
document.body.append(container);

const root = client.createRoot(container);

root.render(
  <Layout>
    <App />
  </Layout>,
);
