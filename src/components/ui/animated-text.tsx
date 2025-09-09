
'use client';

import * as React from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';
import { cn } from '@/lib/utils';

interface AnimatedTextProps extends React.HTMLAttributes<HTMLDivElement> {
  text: string;
  el?: keyof JSX.IntrinsicElements;
  stagger?: number;
  once?: boolean;
}

export const AnimatedText = ({ text, el: Wrapper = 'p', className, stagger = 0, once = false, ...props }: AnimatedTextProps) => {
  const words = text.split(' ');
  const controls = useAnimation();
  const ref = React.useRef(null);
  const inView = useInView(ref, { once });

  React.useEffect(() => {
    if (inView) {
      controls.start('visible');
    } else {
      controls.start('hidden');
    }
  }, [controls, inView]);

  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.05, delayChildren: 0.04 * i },
    }),
  };

  const child = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        damping: 12,
        stiffness: 100,
      },
    },
    hidden: {
      opacity: 0,
      y: 20,
      transition: {
        type: 'spring',
        damping: 12,
        stiffness: 100,
      },
    },
  };

  return (
    <Wrapper className={cn(className)} {...props} ref={ref}>
      <motion.span
        variants={container}
        initial="hidden"
        animate={controls}
        custom={stagger}
        aria-label={text}
      >
        {words.map((word, index) => (
          <motion.span
            variants={child}
            key={index}
            style={{ display: 'inline-block', marginRight: '0.25em' }}
            aria-hidden="true"
          >
            {word}
          </motion.span>
        ))}
      </motion.span>
    </Wrapper>
  );
};
