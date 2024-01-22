import { useEffect } from 'react';
import Lottie, { AnimationItem } from 'lottie-web';
import loadingJson from '@/assets/loading.json';

export const Loader = () => {
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
  
  return (
    <div
      id="animation"
      className="w-[100px] h-[100px]"
    />
  );
};
