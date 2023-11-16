import { AppLogo } from '@/components/AppLogo';
import { Benefit } from '@/components/Benefit';
import { Button } from '@/components/Button';
import { StoreDownload } from '@/components/StoreDownload';
import { getDownloadLink } from '@/utils/general';
import classNames from 'classnames';
import { headers } from 'next/headers';

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
  direction: 'left' | 'right';
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
  return (
    <main
      className="bg-repeat w-[100wh]"
      style={{ backgroundImage: 'url(/noise.png)' }}
    >
      <Section
        outerClassName="bg-[#044BB7] h-[100vh]"
        innerClassName="flex flex-col !py-0 h-full"
      >
        <div className="flex justify-between py-[20px]">
          <div className="flex gap-[10px] items-center">
            <AppLogo className="text-white" />
          </div>
          <div className="justify-end items-center gap-[30px] text-white hidden md:flex">
            <a href="#introduction">Giới thiệu</a>
            <a href="#languages">Ngôn ngữ hỗ trợ</a>
            <a href="#benefits">Lợi ích</a>
            <a href="#features">Tính năng</a>
            <Button
              href={'/download'}
              className="px-[40px] py-[10px] shadow-sm text-black bg-white rounded-[15px] font-bold"
            >
              Tải về
            </Button>
          </div>
          <Button
            href={'/download'}
            className="block md:hidden px-[40px] py-[10px] shadow-sm text-black bg-white rounded-[15px] font-bold"
          >
            Tải về
          </Button>
        </div>
        <div className="flex flex-col md:flex-row flex-1 gap-[0] justify-start md:justify-center overflow-hidden">
          <div className="flex flex-col justify-start pt-[40px] md:pt-0 md:justify-center gap-[10px]">
            <div className="font-title font-bold text-[31px] md:text-[50px] text-white uppercase">
              Giáo viên ngoại ngữ của bạn!
            </div>
            <div className="text-white text-[16px] font-light">
              Ứng dụng giúp bạn học giao tiếp ngoại ngữ thông qua giáo viên AI,
              tham gia vào các tình huống nhập vai và trò chuyện cùng các nhân
              vật AI nổi tiếng.
            </div>
            <div className="flex flex-col items-center md:items-start">
              <Button
                href={'/download'}
                className="center my-[20px] px-[80px] py-[15px] shadow-sm text-black bg-white rounded-[15px] font-bold mb-[15px]"
              >
                Tải về
              </Button>
              <div className="text-white text-[14px]">
                Ứng dụng có mặt tại AppStore và PlayStore
              </div>
            </div>
          </div>
          <div className="w-full md:w-1/2 flex justify-center items-center relative">
            <img
              src="/hero.png"
              className="mx-auto absolute md:relative top-[50px]"
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
          text="Giới thiệu"
        />

        <div className="md:flex-row flex gap-[20px] md:gap-[40px] items-center mb-[40px] flex-col-reverse">
          <div>
            <Title>Học ngoại ngữ như là bạn đang sống ở nước ngoài!</Title>
            <p>
              Người bản xứ học ngôn ngữ của họ một cách thực tế mà không cần bất
              kỳ trường lớp:{' '}
              <b>
                <i>
                  giao tiếp hàng ngày bằng chính ngôn ngữ của họ ngay từ khi bắt
                  đầu bập bẹ biết nói.
                </i>
              </b>
            </p>
            <br />
            <p>
              Hãy tạo cơ hội cho mình một lần nữa bằng cách tạo cho mình một môi
              trường ngoại ngữ để mình có thể chủ động giao tiếp ngoại ngữ bất
              cứ khi nào. Bạn càng chủ động học giao tiếp càng sớm thì bạn không
              chỉ giao tiếp một cách lưu loát hơn mà phát âm của bạn cũng chính
              xác hơn.
            </p>
          </div>
          <img
            src="/surprise-girl.png"
            className="w-[180px] h-[180px] mt-[20px] md:mt-0"
          />
        </div>

        <SectionTitle
          number={2}
          text="Ngôn ngữ hỗ trợ"
        />
        <div id="languages">
          <div className="my-[20px]">
            FluentPal sẽ trò chuyện và hướng dẫn bạn học những ngôn ngữ sau:
          </div>
          {[
            ['🏴󠁧󠁢󠁥󠁮󠁧󠁿', 'Tiếng Anh'],
            ['🇨🇳', 'Tiếng Trung Quốc'],
            ['🇯🇵', 'Tiếng Nhật'],
            ['🇰🇷', 'Tiếng Hàn Quốc'],
            ['🇪🇸', 'Tiếng Tây Ban Nha'],
            ['🇫🇷', 'Tiếng Pháp'],
            ['🇩🇪', 'Tiếng Đức'],
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
          text="Lợi ích"
        />
        <Benefit />
      </Section>

      <Section id="features">
        <SectionTitle
          number={3}
          text="Tính năng"
        />
        <Title>Tất cả những gì bạn cần để học ngoại ngữ!</Title>
        <Feature
          title="Tham gia vào các tình huống nhập vai"
          description="Trò chuyện với các nhân vật trong FluentPal cũng giống như là bạn đang nói chuyện với người thật. FluentPal đã được trau dồi thông qua hàng trăm ngàn cuộc trò chuyện để hiểu được bạn đang nói gì và biết cách phản hồi một cách tự nhiên nhất."
          media={
            <img
              src="/features/roleplay.jpg"
              width={300}
              height={400}
              className="border-[5px] border-[white] shadow-md rounded-[20px]"
            />
          }
          direction="left"
        />
        <Feature
          title="Trò chuyện với người nổi tiếng"
          description="Trò chuyện cùng những nhân vật nổi tiếng như Elon hoặc Messi thông qua AI siêu thông minh bằng bất kỳ ngôn ngữ nào,"
          media={
            <img
              src="/features/characters.jpg"
              width={300}
              height={400}
              className="border-[5px] border-[white] shadow-md rounded-[20px]"
            />
          }
          direction="right"
        />
        <Feature
          title="Gợi ý cho cho bạn"
          description="FluentPal sẽ đưa ra các gợi ý phù hợp cho tình huống. Bạn sẽ không bao giờ phải lo lắng mỗi khi không biết mình cần phải nói gì."
          media={
            <img
              src="/features/suggestion.jpg"
              width={300}
              height={400}
              className="border-[5px] border-[white] shadow-md rounded-[20px]"
            />
          }
          direction="left"
        />
        <Feature
          title="Dịch sang ngôn ngữ của bạn"
          description={
            <div>
              Bạn có thể yêu cầu FluentPal cả câu hoặc từng từ, thông qua đó
              tăng cường vốn từ vựng của bạn.
            </div>
          }
          media={
            <img
              src="/features/translate.jpg"
              width={300}
              height={400}
              className="border-[5px] border-[white] shadow-md rounded-[20px]"
            />
          }
          direction="right"
        />
        <Feature
          title="Sửa lỗi và khuyến khích bạn chủ động"
          description={
            <div>
              FluentPal đưa ra gợi ý để bạn có thể trò chuyện hay hơn trong từng
              tình huống
            </div>
          }
          media={
            <img
              src="/features/mistake.jpg"
              width={300}
              height={400}
              className="border-[5px] border-[white] shadow-md rounded-[20px]"
            />
          }
          direction="left"
        />
        <Feature
          title="Lựa chọn cấp độ và tốc độ của AI"
          description={
            <div>
              Có 3 cấp độ trò chuyện khác nhau để bạn lựa chọn là "Mới bắt đầu",
              "Nâng cao" và IELTS (chỉ dành cho tiếng Anh)
            </div>
          }
          media={
            <img
              src="/features/levels.jpg"
              width={300}
              height={400}
              className="border-[5px] border-[white] shadow-md rounded-[20px]"
            />
          }
          direction="right"
        />
      </Section>
      <Section outerClassName="bg-[#C8DEFF] border-t-[1px] border-b-[1px]">
        <Title className="text-center">
          Tải ứng dụng và bắt đầu giao tiếp như người bản xứ
        </Title>
        <div className="text-center">
          Ứng dụng FluentPal hiện có mặt tại AppStore và PlayStore
        </div>
        <StoreDownload />
      </Section>
      <Section>
        <div className="flex justify-between">
          <AppLogo />
          <a
            href="mailto:fluentpal.app@gmail.com"
            className="font-semibold"
          >
            Hỗ trợ
          </a>
        </div>
      </Section>
    </main>
  );
}
