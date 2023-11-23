import { useTranslations } from "next-intl";

interface IProp {
  icon: string;
  title: string;
  desc: string;
}

const BenefitItem: React.FC<IProp> = ({ icon, title, desc }) => {
  return (
    <div className="flex flex-col gap-[20px] basis-[33.3%] pr-[30px] mb-[40px]">
      <div className="w-[40px] h-[40px] flex justify-center items-center border-[1px] border-[#000] rounded-full">
        <img src={icon} />
      </div>
      <div className="font-title font-bold uppercase text-[16px]">{title}</div>
      <div>{desc}</div>
    </div>
  );
};

export const Benefit = () => {
  const t = useTranslations('home')
  return (
    <div className="flex flex-col md:flex-row justify-start flex-wrap mt-[40px]">
      {[
        {
          icon: '/power.svg',
          title: t('benefits.item1'),
          desc: t('benefits.item1_desc'),
        },
        {
          icon: '/redudant.svg',
          title: t('benefits.item2'),
          desc: t('benefits.item2_desc'),
        },
        {
          icon: '/money.svg',
          title: t('benefits.item3'),
          desc: t('benefits.item3_desc'),
        },
        {
          icon: '/stair.svg',
          title: t('benefits.item4'),
          desc: t('benefits.item4_desc'),
        },
      ].map((item, index) => (
        <BenefitItem
          {...item}
          key={index}
        />
      ))}
    </div>
  );
}
