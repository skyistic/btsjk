"use client";
import styles from "./page.module.css";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import Topbar from "./components/topbar";
import { Footer } from "./components/footer";
import { useState } from "react";

// YouTube iframe API types
declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady: () => void;
  }
}

function PlayIcon({ size }: { size: number }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24"><g fill="none" fillRule="evenodd"><path d="m12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035q-.016-.005-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093q.019.005.029-.008l.004-.014l-.034-.614q-.005-.018-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z"></path><path fill="currentColor" d="M5.669 4.76a1.47 1.47 0 0 1 2.04-1.177c1.062.454 3.442 1.533 6.462 3.276c3.021 1.744 5.146 3.267 6.069 3.958c.788.591.79 1.763.001 2.356c-.914.687-3.013 2.19-6.07 3.956c-3.06 1.766-5.412 2.832-6.464 3.28c-.906.387-1.92-.2-2.038-1.177c-.138-1.142-.396-3.735-.396-7.237c0-3.5.257-6.092.396-7.235" strokeWidth={0.4} stroke="currentColor"></path></g></svg>  )
}

export default function Home() {
  const { scrollYProgress } = useScroll();
  const x = useTransform(scrollYProgress, [0, 1], [-10, -1400]);
  const y = useTransform(scrollYProgress, [0, 1], [0, 0]);
  const rotateX = useTransform(scrollYProgress, [0, 1], [0, -110]);
  const rotateY = useTransform(scrollYProgress, [0, 1], [0, -230]);
  const rotateZ = useTransform(scrollYProgress, [0, 1], [10, -20]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.5]);
  const [activeTab, setActiveTab] = useState('3d');
  const [previousTab, setPreviousTab] = useState('3d');
  const [isTransitioning, setIsTransitioning] = useState(false);
  
  const tabs = [
    { id: '3d', label: '3D', active: activeTab === '3d', url: 'mHNCM-YALSA', thumbnail: 'https://www.udiscovermusic.com/wp-content/uploads/2023/09/bts-jung-kook-3d-video.jpg' },
    { id: 'song', label: 'Standing Next To You', active: activeTab === 'song', url: 'UNo0TG9LwwI', thumbnail: 'https://i.imgur.com/QarAvdR.png' },
    { id: 'hate', label: 'Hate You', active: activeTab === 'hate', url: 'tAcKfnf0zv4', thumbnail: 'https://i.imgur.com/z2yJY4F.png' }
  ];
  
  const activeTabData = tabs.find(tab => tab.id === activeTab) || tabs[0];
  const previousTabData = tabs.find(tab => tab.id === previousTab) || tabs[0];

  return (
    <main className="relative bg-[#F2F5F5] w-screen flex items-center justify-center m-0 p-0">
      <Topbar />
      
      {/* Hero Section */}
      <header className="fixed max-h-screen aspect-[1] w-screen z-20 top-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <motion.div 
            className="w-[50vw] sm:w-[30vw] aspect-[3/2] bg-[#014131] rounded-lg shadow-[0_8px_30px_rgb(0,0,0,0.1)]"
            style={{ 
              transformStyle: "preserve-3d",
              perspective: "1000px",
              rotateX,
              rotateY,
              rotateZ,
              scale
            }}
            initial={{ 
              rotateY: 110,
              rotateX: -30,
              rotateZ: 0,
              scale: 0.3,
              opacity: 0,
              z: -200
            }}
            animate={{ 
              rotateY: 0,
              rotateX: 0,
              rotateZ: 10,
              scale: 1,
              opacity: 1,
              z: 0
            }}
            transition={{ 
              duration: 1, 
              ease: [0.34, 1.1, 0.64, 1],
              delay: 0.1
            }}
          >
            <img src="https://i.imgur.com/Ki1RqDD.png" alt="MNI Jungkook Official Logo - BTS Golden Maknae" className="w-full h-full p-10 object-cover" />
          </motion.div>
        </div>
      </header>
        
      <motion.div
        className="fixed max-h-screen aspect-[1] w-screen bottom-0 left-0 inset-0 z-[1]"
        initial={{ x: "100vw" }}
        animate={{ x: -10 }}
        style={{ x, y }}
        transition={{ 
          duration: 0.8, 
          ease: [0,.82,.15,1],
          delay: 0.2
        }}
      >
        <h1 
          className={`${styles.jungkookText} absolute bottom-14 left-0`}
        >
          Jungkook
        </h1>
      </motion.div>
      
      {/* Main Content */}
      <div className="relative h-full w-screen z-20">
        <div className="relative max-h-screen aspect-[1] w-screen z-20"/>

        <div className="sticky z-50 top-0 h-16 w-screen bg-[#D7DEDC] opacity-100">
        </div>
        
        <div className="relative w-screen z-20 bg-[#D7DEDC]">
          {/* Shop Section */}
          <section className="relative flex items-center justify-center mb-8 -mt-1">
            <div id="shop-section" className="absolute -top-24 left-0"></div>
            <h2 className="sr-only">Jungkook Official Merchandise Shop</h2>
            <img src="/shop.png" alt="Jungkook Official Shop - BTS Merchandise" className="w-auto h-12 mt-4" />
          </section>

          <div className="max-w-[800px] mx-auto p-8">
            <div className="relative bg-white flex rounded-lg p-10 items-center justify-center underline">
              <span className="text-black text-2xl font-bold">Coming Soon</span>
            </div>
          </div>

          {/* Music Section */}
          <section className="relative flex items-center justify-center my-8">
            <div id="music-section" className="absolute -top-24 left-0"></div>
            <h2 className="sr-only">Jungkook Music Videos and Songs</h2>
            <img src="/music.png" alt="Jungkook Music - Latest Songs and Albums" className="w-auto h-12" />
          </section>

          <div className="max-w-[800px] mx-auto py-8">
            <nav className="flex items-center justify-start grid" aria-label="Jungkook Music Navigation">
              {tabs.map((tab, index) => (
              <motion.button
                key={tab.id}
                className={`${tab.active ? 'underline' : ''} relative px-6 py-2 rounded-xl font-marck-script font-semibold text-3xl text-black flex items-center gap-3`}
                onClick={() => {
                  if (tab.id !== activeTab) {
                    // Reset video and show overlay
                    const iframe = document.getElementById('video-iframe') as HTMLIFrameElement;
                    const overlay = document.getElementById('video-overlay');
                    if (iframe && overlay) {
                      iframe.style.opacity = '0';
                      iframe.style.zIndex = '10';
                      overlay.style.display = 'flex';
                      overlay.style.opacity = '1';
                      
                      // Update iframe src to new video after a short delay
                      setTimeout(() => {
                        const newTabData = tabs.find(t => t.id === tab.id);
                        if (newTabData) {
                          iframe.src = `https://www.youtube.com/embed/${newTabData.url}?enablejsapi=1&rel=0`;
                        }
                      }, 100);
                    }
                    
                    setPreviousTab(activeTab);
                    console.log("Set transiton")
                    setIsTransitioning(true);
                    
                    // Update active tab after a brief delay to ensure previous tab is set
                    setTimeout(() => {
                      setActiveTab(tab.id);
                    }, 50);
                    
                    // Reset transition state after animation completes
                    setTimeout(() => {
                      setIsTransitioning(false);
                    }, 850);
                  }
                }}
                whileHover="hover"
                initial="initial"
                aria-label={`Play ${tab.label} by Jungkook`}
              >
                <span>{tab.label}</span>
                <motion.div
                  className="flex items-center justify-center"
                  variants={{
                    initial: { 
                      x: -20, 
                      opacity: 0,
                      overflow: 'hidden'
                    },
                    hover: { 
                      x: 0, 
                      opacity: 1,
                      width: 'auto',
                      transition: {
                        duration: 0.3,
                        ease: "easeOut"
                      }
                    }
                  }}
                >
                  <PlayIcon size={20}/>
                </motion.div>
              </motion.button>
            ))}
          </nav>
        </div>

        {/* YouTube Video Embed with Overlay */}
        <div className="w-full max-w-[800px] mx-auto px-4 pb-8">
          <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
            {!isTransitioning && (
              <iframe
                className="absolute top-0 left-0 w-full h-full rounded-lg z-10 opacity-0"
                src={`https://www.youtube.com/embed/${activeTabData.url}?enablejsapi=1&rel=0`}
                title={`Jungkook - ${activeTabData.label} Official Music Video`}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                id="video-iframe"
              ></iframe>
            )}
            
            {/* Video Overlay */}
            <motion.div 
              className="absolute z-50 top-0 left-0 w-full h-full bg-black rounded-lg cursor-pointer flex items-center justify-center"
              initial={{ opacity: 1 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.1 }}
              id="video-overlay"
              onClick={() => {
                const iframe = document.getElementById('video-iframe');
                const overlay = document.getElementById('video-overlay');
                if (iframe && overlay) {
                  // Show iframe and make it visible
                  iframe.style.opacity = '1';
                  iframe.style.zIndex = '20';
                  
                  // Load YouTube iframe API if not already loaded
                  if (!window.YT) {
                    const tag = document.createElement('script');
                    tag.src = 'https://www.youtube.com/iframe_api';
                    const firstScriptTag = document.getElementsByTagName('script')[0];
                    if (firstScriptTag.parentNode) {
                      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
                    }
                  }
                  
                  // Initialize player and play video
                  window.onYouTubeIframeAPIReady = function() {
                    const player = new window.YT.Player('video-iframe', {
                      events: {
                        'onReady': function(event: any) {
                          event.target.playVideo();
                        }
                      }
                    });
                  };
                  
                  // If API is already loaded, create player immediately
                  if (window.YT && window.YT.Player) {
                    const player = new window.YT.Player('video-iframe', {
                      events: {
                        'onReady': function(event: any) {
                          event.target.playVideo();
                        }
                      }
                    });
                  }
                  
                  // Hide overlay with animation
                  setTimeout(() => {
                    overlay.style.display = 'none';
                  }, 100);
                }
              }}
              role="button"
              aria-label={`Play ${activeTabData.label} by Jungkook`}
              tabIndex={0}
            >
              <div className="absolute top-0 left-0 w-full h-full rounded-lg overflow-hidden">
                {/* Background Thumbnail (Previous) */}
                <motion.div
                  className="absolute top-0 left-0 w-full h-full rounded-lg overflow-hidden"
                  initial={{ opacity: 1 }}
                  animate={{ opacity: isTransitioning ? 0 : 1 }}
                  transition={{ duration: 0.8, ease: "easeInOut" }}
                >
                  <img 
                    src={isTransitioning ? previousTabData.thumbnail : activeTabData.thumbnail}
                    alt={`Jungkook ${isTransitioning ? previousTabData.label : activeTabData.label} Thumbnail`}
                    className="w-full h-full object-cover"
                  />
                </motion.div>
                
                {/* Foreground Thumbnail (Current) */}
                {isTransitioning && (
                  <motion.div
                    className="absolute top-0 left-0 w-full h-full rounded-lg overflow-hidden"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: isTransitioning ? 1 : 0 }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                  >
                    <img 
                      src={isTransitioning ? activeTabData.thumbnail : previousTabData.thumbnail}
                      alt={`Jungkook ${isTransitioning ? activeTabData.label : previousTabData.label} Thumbnail`}
                      className="w-full h-full object-cover"
                    />
                  </motion.div>
                )}
                {!isTransitioning && (
                  <motion.div
                    className="absolute top-0 left-0 w-full h-full rounded-lg overflow-hidden"
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                  >
                    <img 
                      src={activeTabData.thumbnail}
                      alt={`Jungkook ${activeTabData.label} Music Video Thumbnail`}
                      className="w-full h-full object-cover"
                    />
                  </motion.div>
                )}
              </div>
              {/* Overlay and Play Icon - Static */}
              <div className="absolute inset-0 bg-black bg-opacity-30 rounded-lg"></div>
              <div className="relative z-10 bg-white bg-opacity-20 backdrop-blur-sm rounded-full p-4 hover:bg-opacity-30 transition-all duration-200">
                <PlayIcon size={28}/>
              </div>
            </motion.div>
          </div>
        </div>
        </div>
        <Footer />
      </div>
    </main>
  );
}
