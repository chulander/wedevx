import React from "react";

const Hero: React.FC = () => {
  return (
    <section className="relative flex h-[300px] w-full justify-center overflow-hidden bg-lime-100 text-center md:h-[400px]">
      {/* Decorative Circles on the Left */}
      <div className="absolute top-[-3rem] left-[-3rem] z-0 h-60 w-60 rounded-full bg-lime-300" />
      <div className="absolute top-[1rem] left-[1rem] z-0 h-40 w-40 rounded-full bg-lime-400" />
      <div className="absolute top-[6rem] left-[4rem] z-0 h-24 w-24 rounded-full bg-lime-500" />

      {/* Content (Logo + Headline) */}
      <div className="relative z-10">
        <div className="mb-2 text-xl font-bold">almă</div>
        <h1 className="text-3xl leading-tight font-bold text-gray-800 md:text-5xl">
          Get An Assessment
          <br />
          Of Your Immigration Case
        </h1>
      </div>
    </section>
  );
};

export default Hero;
