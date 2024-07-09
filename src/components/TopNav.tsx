import { useTranslations } from "next-intl";
import { AppLogo } from "./AppLogo";
import { Button } from "./Button";

export default function TopNav() {
  const t = useTranslations('home');
  return (
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
  )
}