import { ConfigProvider, message as staticMessage } from 'antd';
import { FC, ReactNode, useEffect } from 'react';
import { MessageInstance } from 'antd/es/message/interface';

export let message = {} as MessageInstance;
interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: FC<ThemeProviderProps> = ({ children }) => {
  const [instance, context] = staticMessage.useMessage();

  useEffect(() => {
    message = instance;
  }, []);

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: 'hsl(146, 51%, 52%)',
        },
      }}
    >
      {context}
      {children}
    </ConfigProvider>
  );
};
