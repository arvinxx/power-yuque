import { useHotkeys } from 'react-hotkeys-hook';
import { useContext } from 'react';

import { SearchBarService } from './useSearchBarService';

export const useKeyboardTrigger = () => {
  const { visible, hide, trigger } = useContext(SearchBarService);

  useHotkeys(
    'command+shift+F',
    () => {
      trigger();
    },
    [visible],
  );

  useHotkeys('Esc', () => {
    hide();
  });
};
