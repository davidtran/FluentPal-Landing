import { AppLogo } from '@/components/AppLogo';
import { Benefit } from '@/components/Benefit';
import Footer from '@/components/Footer';
import { Section, SectionTitle, Title } from '@/components/Section';
import { StoreDownload } from '@/components/StoreDownload';
import TopNav from '@/components/TopNav';
import classNames from 'classnames';
import { useLocale, useTranslations } from 'next-intl';



const Feature: React.FC<{
  title: string;
  description: React.ReactNode;
  media: React.ReactNode;
  direction: string;
}> = ({ title, description, media, direction }) => {
  return (
    <div
      className={classNames(
        'flex flex-col md:flex-row justify-between items-center md:items-start my-[20px] md:my-[100px] mb-[30px] md:mb-0 gap-[20px] md:gap-[50px]',
        {
          'md:flex-row-reverse': direction === 'right',
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
        className={classNames('flex', {
          'justify-start': direction === 'right',
          'justify-end': direction === 'left',
        })}
      >
        {media}
      </div>
    </div>
  );
};

export default function Home() {
  const locale = useLocale();
  const t = useTranslations('home');
  return (
    <main
      className="bg-repeat w-[100wh]"
      style={{ backgroundImage: 'url(/noise.png)' }}
    >
      <Section
        outerClassName="h-[100vh] bg-gradient-to-t to-[#044BB7] from-[#003B94]"
        innerClassName="flex flex-col !py-0 h-full"
      >        
      <TopNav />
        <div className="flex flex-col md:flex-row flex-1 gap-[0] justify-start md:justify-center overflow-hidden">
          <div className="flex flex-col justify-start pt-[40px] md:pt-0 md:justify-center gap-[10px]">
            <div className="font-title font-bold text-[31px] md:text-[50px] text-white uppercase">
              {t('hero.title')}
            </div>
            <div className="text-white text-[16px] font-light">
              {t('hero.description')}
            </div>
            <div className="flex flex-col items-center md:items-start">
              <StoreDownload />
            </div>
            <div className="hidden md:block">
              <div className="font-body text-[16px] font-bold text-white mt-[15px] mb-[10px]">
                {t('hero.scan_qr')}
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
          text={t('introduction.introduction')}
        />

        <div className="md:flex-row flex gap-[20px] md:gap-[40px] items-center mb-[40px] flex-col-reverse">
          <div>
            <Title>{t('introduction.title')}</Title>
            <p>
              {t.rich('introduction.text1', {
                strong: (chunks) => <b>{chunks}</b>,
              })}
            </p>
            <br />
            <p>{t('introduction.text2')}</p>
          </div>
          <img
            src="/surprise-girl.png"
            className="w-[180px] h-[180px] mt-[20px] md:mt-0"
          />
        </div>

        <SectionTitle
          number={2}
          text={t('supported_languages.title')}
        />
        <div id="languages">
          <div className="my-[20px]">
            {t('supported_languages.description')}
          </div>
          {[
            ['🏴󠁧󠁢󠁥󠁮󠁧󠁿', t('supported_languages.english')],
            ['🇨🇳', t('supported_languages.chinese')],
            ['🇯🇵', t('supported_languages.japanese')],
            ['🇰🇷', t('supported_languages.korean')],
            ['🇪🇸', t('supported_languages.spanish')],
            ['🇫🇷', t('supported_languages.french')],
            ['🇩🇪', t('supported_languages.germany')],
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
          text={t('benefits.title')}
        />
        <Benefit />
      </Section>

      <Section id="features">
        <SectionTitle
          number={3}
          text={t('features.title')}
        />

        <Title>{t('features.description')}</Title>
        {[1, 2, 8, 3, 4, 5, 6, 7]
          .map((number, index) => {
            return {
              image: `/features/${number}.jpg`,
              title: t('features.item' + number),
              desc: t(`features.item${number}_desc`),
              dir: index % 2 === 0 ? 'left' : 'right',
            };
          })
          .map((item) => (
            <Feature
              key={item.title}
              title={item.title}
              description={item.desc}
              media={
                <img
                  src={item.image}
                  width={300}
                  height={400}
                  className="border-[5px] border-[white] shadow-md rounded-[20px]"
                />
              }
              direction={item.dir}
            />
          ))}
      </Section>
      {locale === 'vi' && (
        <Section outerClassName="bg-[#fff] border-t-[1px] border-b-[1px]">
          <Title className="text-center">{t('review.title')}</Title>
          <div className="text-center">{t('review.description')}</div>
          <div className="grid md:grid-cols-3 grid-cols-2 gap-[10px] mt-[40px]">
            {[
              {
                type: 'video',
                content: `<iframe width="560" height="315" src="https://www.youtube.com/embed/xxn3AwpBlGE?si=fhc-hU9MoD4WRSh0&amp;controls=0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`,
              },
              '9.jpg',
              'reddit1.png',
              'reddit2.png',
              '1.jpg',
              '5.jpg',
              '8.jpg',
              '3.jpg',
              '4.jpg',
              {
                type: 'tiktok',
                content: `<blockquote class="tiktok-embed" cite="https://www.tiktok.com/@kiara.yuhe/video/7345096077265194247" data-video-id="7345096077265194247" style="max-width: 605px;min-width: 325px;" > <section> <a target="_blank" title="@kiara.yuhe" href="https://www.tiktok.com/@kiara.yuhe?refer=embed">@kiara.yuhe</a> Luyện nói tiếng Trung với AI của FluentPal🇨🇳 hiểu biết sâu, đối thoại mượt mà, tinh tế 💯<a title="hoctiengtrung" target="_blank" href="https://www.tiktok.com/tag/hoctiengtrung?refer=embed">#hoctiengtrung</a> <a title="duhoctrungquoc" target="_blank" href="https://www.tiktok.com/tag/duhoctrungquoc?refer=embed">#duhoctrungquoc</a> <a title="fluentpal" target="_blank" href="https://www.tiktok.com/tag/fluentpal?refer=embed">#fluentpal</a> <a title="tiengtrung" target="_blank" href="https://www.tiktok.com/tag/tiengtrung?refer=embed">#tiengtrung</a> <a title="hakiara" target="_blank" href="https://www.tiktok.com/tag/hakiara?refer=embed">#hakiara</a> <a target="_blank" title="♬ original sound  - Hà Kiara" href="https://www.tiktok.com/music/original-sound-Hà-Kiara-7345096392137673473?refer=embed">♬ original sound  - Hà Kiara</a> </section> </blockquote> <script async src="https://www.tiktok.com/embed.js"></script>`,
              },
              '6.jpg',
              '7.jpg',
              '10.jpg',
              {
                type: 'video',
                content: `<iframe width="560" height="315" src="https://www.youtube.com/embed/YD5dV0EgWU0?si=cSQsKKUjCUlRuN7_&amp;controls=0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`,
              },
            ].map((name, index) => {
              if (typeof name === 'string') {
                return (
                  <img
                    key={name}
                    src={`/reviews/${name}`}
                    className="border-[1px] border-[#e1e1e1] w-full shadow-sm rounded-[5px] mb-[10px]"
                  />
                );
              } else {
                return (
                  <div
                    className="col-span-2 flex justify-center items-center border-[1px] border-[#e1e1e1]"
                    dangerouslySetInnerHTML={{ __html: name.content }}
                  ></div>
                );
              }
            })}
          </div>
        </Section>
      )}

      <Section outerClassName="bg-[#C8DEFF] border-t-[1px] border-b-[1px]">
        <Title className="text-center">{t('download.title')}</Title>
        <div className="text-center">{t('download.desc')}</div>
        <StoreDownload />
        <div className="hidden md:flex flex-col items-center">
          <div className="font-body text-[16px] font-bold text-black mt-[40px] mb-[10px]">
            {t('hero.scan_qr')}
          </div>
          <img
            src="/qr-code.png"
            className="w-[200px] h-[200px] rounded-md mt-[5]"
          />
        </div>
      </Section>
      <Footer />
      
      <div className="shadow-[0px_-1px_10px_rgba(0,0,0,0.1)] fixed bottom-0 right-0 bg-[#fff] rounded-tl-[16px] text-black font-body font-bold px-[25px] py-[10px]">
        <a
          href="https://discord.gg/4ZWFPFVUUw"
          target="_blank"
        >
          {t('join_our_discord')}
        </a>
      </div>
    </main>
  );
}
