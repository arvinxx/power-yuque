import { useMemo } from 'react';
import { GlobalToken } from 'antd/es/theme/interface';
import { theme } from 'antd';

export const createStyles =
  <T, R>(createStyleFn: (theme: { token: GlobalToken }, props?: T) => R) =>
  (props?: T): R => {
    const { token } = theme.useToken();

    return useMemo(() => {
      //
      return createStyleFn({ token }, props);
    }, [token]);
  };
