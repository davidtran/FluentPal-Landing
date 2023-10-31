export default function Page() {
  return (
    <div className="m-auto pt-[40px] max-w-[1024px] min-h-[100vh] flex flex-col gap-5 px-5 md:px-0">
      <div className="font-title font-bold text-[30px]">Hỗ trợ</div>

      <div>
        If you have any questions or requests regarding support or payment.{' '}
        <br />
        Please contact us through the following these 2 channels:
      </div>

      <div>
        Nếu bạn có bất cứ thắc mắc hoặc yêu cầu về hỗ trợ hoặc thanh toán.{' '}
        <br />
        Vui lòng liên qua qua 2 kênh liên lạc sau đây:
      </div>
      <div className="font-body flex flex-col gap-1">
        <div className="flex gap-2">
          <img
            src="/email.svg"
            alt="email"
            width={19}
            height={15}
          />
          nam.trankhanh.vn@gmail.com
        </div>
        <div className="flex gap-2">
          <img
            src="/facebook.svg"
            alt="facebook"
            width={19}
            height={19}
          />
          <a href="https://www.facebook.com/profile.php?id=61550890358472">
            FluentPal on Facebook
          </a>
        </div>
      </div>
    </div>
  );
}
