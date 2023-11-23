import { AppLogo } from '@/components/AppLogo';
import { Benefit } from '@/components/Benefit';
import { Button } from '@/components/Button';
import { StoreDownload } from '@/components/StoreDownload';
import classNames from 'classnames';
import { useTranslations } from 'next-intl';

const SectionTitle: React.FC<{ number: number; text: string }> = ({
  number,
  text,
}) => {
  return (
    <div className="inline-flex mb-[10px] self-start h-[34px] px-1 py-[5px] border-[1px] border-[#044BB7] rounded-[20px] text-[#044BB7] font-semibold">
      <div className="px-[10px] border-r-[1px] border-r-[#044BB7] text-center ">
        {number}
      </div>
      <div className="px-[10px]">{text}</div>
    </div>
  );
};

const Section: React.FC<{
  id?: string;
  children: React.ReactNode;
  outerClassName?: string;
  innerClassName?: string;
}> = ({ id, children, outerClassName, innerClassName }) => {
  return (
    <div
      id={id}
      className={classNames('w-full', outerClassName)}
    >
      <div
        className={classNames(
          'w-[1000px] max-w-full mx-auto py-[40px] md:py-[80px] px-[20px] md:px-0',
          innerClassName
        )}
      >
        {children}
      </div>
    </div>
  );
};

const Title: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className,
}) => (
  <div
    className={classNames(
      'text-[#044BB7] text-[21px] md:text-[31px] font-title font-bold md:font-bold mb-[15px]',
      className
    )}
  >
    {children}
  </div>
);

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
        <div className="flex justify-between py-[20px]">
          <div className="flex gap-[10px] items-center">
            <AppLogo className="text-white" />
          </div>
          <div className="justify-end items-center gap-[30px] text-white hidden md:flex">
            <a href="#introduction">{t('introduction.introduction')}</a>
            <a href="#languages">{t('supported_languages.title')}</a>
            <a href="#benefits">{t('benefits.title')}</a>
            <a href="#features">{t('features.title')}</a>
            <Button
              href={'/en/download'}
              className="px-[40px] py-[10px] shadow-sm text-black bg-white rounded-[15px] font-bold"
            >
              {t('hero.download')}
            </Button>
          </div>
          <Button
            href={'/en/download'}
            className="block md:hidden px-[40px] py-[10px] shadow-sm text-black bg-white rounded-[15px] font-bold"
          >
            {t('hero.download')}
          </Button>
        </div>
        <div className="flex flex-col md:flex-row flex-1 gap-[0] justify-start md:justify-center overflow-hidden">
          <div className="flex flex-col justify-start pt-[40px] md:pt-0 md:justify-center gap-[10px]">
            <div className="font-title font-bold text-[31px] md:text-[50px] text-white uppercase">
              {t('hero.title')}
            </div>
            <div className="text-white text-[16px] font-light">
              {t('hero.description')}
            </div>
            <div className="flex flex-col items-center md:items-start">
              <Button
                href={'/en/download'}
                className="center my-[20px] px-[40px] py-[15px] shadow-sm text-black bg-white rounded-[15px] font-bold mb-[15px]"
              >
                {t('hero.tap_future')}
              </Button>
              <div className="text-white text-[14px]">
                {t.rich('hero.download_desc', {
                  strong: (chunk) => <b>{chunk}</b>,
                })}
              </div>
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
        {Array(7)
          .fill(1)
          .map((_, index) => {
            const number = index + 1;
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
      <Section outerClassName="bg-[#C8DEFF] border-t-[1px] border-b-[1px]">
        <Title className="text-center">{t('download.title')}</Title>
        <div className="text-center">{t('download.desc')}</div>
        <StoreDownload />
      </Section>
      <Section>
        <div className="flex justify-between items-start">
          <AppLogo />
          <div>
            <div className="font-title font-bold mb-[10px]">
              {t('support.title')}
            </div>
            <div className="font-body flex flex-col gap-2">
              <div className="flex gap-2">
                <img
                  src="/email.svg"
                  alt="email"
                  width={19}
                  height={15}
                />
                <a href="mailto:fluentpal.app@gmail.com">fluentpal.app@gmail.com</a>
              </div>
              <div className="flex gap-2">
                <img
                  src="/facebook.svg"
                  alt="facebook"
                  width={19}
                  height={19}
                />
                <a href="https://www.facebook.com/profile.php?id=61550890358472">
                  Facebook
                </a>
              </div>
              <div className="flex gap-2">
                <img
                  src="/reddit.svg"
                  alt="reddit"
                  width={22}
                  height={22}
                />
                <a href="https://www.reddit.com/r/fluentpal/">Reddit</a>
              </div>
            </div>
          </div>
        </div>
      </Section>
    </main>
  );
}
