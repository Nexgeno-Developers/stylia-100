"use client";

import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface ImageData {
  src: string;
  alt: string;
}

export const LuxuryGallery: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const titleContainerRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const row1Ref = useRef<HTMLDivElement>(null);
  const row2Ref = useRef<HTMLDivElement>(null);
  const row3Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // === PIN SECTION ===
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: "+=300%",
        pin: true,
        scrub: 1,
        anticipatePin: 1,
      });

      // === TITLE: START AT TOP → MOVE TO CENTER + FADE/BLUR ===
      const titleTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=80%",
          scrub: 1.3,
        },
      });

      titleTl
        .fromTo(
          titleRef.current,
          {
            scale: 0.75,
            y: -100,
          },
          {
            scale: 1,
            opacity: 1,
            filter: "blur(0px)",
            y: 0,
            ease: "power3.out",
          }
        )
        .to(titleContainerRef.current, {
          yPercent: 20, // Move from top → center
          ease: "none",
        }, 0);

      // Subtle fade + blur as content scrolls
      gsap.to(titleRef.current, {
        opacity: 0.6,
        ease: "power2.inOut",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "10% top",
          end: "+=160%",
          scrub: 1.5,
        },
      });

      // === GALLERY UPWARD SCROLL ===
      gsap.to(containerRef.current, {
        yPercent: -60,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=300%",
          scrub: 1,
        },
      });

      // === ROW FLIP-UP ANIMATION (REUSABLE) ===
      const animateRow = (rowRef: React.RefObject<HTMLDivElement>, staggerDelay = 0) => {
        const images = gsap.utils.toArray<HTMLElement>(
          rowRef.current?.querySelectorAll(".gallery-image-wrapper") || []
        );

        images.forEach((img, i) => {
          gsap.fromTo(
            img,
            {
              rotateX: 75,
              y: 320,
              opacity: 1,
              scale: 0.9,
              transformOrigin: "center bottom",
            },
            {
              rotateX: 0,
              y: 0,
              opacity: 1,
              scale: 1,
              duration: 1.3,
              ease: "power4.out",
              delay: staggerDelay + i * 0.15,
              scrollTrigger: {
                trigger: rowRef.current,
                start: "top 80%",
                end: "top 45%",
                scrub: 1.7,
                toggleActions: "play reverse play reverse",
              },
            }
          );
        });
      };

      // Animate all rows with progressive delay
      animateRow(row1Ref, 0);
      animateRow(row2Ref, 1.5);
      animateRow(row3Ref, 2.0);

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // === GALLERY IMAGE COMPONENT ===
  const GalleryImage: React.FC<{ src: string; alt: string; className?: string }> = ({
    src,
    alt,
    className = "",
  }) => (
    <motion.div
      className={`gallery-image-wrapper relative z-10 ${className}`}
      style={{
        transformStyle: "preserve-3d",
        perspective: "1400px",
      }}
      whileHover={{
        z: 100,
        transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
      }}
    >
      <div className="relative w-full h-full overflow-hidden rounded-2xl shadow-2xl bg-gray-100">
        <motion.img
          src={src}
          alt={alt}
          className="w-full h-full object-cover"
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      </div>
    </motion.div>
  );

  const images: ImageData[] = [
    { src: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=700&h=400&fit=crop", alt: "Collection 1" },
    { src: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=700&h=400&fit=crop", alt: "Collection 2" },
    { src: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1200&h=400&fit=crop", alt: "Collection 3" },
    { src: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=700&h=400&fit=crop", alt: "Collection 4" },
    { src: "https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?w=700&h=400&fit=crop", alt: "Collection 5" },
  ];

  return (
    <>
      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Kumbh+Sans:wght@700;800;900&display=swap');
        * { font-family: 'Kumbh Sans', sans-serif; }
      `}</style>

      <section
        ref={sectionRef}
        className="relative w-full h-screen bg-gradient-to-b from-zinc-50 via-white to-zinc-50 overflow-hidden"
      >
        {/* === TITLE: STARTS AT TOP → MOVES TO CENTER (BEHIND IMAGES) === */}
        <div
          ref={titleContainerRef}
          className="absolute inset-0 flex flex-col justify-start items-center z-0 pointer-events-none pt-[18vh]"
        >
          <h1
            ref={titleRef}
            className="text-black font-black text-[140px] md:text-[180px] leading-[88%] text-center tracking-tighter"
            style={{
              textShadow: "0 20px 50px rgba(0,0,0,0.15)",
            }}
          >
            Our<br />Gallery
          </h1>
        </div>

        {/* === GALLERY CONTENT (SCROLLS UP, IN FRONT OF TITLE) === */}
        <div
          ref={containerRef}
          className="relative z-20 w-full max-w-[1400px] mx-auto px-6 md:px-12 pt-[35vh] space-y-8"
        >
          {/* ROW 1 */}
          <div ref={row1Ref} className="flex flex-col md:flex-row justify-center items-center gap-8">
            <GalleryImage src={images[0].src} alt={images[0].alt} className="w-full md:w-[590px] h-[350px]" />
            <GalleryImage src={images[1].src} alt={images[1].alt} className="w-full md:w-[590px] h-[350px]" />
          </div>

          {/* ROW 2 */}
          <div ref={row2Ref} className="flex justify-center">
            <GalleryImage src={images[2].src} alt={images[2].alt} className="w-full max-w-[1100px] h-[400px]" />
          </div>

          {/* ROW 3 */}
          <div ref={row3Ref} className="flex flex-col md:flex-row justify-center items-center gap-8">
            <GalleryImage src={images[3].src} alt={images[3].alt} className="w-full md:w-[590px] h-[350px]" />
            <GalleryImage src={images[4].src} alt={images[4].alt} className="w-full md:w-[590px] h-[350px]" />
          </div>
        </div>
      </section>
    </>
  );
};
