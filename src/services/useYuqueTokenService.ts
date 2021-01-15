import { useLocalStorageState } from 'ahooks';
import { getServiceToken } from '@/utils';
import { useCallback, useEffect } from 'react';

/**
 *  Yuque Token
 */
export const useYuqueTokenService = () => {
  // SearchBar 可见
  const [token, setYuqueToken] = useLocalStorageState('yuque_token', '');

  const syncToCloudStorage = useCallback(() => {
    chrome.storage.sync.set({ yuque_token: token }, () => {
      chrome.storage.sync.get(console.log);
    });
  }, [token]);

  useEffect(() => {
    chrome.storage.sync.get((data) => {
      console.log(data);
      if (data.yuque_token !== token) {
        setYuqueToken(data.yuque_token);
      }
    });
  }, []);

  return { token, setYuqueToken, syncToCloudStorage };
};

// 这个服务将被注册至全局
export const YuqueTokenService = getServiceToken(useYuqueTokenService);
