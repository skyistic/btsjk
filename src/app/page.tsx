"use client";
import styles from "./page.module.css";
import { motion, useScroll, useTransform, AnimatePresence, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import FluidImage from "./components/FluidImage";

type ImageGridLayout = 'right' | 'left' | 'bottom' | 'top' | 'columns' | 'rows';

function LazyFluidImage({ 
  src, 
  alt, 
  className, 
  fluidIntensity = 0.004, 
  cursorRadius = 0.003 
}: { 
  src: string; 
  alt: string; 
  className?: string;
  fluidIntensity?: number;
  cursorRadius?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const hasBeenSeenRef = useRef(false);
  const [shouldRender, setShouldRender] = useState(false);
  const isInView = useInView(ref, { 
    once: false,
  });

  // Once seen, keep the FluidImage mounted to avoid re-initialization issues
  useEffect(() => {
    if (isInView) {
      hasBeenSeenRef.current = true;
      setTimeout(() => {
        setShouldRender(true);
      }, 100);
    } else {
      setShouldRender(false);
    }
  }, [isInView]);

  return (
    <div ref={ref} className={className}>
      {shouldRender ? (
        <motion.div 
          className="w-full h-full" 
          initial={{ opacity: 0, scale: 0.9 }} 
          animate={{ opacity: 1, scale: 1 }} 
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          <FluidImage 
            src={src} 
            alt={alt} 
            fluidIntensity={fluidIntensity} 
            cursorRadius={cursorRadius} 
            className="w-full h-full" 
          />
        </motion.div>
      ) : (
        // Placeholder - shows while waiting to enter view
        <div className="w-full h-full bg-neutral-100 animate-pulse" />
      )}
    </div>
  );
}

interface ImageGridProps {
  images?: string[];
  layout?: ImageGridLayout;
  className?: string;
  gap?: number;
  fluidIntensity?: number;
  cursorRadius?: number;
  aspectRatio?: string;
}

function ImageGrid({
  images = [],
  layout = 'right',
  className = '',
  gap = 4,
  aspectRatio = "1",
  fluidIntensity = 0.004,
  cursorRadius = 0.003,
}: ImageGridProps) {
  // Handle 'columns' layout - two images side by side
  if (layout === 'columns' || layout === 'rows') {
    return (
      <div className={`${layout === 'rows' ? 'grid grid-cols-1' : 'flex flex-row'} w-full max-w-2xl items-stretch justify-center`} style={{ gap: `${gap * 0.25}rem` }}>
        {images.map((image, index) => (
          <div key={index} className="w-full flex items-center justify-center z-10" style={{ aspectRatio }}>
            <LazyFluidImage src={image} alt={`${layout}-${index + 1}`} fluidIntensity={fluidIntensity} cursorRadius={cursorRadius} className="w-full h-full" />
          </div>
        ))}
      </div>
    );
  }

  // Small images are everything after index 0 (main image)
  const smallImageSrcs = images.slice(1);

  const isHorizontal = layout === 'left' || layout === 'right';
  const isReversed = layout === 'left' || layout === 'top';

  // Dynamic width for small images column based on count
  // Fewer images = wider column to prevent vertical stretching
  const getSmallImagesWidth = () => {
    if (!isHorizontal) return 'w-full';
    if (smallImageSrcs.length <= 2) return 'w-2/5'; // Wider for 1-2 small images
    if (smallImageSrcs.length === 3) return 'w-1/3'; // Medium for 3
    return 'w-1/4'; // Narrower for 4+
  };

  // Main image component (images[0])
  const MainImage = (
    <div className="w-full flex items-center justify-center z-10" style={{ aspectRatio }}>
      <LazyFluidImage src={images[0]} alt="main" fluidIntensity={0.0006} cursorRadius={0.0006} className="w-full h-full" />
    </div>
  );

  // Small images component (images[1], images[2], ...)
  const SmallImages = smallImageSrcs.length > 0 ? (
    <div className={`flex ${isHorizontal ? `flex-col ${getSmallImagesWidth()}` : 'flex-row w-full'}`} style={{ gap: `${gap * 0.25}rem` }}>
      {smallImageSrcs.map((src, index) => (
        <div 
          key={index} 
          className={`${isHorizontal ? 'w-full flex-1' : 'flex-1 aspect-square'} flex items-center justify-center z-10`}
        >
          <LazyFluidImage 
            src={src} 
            alt={`small-${index + 1}`} 
            fluidIntensity={fluidIntensity} 
            cursorRadius={cursorRadius} 
            className="w-full h-full" 
          />
        </div>
      ))}
    </div>
  ) : null;

  // No small images - just show main image
  if (smallImageSrcs.length === 0) {
    return (
      <div className={`w-full max-w-md ${className}`}>
        {MainImage}
      </div>
    );
  }

  return (
    <div 
      className={`flex ${isHorizontal ? 'flex-row' : 'flex-col'} ${isReversed ? (isHorizontal ? 'flex-row-reverse' : 'flex-col-reverse') : ''} w-full max-w-2xl ${isHorizontal ? 'items-stretch' : 'items-center'} justify-center ${className}`}
      style={{ gap: `${gap * 0.25}rem` }}
    >
      {MainImage}
      {SmallImages}
    </div>
  );
}

function Divider() {
  return (
    <div className="w-full flex flex-row gap-4 text-black items-center justify-center border-b border-black/10">
    </div>
  );
}

function SocialLinks({ instagram, artfol }: { instagram?: string, artfol?: string }) {
  return (
    <div className="w-full flex flex-row gap-4 text-black items-center justify-center border-b border-black/10 pb-4">
      {instagram && (
        <a href={instagram} target="_blank" className="opacity-50">
          <svg xmlns="http://www.w3.org/2000/svg" width={32} height={32} viewBox="0 0 24 24"><path fill="currentColor" fillRule="evenodd" d="M12 2c-2.716 0-3.056.012-4.123.06c-1.064.049-1.791.218-2.427.465a4.9 4.9 0 0 0-1.772 1.153A4.9 4.9 0 0 0 2.525 5.45c-.247.636-.416 1.363-.465 2.427C2.011 8.944 2 9.284 2 12s.011 3.056.06 4.123c.049 1.064.218 1.791.465 2.427a4.9 4.9 0 0 0 1.153 1.772a4.9 4.9 0 0 0 1.772 1.153c.636.247 1.363.416 2.427.465c1.067.048 1.407.06 4.123.06s3.056-.012 4.123-.06c1.064-.049 1.791-.218 2.427-.465a4.9 4.9 0 0 0 1.772-1.153a4.9 4.9 0 0 0 1.153-1.772c.247-.636.416-1.363.465-2.427c.048-1.067.06-1.407.06-4.123s-.012-3.056-.06-4.123c-.049-1.064-.218-1.791-.465-2.427a4.9 4.9 0 0 0-1.153-1.772a4.9 4.9 0 0 0-1.772-1.153c-.636-.247-1.363-.416-2.427-.465C15.056 2.012 14.716 2 12 2m0 1.802c2.67 0 2.986.01 4.04.058c.976.045 1.505.207 1.858.344c.466.182.8.399 1.15.748c.35.35.566.684.748 1.15c.136.353.3.882.344 1.857c.048 1.055.058 1.37.058 4.041c0 2.67-.01 2.986-.058 4.04c-.045.976-.208 1.505-.344 1.858a3.1 3.1 0 0 1-.748 1.15c-.35.35-.684.566-1.15.748c-.353.136-.882.3-1.857.344c-1.054.048-1.37.058-4.041.058c-2.67 0-2.987-.01-4.04-.058c-.976-.045-1.505-.208-1.858-.344a3.1 3.1 0 0 1-1.15-.748a3.1 3.1 0 0 1-.748-1.15c-.137-.353-.3-.882-.344-1.857c-.048-1.055-.058-1.37-.058-4.041c0-2.67.01-2.986.058-4.04c.045-.976.207-1.505.344-1.858c.182-.466.399-.8.748-1.15c.35-.35.684-.566 1.15-.748c.353-.137.882-.3 1.857-.344c1.055-.048 1.37-.058 4.041-.058m0 11.531a3.333 3.333 0 1 1 0-6.666a3.333 3.333 0 0 1 0 6.666m0-8.468a5.135 5.135 0 1 0 0 10.27a5.135 5.135 0 0 0 0-10.27m6.538-.203a1.2 1.2 0 1 1-2.4 0a1.2 1.2 0 0 1 2.4 0" strokeWidth={0.2} stroke="currentColor"></path></svg>      
        </a>
      )}
      {artfol && (
        <a href={artfol} target="_blank" className="opacity-50"> 
          <svg version="1.0" xmlns="http://www.w3.org/2000/svg" width={26} height={26} viewBox="0 0 497.000000 496.000000" preserveAspectRatio="xMidYMid meet">
            <path d="M233.7 1.1C161.3 5 94.5 40.6 50.5 98.5c-28 36.9-43.9 77.7-49 125.5-4.7 43.5 3.6 90.2 23.3 131 6.3 13.1 14.3 26.5 18.4 30.7 7.8 8 22.7 9.8 32.4 3.8 6.5-4.1 11-10.1 12.5-17.1 1.8-8.2.2-14.5-6.8-26.3-39.8-66.6-35.3-151.9 11.4-214 7-9.4 23.4-26.4 32.8-34.1 26.7-21.9 59.9-36.4 94.8-41.5 14.2-2 40.3-2 54.2 0 26.7 4 51.5 13.2 75.7 28.2l8.8 5.4-5.6 6.2c-45.5 50.3-76.7 87.8-111 133.7-48.7 65-71.5 104.2-71.7 123.5-.2 9.6 1.8 12.6 13.6 20.4 5 3.4 11.7 8.2 14.8 10.7 7.8 6.3 11.7 6.7 20.7 2.4 12.7-6.2 35.7-31.6 67.9-75 36.3-49 76.2-108.4 106.4-158.7 5.6-9.2 10.2-16.9 10.4-17.1.7-.8 11.4 17.4 16.6 28.2 6.9 14.3 12.7 31.6 16 47.6 2.2 10.3 2.4 14 2.4 36-.1 22.7-.3 25.4-2.7 37-3.9 18.2-8.9 32.5-17.5 49.9-10.7 21.8-10.8 19.5 1 60.1 5.2 17.9 9.1 32.6 8.7 32.8-.5.2-14.3-3.6-30.7-8.5-23-6.7-31.5-8.8-37.3-9.1l-7.5-.3-15.6 8c-28.9 14.9-60.8 23.1-90 23.1-3.1 0-7.5.7-9.9 1.5-18.6 6.6-23.6 31.7-8.9 44.9 6.7 6.1 9.8 7 24.1 6.9 32.8-.3 68.5-8.6 98.5-22.8l12.2-5.7 49.3 14.3c30.9 8.9 51.6 14.4 55.5 14.7 14.9 1.1 27.8-11.2 27.7-26.3-.1-4.7-3.3-17.2-14.8-56.5L467 361.6l4.4-10.1c16.9-37.8 23.4-70.3 22.3-110.9-1-38.2-8.3-67.6-25.2-102.1-8-16.3-18.7-33.2-29-45.5-3.6-4.4-6.5-8.4-6.5-9s1.6-4.2 3.5-8.1c5.5-10.9 12.4-28.3 14.6-36.7 4.8-19 .3-24.1-14.8-16.6-6.3 3-21.7 14.4-31.7 23.2l-6.8 6.1-5.7-4C368.6 30.8 340.4 17.2 313 9.7c-25.9-7.1-52.5-10-79.3-8.6"></path>
            <path d="M232.3 88c-17.6 7-25.6 27.7-17.3 44.6 6.1 12.4 17.3 19 31 18.2 12.5-.8 23.1-8.1 28.3-19.6 3.3-7.3 3-19-.5-26.3-5.8-11.7-15.2-17.9-28.3-18.5-6.4-.4-9 0-13.2 1.6M136.7 142.1c-22.5 5.3-32.5 33.1-18.4 51.5a32.45 32.45 0 0 0 39.2 10c7.1-3.2 11.6-7.5 15.6-14.8 3.1-5.8 3.4-7 3.4-14.8-.1-7.3-.5-9.3-2.9-14-4.8-9.6-11.3-14.9-21.3-17.5-6.3-1.7-9.9-1.7-15.6-.4M117.5 254.3c-9.4 3.1-16.6 9.2-20.6 17.5-2 3.9-2.4 6.3-2.4 14.2 0 8 .4 10.2 2.3 13.8 3.6 6.7 8.8 11.9 15.4 15.2 5.3 2.6 7.2 3 14.3 3s9-.4 14.3-3c6.9-3.5 12.5-9.2 15.6-15.9 1.6-3.6 2.1-6.5 2.1-13.6 0-7.9-.4-9.7-2.7-14.2-5.7-10.7-15.5-17.1-27.4-17.8-4.3-.3-8.4 0-10.9.8M134.5 384c-12.4 2.5-26.4 11.2-34.8 21.5-2.7 3.3-6.6 9.8-8.8 14.5-7.7 16.5-9.5 19.4-15.4 25.4-3.3 3.4-12.2 10.1-19.8 15.1-7.5 4.9-13.7 9.3-13.7 9.7 0 2.3 33.5 13.1 51.7 16.8 33.4 6.7 60.9 5.7 77.7-2.7 16.2-8.1 25.8-21.5 28.7-40.3 5.3-34.5-30.3-67.1-65.6-60"></path>
          </svg>
        </a>
      )}
    </div>
  );
}

function RoundedCornerContainerAnimation({ children, className }: { children: React.ReactNode, className: string }) {
  const { scrollY } = useScroll();
  
  // Interpolate border-radius from 100px (at 0 scroll) to 0px (at 100vh scroll)
  // Using a function to dynamically get window.innerHeight
  const borderRadius = useTransform(scrollY, (value) => {
    if (typeof window === 'undefined') return 100;
    const vh = window.innerHeight;
    const progress = Math.min(value / vh, 1); // 0 to 1 over 100vh
    return 100 - (progress * 100); // 100px to 0px
  });
  
  return (
    <motion.div
      className={`${className} overflow-hidden`}
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      style={{ 
        borderTopLeftRadius: borderRadius,
        borderTopRightRadius: borderRadius,
      }}
    >
      {children}
    </motion.div>
  );
}

export default function Home() {
  return (
    <div style={{ scrollbarWidth: 'none' }} className="bg-white flex flex-col items-center justify-center min-h-screen scrollbar-hide">
      <div className="fixed w-screen h-[100vh]">
        {/* Tiling background pattern */}
        <div 
          className="fixed inset-0 w-full h-full opacity-10"
          style={{
            backgroundImage: 'url(https://i.ibb.co/jv0KYnvj/image.png)',
            backgroundRepeat: 'repeat',
            backgroundSize: '300px auto',
          }}
        />
        <div className="fixed bottom-0 left-0 w-[40vw] translate-x-1/2 ml-[10vw] aspect-[4/5]">
          <FluidImage src="https://i.ibb.co/ymyTB1Ft/2022-b2.png" alt="logo" fluidIntensity={0.0002} cursorRadius={0.001} className="w-full h-full" />
        </div>
      </div>
      <RoundedCornerContainerAnimation className="p-10 mt-[100vh] w-full min-h-screen relative bottom-0 left-0 bg-white flex flex-col items-center justify-center gap-8">
        <ImageGrid 
          images={["https://i.ibb.co/bgdpvRJp/image.png"]}
          layout="right"
          aspectRatio="4/5"
        />
        <SocialLinks instagram="https://www.instagram.com/p/DR2fq20jIt6/?img_index=1" artfol="https://artfol.app/a/dJiBr4z" />
         
        <ImageGrid 
          images={["https://i.ibb.co/4nF8TBHD/image.png", "https://i.ibb.co/r2j7jYVm/y14f-Dcn.jpg",  "https://i.ibb.co/Kx4RBqMt/23-2.png"]}
          layout="left"
          aspectRatio="1"
        />
        <SocialLinks instagram="https://www.instagram.com/p/DP_r0H0jJaq/?img_index=1" artfol="https://artfol.app/a/HsfD1MA" />
        
        <ImageGrid 
          images={["https://i.ibb.co/GvJ1zCkn/image.png"]}
          layout="right"
          aspectRatio="4/5"
        />
        <SocialLinks />
        
        <ImageGrid 
          images={["https://i.ibb.co/fGpsTb2y/image.png", "https://i.ibb.co/gLDSj88V/image.png", "https://i.ibb.co/Q3fmfZVW/image.png", "https://i.ibb.co/qYsgYDLH/image.png", "https://i.ibb.co/9kRbw3jH/image.png",  "https://i.ibb.co/6RZDv3Lk/image.png"]}
          layout="top"
          aspectRatio="4/5"
        />
        <SocialLinks instagram="https://www.instagram.com/p/DRXeqPyjNKg/?img_index=1" />
        
        <ImageGrid 
          images={["https://i.ibb.co/0RRS22tw/image.png", "https://i.ibb.co/TDY356s6/image.png", "https://i.ibb.co/rGjpDVvG/image.png",  "https://i.ibb.co/G3V1g2wX/image.png"]}
          layout="right"
          aspectRatio="4/5"
        />
        <SocialLinks instagram="https://www.instagram.com/p/DRH-2O7jIYY/?img_index=1" artfol="https://artfol.app/a/Gkt7xgE"/>
        
        <ImageGrid 
          images={["https://i.ibb.co/ZpvfGd9q/image.png", "https://i.ibb.co/BVvd9JLk/image.png",  "https://i.ibb.co/ksGwY4Mk/image.png"]}
          layout="left"
          className="aspect-[14/10]"
        />
        <SocialLinks instagram="https://www.instagram.com/p/DP_r0H0jJaq/?img_index=1" artfol="https://artfol.app/a/HsfD1MA" />
        
        <ImageGrid 
          images={["https://i.ibb.co/qMyMfwZs/image.png"]}
          layout="bottom"
          aspectRatio="4/5"
        />
        <Divider />
        
        <ImageGrid 
          images={["https://i.ibb.co/DDpfZ3Nr/image.png"]}
          layout="bottom"
          aspectRatio="1"
        />
        <Divider />
        {/*         
          <ImageGrid 
            images={["https://i.ibb.co/8gjn3LHh/image.png", "https://i.ibb.co/k6g7L81S/image.png", "https://i.ibb.co/N65f7NBK/image.png"]}
            layout="rows"
            className="aspect-[5/1]"
          />
          <SocialLinks />
        */}
        {/* Layout: single image only (no small images) */}
        <ImageGrid 
          images={["https://i.ibb.co/9kpLGksK/image.png", "https://i.ibb.co/gMTxMvqL/image.png"]}
          layout="columns"
          className="aspect-[1]"
        />
        <SocialLinks instagram="https://www.instagram.com/p/DQw62NMDNQl/?img_index=1" artfol="https://artfol.app/a/kA9g6rH" />
      </RoundedCornerContainerAnimation>
    </div>
  );
}