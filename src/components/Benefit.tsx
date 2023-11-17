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

export const Benefit = () => (
  <div className="flex flex-col md:flex-row justify-start flex-wrap mt-[40px]">
    {[
      {
        icon: '/power.svg',
        title: 'Giao tiếp như người thật',
        desc: 'Trò chuyện với các nhân vật trong FluentPal cũng giống như là bạn đang nói chuyện với người thật. AI của FluentPal có được nhờ quá trình học tập hàng trăm ngàn cuộc hội thoại của người bản xứ, do vậy FluentPal sẽ mang đến cho bạn trải nghiệm học thực tế nhất.',
      },
      {
        icon: '/redudant.svg',
        title: 'Bài học phong phú',
        desc: 'FluentPal cung cấp một loạt bài tập giao tiếp đa dạng, mỗi bài tập là một cơ hội để bạn thực hành và nâng cao khả năng ngôn ngữ của mình.',
      },
      {
        icon: '/money.svg',
        title: 'Chi phí tiết kiệm',
        desc: 'Chỉ với 499k cho gói vĩnh viễn, FluentPal luôn sẵn sàng để học ngoại ngữ cùng bạn bất cứ đâu và bất kỳ khi nào.',
      },
      {
        icon: '/stair.svg',
        title: 'Thân thiện với người mới',
        desc: 'Ứng dụng chú trọng đến việc tạo ra một môi trường học ngoại ngữ đơn giản và hiệu quả, để bạn cảm thấy thoải mái và tự tin khi bắt đầu hành trình ngoại ngữ của mình.',
      },
    ].map((item, index) => (
      <BenefitItem
        {...item}
        key={index}
      />
    ))}
  </div>
);
