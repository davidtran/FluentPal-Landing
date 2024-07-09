import { Button } from '@/components/Button';
import Footer from '@/components/Footer';
import { Section, Title } from '@/components/Section';
import TopNav from '@/components/TopNav';
import { useTranslations } from 'next-intl';

const SmallTitle: React.FC<{ number: number; text: string }> = ({
  number,
  text,
}) => {
  return (
    <div className="inline-flex mb-[20px] self-start h-[34px] px-1 py-[5px] border-[1px] rounded-[20px] text-[#044BB7] font-semibold">
      <div className="px-[10px] border-r-[1px]">{number}</div>
      <div className="px-[10px]">{text}</div>
    </div>
  );
};

export default function PartnerPage() {
  const t = useTranslations('affiliate');
  return (
    <main
      className="bg-repeat w-[100wh]"
      style={{ backgroundImage: 'url(/noise.png)' }}
    >
      <Section
        outerClassName="h-[600px] md:h-[550px] bg-gradient-to-t to-[#044BB7] from-[#003B94]"
        innerClassName="flex flex-col !py-0 h-full"
      >
        <TopNav />
        <div className="flex flex-col flex-1 gap-[15px] justify-center items-center overflow-hidden">
          <h1 className="font-title font-bold text-[41px] text-center md:text-[51px] text-white">
            {t('title')}
          </h1>
          <p className="text-white font-body text-center leading-[30px]">
            {t('description')}
          </p>
          <Button
            href="https://fluentpal.firstpromoter.com"
            className="mt-[20px] px-[60px] py-[15px] shadow-sm text-black bg-white rounded-[15px] font-bold"
          >
            {t('join_now')}
          </Button>
        </div>
      </Section>
      <Section
        id="introduction"
        outerClassName="py-[50px] text-center bg-white"
      >
        <Title className="mb-[40px] !text-[31px]">{t('how_it_works')}</Title>
        <div className="flex flex-col md:flex-row md:justify-center gap-[30px]">
          <div className="text-left md:w-[33%]">
            <SmallTitle
              number={1}
              text={t('step_1_title')}
            />
            <p className="text-left">{t('step_1_desc')}</p>
          </div>
          <div className="text-left md:w-[33%]">
            <SmallTitle
              number={2}
              text={t('step_2_title')}
            />
            <p className="text-left">{t('step_2_desc')}</p>
          </div>
          <div className="text-left md:w-[33%]">
            <SmallTitle
              number={3}
              text={t('step_3_title')}
            />
            <p className="text-left">{t('step_3_desc')}</p>
          </div>
        </div>
        <div className="flex flex-row justify-center items-center mt-[20px]">
          <Button
            href="https://fluentpal.firstpromoter.com"
            className="mt-[20px] px-[60px] py-[12px] shadow-sm !text-white !bg-[#044BB7] rounded-[15px] font-bold"
          >
            {t('join_now')}
          </Button>
        </div>
      </Section>
      <Footer />
    </main>
  );
}
