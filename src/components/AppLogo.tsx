import classNames from 'classnames';

interface IProp {
  className?: string;
}

export const AppLogo: React.FC<IProp> = ({ className }) => (
  <div className={classNames('flex gap-[10px] items-center text-[21px]', className)}>
    <img
      src="/logo.png"
      className="w-[40px] h-[40px] rounded-[5px] border-[white] border-[1px] rotate-2 shadow-sm"
    />
    <div className="font-semibold tracking-wide font-title">FluentPal</div>
  </div>
);
