import { createStyles } from '@/hooks/useStyles';
import { css } from '@emotion/css';

export const useStyles = createStyles(({ token }) => {
  return {
    container: css`
      height: 100vh;
      padding: 24px;
      background: ${token.colorBgLayout};
    `,

    menu: css`
      width: 200px;
      min-height: 400px;
      padding-top: 12px;
    `,

    card: css`
      display: flex;
      background: ${token.colorBgContainer};
      border-radius: 4px;
    `,

    content: css`
      width: 100%;
      padding: 24px;
    `,
  };
});
