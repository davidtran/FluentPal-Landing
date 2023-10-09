'use client';

import { useEffect } from 'react';
import Lottie, { AnimationItem } from 'lottie-web';
import loadingJson from '@/assets/loading.json';

const getMobileOS = (navigator: Navigator) => {
  const ua = navigator.userAgent;
  console.log(ua);
  if (/android/i.test(ua)) {
    return 'Android';
  } else if (/iPad|iPhone|iPod|Macintosh/.test(ua)) {
    return 'iOS';
  }
  return 'Other';
};

export default function Page() {

  useEffect(() => {
    const container = document.querySelector('#animation');
    let instance: AnimationItem | null = null;
    if (container) {
      instance = Lottie.loadAnimation({
        container: container,
        renderer: 'svg',
        loop: true,
        autoplay: true,
        animationData: loadingJson
      })
    }
    return () => {
      if (instance) {
        instance.destroy();
      }
    }
  }, []);
  useEffect(() => {
    //@ts-ignore
    fbq('track', 'ViewContent');
    const os = getMobileOS(navigator);    
    if (os === 'iOS') {
      setTimeout(() => {
        window.location.href =
          'https://apps.apple.com/us/app/fluentpal/id6462874346';
      }, 0);
    } else if (os === 'Android') {
      setTimeout(() => {
        window.location.href =
          'https://play.google.com/store/apps/details?id=com.fluentai';
      }, 0);
    }
  }, []);

  return (
    <div className='w-full min-h-[100vh] flex justify-center items-center'>
      <div id="animation" className='w-[100px] h-[100px]' />
    </div>
  );
}
