import React from "react";

interface HeroProps {
  title: string;
  subtitle?: string;
  className?: string;
}

const Hero: React.FC<HeroProps> = ({ title, subtitle, className = "" }) => {
  return (
    <section
      className={`relative py-20 ${className} h-full flex items-center justify-center`}
    >
      <div className="">
        <div className="text-center">
          <h1 className="text-5xl font-bold mb-6 text-white">{title}</h1>
          {subtitle && (
            <p className="text-xl text-white max-w-full mx-auto">{subtitle}</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default Hero;
