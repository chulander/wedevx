import React from "react";

const Hero: React.FC = () => {
  return (
    <section className="relative w-full h-[300px] md:h-[400px] bg-lime-100 overflow-hidden flex items-center">
      {/* Decorative Circles on the Left */}
      <div className="absolute top-[-3rem] left-[-3rem] w-60 h-60 bg-lime-300 rounded-full z-0" />
      <div className="absolute top-[1rem] left-[1rem] w-40 h-40 bg-lime-400 rounded-full z-0" />
      <div className="absolute top-[6rem] left-[4rem] w-24 h-24 bg-lime-500 rounded-full z-0" />

      {/* Content (Logo + Headline) */}
      <div className="relative z-10 container mx-auto px-4">
        <div className="text-xl font-bold mb-2">almă</div>
        <h1 className="text-3xl md:text-5xl font-bold text-gray-800 leading-tight">
          Get An Assessment
          <br />
          Of Your Immigration Case
        </h1>
      </div>
    </section>
  );
};

export default Hero;
