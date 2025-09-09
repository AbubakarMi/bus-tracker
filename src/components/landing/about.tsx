import Image from 'next/image';

export function About() {
  return (
    <section id="about" className="bg-muted py-16 sm:py-24">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div className="space-y-4">
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
          <div className="overflow-hidden rounded-lg shadow-lg">
            <Image
              src="https://picsum.photos/600/400"
              alt="Aliko Dangote University of Science and Technology, Wudil"
              data-ai-hint="university building"
              width={600}
              height={400}
              className="h-full w-full object-cover transition-transform hover:scale-105"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
