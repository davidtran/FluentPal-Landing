"use client";

import { useEffect, useState } from "react";

const APP_STORE_URL =
  "https://apps.apple.com/us/app/fluentpal-get-fluent-faster/id6462874346";
const PLAY_STORE_URL =
  "https://play.google.com/store/apps/details?id=com.fluentai&hl=us&gl=US";

export default function FloatingDownloadButton() {
  const [isIOS, setIsIOS] = useState(false);

  useEffect(() => {
    const iOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    setIsIOS(iOS);
  }, []);

  return (
    <div className="fixed bottom-0 left-0 right-0 md:hidden z-50">
      <div className="bg-white shadow-[0_-4px_10px_rgba(0,0,0,0.1)] px-4 py-3">
        <div className="flex items-center mb-0 justify-between">
          <div className="flex items-center">
            <img
              src="/app-logo.jpg"
              alt="FluentPal"
              className="w-12 h-12 rounded-xl mr-3"
            />
            <div>
              <h3 className="font-bold text-base">FluentPal</h3>
              <div className="text-sm text-gray-600">Get Fluent Faster</div>
            </div>
          </div>
          <a
            href={isIOS ? APP_STORE_URL : PLAY_STORE_URL}
            className="w-[200px] bg-blue-600 text-white py-3 px-4 rounded-xl font-medium text-center flex items-center justify-center gap-2 active:bg-blue-700"
          >
            {isIOS ? <AppleIcon /> : <GooglePlayIcon />}
            {isIOS ? "App Store" : "Google Play"}
          </a>
        </div>
      </div>
    </div>
  );
}

const AppleIcon = () => (
  <svg
    className="w-5 h-5"
    viewBox="0 0 24 24"
    fill="currentColor"
  >
    <path d="M18.71 19.5C17.88 20.74 17 21.95 15.66 21.97C14.32 22 13.89 21.18 12.37 21.18C10.84 21.18 10.37 21.95 9.09997 22C7.78997 22.05 6.79997 20.68 5.95997 19.47C4.24997 17 2.93997 12.45 4.69997 9.39C5.56997 7.87 7.12997 6.91 8.81997 6.88C10.1 6.86 11.32 7.75 12.11 7.75C12.89 7.75 14.37 6.68 15.92 6.84C16.57 6.87 18.39 7.1 19.56 8.82C19.47 8.88 17.39 10.1 17.41 12.63C17.44 15.65 20.06 16.66 20.09 16.67C20.06 16.74 19.67 18.11 18.71 19.5ZM13 3.5C13.73 2.67 14.94 2.04 15.94 2C16.07 3.17 15.6 4.35 14.9 5.19C14.21 6.04 13.07 6.7 11.95 6.61C11.8 5.46 12.36 4.26 13 3.5Z" />
  </svg>
);

const GooglePlayIcon = () => (
  <svg
    className="w-5 h-5"
    viewBox="0 0 24 24"
    fill="currentColor"
  >
    <path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 0 1-.61-.92V2.734a1 1 0 0 1 .609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-3.198l2.807 1.626a1 1 0 0 1 0 1.73l-2.808 1.626L15.891 12l1.807-1.814zM5.864 2.658L16.802 8.99l-2.302 2.302-8.636-8.634z" />
  </svg>
);
