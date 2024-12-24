import { AppLogo } from "@/components/AppLogo";
import { Benefit } from "@/components/Benefit";
import FloatingDownloadButton from "@/components/FloatingDownloadButton";
import Footer from "@/components/Footer";
import { Section, SectionTitle, Title } from "@/components/Section";
import { StoreDownload } from "@/components/StoreDownload";
import TopNav from "@/components/TopNav";
import { getDownloadLink } from "@/utils/general";
import classNames from "classnames";
import { useLocale, useTranslations } from "next-intl";
import { useEffect } from "react";
import { useState } from "react";

const Feature: React.FC<{
  title: string;
  description: React.ReactNode;
  media: React.ReactNode;
  direction: string;
}> = ({ title, description, media, direction }) => {
  return (
    <div
      className={classNames(
        "flex flex-col md:flex-row justify-between items-center md:items-start my-[20px] md:my-[100px] mb-[30px] md:mb-0 gap-[20px] md:gap-[50px]",
        {
          "md:flex-row-reverse": direction === "right",
        }
      )}
    >
      <div className="w-full md:w-3/4">
        <div className="font-bold font-title text-[18px] md:text-[21px] mb-[10px] md:mb-[20px] text-[#000]">
          {title}
        </div>
        <p>{description}</p>
      </div>
      <div
        className={classNames("flex", {
          "justify-start": direction === "right",
          "justify-end": direction === "left",
        })}
      >
        {media}
      </div>
    </div>
  );
};

export default function Home() {
  const locale = useLocale();
  const t = useTranslations("home");

  return (
    <main
      className="bg-repeat w-[100wh]"
      style={{ backgroundImage: "url(/noise.png)" }}
    >
      <Section
        outerClassName="h-[100vh] bg-gradient-to-t to-[#044BB7] from-[#003B94]"
        innerClassName="flex flex-col !py-0 h-full"
      >
        <TopNav />
        <div className="flex flex-col md:flex-row flex-1 gap-[0] justify-start md:justify-center overflow-hidden">
          <div className="flex flex-col justify-start pt-[40px] md:pt-0 md:justify-center gap-[10px]">
            <div className="font-title font-bold text-[31px] md:text-[50px] text-white uppercase">
              {t("hero.title")}
            </div>
            <div className="text-white text-[16px] font-light">
              {t("hero.description")}
            </div>
            <div className="flex flex-col items-center md:items-start">
              <StoreDownload />
            </div>
            <div className="hidden md:block">
              <div className="font-body text-[16px] font-bold text-white mt-[15px] mb-[10px]">
                {t("hero.scan_qr")}
              </div>
              <img
                src="/qr-code.png"
                className="w-[200px] h-[200px] rounded-md mt-[5]"
              />
            </div>
          </div>
          <div className="w-full md:w-1/2 flex justify-center items-center relative">
            <img
              src="/hero.png"
              className="w-[240px] mx-auto absolute md:relative top-[50px] md:top-auto md:rotate-2"
            />
          </div>
        </div>
      </Section>
      <Section
        id="introduction"
        outerClassName="shadow-[0_-5px_5px_rgba(0,0,0,0.1)]"
      >
        <SectionTitle
          number={1}
          text={t("introduction.introduction")}
        />

        <div className="md:flex-row flex gap-[20px] md:gap-[40px] items-center mb-[40px] flex-col-reverse">
          <div>
            <Title>{t("introduction.title")}</Title>
            <p>
              {t.rich("introduction.text1", {
                strong: (chunks) => <b>{chunks}</b>,
              })}
            </p>
            <br />
            <p>{t("introduction.text2")}</p>
          </div>
          <img
            src="/surprise-girl.png"
            className="w-[180px] h-[180px] mt-[20px] md:mt-0"
          />
        </div>

        <SectionTitle
          number={2}
          text={t("supported_languages.title")}
        />
        <div id="languages">
          <div className="my-[20px]">
            {t("supported_languages.description")}
          </div>
          {[
            ["🏴󠁧󠁢󠁥󠁮󠁧󠁿", t("supported_languages.english")],
            ["🇨🇳", t("supported_languages.chinese")],
            ["🇯🇵", t("supported_languages.japanese")],
            ["🇰🇷", t("supported_languages.korean")],
            ["🇪🇸", t("supported_languages.spanish")],
            ["🇫🇷", t("supported_languages.french")],
            ["🇩🇪", t("supported_languages.germany")],
          ].map((line, index) => (
            <div
              key={index}
              className="font-bold mb-[10px] text-[16px] flex gap-[10px] items-center"
            >
              <div className="text-[25px]">{line[0]}</div>
              <div>{line[1]}</div>
            </div>
          ))}
        </div>
      </Section>
      <Section
        id="benefits"
        outerClassName="bg-[#FFF4DD] border-t-[1px] border-b-[1px]"
      >
        <SectionTitle
          number={3}
          text={t("benefits.title")}
        />
        <Benefit />
      </Section>
      <Section
        id="features"
        outerClassName="bg-gradient-to-b from-white to-[#F5F9FF]"
      >
        <SectionTitle
          number={4}
          text={t("features.title")}
        />
        <Title className="py-12 text-center">{t("features.description")}</Title>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {[1, 2, 8, 3, 4, 5, 6, 7].map((number) => (
            <div
              key={number}
              className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 group"
            >
              {/* Image Container */}
              <div className="relative h-[350px] overflow-hidden">
                <img
                  src={`/features/${number}.jpg`}
                  alt={t(`features.item${number}`)}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />

                {/* Feature Number */}
                <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/90 flex items-center justify-center text-sm font-bold text-blue-600">
                  {number}
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold mb-3 text-gray-900">
                  {t(`features.item${number}`)}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {t(`features.item${number}_desc`)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Section>
      <Section
        id="beginner"
        outerClassName="bg-[#EEF5FF]"
      >
        <SectionTitle
          number={5}
          text={t("beginner.section_title")}
        />
        <Title className="text-center pt-12">{t("beginner.title")}</Title>
        <p className="text-center text-gray-600 max-w-3xl mx-auto mb-12">
          {t("beginner.description")}
        </p>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
              <svg
                className="w-6 h-6 text-blue-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"
                />
              </svg>
            </div>
            <h3 className="font-bold text-xl mb-2">
              {t("beginner.feature1.title")}
            </h3>
            <p className="text-gray-600">
              {t("beginner.feature1.description")}
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
              <svg
                className="w-6 h-6 text-blue-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 16l2.879-2.879m0 0a3 3 0 104.243-4.242 3 3 0 00-4.243 4.242zM21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h3 className="font-bold text-xl mb-2">
              {t("beginner.feature2.title")}
            </h3>
            <p className="text-gray-600">
              {t("beginner.feature2.description")}
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
              <svg
                className="w-6 h-6 text-blue-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                />
              </svg>
            </div>
            <h3 className="font-bold text-xl mb-2">
              {t("beginner.feature3.title")}
            </h3>
            <p className="text-gray-600">
              {t("beginner.feature3.description")}
            </p>
          </div>
        </div>
      </Section>
      <Section outerClassName="bg-[#fff] border-t-[1px] border-b-[1px]">
        <SectionTitle
          number={6}
          text={t("review.section_title")}
        />
        <Title className="py-12 text-center">{t("review.title")}</Title>
        <div className="columns-1 md:columns-2 lg:columns-3 gap-3">
          {[
            {
              type: "video",
              content: `<iframe width="560" height="315" src="https://www.youtube.com/embed/xxn3AwpBlGE?si=fhc-hU9MoD4WRSh0&amp;controls=0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`,
            },
            "9.jpg",
            {
              type: "tiktok",
              content: `<blockquote class="tiktok-embed" cite="https://www.tiktok.com/@hannah_lifeingermany/video/7446019311199653142" data-video-id="7446019311199653142" style="max-width: 605px;min-width: 325px;" > <section> <a target="_blank" title="@hannah_lifeingermany" href="https://www.tiktok.com/@hannah_lifeingermany?refer=embed">@hannah_lifeingermany</a> Một chiếc app thần kì mà các bạn nên có để học tiếng đức 🥰 <a title="fluentpal" target="_blank" href="https://www.tiktok.com/tag/fluentpal?refer=embed">#fluentpal</a> <a title="apphoctiengduc" target="_blank" href="https://www.tiktok.com/tag/apphoctiengduc?refer=embed">#apphoctiengduc</a> <a title="germany" target="_blank" href="https://www.tiktok.com/tag/germany?refer=embed">#germany</a> <a title="huyentimo" target="_blank" href="https://www.tiktok.com/tag/huyentimo?refer=embed">#huyentimo</a> <a title="deutschlernen" target="_blank" href="https://www.tiktok.com/tag/deutschlernen?refer=embed">#deutschlernen</a> <a title="duhocngheduc" target="_blank" href="https://www.tiktok.com/tag/duhocngheduc?refer=embed">#duhocngheduc</a> <a title="🇻🇳🇩🇪" target="_blank" href="https://www.tiktok.com/tag/%F0%9F%87%BB%F0%9F%87%B3%F0%9F%87%A9%F0%9F%87%AA?refer=embed">#🇻🇳🇩🇪</a> <a target="_blank" title="♬ nhạc nền  - 🇻🇳 Huyền🤍Timo 🇩🇪" href="https://www.tiktok.com/music/nhạc-nền-🇻🇳-Huyền🤍Timo-🇩🇪-7446019309553290006?refer=embed">♬ nhạc nền  - 🇻🇳 Huyền🤍Timo 🇩🇪</a> </section> </blockquote> <script async src="https://www.tiktok.com/embed.js"></script>`,
            },
            "reddit1.png",
            {
              type: "tiktok",
              content: `<blockquote class="tiktok-embed" cite="https://www.tiktok.com/@gerholdsvn/video/7430404783179074848" data-video-id="7430404783179074848" style="max-width: 605px;min-width: 325px;" > <section> <a target="_blank" title="@gerholdsvn" href="https://www.tiktok.com/@gerholdsvn?refer=embed">@gerholdsvn</a> Cách luyện nói tiếng Đức mỗi ngày <a title="hoctiengduc" target="_blank" href="https://www.tiktok.com/tag/hoctiengduc?refer=embed">#hoctiengduc</a> <a title="tiengducduhoc" target="_blank" href="https://www.tiktok.com/tag/tiengducduhoc?refer=embed">#tiengducduhoc</a> <a title="fluentpal" target="_blank" href="https://www.tiktok.com/tag/fluentpal?refer=embed">#fluentpal</a> <a title="tiktokeducation" target="_blank" href="https://www.tiktok.com/tag/tiktokeducation?refer=embed">#tiktokeducation</a> <a title="learnontiktok" target="_blank" href="https://www.tiktok.com/tag/learnontiktok?refer=embed">#learnontiktok</a> <a title="familygerhold" target="_blank" href="https://www.tiktok.com/tag/familygerhold?refer=embed">#familygerhold</a> <a title="cuocsongduc" target="_blank" href="https://www.tiktok.com/tag/cuocsongduc?refer=embed">#cuocsongduc</a> <a title="duhocduc🇩🇪" target="_blank" href="https://www.tiktok.com/tag/duhocduc%F0%9F%87%A9%F0%9F%87%AA?refer=embed">#duhocduc🇩🇪</a> <a title="tiengduc" target="_blank" href="https://www.tiktok.com/tag/tiengduc?refer=embed">#tiengduc</a> <a target="_blank" title="♬ Little Things - Tiqta" href="https://www.tiktok.com/music/Little-Things-7089644688840099841?refer=embed">♬ Little Things - Tiqta</a> </section> </blockquote> <script async src="https://www.tiktok.com/embed.js"></script>`,
            },

            "reddit2.png",
            "1.jpg",
            "5.jpg",
            "8.jpg",
            "3.jpg",
            "4.jpg",
            {
              type: "tiktok",
              content: `<blockquote class="tiktok-embed" cite="https://www.tiktok.com/@kiara.yuhe/video/7345096077265194247" data-video-id="7345096077265194247" style="max-width: 605px;min-width: 325px;" > <section> <a target="_blank" title="@kiara.yuhe" href="https://www.tiktok.com/@kiara.yuhe?refer=embed">@kiara.yuhe</a> Luyện nói tiếng Trung với AI của FluentPal🇨🇳 hiểu biết sâu, đối thoại mượt mà, tinh tế 💯<a title="hoctiengtrung" target="_blank" href="https://www.tiktok.com/tag/hoctiengtrung?refer=embed">#hoctiengtrung</a> <a title="duhoctrungquoc" target="_blank" href="https://www.tiktok.com/tag/duhoctrungquoc?refer=embed">#duhoctrungquoc</a> <a title="fluentpal" target="_blank" href="https://www.tiktok.com/tag/fluentpal?refer=embed">#fluentpal</a> <a title="tiengtrung" target="_blank" href="https://www.tiktok.com/tag/tiengtrung?refer=embed">#tiengtrung</a> <a title="hakiara" target="_blank" href="https://www.tiktok.com/tag/hakiara?refer=embed">#hakiara</a> <a target="_blank" title="♬ original sound  - Hà Kiara" href="https://www.tiktok.com/music/original-sound-Hà-Kiara-7345096392137673473?refer=embed">♬ original sound  - Hà Kiara</a> </section> </blockquote> <script async src="https://www.tiktok.com/embed.js"></script>`,
            },
            "6.jpg",
            "7.jpg",
            "10.jpg",
            {
              type: "video",
              content: `<iframe width="560" height="315" src="https://www.youtube.com/embed/YD5dV0EgWU0?si=cSQsKKUjCUlRuN7_&amp;controls=0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`,
            },
          ].map((item, index) => {
            if (typeof item === "string") {
              return (
                <div
                  key={item}
                  className="break-inside-avoid mb-4"
                >
                  <img
                    src={`/reviews/${item}`}
                    alt={`Review ${index + 1}`}
                    className="w-full rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100"
                  />
                </div>
              );
            } else {
              return (
                <div
                  key={index}
                  className="break-inside-avoid mb-4 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-gray-100"
                >
                  <div
                    className="w-full"
                    dangerouslySetInnerHTML={{ __html: item.content }}
                  />
                </div>
              );
            }
          })}
        </div>
      </Section>
      <Section
        id="faq"
        outerClassName="bg-[#EEF5FF]"
      >
        <SectionTitle
          number={7}
          text="FAQ"
        />
        <Title className="pt-12 text-center">{t("faq.title")}</Title>
        <div className="max-w-3xl mx-auto space-y-4 mt-[50px]">
          {[
            {
              question: t("faq.q1"),
              answer: t("faq.a1"),
            },
            {
              question: t("faq.q2"),
              answer: t("faq.a2"),
            },
            {
              question: t("faq.q3"),
              answer: t("faq.a3"),
            },
            {
              question: t("faq.q4"),
              answer: t("faq.a4"),
            },
            {
              question: t("faq.q5"),
              answer: t("faq.a5"),
            },
          ].map((faq, index) => (
            <details
              key={index}
              className="group bg-white rounded-xl shadow-sm"
            >
              <summary className="flex items-center justify-between cursor-pointer p-6 font-bold text-lg">
                {faq.question}
                <svg
                  className="w-5 h-5 transition-transform group-open:rotate-180"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </summary>
              <div className="px-6 pb-6 text-gray-600 border-t border-gray-100">
                <p className="pt-4">{faq.answer}</p>
              </div>
            </details>
          ))}
        </div>
      </Section>
      <Section outerClassName="bg-[#C8DEFF] border-t-[1px] border-b-[1px]">
        <Title className="text-center mb-12">{t("download.title")}</Title>

        <StoreDownload />
        <div className="hidden md:flex flex-col items-center">
          <div className="font-body text-[16px] font-bold text-black mt-[40px] mb-[10px]">
            {t("hero.scan_qr")}
          </div>
          <img
            src="/qr-code.png"
            className="w-[200px] h-[200px] rounded-md mt-[5]"
          />
        </div>
      </Section>
      <Footer />

      <FloatingDownloadButton />
    </main>
  );
}
