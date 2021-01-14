import type { FC } from 'react';
import React from 'react';
import { ReactComponent as BookSvg } from './book.svg';
import { ReactComponent as ColumnSvg } from './column.svg';
import { ReactComponent as DesignSvg } from './design.svg';
import { ReactComponent as ResourceSvg } from './resource.svg';

const RepoIcon: FC<{ type: string }> = ({ type }) => {
  switch (type) {
    case 'book':
      return <BookSvg />;
    case 'design':
      return <DesignSvg />;
    case 'column':
      return <ColumnSvg />;
    case 'resource':
      return <ResourceSvg />;
    default:
      return null;
  }
};
export default RepoIcon;
