
'use client';

export function HeroAnimation() {
  const lineCount = 20;

  return (
     <div className="absolute inset-0 z-0 opacity-50 dark:opacity-40">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/80 to-background" />
        <div className="absolute inset-0 h-full w-full perspective-1000">
             {Array.from({ length: lineCount }).map((_, i) => (
                <div
                    key={i}
                    className="hero-road-line-animation absolute left-1/2 top-1/2 h-1/2 w-px bg-gradient-to-b from-transparent via-primary/50 to-transparent"
                    style={{ 
                        transform: `translateX(-50%) translateY(-50%) rotate(${i * (360 / lineCount)}deg) `,
                        animationDelay: `${i * 0.2}s`,
                     }}
                />
            ))}
             <div className="absolute inset-0 rounded-full bg-background [mask-image:radial-gradient(ellipse_at_center,transparent_30%,black)]"></div>
        </div>
    </div>
  );
}
