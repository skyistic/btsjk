import React from 'react';

export function Footer() {
  return (
    <footer className="bg-black/80 text-white px-4 sm:px-6 py-6 sm:py-4">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center md:justify-between space-y-4 md:space-y-0">
        {/* Social Media Icons */}
        <div className="flex items-center justify-center flex-wrap gap-3 mt-4 sm:mt-0 sm:gap-4 order-2 md:order-1">
          {/* Twitter/X */}
          <a href="https://x.com/BTS_bighit" target="_blank" className="text-gray-400 bg-black/30 hover:bg-black/50 p-2 rounded-full hover:text-white transition-colors">
            <svg width={16} height={16} className="sm:w-[18px] sm:h-[18px]" fill="currentColor" viewBox="0 0 24 24">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
            </svg>
          </a>

          {/* Twitter/X */}
          <a href="https://x.com/BTS_twt" target="_blank" className="text-gray-400 bg-black/30 hover:bg-black/50 p-2 rounded-full hover:text-white transition-colors">
            <svg width={16} height={16} className="sm:w-[18px] sm:h-[18px]" fill="currentColor" viewBox="0 0 24 24">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
            </svg>
          </a>

          {/* Instagram */}
          <a href="https://www.instagram.com/mnijungkook/" target="_blank" className="text-gray-400 bg-black/30 hover:bg-black/50 p-2 rounded-full hover:text-white transition-colors">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={16}
            height={16}
            className="sm:w-[18px] sm:h-[18px]"
            viewBox="0 0 24 24"
          >
            <path fill='currentColor' d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849s-.012 3.584-.069 4.849c-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849s.013-3.583.07-4.849c.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069M12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12s.014 3.668.072 4.948c.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24s3.668-.014 4.948-.072c4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948s-.014-3.667-.072-4.947c-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0m0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324M12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8m6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881"></path>
          </svg>          
          </a>

            {/* Facebook */}
          <a href="https://www.facebook.com/bangtan.official" target="_blank" className="text-gray-400 bg-black/30 hover:bg-black/50 p-2 rounded-full hover:text-white transition-colors">
          <svg width={16} height={16} className="sm:w-[18px] sm:h-[18px]" fill='currentColor' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30" > <circle cx="15" cy="15" r="15"></circle> <path id="f" fill="#000000cc" d="M16.4 23.9v-8.1h2.7l.4-3.2h-3.1v-2c0-.9.3-1.5 1.6-1.5h1.7V6.2c-.3 0-1.3-.1-2.4-.1-2.4 0-4.1 1.5-4.1 4.2v2.3h-2.7v3.2h2.7v8.1z" ></path> </svg>
          </a>
          {/* YouTube */}
          <a href="https://www.youtube.com/user/BANGTANTV" target="_blank" className="text-gray-400 bg-black/30 hover:bg-black/50 p-2 rounded-full hover:text-white transition-colors">
            <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
            </svg>
          </a>

          {/* Weverse */}
          <a href="https://weverse.onelink.me/qt3S/cbdb15ca" target="_blank" className="text-gray-400 bg-black/30 hover:bg-black/50 p-2 rounded-full hover:text-white transition-colors">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={16}
              height={16}
              className="sm:w-[18px] sm:h-[18px]"
              viewBox="0 0 512 512"
            >
              <defs>
                <linearGradient id="a" gradientUnits="userSpaceOnUse"></linearGradient>
                <linearGradient
                  id="b"
                  x2="1"
                  gradientTransform="rotate(42.582 -32.31 78.465)scale(461.56)"
                  href="#a"
                >
                  <stop stopColor="currentColor"></stop>
                  <stop offset="1" stopColor="currentColor"></stop>
                </linearGradient>
              </defs>
              <path
                fill="url(#b)"
                fillRule="evenodd"
                d="M89.8 0h332.4C471.8 0 512 40.2 512 89.8v332.4c0 49.6-40.2 89.8-89.8 89.8H89.8C40.2 512 0 471.8 0 422.2V89.8C0 40.2 40.2 0 89.8 0"
              ></path>
              <path
                fill="#000000cc"
                fillRule="evenodd"
                d="M75.3 172.1s12-7.2 17.8-9.9 11.5-4.9 16.9-6.6l3.8-1.2q1.9-.5 3.9-1 1.9-.5 3.9-.9 1.9-.4 3.9-.8c5-.8 9.6-1.3 14-1.5 4.3-.1 8.3 0 12 .4s7 1.1 9.9 1.9c2.8.8 5.3 1.8 7.3 2.8.6.3 1.4.7 2.3 1.4q1.5.9 3.3 2.4l1 .8q.5.4.9.9.5.4 1 .9l.9.9 1 1.2 1 1.2q.4.6.9 1.2.4.7.9 1.3.4.8.9 1.5.4.8.9 1.6l.8 1.6q.3.8.7 1.6.4 1 .7 2q.4.9.7 1.9t.5 2q.3 1 .5 2c.6 2.9.9 6.1 1 9.6q0 5.25-.9 11.4l-1.3 8-1.2 7.9-1.2 7.9-1.3 7.9-1.2 8-1.3 7.9-1.2 7.9-1.3 7.9q-.1 1.2-.3 2.4-.1 1.2-.3 2.4l-.2 2.4-.2 2.4q-.4 4.5-.5 8.3 0 3.9.3 7.2.4 3.2 1.1 5.9.7 2.6 1.8 4.6 1.2 2 2.8 3.3-.3.3.8.6.4.3.9.6.4.2.9.4.5.3 1 .4 2 .7 4.5.7 2.2 0 4.8-.7c1.8-.5 3.6-1.3 5.5-2.3 1.9-1.1 3.9-2.5 5.9-4.2s4-3.7 5.9-6.1c2-2.4 3.9-5.2 5.7-8.5q2.7-4.8 5.1-10.9 2.3-6.1 4.2-13.7c1.2-5 2.3-10.5 3-16.6l1.4-10.5 1.4-10.5 1.3-10.5 1.4-10.5 1.3-10.5 1.4-10.5 1.4-10.5 1.3-10.5H302l-1.8 13.5-1.7 13.5-1.7 13.5-1.7 13.4-1.8 13.5-1.7 13.5-1.7 13.5-1.7 13.4q-.7 5.4-1.1 10-.3 4.5-.3 8.3 0 3.7.3 6.7.4 3.1 1.1 5.4t1.8 4q1.1 1.6 2.6 2.7.3.3.7.5-.4.3.8.5.5.2.9.3.4.2.9.3 1.8.5 4 .5c1.6 0 3.5-.3 5.4-.8 1.9-.6 3.9-1.5 5.9-2.8s4.1-2.9 6.2-5 4.2-4.5 6.3-7.5 4.1-6.4 6.1-10.4 3.8-8.5 5.6-13.5c1.8-5.1 3.4-10.8 4.9-17.1s2.8-13.2 3.9-20.8q.2-1.1.3-2.3.2-1.1.3-2.2.2-1.2.3-2.3.2-1.1.3-2.3.5-4.4.8-8.6t.5-8.3q.1-4.1.1-8.2v-4.1q-.1-1-.1-2.1 0-1-.1-2 0-1.1-.1-2.1 0-1.1-.1-2.1 0-1.1-.1-2.2-.1-1-.2-2.1-.3-4.3-.8-8.8-.1-1.2-.2-2.3-.2-1.2-.3-2.4-.2-1.1-.3-2.3t-.3-2.4h63.2c.2 1.2.3 2.8.4 5 .2 2.1.3 4.7.5 7.6.3 2.9.6 6.2 1 9.7q.2 1.3.4 2.7l.4 2.8q.3 1.4.5 2.7l.6 2.8c.8 3.8 1.9 7.7 3.2 11.6 1.4 4 3 7.9 5.1 11.7 2 3.8 4.4 7.5 7.3 10.9l2.2 2.6q1.2 1.3 2.5 2.5 1.2 1.2 2.5 2.3t2.7 2.1l-1.5 11.7-1.6 11.6-1.5 11.6-1.6 11.6q-2.9-1.1-5.8-2.5-2.8-1.4-5.5-3.1-2.8-1.6-5.3-3.5-2.6-1.8-5-3.9l-1.6-1.4-1.6-1.4q-.7-.8-1.5-1.5-.7-.8-1.5-1.5c-2.2 8.9-4.9 17.1-8 24.6-3.1 7.6-6.6 14.4-10.5 20.6s-8 11.7-12.5 16.7q-1.7 1.8-3.4 3.5t-3.5 3.4l-3.6 3.2-3.8 3q-1.9 1.4-3.8 2.7t-3.8 2.5q-2 1.3-4 2.4t-4.1 2.1q-2 1.1-4.1 2t-4.2 1.7q-2.1.9-4.2 1.6t-4.3 1.4c-5.7 1.7-11.6 3-17.5 3.8q-2.2.3-4.5.5-2.2.3-4.5.4-2.2.2-4.5.2-2.2.1-4.5.1-6.1 0-11.5-.7-5.5-.7-10.2-2-1.2-.3-2.3-.6l-2.2-.8q-1.2-.4-2.3-.8-1-.4-2.1-.9l-2-1q-1-.5-1.9-1-1-.5-1.9-1.1l-1.8-1.2q-.9-.6-1.7-1.2t-1.6-1.3q-.8-.6-1.6-1.3t-1.5-1.4-1.4-1.5q-.7-.7-1.3-1.5-.6-.7-1.3-1.5-.6-.8-1.1-1.6-.6-.9-1.1-1.7-.6-.8-1.1-1.7-.4-.9-.9-1.8-.5-.8-.9-1.7-.4-1-.8-1.9t-.7-1.9q-.4-.9-.7-1.9-.3-.9-.5-1.9c-3.2 4.7-6.5 8.8-10 12.3q-1.3 1.3-2.6 2.5t-2.6 2.3q-1.3 1.2-2.7 2.2-1.4 1.1-2.9 2.1-1.3 1-2.6 1.8-1.3.9-2.7 1.7t-2.8 1.5q-1.4.8-2.8 1.5-1.2.6-2.5 1.1-1.3.6-2.6 1.1l-2.6 1q-1.3.5-2.6.9-1.2.4-2.3.7-1.2.4-2.3.7-1.2.3-2.3.5-1.2.3-2.3.5-.9.2-1.9.4-.9.2-1.8.3t-1.9.3l-1.8.2c-2.1.2-3.8.3-4.9.3h-1.8q-8.1 0-15.1-1.5-6.9-1.5-12.7-4.5-1.4-.7-2.7-1.5-1.4-.8-2.7-1.7t-2.5-1.9l-2.4-2q-4.5-4.2-7.9-9.7-3.4-5.4-5.6-11.8-2.2-6.5-3.2-13.9-1-7.5-.9-15.7.1-8.3 1.3-17.3l1.3-8.2 1.4-8.2 1.3-8.2 1.3-8.2 1.3-8.2 1.3-8.2 1.3-8.2 1.3-8.2q.1-2.2-.3-3.9-.3-1.6-1-2.8-.2-.3-.4-.5-.2-.3-.4-.5-.2-.3-.4-.5t-.5-.4q-.2-.2-.5-.4-.2-.1-.5-.3-.3-.1-.6-.3-.2-.1-.5-.2l-.6-.2q-.3-.1-.6-.1l-.6-.2q-.2 0-.5-.1h-.6q-.3 0-.6-.1H114l-2.2.2q-1 .2-1.7.4-1.6.5-3.1.9-.8.3-1.5.5-.7.3-1.4.5l-1.4.6q-.7.2-1.4.5l-2.8 1.2q-1.3.7-2.7 1.4c-1 .5-20.5-38.3-20.5-38.3"
              ></path>
            </svg>          
          </a>

          {/* Cafe Daum */}
          <a href="https://cafe.daum.net/BANGTAN" target="_blank" className="text-gray-400 bg-black/30 hover:bg-black/50 p-2 rounded-full hover:text-white transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} className="sm:w-[18px] sm:h-[18px]" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}><path d="M10.5 19H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v4"></path><path d="m3 7l9 6l2.983-1.989L21 7m-3 15l3.35-3.284a2.143 2.143 0 0 0 .005-3.071a2.24 2.24 0 0 0-3.129-.006l-.224.22l-.223-.20a2.24 2.24 0 0 0-3.128-.006a2.143 2.143 0 0 0-.006 3.071z"></path></g></svg>          </a>

          {/* Blog */}
          <a href="https://btsblog.ibighit.com/" target="_blank" className="text-gray-400 bg-black/30 hover:bg-black/50 p-2 rounded-full transition-colors hover:text-white">
            <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} className="sm:w-[18px] sm:h-[18px]" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 20h4L18.5 9.5a2.828 2.828 0 1 0-4-4L4 16zm9.5-13.5l4 4M16 19h6"></path></svg>
          </a>

        </div>

        {/* Copyright */}
        <div className="text-center md:text-right order-1 md:order-2">
          <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">
            COPYRIGHT © btsjk. ALL RIGHTS RESERVED.
            <br className="hidden sm:block"/>
            <span className="block sm:inline sm:ml-1">This fan blog is unofficial and has no affiliation with HYBE or its official channels.</span>
          </p>
        </div>
      </div>
    </footer>
  );
}