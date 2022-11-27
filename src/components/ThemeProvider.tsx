import { ConfigProvider, message as staticMessage, theme } from 'antd';
import { FC, ReactNode, useEffect, useState } from 'react';
import $ from 'jquery';

import { MessageInstance } from 'antd/es/message/interface';

export let message = {} as MessageInstance;
interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: FC<ThemeProviderProps> = ({ children }) => {
  const [instance, context] = staticMessage.useMessage();

  const [isDark, setIsDark] = useState(false);
  useEffect(() => {
    message = instance;
  }, []);

  useEffect(() => {
    const mode = $('html').attr('data-kumuhana');

    setIsDark(mode === 'pouli');
  });

  return (
    <ConfigProvider
      prefixCls={'pw-yq'}
      theme={{
        token: {
          colorPrimary: '#46c37c',
        },
        algorithm: isDark ? theme.darkAlgorithm : theme.defaultAlgorithm,
      }}
    >
      {context}
      {children}
    </ConfigProvider>
  );
};
