'use client';

import { Center } from '@/components/Center';
import { Loader } from '@/components/Loader';
import axios from 'axios';
import classNames from 'classnames';
import { useLocale, useTranslations } from 'next-intl';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

export const Content = () => {
  const params = useParams();
  const t = useTranslations('replay');
  const locale = useLocale();
  const slug = params.slug;
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [replay, setReplay] = useState<any>(null);
  const [isStarted, setIsStarted] = useState(false);
  const [replayIndex, setReplayIndex] = useState(0);
  const [isReplayEnded, setIsReplayEnded] = useState(false);
  const replayIndexRef = useRef(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const audio = useRef<HTMLAudioElement>();

  useEffect(() => {
    fetchReplay();
  }, []);

  async function fetchReplay() {
    const url = process.env.NEXT_PUBLIC_API_URL;
    setIsLoading(true);
    try {
      const res = await axios.get(url + '/fetch-replay', {
        params: { slug },
      });
      console.log(res.data);
      setReplay(res.data);
    } catch (e) {
      setError(true);
    } finally {
      setIsLoading(false);
    }
  }

  function startReplay() {
    setIsPlaying(true);
    setReplayIndex(0);
    setIsStarted(true);
    replayIndexRef.current = 0;
    audio.current = new Audio(replay.messages[0].sound_uri);
    audio.current.play();
    audio.current.addEventListener('ended', onAudioEnd);
  }

  function onAudioEnd() {
    const nextIndex = replayIndexRef.current + 1;

    if (nextIndex === replay.messages.length) {
      setIsReplayEnded(true);
      return;
    }

    const message = replay.messages[nextIndex];

    if (message.sound_uri) {
      setTimeout(() => {
        replayIndexRef.current = nextIndex;
        setReplayIndex(nextIndex);
        audio.current = new Audio(replay.messages[nextIndex].sound_uri);
        audio.current.play();
        audio.current.addEventListener('ended', onAudioEnd);
        setTimeout(() => {
          //containerRef.current?.scrollTo({ top: containerRef.current.clientHeight - containerRef.current.scrollTop })
          if (containerRef.current) {
          containerRef.current.scrollTop = containerRef.current.scrollHeight;
        }
        }, 50);
        
      }, 300);
    } else {
      setTimeout(() => {
        replayIndexRef.current = nextIndex;
        setReplayIndex(nextIndex);
        setTimeout(() => {
          //containerRef.current?.scrollTo({ top: containerRef.current.clientHeight - containerRef.current.scrollTop })
          if (containerRef.current) {
          containerRef.current.scrollTop = containerRef.current.scrollHeight;
        }
        }, 50);
        
        onAudioEnd();

      }, 1000);
    }
    
    
    
  }

  function togglePlayPause() {
    if (isPlaying) {
      audio.current?.pause();
    } else {
      audio.current?.play();
    }
    setIsPlaying(!isPlaying);
  }

  return (
    <>
      <div ref={containerRef} id="container" className="relative mx-auto max-w-[90%] w-[600px] flex-1 bg-white p-[15px] rounded-[20px] shadow-sm overflow-scroll">
        {isLoading && (
          <Center>
            <Loader />
          </Center>
        )}
        {error && (
          <Center>
            <div>{t('replay_not_found')}</div>
          </Center>
        )}
        {replay && !isStarted && (
          <Center>
            <div className="flex flex-col items-center">
              <div className="mb-[10px] font-bold">
                {t('listening_to', { username: replay.username })}
              </div>
              <div
                className="bg-[#062FE8] rounded-[10px] h-[40px] font-body text-center leading-[40px] w-[200px] shadow-md text-white font-bold cursor-pointer"
                onClick={startReplay}
              >
                {t('start')}
              </div>
            </div>
          </Center>
        )}
        {replay && (
          <div className={classNames('relative')}>
            <div className="font-body font-bold text-center mb-[10px] text-[#032068]">
              {replay.topic}
            </div>

            <div
              className={classNames('flex flex-col w-full', {
                'blur-[4px]': !isStarted,
              })}
            >
              {replay.messages
                .slice(0, !isStarted ? -1 : replayIndex + 1)
                .map((item: any, index: number) => (
                  <div
                    key={item.position}
                    className={classNames(
                      'flex flex-col max-w-[70%]',
                      index % 2 !== 0 && `text-white self-end`
                    )}
                  >
                    <div
                      className={classNames(
                        'flex flex-col',
                        index % 2 !== 0 && 'self-end'
                      )}
                    >
                      <div
                        className={classNames(
                          'text-[12px] text-black mb-[2px]',
                          {
                            'text-right': index % 2 !== 0,
                          }
                        )}
                      >
                        {index % 2 === 0 ? replay.ai_name : replay.username}
                      </div>
                      <div
                        className={classNames(
                          'rounded-[10px] p-[10px] mb-[10px]',
                          {
                            'bg-[#ECECEC]': index % 2 === 0,
                            'bg-[#1371FF]': index % 2 !== 0,
                          },
                          index % 2 === 0 && `bg-[#ECECEC]`,
                          index % 2 !== 0 && `text-white self-end`
                        )}
                      >
                        <div>{item.message}</div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
            {isReplayEnded && (
              <div className="font-bold text-center pt-[10px] text-[#747474] text-[12px]">
                {t('ended')}
              </div>
            )}
          </div>
        )}
        {!isReplayEnded && isStarted && (
          <div onClick={togglePlayPause} className="fixed bg-[rgba(255,255,255,0.4)] w-[50px] h-[50px] border-[#C3C3C3] border-[1px] shadow-md rounded-full flex justify-center items-center bottom-[55px] z-[9999] cursor-pointer left-1/2 -translate-x-1/2">
            {!isPlaying ? (
              <img
                src="/play.svg"
                width={14}
                height={14}
              />
            ) : (
              <img
                src="/pause.svg"
                width={14}
                height={14}
              />
            )}
          </div>
        )}
      </div>
      <Link
        href={`/${locale}/download`}
        className="text-[14px] text-center text-[#fff] mt-[10px] cursor-pointer underline underline-offset-1 tracking-wide"
      >
        {t('download')}
      </Link>
    </>
  );
};
