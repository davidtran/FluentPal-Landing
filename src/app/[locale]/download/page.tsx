'use client';

import { useEffect } from 'react';
import Lottie, { AnimationItem } from 'lottie-web';
import loadingJson from '@/assets/loading.json';
import { getDownloadLink } from '@/utils/general';
import { useLocale } from 'next-intl';
import { useSearchParams } from 'next/navigation';


export default function Page() {
  const locale = useLocale();
  const params = useSearchParams();

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
    fbq('track', 'FluentPal_Landing_OpenDownload');

    setTimeout(() => {
      const platform = params.get('platform');      
      window.location.href =
        getDownloadLink(locale, platform || undefined);
    }, 0);
  }, []);

  return (
    <div className='w-full min-h-[100vh] flex justify-center items-center'>      
      <div id="animation" className='w-[100px] h-[100px]' />
    </div>
  );
}
