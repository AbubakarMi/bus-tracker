import { Bus } from 'lucide-react';
import Link from 'next/link';

export function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2" aria-label="SwiftRoute Home">
      <Bus className="h-7 w-7 text-primary" />
      <span className="text-xl font-bold font-headline text-foreground">
        SwiftRoute
      </span>
    </Link>
  );
}
