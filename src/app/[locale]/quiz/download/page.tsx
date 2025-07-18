"use client";

import React, { useState } from "react";
import { useSearchParams } from "next/navigation";
import { useTranslations, useLocale } from "next-intl";
import { supportedLanguages } from "@/constants/quizConstants";
import Image from "next/image";
import Link from "next/link";
import Ionicons from "@reacticons/ionicons";
import classNames from "classnames";

const DownloadPage = () => {
  const t = useTranslations("quiz.download");
  const locale = useLocale();
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState("mobile");
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const language = searchParams.get("language") || "";
  const level = searchParams.get("level") || "";

  const languageDetails = supportedLanguages.find((l) => l.id === language) || {
    id: language,
    label: "Unknown",
    icon: "🌐",
  };

  const toggleFaq = (index: number) => {
    if (openFaqIndex === index) {
      setOpenFaqIndex(null);
    } else {
      setOpenFaqIndex(index);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-8 mt-[50px] mb-[100px]">
      <h1 className="text-4xl text-center mb-4 text-gray-800 font-bold">
        {t("title")}
      </h1>
      <p className="text-center mb-8 text-gray-600 text-lg">
        {t("description")}
      </p>

      {/* App Download Section */}
      <div className="bg-white rounded-xl shadow-xs p-8 mb-8 border-[1px] border-gray-200">
        <div className="flex items-center mb-6">
          <span className="text-3xl mr-3">{languageDetails.icon}</span>
          <h2 className="text-2xl font-semibold">FluentPal</h2>
        </div>

        <div className="gap-8 mb-0">
          {/* Download Buttons */}
          <div className="flex flex-col justify-center">
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="https://apps.apple.com/us/app/fluentpal-get-fluent-faster/id6462874346"
                className="flex items-center justify-center bg-black text-white py-3 px-6 rounded-lg hover:bg-gray-800 transition-colors"
              >
                <Ionicons
                  name="logo-apple"
                  size="large"
                />
                <div>
                  <div className="text-xs">Download on the</div>
                  <div className="text-lg font-semibold">{t("app.ios")}</div>
                </div>
              </a>
              <a
                href="https://play.google.com/store/apps/details?id=com.fluentai"
                className="flex items-center justify-center bg-green-600 text-white py-3 px-6 rounded-lg hover:bg-green-700 transition-colors"
              >
                <Ionicons
                  name="logo-google-playstore"
                  size="large"
                />
                <div>
                  <div className="text-xs">Get it on</div>
                  <div className="text-lg font-semibold">
                    {t("app.android")}
                  </div>
                </div>
              </a>
            </div>
          </div>

          {/* QR Code */}
          <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-6 w-[300px] mt-[40px]">
            <h3 className="text-xl font-medium mb-2">{t("app.qrCode")}</h3>
            <p className="text-center text-gray-600">
              <img
                src="/qr-code.png"
                alt="QR Code"
              />
            </p>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="bg-white rounded-xl shadow-xs p-8 mb-8 border-[1px] border-gray-200">
        <h2 className="text-2xl font-semibold mb-6">{t("faq.title")}</h2>
        <div className="space-y-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className={classNames(
                "justify-between items-center w-full text-left font-medium py-2",
                {
                  "border-b border-gray-200": index !== 3,
                }
              )}
            >
              <button
                onClick={() => toggleFaq(index)}
                className="flex justify-between items-center w-full text-left font-medium py-2"
              >
                <span>{t(`faq.items.${index}.question`)}</span>
                {openFaqIndex === index ? (
                  <Ionicons
                    name="chevron-up"
                    size="small"
                  />
                ) : (
                  <Ionicons
                    name="chevron-down"
                    size="small"
                  />
                )}
              </button>
              {openFaqIndex === index && (
                <div className="mt-2 text-gray-600 pl-0">
                  {t(`faq.items.${index}.answer`)}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Support Section */}
      <div className="bg-white rounded-xl shadow-xs border-[1px] border-gray-200 p-8">
        <h2 className="text-2xl font-semibold mb-6">{t("support.title")}</h2>
        <p className="text-gray-600 mb-6">{t("support.description")}</p>
        <div className="flex flex-col sm:flex-row gap-6">
          <a
            href="mailto:contact@fluentpal.app"
            className="flex items-center text-blue-600 hover:text-blue-800"
          >
            <Ionicons
              name="mail"
              className="mr-2 text-[16px]"
            />
            <span>{t("support.email")}</span>
          </a>
          <a
            href="https://www.facebook.com/profile.php?id=61550890358472"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center text-blue-600 hover:text-blue-800"
          >
            <Ionicons
              name="logo-facebook"
              className="mr-2 text-[16px]"
            />
            <span>{t("support.facebook")}</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default DownloadPage;
