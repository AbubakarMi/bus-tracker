
import Image from 'next/image';

export function About() {
  return (
    <section id="about" className="bg-muted py-16 sm:py-24">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-16">
          <div className="relative order-last lg:order-first animate-fade-in-up">
             <div className="absolute -left-4 -top-4 -bottom-4 w-2/3 rounded-lg bg-primary/10 lg:-bottom-8 lg:-left-8" />
            <div className="relative z-10 space-y-4 rounded-lg bg-card p-8 shadow-2xl lg:p-12">
              <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl">
                About Our Transport Service
              </h2>
              <p className="text-lg text-muted-foreground">
                Our transport service for ADUSTECH, Wudil was born from the need to modernize campus transportation. Our mission is to provide students and staff with a reliable, efficient, and user-friendly platform to manage their daily commutes.
              </p>
              <p className="text-lg text-muted-foreground">
                By leveraging real-time technology and a student-centric design, we aim to reduce uncertainty, improve safety, and create a more connected campus community. This project is dedicated to enhancing the student experience at the Aliko Dangote University of Science and Technology, one ride at a time.
              </p>
            </div>
          </div>
           <div className="relative h-80 w-full lg:h-[500px]">
            <Image
              src="https://picsum.photos/seed/uni-library/800/600"
              alt="University library or study hall"
              data-ai-hint="university library"
              fill
              className="rounded-lg object-cover shadow-2xl transition-transform duration-500 hover:scale-105"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
