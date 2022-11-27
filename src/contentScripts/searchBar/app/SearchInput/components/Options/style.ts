import { createStyles } from '@/hooks/useStyles';
import { css } from '@emotion/css';

export const useStyles = createStyles(({ token }) => {
  return {
    container: css`
      display: flex;
      justify-content: space-between;
      padding: 8px 12px;
      user-select: none;
    `,

    option: css`
      padding: 2px 6px;
      background: ${token.colorFillSecondary};
      border-radius: 4px;
      cursor: pointer;
      transition: all 150ms ease-in-out;
    `,

    active: css`
      color: ${token.colorPrimaryText};
      background: ${token.colorPrimaryBg};
    `,

    selected: css`
      color: white;
      background: ${token.colorPrimary};
    `,
  };
});
