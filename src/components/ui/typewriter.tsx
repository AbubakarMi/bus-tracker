
'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

interface TypewriterProps extends React.HTMLAttributes<HTMLDivElement> {
  text: string;
  speed?: number;
  delay?: number;
}

export function Typewriter({ text, speed = 50, delay = 0, className, ...props }: TypewriterProps) {
  const [displayedText, setDisplayedText] = React.useState('');
  const [isTyping, setIsTyping] = React.useState(false);

  React.useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const startTyping = () => {
      setIsTyping(true);
      setDisplayedText('');
      let i = 0;
      const intervalId = setInterval(() => {
        if (i < text.length) {
          setDisplayedText((prev) => prev + text.charAt(i));
          i++;
        } else {
          clearInterval(intervalId);
          setIsTyping(false);
        }
      }, speed);
    };

    if (delay > 0) {
      timeoutId = setTimeout(startTyping, delay);
    } else {
      startTyping();
    }

    return () => {
      clearTimeout(timeoutId);
    };
  }, [text, speed, delay]);

  const hasFinishedTyping = displayedText.length === text.length;

  return (
    <div className={cn('inline', className)} {...props}>
      <span className="break-words">
        {displayedText}
      </span>
      <span
        className={cn(
          'inline-block h-full w-[2px] animate-pulse bg-primary align-text-bottom',
          (isTyping || !hasFinishedTyping) ? 'opacity-100' : 'opacity-0'
        )}
        style={{ animation: 'blink-caret 1s step-end infinite' }}
      ></span>
    </div>
  );
}

// Keyframes for the blinking cursor, to be added to globals.css
/*
@keyframes blink-caret {
  from,
  to {
    background-color: transparent;
  }
  50% {
    background-color: hsl(var(--primary));
  }
}
*/
