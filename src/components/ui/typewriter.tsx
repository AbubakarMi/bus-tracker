
'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

interface TypewriterProps extends React.HTMLAttributes<HTMLDivElement> {
  text: string;
  speed?: number;
  delay?: number;
  loop?: boolean;
}

export function Typewriter({ text, speed = 50, delay = 0, loop = true, className, ...props }: TypewriterProps) {
  const [displayedText, setDisplayedText] = React.useState('');
  const [isTyping, setIsTyping] = React.useState(true);
  const [isDeleting, setIsDeleting] = React.useState(false);

  React.useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const handleTyping = () => {
      let i = displayedText.length;

      if (isDeleting) {
        if (i > 0) {
          setDisplayedText((prev) => prev.substring(0, prev.length - 1));
          timeoutId = setTimeout(handleTyping, speed / 2);
        } else {
          setIsDeleting(false);
          if (loop) {
            timeoutId = setTimeout(handleTyping, 500); // Pause before re-typing
          } else {
             setIsTyping(false);
          }
        }
      } else {
        if (i < text.length) {
          setDisplayedText((prev) => prev + text.charAt(i));
          timeoutId = setTimeout(handleTyping, speed);
        } else {
          if (loop) {
            timeoutId = setTimeout(() => setIsDeleting(true), 2000); // Pause before deleting
          } else {
            setIsTyping(false);
          }
        }
      }
    };
    
    const start = () => {
      setIsTyping(true);
      timeoutId = setTimeout(handleTyping, speed);
    }
    
    const startTimeout = setTimeout(start, delay);

    return () => {
      clearTimeout(timeoutId);
      clearTimeout(startTimeout);
    };
  }, [text, speed, delay, loop, isDeleting, displayedText]);

  return (
    <div className={cn('inline', className)} {...props}>
      <span className="break-words">
        {displayedText}
      </span>
      <span
        className={cn(
          'inline-block h-full w-[2px] animate-pulse bg-primary align-text-bottom',
          isTyping ? 'opacity-100' : 'opacity-0'
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
