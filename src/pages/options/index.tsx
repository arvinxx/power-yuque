import React from 'react';
import { Button, Input } from 'antd';
import { useYuqueTokenService, YuqueTokenService } from '@/services';

import './App.less';

const App = () => {
  const yuqueTokenService = useYuqueTokenService();
  const { setYuqueToken, token, syncToCloudStorage } = yuqueTokenService;
  return (
    <YuqueTokenService.Provider value={yuqueTokenService}>
      语雀 Token:
      <Input
        placeholder={'token'}
        value={token}
        onChange={(e) => {
          setYuqueToken(e.target.value);
        }}
      />
      <Button onClick={syncToCloudStorage}>保存</Button>
    </YuqueTokenService.Provider>
  );
};

export default App;
