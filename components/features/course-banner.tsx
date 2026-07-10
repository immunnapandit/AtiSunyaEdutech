import Image from "next/image";
export function CourseBanner() {
    return (
  <section className="relative h-[420Spx] w-full overflow-hidden">
    <Image
  src="/images/banners/courses-banner.png"
  alt="Courses Banner"
  fill
 className="object-cover object-center brightness-50"
/>
  </section>
);
}