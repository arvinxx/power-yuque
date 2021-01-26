import { useLocalStorageState } from 'ahooks';
import { useCallback, useEffect, useState } from 'react';
import { message } from 'antd';
import request from 'umi-request';

import { getServiceToken } from '@/utils';

/**
 *  Yuque Token
 */
export const useYuqueTokenService = () => {
  // SearchBar 可见
  const [token, setYuqueToken] = useLocalStorageState('PY_YUQUE_TOKEN', '');

  const syncToCloudStorage = useCallback(() => {
    chrome.storage?.sync.set({ yuque_token: token });
    message.success('保存成功');
  }, [token]);

  const resetToken = useCallback(() => {
    chrome.storage?.sync.set({ yuque_token: '' });
    setYuqueToken('');
  }, []);

  const [valid, setValid] = useState(false);

  /**
   * 验证 token 是否有效
   */
  const checkTokenValid = useCallback(async () => {
    // 如果验证过有效,就不验证了
    if (valid) return;

    try {
      await request.get('https://www.yuque.com/api/v2/hello', {
        headers: {
          'X-Auth-Token': token || '',
          'Access-Control-Allow-Origin': '*',
        },
        getResponse: true,
      });

      setValid(true);
      return true;
    } catch (e) {
      setValid(false);
      return false;
    }
  }, [token, valid]);

  // 初始化时做一次检查
  useEffect(() => {
    chrome.storage?.sync.get((data) => {
      if (data.yuque_token !== token) {
        setYuqueToken(data.yuque_token);
      }
    });
  }, []);

  return {
    token,
    setYuqueToken,
    syncToCloudStorage,
    valid,
    checkTokenValid,
    resetToken,
  };
};

// 这个服务将被注册至全局
export const YuqueTokenService = getServiceToken(useYuqueTokenService);
