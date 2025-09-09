import Image from 'next/image';

export function About() {
  return (
    <section id="about" className="bg-muted py-16 sm:py-24">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="relative grid items-center gap-12 lg:grid-cols-5">
          <div className="lg:col-span-3">
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
          <div className="relative h-80 lg:col-span-3 lg:h-full">
            <div className="absolute inset-0 -left-1/4 -right-1/4 overflow-hidden rounded-lg shadow-2xl lg:left-auto lg:-right-12">
              <Image
                src="https://picsum.photos/seed/uni-library/800/600"
                alt="University library or study hall"
                data-ai-hint="university library"
                fill
                className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
