"use client";

import { useEffect, useState } from "react";
import Lottie, { AnimationItem } from "lottie-web";
import loadingJson from "@/assets/loading.json";
import { getDownloadLink } from "@/utils/general";
import {
  NextIntlClientProvider,
  useLocale,
  useMessages,
  useTranslations,
} from "next-intl";
import { useSearchParams } from "next/navigation";

const timeout = 20000000;

export default function Download() {
  const locale = useLocale();
  const params = useSearchParams();
  const [isTikTok, setIsTikTok] = useState(false);
  const [showInstructions, setShowInstructions] = useState(false);
  const t = useTranslations("download");

  useEffect(() => {
    const container = document.querySelector("#animation");
    let instance: AnimationItem | null = null;
    if (container) {
      instance = Lottie.loadAnimation({
        container: container,
        renderer: "svg",
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
    fbq("track", "FluentPal_Landing_OpenDownload");

    // Check if user is on TikTok browser
    const userAgent = navigator.userAgent.toLowerCase();
    const isTikTokBrowser =
      userAgent.includes("tiktok") || userAgent.includes("bytedance");
    setIsTikTok(isTikTokBrowser);

    if (!isTikTokBrowser) {
      // Auto-redirect for non-TikTok browsers
      setTimeout(() => {
        const platform = params.get("platform");
        window.location.href = getDownloadLink(locale, platform || undefined);
      }, timeout);
    } else {
      // Show instructions for TikTok users
      setTimeout(() => {
        setShowInstructions(true);
      }, timeout);
    }
  }, [locale, params]);

  if (true) {
    return (
      <div className="w-full min-h-[100vh] flex flex-col justify-start items-center p-4 bg-gradient-to-br from-pink-400 via-pink-500 to-pink-600 px-4">
        <div className="max-w-md text-center text-black flex flex-col items-end justify-start">
          <img
            src="/images/arrow.svg"
            alt="download-tiktok"
            className="w-[50px] h-[50px]"
          />
          <div className="backdrop-blur-sm rounded-2xl px-4 py-4 mb-6 bg-white mt-5">
            <h2 className="text-lg font-semibold mb-2">{t("on_tiktok")}:</h2>
            <ol className="text-left space-y-3">
              <li className="flex items-start">
                <span className="border-[2px] rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">
                  1
                </span>
                <span>{t("tiktok_step_1")}</span>
              </li>
              <li className="flex items-start">
                <span className="border-[2px] rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">
                  2
                </span>
                <span>{t("tiktok_step_2")}</span>
              </li>
              <li className="flex items-start">
                <span className="border-[2px] rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">
                  3
                </span>
                <span>{t("tiktok_step_3")}</span>
              </li>
            </ol>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div
        id="animation"
        className="w-[100px] h-[100px]"
      />
    );
  }
}
