import { createStyles } from '@/hooks/useStyles';
import { css } from '@emotion/css';

export const useStyles = createStyles(({ token }) => {
  return {
    skeleton: css`
      margin-top: 16px;
      padding: 8px 12px 24px;
    `,
    repo: css`
      width: 24px;
      margin-right: 8px;
    `,
    title: css`
      margin-bottom: 8px;
      font-size: 16px;
      em {
        color: ${token.colorPrimary};
        font-weight: bold;
        font-style: normal;
      }
    `,

    desc: css`
      color: ${token.colorTextSecondary};
    `,

    row: css`
      display: flex;
      padding: 12px;
      cursor: pointer;
      transition: background-color 300ms ease-in-out;
    `,

    selected: css`
      background: ${token.colorFillQuaternary};
    `,
  };
});
