import classNames from "classnames";

export const Center = ({ children, blur }: { children: React.ReactNode, blur?: boolean }) => {
  return (
    <div className={classNames("absolute left-0 top-0 right-0 bottom-0 flex flex-row justify-center items-center z-[999]", {
      'blur-[2px]': blur
    })}>
      {children}
    </div>
  );
};
