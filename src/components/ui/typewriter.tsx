
'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { useInView } from 'react-intersection-observer';

interface TypewriterProps extends React.HTMLAttributes<HTMLDivElement> {
  text: string | string[];
  speed?: number;
  delay?: number;
  loop?: boolean;
}

export function Typewriter({
  text,
  speed = 100,
  delay = 0,
  loop = false,
  className,
  ...props
}: TypewriterProps) {
  const [currentTextIndex, setCurrentTextIndex] = React.useState(0);
  const [displayedText, setDisplayedText] = React.useState('');
  const [isTyping, setIsTyping] = React.useState(false);
  const [isDeleting, setIsDeleting] = React.useState(false);

  const { ref, inView } = useInView({
    triggerOnce: !loop,
    threshold: 0.6,
  });

  const textArray = Array.isArray(text) ? text : [text];
  const currentText = textArray[currentTextIndex];

  React.useEffect(() => {
    if (!inView) return;

    let timeoutId: NodeJS.Timeout;

    const handleTyping = () => {
      let i = displayedText.length;

      if (isDeleting) {
        if (i > 0) {
          setDisplayedText((prev) => prev.substring(0, prev.length - 1));
          timeoutId = setTimeout(handleTyping, speed / 2);
        } else {
          setIsDeleting(false);
          setCurrentTextIndex((prev) => (prev + 1) % textArray.length);
        }
      } else {
        if (i < currentText.length) {
          setDisplayedText((prev) => prev + currentText.charAt(i));
          timeoutId = setTimeout(handleTyping, speed);
        } else {
          // Finished typing current string
          if (currentTextIndex < textArray.length - 1) {
            // If there are more strings, move to the next one
            timeoutId = setTimeout(() => {
              setCurrentTextIndex((prev) => prev + 1);
              setDisplayedText(''); // Clear for next text
            }, 1000); // Pause before typing next string
          } else if (loop) {
            timeoutId = setTimeout(() => setIsDeleting(true), 2000); // Pause before deleting if looping
          } else {
            setIsTyping(false); // End of all texts and not looping
          }
        }
      }
    };
    
    if (!isTyping && inView) {
       const startTimeout = setTimeout(() => {
         setIsTyping(true);
         handleTyping();
       }, delay);
       return () => clearTimeout(startTimeout);
    }
    
    if(isTyping) {
        handleTyping();
    }


    return () => {
      clearTimeout(timeoutId);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, isDeleting, currentText]);

  // Reset state when it goes out of view if looping
  React.useEffect(() => {
    if (!inView && loop) {
      setDisplayedText('');
      setCurrentTextIndex(0);
      setIsTyping(false);
      setIsDeleting(false);
    }
  }, [inView, loop]);


  return (
    <div ref={ref} className={cn('block min-h-[280px]', className)} {...props}>
      <h2
        className={cn(
          'font-headline text-3xl font-bold tracking-tighter sm:text-4xl transition-opacity duration-300',
          currentTextIndex === 0 ? 'opacity-100' : 'opacity-0 max-h-0'
        )}
      >
        {currentTextIndex === 0 && (
          <>
            <span className="break-words">{displayedText}</span>
            <span
              className={cn(
                'inline-block h-[2.2rem] w-[3px] ml-1 bg-primary align-bottom',
                 isTyping ? 'animate-pulse' : 'opacity-0'
              )}
              style={{ animation: 'blink-caret 1s step-end infinite' }}
            ></span>
          </>
        )}
      </h2>
      <div
        className={cn(
          'text-lg text-muted-foreground space-y-4 transition-opacity duration-300',
          currentTextIndex > 0 ? 'opacity-100' : 'opacity-0 max-h-0'
        )}
      >
        {currentTextIndex > 0 && (
           <>
            <p className="break-words">{textArray[1]}</p>
            <p className="break-words">{textArray[2]}</p>
          </>
        )}
      </div>
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
