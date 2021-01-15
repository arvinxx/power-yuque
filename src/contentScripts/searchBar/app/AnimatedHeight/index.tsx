import type { FC } from 'react';
import React, { useRef } from 'react';

import { useSize } from 'ahooks';
import { useSpring, animated } from 'react-spring';

interface AnimatedHeightProps {
  maxHeight: number;
}
const AnimatedHeight: FC<AnimatedHeightProps> = ({ children, maxHeight }) => {
  const ref = useRef(null);
  const { height } = useSize(ref);

  const animaHeightStyle = useSpring({
    height: height || 0,
  });

  return (
    <animated.div style={animaHeightStyle}>
      <div ref={ref} style={{ maxHeight, overflowY: 'scroll' }}>
        {children}
      </div>
    </animated.div>
  );
};

export default AnimatedHeight;
