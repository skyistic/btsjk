"use client";

import { motion } from "framer-motion";
import Link from "next/link";

function ShopIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={28} height={28} viewBox="0 0 24 24"><g fill="none"><path d="m12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035q-.016-.005-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093q.019.005.029-.008l.004-.014l-.034-.614q-.005-.018-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z"></path><path fill="currentColor" d="M18.06 3a2 2 0 0 1 1.98 1.719l.017.156l.875 14a2 2 0 0 1-1.847 2.12l-.15.005H5.066a2 2 0 0 1-2-1.976l.003-.149l.875-14a2 2 0 0 1 1.84-1.869L5.94 3zm0 2H5.94l-.875 14h13.87zM15 7a1 1 0 0 1 1 1a4 4 0 0 1-8 0a1 1 0 0 1 2 0a2 2 0 0 0 3.995.15L14 8a1 1 0 0 1 1-1" strokeWidth={0.4} stroke="currentColor"></path></g></svg>
  );
}

function InstagramIcon() {
  return (
      <svg xmlns="http://www.w3.org/2000/svg" width={28} height={28} viewBox="0 0 24 24"><g fill="none" fillRule="evenodd"><path d="m12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035q-.016-.005-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093q.019.005.029-.008l.004-.014l-.034-.614q-.005-.018-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z"></path><path fill="currentColor" d="M16 3a5 5 0 0 1 5 5v8a5 5 0 0 1-5 5H8a5 5 0 0 1-5-5V8a5 5 0 0 1 5-5zm0 2H8a3 3 0 0 0-3 3v8a3 3 0 0 0 3 3h8a3 3 0 0 0 3-3V8a3 3 0 0 0-3-3m-4 3a4 4 0 1 1 0 8a4 4 0 0 1 0-8m0 2a2 2 0 1 0 0 4a2 2 0 0 0 0-4m4.5-3.5a1 1 0 1 1 0 2a1 1 0 0 1 0-2" strokeWidth={0.4} stroke="currentColor"></path></g></svg>
  );
}

function MusicIcon() {
  return (
<svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24"><g fill="none" fillRule="evenodd"><path d="m12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035q-.016-.005-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093q.019.005.029-.008l.004-.014l-.034-.614q-.005-.018-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z"></path><path fill="currentColor" d="M18.633 9.177L14 10.72v6.78a4.5 4.5 0 1 1-2-3.742V6.442a3 3 0 0 1 2.051-2.846l3.975-1.325A1.5 1.5 0 0 1 20 3.694v3.585a2 2 0 0 1-1.367 1.898m-3.95-3.684L18 4.387V7.28l-4 1.334V6.442a1 1 0 0 1 .684-.95ZM12 17.5a2.5 2.5 0 1 1-5 0a2.5 2.5 0 0 1 5 0" strokeWidth={0.4} stroke="currentColor"></path></g></svg>
 )
}

export default function Topbar() {
  return (
    <div className="fixed z-50 top-0 left-0 px-6 w-full h-16">
      <div className="flex items-center justify-between w-full h-16">
        <motion.div 
          className="flex items-center gap-2"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ 
            duration: 0.4, 
            ease: "easeInOut",
            delay: 0.6
          }}
        >
          <Link href="/" className="cursor-pointer">
            <img src="/logo.png" alt="logo" className="w-auto h-6" />
          </Link>
        </motion.div>
        <div className="flex items-center gap-3 text-black">
          <motion.div 
            className="flex items-center gap-3 text-black"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ 
              duration: 0.4, 
              ease: "easeInOut",
              delay: 1
            }}
          >
            <button 
              onClick={() => {
                const shopSection = document.getElementById('shop-section');
                if (shopSection) {
                  shopSection.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'start',
                    inline: 'nearest'
                  });
                }
              }}
              className="cursor-pointer hover:scale-110 transition-transform duration-200"
            >
              <ShopIcon />
            </button>
          </motion.div>
          <motion.div 
            className="flex items-center gap-3 text-black"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ 
              duration: 0.4, 
              ease: "easeInOut",
              delay: 1.4
            }}
          >
            <button 
              onClick={() => {
                const musicSection = document.getElementById('music-section');
                if (musicSection) {
                  musicSection.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'start',
                    inline: 'nearest'
                  });
                }
              }}
              className="cursor-pointer hover:scale-110 transition-transform duration-200"
            >
              <MusicIcon />
            </button>
          </motion.div>
          <motion.div 
            className="flex items-center gap-3 text-black"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ 
              duration: 0.4, 
              ease: "easeInOut",
              delay: 1.8
            }}
          >
            <Link href="https://www.instagram.com/mnijungkook/" target="_blank">
              <InstagramIcon />
            </Link>
          </motion.div>
        </div>
      </div>
      <div className="h-[2px] w-full bg-black rounded-full"/>
    </div>
  );
}