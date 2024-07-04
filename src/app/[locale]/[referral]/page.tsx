'use client';

import { useEffect } from 'react';
import Lottie, { AnimationItem } from 'lottie-web';
import loadingJson from '@/assets/loading.json';

interface IProp {
  params: {
    referral: string;
  };
}

export default function Page({ params: { referral } }: IProp) {
  useEffect(() => {
    const container = document.querySelector('#animation');
    let instance: AnimationItem | null = null;
    if (container) {
      instance = Lottie.loadAnimation({
        container: container,
        renderer: 'svg',
        loop: true,
        autoplay: true,
        animationData: loadingJson,
      });
    }
    return () => {
      if (instance) {
        instance.destroy();
      }
    };
  }, []);

  useEffect(() => {
    //@ts-ignore
    fbq('track', 'FluentPal_Landing_OpenDownload');
    //@ts-ignore
    fbq('track', 'FluentPal_Referral', { promoter: referral });
    setTimeout(() => {
      window.location.href = `https://fluentpal.go.link?adj_t=` + referral;
    }, 0);
  }, []);

  return (
    <div className="w-full min-h-[100vh] flex justify-center items-center">
      <div
        id="animation"
        className="w-[100px] h-[100px]"
      />
    </div>
  );
}
