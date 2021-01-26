import { useContext, useEffect } from 'react';

import { SearchBarService } from './useSearchBarService';
import { YuqueTokenService } from '@/services';

/**
 * SearchInput 需要的状态
 */
export const useCheckTokenValidService = () => {
  const { visible } = useContext(SearchBarService);

  const { checkTokenValid, valid } = useContext(YuqueTokenService);

  useEffect(() => {
    // 可见且 token 无效时 检查 token
    if (visible && !valid) {
      checkTokenValid();
    }
  }, [visible, checkTokenValid]);

  useEffect(() => {
    checkTokenValid();
  }, []);

  return valid;
};
