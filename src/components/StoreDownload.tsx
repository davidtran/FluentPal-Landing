import { useLocale, useTranslations } from "next-intl";

export const StoreDownload = () => {
  const locale = useLocale();
  const t = useTranslations('home');
  return (
    <div className="flex gap-[10px] md:gap-[20px] justify-center mt-[20px]">
      {[
        {
          icon: 'apple.svg',
          name: 'AppStore',
          href: '/vi/download?platform=ios',
        },
        {
          icon: 'android.svg',
          name: 'PlayStore',
          href: '/vi/download?platform=android',
        },
      ].map((item) => (
        <a
          href={item.href}
          key={item.icon}
          className="grow md:grow-0 md:flex-0 bg-white items-center gap-[20px] flex justify-center px-[35px] py-[8px] rounded-[15px] shadow-[0px_1px_2px_rgba(0,0,0,0.25)]"
        >
          <img src={item.icon} />
          <div className="flex-col -gap-[1px]">
            <div className="md:block hidden font-light text-[#515151] text-[12px] -mb-[2px]">
              {t('download.download_from')}
            </div>
            <div className="font-bold">{item.name}</div>
          </div>
        </a>
      ))}
    </div>
  );
};
