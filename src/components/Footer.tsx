import { useLocale, useTranslations } from "next-intl";
import { AppLogo } from "./AppLogo";
import { Section } from "./Section";

export default function Footer() {
  const locale = useLocale();
  const t = useTranslations("home");
  return (
    <Section outerClassName="border-t-[1px] pb-[10px]">
      <div className="flex flex-col gap-[40px]">
        <div className="flex-col md:flex-row gap-[20px] flex justify-between items-start">
          <AppLogo />
          <div className="flex flex-col md:flex-row justify-end gap-[40px]">
            <div>
              <div className="font-body flex flex-col gap-2">
                <div className="font-bold">Support</div>
                <div className="flex gap-2">
                  <img
                    src="/email.svg"
                    alt="email"
                    width={19}
                    height={15}
                  />
                  <a href="mailto:contact@fluentpal.app">
                    contact@fluentpal.app
                  </a>
                </div>
                <div className="flex gap-2">
                  <img
                    src="/discord.svg"
                    alt="facebook"
                    width={19}
                    height={19}
                  />
                  <a href="https://discord.gg/4ZWFPFVUUw">Discord</a>
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
              </div>
            </div>

            <div>
              <div className="font-bold">Links</div>

              <div className="pt-[7px]">
                <a
                  href="https://tutoraistudy.com/"
                  target="_blank"
                >
                  TutorAI: Notes and homework helper
                </a>
              </div>
              <div className="pt-[7px]">
                <a
                  href="https://dailydictation.com/"
                  target="_blank"
                >
                  English dictation exercises
                </a>
              </div>
              <div className="pt-[7px]">
                <a
                  href="https://www.binsoo.app/"
                  target="_blank"
                >
                  Binsoo: Photo Filters & Editor
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="text-center text-sm text-gray-500 mt-4">
          <div>
            © {new Date().getFullYear()} Language Town. All rights reserved.
          </div>
        </div>
      </div>
    </Section>
  );
}
