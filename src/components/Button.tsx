import classNames from "classnames";

interface IProp {
  children: React.ReactNode;
  className?: string;
  href: string;
}
export const Button: React.FC<IProp> = ({children, className, href}) => {
  return (
    <a href={href} className={classNames('px-[40px] py-[10px] shadow-[0px_4px_4px_rgba(0,0,0,0.25)] text-black bg-white rounded-[10px] font-bold', className)}>{children}</a>
  )
}