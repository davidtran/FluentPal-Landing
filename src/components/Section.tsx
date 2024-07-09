import classNames from "classnames";

export const SectionTitle: React.FC<{ number: number; text: string }> = ({
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

export const Title: React.FC<{ children: React.ReactNode; className?: string }> = ({
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


export const Section: React.FC<{
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
