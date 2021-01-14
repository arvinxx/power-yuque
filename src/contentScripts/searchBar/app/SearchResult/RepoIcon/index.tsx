import type { FC } from 'react';
import React from 'react';
import { ReactComponent as BookSvg } from './book.svg';
import { ReactComponent as ColumnSvg } from './column.svg';
import { ReactComponent as DesignSvg } from './design.svg';

const RepoIcon: FC<{ type: string }> = ({ type }) => {
  switch (type) {
    case 'book':
      return <BookSvg />;
    case 'design':
      return <DesignSvg />;
    case 'column':
      return <ColumnSvg />;
    default:
      return null;
  }
};
export default RepoIcon;
