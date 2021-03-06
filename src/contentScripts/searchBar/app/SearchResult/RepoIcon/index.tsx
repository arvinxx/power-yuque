import type { FC } from 'react';
import { ReactComponent as BookSvg } from './book.svg';
import { ReactComponent as ColumnSvg } from './column.svg';
import { ReactComponent as DesignSvg } from './design.svg';
import { ReactComponent as ResourceSvg } from './resource.svg';
import { ReactComponent as DocSvg } from './doc.svg';
import { ReactComponent as TopicSvg } from './topic.svg';
import { ReactComponent as ArtboardSvg } from './artboard.svg';

const RepoIcon: FC<{ type: string }> = ({ type }) => {
  switch (type) {
    case 'artboard':
      return <ArtboardSvg />;
    case 'topic':
      return <TopicSvg />;
    case 'doc':
      return <DocSvg />;
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
