import { useSize } from 'ahooks';
import { useSpring, animated } from 'react-spring';

import { forwardRef } from 'react';

interface AnimatedHeightProps {
  maxHeight: number;
}
const AnimatedHeight = forwardRef<HTMLDivElement, AnimatedHeightProps>(
  ({ children, maxHeight }, ref) => {
    // @ts-ignore
    const { height } = useSize(ref);

    const animaHeightStyle = useSpring({
      height: height || 0,
    });

    return (
      <animated.div style={animaHeightStyle}>
        <div
          ref={ref}
          style={{ maxHeight, overflowY: 'scroll', scrollBehavior: 'smooth' }}
        >
          {children}
        </div>
      </animated.div>
    );
  },
);

export default AnimatedHeight;
