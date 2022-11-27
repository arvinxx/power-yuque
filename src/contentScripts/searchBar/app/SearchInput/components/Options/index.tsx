import type { FC } from 'react';
import { useContext } from 'react';
import { Checkbox, Space } from 'antd';
import cls from 'classnames';

import { SearchService } from '../../../useSearchService';
import { KeyboardService } from '../../../useKeyboardService';

import { useStyles } from './style';

const Options: FC = () => {
  const { type, setType, related, setRelated, options, optionActiveIndex } =
    useContext(SearchService);
  const { focusKey, focusOnOptions } = useContext(KeyboardService);

  const styles = useStyles();
  return (
    <div className={styles.container}>
      <Space>
        {options.map((option, index) => (
          <div
            key={option.key}
            className={cls({
              [styles.option]: true,
              [styles.active]: type === option.key,
              [styles.selected]:
                focusKey === 'options' && optionActiveIndex === index,
            })}
            onClick={() => {
              setType(option.key);
              focusOnOptions();
            }}
          >
            {option.title}
          </div>
        ))}
      </Space>

      <div>
        <Checkbox
          checked={related}
          onChange={(e) => {
            setRelated(e.target.checked);
          }}
        />
        只与我相关
      </div>
    </div>
  );
};

export default Options;
