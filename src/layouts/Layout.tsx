import { ThemeProvider } from '@/components';
import { FC, ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
}
const Layout: FC<LayoutProps> = ({ children }) => {
  return <ThemeProvider>{children}</ThemeProvider>;
};

export default Layout;
