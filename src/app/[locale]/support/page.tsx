export default function Page() {
  return (
    <div className="m-auto pt-[40px] max-w-[1024px] min-h-[100vh] flex flex-col gap-5 px-5 md:px-0">
      <div className="font-title font-bold text-[30px]">Support</div>

      <div>
        If you have any questions or requests regarding support or payment.{' '}
        <br />
        Please contact us through the following these 2 channels:
      </div>
      
      <div className="font-body flex flex-col gap-1">
        <div className="flex gap-2">
          <img
            src="/email.svg"
            alt="email"
            width={19}
            height={15}
          />
          fluentpal.app@gmail.com
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
