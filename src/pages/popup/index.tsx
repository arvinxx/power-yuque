import React, { useEffect } from 'react';

const Index = () => {
  useEffect(() => {
    window.open('https://yuque.com');
  }, []);
  return <div />;
};

export default Index;
